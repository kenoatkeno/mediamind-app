export interface CampaignBrief {
    business_name: string;
    industry: string;
    product_description: string;
    campaign_objective: 'brand_awareness' | 'performance';
    audience_age_ranges: string[];
    audience_gender: 'male' | 'female' | 'all';
    location: string;
    budget_gbp: number;
    start_date: string;
    end_date: string;
    kpis: string[];
    excluded_channels: string[];
    preferred_channels: string[];
}
