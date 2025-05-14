import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { firstName, lastName, email } = body;

    // Validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { success: false, message: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Email validation using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // TODO: Implement actual unsubscribe logic here
    // This might involve:
    // 1. Connecting to your user database
    // 2. Finding the user's subscription
    // 3. Cancelling the subscription with your payment provider
    // 4. Sending a confirmation email
    // 5. Updating the user's status in your database

    // For now, we're just logging and returning a successful response
    console.log('Unsubscribe request received for:', { firstName, lastName, email });

    // Simulate a slight delay as if processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Demande de désabonnement traitée avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing unsubscribe request:', error);
    
    return NextResponse.json(
      { success: false, message: 'Une erreur est survenue lors du traitement de votre demande' },
      { status: 500 }
    );
  }
} 