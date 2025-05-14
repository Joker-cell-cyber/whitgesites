import { privacyContent } from "@/app/legal/privacy/privacy-content";
import { termsContent } from "@/app/legal/terms/terms-content";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Get the type parameter from the URL
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  // Check if type is valid
  if (type !== "terms" && type !== "privacy") {
    return NextResponse.json(
      { error: "Invalid legal content type. Use 'terms' or 'privacy'." },
      { status: 400 }
    );
  }

  // Return the appropriate content
  return NextResponse.json({
    content: type === "terms" ? termsContent : privacyContent,
  });
} 