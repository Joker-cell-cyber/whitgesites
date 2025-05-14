'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';
import ChatInterface from '@/app/components/coach/chat-interface';
import { Message, UserProfile } from '@/app/lib/types/coach';
import { sendMessageToCoach, createConversation, generateWelcomeMessage } from '@/app/lib/coach-service';
import { generateUUID } from '@/app/lib/utils';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';

export default function CoachPage() {
  const { user } = useAuth();
  const { stats, refreshStats } = useStats();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileForm, setShowProfileForm] = useState(true);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'homme',
    height: '',
    weight: '',
    activityLevel: 'modérément actif',
    fitnessGoals: '',
    dietaryPreferences: '',
    medicalConditions: '',
    fitnessLevel: 'intermédiaire',
    workoutFrequency: '',
    workoutDuration: '',
    previousExperience: ''
  });
  
  // Chargement initial du message de bienvenue si le profil existe déjà
  useEffect(() => {
    // Vérifier si un profil existe déjà (simulation - dans un cas réel, on vérifierait dans la base de données)
    const hasExistingProfile = false;
    
    if (hasExistingProfile) {
      initializeChat();
      setShowProfileForm(false);
    }
  }, [user?.memberId]);
  
  const initializeChat = async () => {
    try {
      setIsLoading(true);
      const welcomeMessage = await generateWelcomeMessage();
      
      // Message du système pour instruire l'IA à être un coach scientifique
      const systemMessage: Message = {
        id: generateUUID(),
        role: 'system',
        content: `Tu es un coach sportif et nutritionniste professionnel nommé NeuraCoach. 
        Baser toutes tes réponses sur la science et des études récentes.
        Inclure des références à des études scientifiques quand c'est pertinent.
        Tu as une expertise en anatomie et en physiologie.
        Adapter tes conseils au profil de l'utilisateur: ${JSON.stringify(userProfile)}.
        Poser des questions pour obtenir plus de contexte si nécessaire.
        Toujours donner des conseils pratiques et applicables.`,
        timestamp: new Date().toISOString()
      };
      
      setMessages([systemMessage, welcomeMessage]);
      setIsLoading(false);
    } catch (err) {
      console.error("Erreur lors de l'initialisation du chat:", err);
      setError("Impossible de charger le coach IA. Veuillez réessayer.");
      setIsLoading(false);
    }
  };
  
  // Fonction pour envoyer un message au coach
  const handleSendMessage = async (message: string) => {
    if (!user || !user.memberId) {
      setError("Vous devez être connecté pour utiliser le coach IA.");
      return;
    }
    
    if (stats?.tokensRemaining && stats.tokensRemaining < 1) {
      setError("Solde de tokens insuffisant. Veuillez acheter plus de tokens pour continuer.");
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Créer un message temporaire de l'utilisateur
      const userMessage: Message = {
        id: generateUUID(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };
      
      // Ajouter le message de l'utilisateur à l'interface
      setMessages(prev => [...prev, userMessage]);

      // Préparer le contexte pour l'API OpenAI
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Ajouter le nouveau message de l'utilisateur
      conversationHistory.push({
        role: 'user',
        content: message
      });
      
      // Appel à l'API OpenAI via notre service
      const response = await fetch('/api/coach/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: conversationHistory,
          userProfile: userProfile
        })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la communication avec le coach IA');
      }
      
      const data = await response.json();
      
      // Créer le message de réponse de l'assistant
      const assistantMessage: Message = {
        id: generateUUID(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString()
      };
      
      // Ajouter la réponse à l'interface
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      // Rafraîchir les statistiques pour voir le solde de tokens mis à jour
      refreshStats();
      
    } catch (err) {
      console.error("Erreur lors de l'envoi du message:", err);
      setError("Impossible d'envoyer le message. Veuillez réessayer.");
      setIsLoading(false);
    }
  };
  
  // Gérer la soumission du formulaire de profil
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer le profil utilisateur
    const newProfile: UserProfile = {
      userId: user?.memberId || 'guest',
      age: parseInt(formData.age) || undefined,
      gender: formData.gender as 'homme' | 'femme' | 'autre',
      height: parseInt(formData.height) || undefined,
      weight: parseInt(formData.weight) || undefined,
      activityLevel: formData.activityLevel as any,
      fitnessGoals: formData.fitnessGoals.split(',').map(goal => goal.trim()),
      dietaryPreferences: formData.dietaryPreferences.split(',').map(pref => pref.trim()),
      medicalConditions: formData.medicalConditions ? formData.medicalConditions.split(',').map(cond => cond.trim()) : [],
      fitnessLevel: formData.fitnessLevel as 'débutant' | 'intermédiaire' | 'avancé',
      workoutFrequency: parseInt(formData.workoutFrequency) || undefined,
      workoutDuration: parseInt(formData.workoutDuration) || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setUserProfile(newProfile);
    setShowProfileForm(false);
    initializeChat();
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (showProfileForm) {
    return (
      <div className="container mx-auto py-6 max-w-3xl">
        <h1 className="text-2xl font-bold text-white mb-6">Configurez votre Coach Personnalisé</h1>
        <p className="text-gray-300 mb-6">
          Pour vous offrir les conseils les plus adaptés, nous avons besoin de quelques informations sur votre profil et vos objectifs fitness.
        </p>
        
        <div className="bg-gray-800 border border-purple-500/20 rounded-lg p-6">
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Âge</label>
                <Input 
                  type="number" 
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Ex: 30"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Genre</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2"
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Taille (cm)</label>
                <Input 
                  type="number" 
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="Ex: 180"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Poids (kg)</label>
                <Input 
                  type="number" 
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Ex: 75"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Niveau d'activité</label>
                <select 
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2"
                >
                  <option value="sédentaire">Sédentaire (peu ou pas d'exercice)</option>
                  <option value="légèrement actif">Légèrement actif (1-3 jours/semaine)</option>
                  <option value="modérément actif">Modérément actif (3-5 jours/semaine)</option>
                  <option value="très actif">Très actif (6-7 jours/semaine)</option>
                  <option value="extrêmement actif">Extrêmement actif (athlète, 2x/jour)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Niveau de fitness</label>
                <select 
                  name="fitnessLevel"
                  value={formData.fitnessLevel}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2"
                >
                  <option value="débutant">Débutant (0-1 an d'entraînement)</option>
                  <option value="intermédiaire">Intermédiaire (1-3 ans d'entraînement)</option>
                  <option value="avancé">Avancé (3+ ans d'entraînement)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Fréquence d'entraînement (jours/semaine)</label>
                <Input 
                  type="number" 
                  min="0"
                  max="7"
                  name="workoutFrequency"
                  value={formData.workoutFrequency}
                  onChange={handleInputChange}
                  placeholder="Ex: 4"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Durée d'entraînement (minutes)</label>
                <Input 
                  type="number" 
                  name="workoutDuration"
                  value={formData.workoutDuration}
                  onChange={handleInputChange}
                  placeholder="Ex: 60"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Objectifs fitness (séparés par des virgules)</label>
              <Input 
                type="text" 
                name="fitnessGoals"
                value={formData.fitnessGoals}
                onChange={handleInputChange}
                placeholder="Ex: prise de masse, force, perte de gras"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Préférences alimentaires (séparées par des virgules)</label>
              <Input 
                type="text" 
                name="dietaryPreferences"
                value={formData.dietaryPreferences}
                onChange={handleInputChange}
                placeholder="Ex: végétarien, sans gluten, riche en protéines"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Conditions médicales (séparées par des virgules, optionnel)</label>
              <Input 
                type="text" 
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                placeholder="Ex: douleurs lombaires, hypertension"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Expérience précédente/Ce que vous avez déjà essayé</label>
              <Textarea 
                name="previousExperience"
                value={formData.previousExperience}
                onChange={handleInputChange}
                placeholder="Décrivez brièvement les programmes ou approches que vous avez déjà essayés..."
                className="bg-gray-700 border-gray-600 text-white h-24"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium"
            >
              Créer mon coach personnalisé
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] container mx-auto py-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Chat avec votre Coach Personnalisé</h1>
        <Button
          onClick={() => setShowProfileForm(true)}
          variant="outline"
          className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
        >
          Modifier mon profil
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <div className="flex-grow relative rounded-lg">
        <ChatInterface
          initialMessages={messages.filter(m => m.role !== 'system')}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Tokens restants : {stats?.tokensRemaining || 0} | Coût par message : ~1 token</p>
      </div>
    </div>
  );
} 