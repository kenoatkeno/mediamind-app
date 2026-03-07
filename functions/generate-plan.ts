import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

const benchmarks = [
    { channel: "YouTube", uk_average_cpm_gbp: 16.50, uk_reach_monthly_millions: 46.5, best_for_objectives: ["Brand Awareness", "Consideration", "Video Views"], demographic_strength: { "16_24": 9, "25_34": 9, "35_44": 8, "45_54": 7, "55_plus": 6 }, min_budget_gbp: 500, typical_formats: ["Skippable In-Stream", "Bumper Ads", "Shorts"], avg_lead_time_days: 2, seasonality_q4_uplift_percent: 30, agency_required: false, notes: "Excellent for high-attention video." },
    { channel: "Instagram", uk_average_cpm_gbp: 9.20, uk_reach_monthly_millions: 35.0, best_for_objectives: ["Brand Awareness", "Conversions", "Lead Generation"], demographic_strength: { "16_24": 10, "25_34": 9, "35_44": 7, "45_54": 5, "55_plus": 3 }, min_budget_gbp: 300, typical_formats: ["Reels", "Stories", "Feed Image"], avg_lead_time_days: 1, seasonality_q4_uplift_percent: 45, agency_required: false, notes: "Essential for lifestyle." },
    { channel: "Facebook", uk_average_cpm_gbp: 7.80, uk_reach_monthly_millions: 43.0, best_for_objectives: ["Conversions", "Lead Generation", "Traffic"], demographic_strength: { "16_24": 4, "25_34": 6, "35_44": 8, "45_54": 9, "55_plus": 9 }, min_budget_gbp: 300, typical_formats: ["Video Feed", "Carousel", "Static Image"], avg_lead_time_days: 1, seasonality_q4_uplift_percent: 40, agency_required: false, notes: "Strongest driver of direct response for audiences 35+." },
    { channel: "TikTok", uk_average_cpm_gbp: 5.50, uk_reach_monthly_millions: 25.0, best_for_objectives: ["Brand Awareness", "Engagement", "Conversions"], demographic_strength: { "16_24": 10, "25_34": 8, "35_44": 5, "45_54": 3, "55_plus": 2 }, min_budget_gbp: 500, typical_formats: ["In-Feed Video", "Spark Ads"], avg_lead_time_days: 1, seasonality_q4_uplift_percent: 25, agency_required: false, notes: "Requires native-feeling, creator-led video content." },
    { channel: "Spotify", uk_average_cpm_gbp: 14.00, uk_reach_monthly_millions: 22.0, best_for_objectives: ["Brand Awareness", "Reach"], demographic_strength: { "16_24": 9, "25_34": 8, "35_44": 7, "45_54": 5, "55_plus": 3 }, min_budget_gbp: 250, typical_formats: ["Audio Ads", "Video Takeover"], avg_lead_time_days: 2, seasonality_q4_uplift_percent: 20, agency_required: false, notes: "Great for hyper-local targeting and screenless moments." },
    { channel: "Google Display", uk_average_cpm_gbp: 3.50, uk_reach_monthly_millions: 48.0, best_for_objectives: ["Remarketing", "Reach", "Traffic"], demographic_strength: { "16_24": 7, "25_34": 8, "35_44": 8, "45_54": 8, "55_plus": 8 }, min_budget_gbp: 200, typical_formats: ["Responsive Display", "Static Banners"], avg_lead_time_days: 1, seasonality_q4_uplift_percent: 15, agency_required: false, notes: "Best used strictly for remarketing." },
    { channel: "Google Search", uk_average_cpm_gbp: 45.00, uk_reach_monthly_millions: 49.0, best_for_objectives: ["Conversions", "Lead Generation", "Traffic"], demographic_strength: { "16_24": 8, "25_34": 9, "35_44": 9, "45_54": 9, "55_plus": 8 }, min_budget_gbp: 300, typical_formats: ["Search Text", "Performance Max"], avg_lead_time_days: 1, seasonality_q4_uplift_percent: 35, agency_required: false, notes: "High intent, high cost." },
    { channel: "DAX Digital Audio", uk_average_cpm_gbp: 12.00, uk_reach_monthly_millions: 28.0, best_for_objectives: ["Brand Awareness", "Reach"], demographic_strength: { "16_24": 6, "25_34": 7, "35_44": 8, "45_54": 8, "55_plus": 7 }, min_budget_gbp: 1000, typical_formats: ["Radio Stream Audio", "Podcast Audio"], avg_lead_time_days: 5, seasonality_q4_uplift_percent: 20, agency_required: true, notes: "Accesses commercial radio digital streams." },
    { channel: "Outdoor/DOOH", uk_average_cpm_gbp: 8.50, uk_reach_monthly_millions: 38.0, best_for_objectives: ["Brand Awareness", "Location Footfall"], demographic_strength: { "16_24": 8, "25_34": 8, "35_44": 7, "45_54": 7, "55_plus": 6 }, min_budget_gbp: 2500, typical_formats: ["Digital 6-Sheet", "Large Format Digital Billboard"], avg_lead_time_days: 10, seasonality_q4_uplift_percent: 30, agency_required: true, notes: "Best for building physical presence." },
    { channel: "Linear TV", uk_average_cpm_gbp: 22.00, uk_reach_monthly_millions: 44.0, best_for_objectives: ["Mass Reach", "Brand Trust"], demographic_strength: { "16_24": 3, "25_34": 4, "35_44": 6, "45_54": 9, "55_plus": 10 }, min_budget_gbp: 15000, typical_formats: ["30-Second Spot", "10-Second Sponsorship"], avg_lead_time_days: 21, seasonality_q4_uplift_percent: 40, agency_required: true, notes: "Ultimate brand-building channel." }
];

