import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Envoi du formulaire à web3forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'ea8fbdd7-da72-4110-8c71-21022247c62d', // Clé API Web3Forms de test (à remplacer en production)
        name,
        email,
        subject,
        message,
        from_name: 'Formulaire de contact du site'
      })
    });

    const responseData = await response.json();

    if (responseData.success) {
      return NextResponse.json(
        { success: true, message: 'Message envoyé avec succès' },
        { status: 200 }
      );
    } else {
      console.error('Erreur de web3forms:', responseData);
      return NextResponse.json(
        { success: false, message: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur lors du traitement de la demande:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 