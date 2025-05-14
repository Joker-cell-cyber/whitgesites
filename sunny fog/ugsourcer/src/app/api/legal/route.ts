import { NextRequest, NextResponse } from 'next/server';
import { termsContent } from '../../legal/terms/terms-content';
import { privacyContent } from '../../legal/privacy/privacy-content';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!type || (type !== 'terms' && type !== 'privacy')) {
    return NextResponse.json(
      { error: 'Invalid content type requested' }, 
      { status: 400 }
    );
  }

  return NextResponse.json({
    content: type === 'terms' ? termsContent : privacyContent
  });
} 