function preprocessChannels(campaign) {
    let scoredChannels = benchmarks.map(b => ({
        ...b,
        score: 0
    }));

    // Filter excluded channels
    const excluded = campaign.excluded_channels || [];
    scoredChannels = scoredChannels.filter(c => !excluded.includes(c.channel));

    // Budget rule
    if (campaign.budget_gbp < 2000) {
        scoredChannels = scoredChannels.filter(
            c => c.channel !== "Linear TV" && c.channel !== "Outdoor/DOOH"
        );
    }

    // Objective Rules
    if (campaign.campaign_objective === "brand_awareness") {
        scoredChannels.forEach(c => {
            if (["YouTube", "Spotify", "Linear TV", "DAX Digital Audio"].includes(c.channel)) c.score += 3;
        });
    } else if (campaign.campaign_objective === "performance") {
        scoredChannels.forEach(c => {
            if (["Google Search", "Instagram", "TikTok"].includes(c.channel)) c.score += 3;
        });
    }

    // Audience Rules
    const ages = campaign.audience_age_ranges || [];
    if (ages.includes("55_plus")) {
        scoredChannels.forEach(c => {
            if (["Facebook", "DAX Digital Audio"].includes(c.channel)) c.score += 2;
            if (c.channel === "TikTok") c.score -= 3;
        });
    }
    if (ages.includes("16_24")) {
        scoredChannels.forEach(c => {
            if (["TikTok", "YouTube"].includes(c.channel)) c.score += 3;
            if (["Facebook", "Linear TV"].includes(c.channel)) c.score -= 2;
        });
    }

    // Seasonality Rule (Oct, Nov, Dec)
    let isQ4 = false;
    if (campaign.start_date) {
        const month = new Date(campaign.start_date).getMonth() + 1; // 1-indexed
        if (month >= 10) isQ4 = true;
    }
    if (isQ4) {
        scoredChannels.forEach(c => {
            c.uk_average_cpm_gbp = c.uk_average_cpm_gbp * (1 + c.seasonality_q4_uplift_percent / 100);
        });
    }

    // Preferred Channels
    const preferred = campaign.preferred_channels || [];
    scoredChannels.forEach(c => {
        if (preferred.includes(c.channel)) c.score += 2;
    });

    return scoredChannels;
}

