import { NextRequest, NextResponse } from 'next/server';
import { termsContent } from '../../legal/terms/terms-content';
import { privacyContent } from '../../legal/privacy/privacy-content';
import { cookiesContent } from '../../legal/cookies/cookies-content';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!type || (type !== 'terms' && type !== 'privacy' && type !== 'cookies')) {
    return NextResponse.json(
      { error: 'Invalid content type requested' }, 
      { status: 400 }
    );
  }

  const contentMap = {
    terms: termsContent,
    privacy: privacyContent,
    cookies: cookiesContent
  };

  return NextResponse.json({
    content: contentMap[type as keyof typeof contentMap]
  });
} 