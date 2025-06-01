import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { allFormValues } = body;

        // Set campaign ID to 213 for superorganized from super_organized___213.csv
        const CAMPAIGN_ID = "213";
        
        // Log the environment variables (masked for security)
        console.log("Environment variables:", {
            loginId: process.env.CHECKOUTCHAMP_LOGIN_ID ? "✓ Set" : "✗ Not set",
            password: process.env.CHECKOUTCHAMP_PASSWORD ? "✓ Set" : "✗ Not set",
            campaignId: CAMPAIGN_ID
        });
        
        // Log product details being sent
        console.log("Product ID:", allFormValues.product1_id);

        const bodyParams = new URLSearchParams({
            ...allFormValues,
            loginId: process.env.CHECKOUTCHAMP_LOGIN_ID || "",
            password: process.env.CHECKOUTCHAMP_PASSWORD || "",
            campaignId: CAMPAIGN_ID // Hardcoded campaign ID for superorganized
        }).toString();

        console.log("Sending request to CheckoutChamp API...");
        
        const response = await axios.post(
            'https://api.checkoutchamp.com/order/import/',
            bodyParams,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        console.log("Response from CheckoutChamp API:", response.data);
        
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('API error:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Something went wrong', details: errorMessage }, { status: 500 });
    }
} 