export default async function (req) {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders, status: 204 });
    }

    let campaignBrief;
    try {
        campaignBrief = await req.json();
    } catch (e) {
        return new Response(JSON.stringify({ error: "Invalid JSON input." }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    }

    const apiKey = campaignBrief.gemini_api_key || Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
        return new Response(JSON.stringify({ error: "Server configuration error: missing AI API Key." }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    }

    const { SchemaType } = await import("npm:@google/generative-ai");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
            maxOutputTokens: 2000,
            responseMimeType: "application/json",
            responseSchema: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.OBJECT,
                    properties: {
                        channel: { type: SchemaType.STRING },
                        budget_allocation_gbp: { type: SchemaType.NUMBER },
                        percentage_of_total: { type: SchemaType.NUMBER },
                        kpi_forecast: { type: SchemaType.STRING },
                        rationale: { type: SchemaType.STRING }
                    },
                    required: ["channel", "budget_allocation_gbp", "percentage_of_total", "kpi_forecast", "rationale"]
                }
            }
        }
    });

    const filteredBenchmarks = preprocessChannels(campaignBrief);

    const systemPrompt = `You are a senior UK media planner with 15 years experience
advising SMBs and growing consumer brands. You are data-driven
and plain-speaking. You always explain reasoning in terms the
client can understand without a marketing degree.

Campaign brief:
${JSON.stringify(campaignBrief, null, 2)}

Available UK media channels and benchmark data:
${JSON.stringify(filteredBenchmarks, null, 2)}

Rules:
- Total percentage allocation must equal exactly 100
- Recommend between 2 and 6 channels only
- Minimum recommended channels: 2. Maximum: 6.
- Only recommend channels from the provided benchmarks list
- For channels with agency_required: true, only include
  if budget_gbp exceeds their min_budget_gbp
- For Linear TV and Radio: add a projection_note explaining
  what the budget could achieve and what the next step is
  if the client wanted to explore that channel in future

Return ONLY a valid JSON array.
ABSOLUTELY NO MARKDOWN FORMATTING.
DO NOT WRAP IN \`\`\`json.
START THE RESPONSE DIRECTLY WITH [ AND END WITH ].
Each array item must contain exactly:
{
  "channel": string,
  "percentage_allocation": number,
  "estimated_spend_gbp": number,
  "estimated_reach": string,
  "estimated_cpm_gbp": number,
  "suitability_score": number (1-10),
  "rationale": string (max 40 words, plain English),
  "recommended_format": string,
  "lead_time_days": number,
  "campaign_type_fit": string[],
  "agency_required": boolean,
  "projection_note": string (TV/Radio only, empty string otherwise)
}`;

    let attempts = 0;
    let finalResponse = null;

    while (attempts < 2) {
        try {
            attempts++;
            const result = await model.generateContent(systemPrompt);
            const responseText = result.response.text();

            console.log("Raw Gemini Output:", responseText);

            try {
                // Verify it is somewhat valid JSON so the SDK doesn't crash on client side
                JSON.parse(responseText);
                return new Response(responseText, {
                    status: 200,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json"
                    }
                });
            } catch (jsonError) {
                // If invalid JSON, wrap it in a valid JSON object so we can inspect it safely
                return new Response(JSON.stringify({
                    error: "Gemini generated invalid JSON",
                    parseMessage: (jsonError as Error).message,
                    rawOutput: responseText
                }), {
                    status: 200,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json"
                    }
                });
            }
        } catch (e) {
            console.log("Gemini API error (Attempt " + attempts + "): " + JSON.stringify(e, Object.getOwnPropertyNames(e)));
            if (attempts >= 2) {
                return new Response(JSON.stringify({ error: "We are currently experiencing issues generating your media plan. Please try again in to a few moments." }), {
                    status: 503,
                    headers: { ...corsHeaders, "Content-Type": "application/json" }
                });
            }
        }
    }
}
