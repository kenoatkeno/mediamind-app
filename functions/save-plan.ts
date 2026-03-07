import { createClient } from "npm:@insforge/sdk";
import { jwtDecode } from "npm:jwt-decode";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default async function (req: Request): Promise<Response> {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.replace("Bearer ", "");

        if (!token) {
            return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
                status: 401,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        // Initialize user-scoped SDK client
        const insforge = createClient({
            baseUrl: Deno.env.get("INSFORGE_PROJECT_URL") ?? "",
            edgeFunctionToken: token,
        });

        // Decode the JWT to get the user ID
        let userId: string;
        try {
            const decoded = jwtDecode<{ sub: string }>(token);
            if (!decoded || !decoded.sub) throw new Error("Invalid token payload");
            userId = decoded.sub;
        } catch (e) {
            return new Response(JSON.stringify({ error: "Unauthorized user token" }), {
                status: 401,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        // Retrieve user's subscription tier
        const { data: userData, error: userError } = await insforge.database
            .from("users")
            .select("subscription_tier")
            .eq("id", userId)
            .single();

        if (userError || !userData) {
            return new Response(JSON.stringify({ error: "Failed to retrieve user profile" }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        const tier = userData.subscription_tier || "free";

        // Enforce limits
        if (tier === "free" || tier === "starter") {
            const { count, error: countError } = await insforge.database
                .from("plans")
                .select("*", { count: "exact", head: true })
                .eq("user_id", userId);

            if (countError) {
                return new Response(JSON.stringify({ error: "Failed to calculate plan limits" }), {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" }
                });
            }

            if (tier === "free" && count && count >= 1) {
                return new Response(JSON.stringify({ error: "limit_reached", message: "Free tier limited to 1 plan." }), {
                    status: 403,
                    headers: { ...corsHeaders, "Content-Type": "application/json" }
                });
            }

            if (tier === "starter" && count && count >= 5) {
                return new Response(JSON.stringify({ error: "limit_reached", message: "Starter tier limited to 5 plans." }), {
                    status: 403,
                    headers: { ...corsHeaders, "Content-Type": "application/json" }
                });
            }
        }

        // Parse body payload and insert new plan
        const { plan_name, input_data, output_data } = await req.json();

        if (!plan_name || !input_data || !output_data) {
            return new Response(JSON.stringify({ error: "Missing required fields: plan_name, input_data, output_data" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        const { data: insertData, error: insertError } = await insforge.database
            .from("plans")
            .insert({
                user_id: userId,
                plan_name,
                input_data,
                output_data,
                status: "saved"
            })
            .select("id")
            .single();

        if (insertError) {
            console.error("Save plan error:", insertError);
            return new Response(JSON.stringify({ error: "Failed to save plan to database", details: insertError }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ success: true, plan_id: insertData.id }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

    } catch (e) {
        console.error("Unknown error in save-plan:", e);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    }
}
