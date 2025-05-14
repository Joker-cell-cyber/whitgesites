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

  let content;
  if (type === 'terms') {
    content = termsContent;
  } else if (type === 'privacy') {
    content = privacyContent;
  } else {
    content = cookiesContent;
  }

  return NextResponse.json({ content });
} 