'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Dumbbell, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { generateWorkoutPlan } from '@/app/lib/client/workout-service';
import { Toaster, toast } from 'sonner';
import { WorkoutPlan } from '@/app/lib/types/coach';
import { useStats } from '@/app/context/stats-context';

export default function ProgramsPage() {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    fitnessLevel: '',
    duration: '',
    frequency: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    focusAreas: [] as string[],
    strengthLevels: {
      squat: '',
      bench: '',
      deadlift: ''
    },
    equipmentAccess: [] as string[],
    limitations: [] as string[],
    specificGoals: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedProgram, setGeneratedProgram] = useState<WorkoutPlan | null>(null);
  const [showGeneratedProgram, setShowGeneratedProgram] = useState(false);
  const { stats } = useStats();

  const handleGenerateProgramSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Conversion des champs numériques
      const workoutData = {
        type: formData.type,
        duration: parseInt(formData.duration) || 8,
        frequency: parseInt(formData.frequency) || 4,
        focusAreas: formData.focusAreas,
        fitnessLevel: formData.fitnessLevel || 'intermédiaire',
        limitations: formData.limitations,
        userProfile: {
          age: parseInt(formData.age) || undefined,
          gender: formData.gender || undefined,
          height: parseInt(formData.height) || undefined,
          weight: parseInt(formData.weight) || undefined,
          strengthLevels: {
            squat: parseInt(formData.strengthLevels.squat) || 0,
            bench: parseInt(formData.strengthLevels.bench) || 0,
            deadlift: parseInt(formData.strengthLevels.deadlift) || 0
          },
          equipmentAccess: formData.equipmentAccess,
          specificGoals: formData.specificGoals,
          bodyType: '',  // Optionnel
          trainingExperience: formData.fitnessLevel || 'intermédiaire'
        }
      };
      
      const generatedWorkout = await generateWorkoutPlan(
        workoutData.type,
        workoutData.duration,
        workoutData.frequency,
        workoutData.focusAreas,
        workoutData.fitnessLevel,
        workoutData.limitations
      );
      
      // Afficher un toast de succès
      toast.success('Programme d\'entraînement généré avec succès !');
      
      // Fermer le formulaire et afficher le programme généré
      setShowCustomForm(false);
      setGeneratedProgram(generatedWorkout);
      setShowGeneratedProgram(true);
      
    } catch (error) {
      console.error('Erreur lors de la génération du programme:', error);
      toast.error('Erreur lors de la génération du programme. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    if (type === 'checkbox') {
      const newValue = checked 
        ? [...(formData[name as keyof typeof formData] as string[]), value] 
        : (formData[name as keyof typeof formData] as string[]).filter((v: string) => v !== value);
      setFormData({ ...formData, [name]: newValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMuscleGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newValue = checked 
      ? [...formData.focusAreas, value] 
      : formData.focusAreas.filter((v: string) => v !== value);
    setFormData({ ...formData, focusAreas: newValue });
  };

  const handleStrengthLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = { ...formData.strengthLevels, [name]: value };
    setFormData({ ...formData, strengthLevels: newValue });
  };

  const handleEquipmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newValue = checked 
      ? [...formData.equipmentAccess, value] 
      : formData.equipmentAccess.filter((v: string) => v !== value);
    setFormData({ ...formData, equipmentAccess: newValue });
  };

  const handleLimitationsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newValue = value.split(',').map((limitation: string) => limitation.trim()).filter(Boolean);
    setFormData({ ...formData, limitations: newValue });
  };

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />
      {/* En-tête */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Dumbbell className="h-8 w-8 text-purple-500" />
          <span>Programmes d'entraînement</span>
        </h1>
        <p className="text-gray-400">
          Utilisez notre IA pour créer un programme d'entraînement personnalisé adapté à vos objectifs.
        </p>
      </div>

      {/* Bouton pour créer un programme personnalisé */}
      {!showCustomForm && !showGeneratedProgram && (
        <div className="bg-gradient-to-r from-purple-900/40 to-purple-600/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Programme personnalisé avec l'IA</h2>
              <p className="text-gray-300 max-w-2xl">
                Obtenez un programme d'entraînement entièrement personnalisé, créé par notre IA spécialisée en coaching sportif de haut niveau. 
                Notre système est conçu pour simuler l'expertise d'un coach olympique de bodybuilding.
              </p>
              <p className="text-sm text-purple-300">
                <span className="font-semibold">Coût :</span> 3 tokens par génération. Tokens disponibles : {stats?.tokensRemaining || 0}
              </p>
            </div>
            <button
              onClick={() => setShowCustomForm(true)}
              className="flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              Créer mon programme <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Formulaire avancé pour création de programme personnalisé */}
      {showCustomForm && (
        <div className="bg-black/50 border border-purple-500/20 rounded-xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">Créez votre programme sur mesure</h2>
              <p className="text-sm text-purple-300 mt-1">
                Coût : 3 tokens par génération. Tokens disponibles : {stats?.tokensRemaining || 0}
              </p>
            </div>
            <button 
              onClick={() => setShowCustomForm(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleGenerateProgramSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type d'entraînement */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Type d'entraînement</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                  required
                >
                  <option value="">Sélectionner un type</option>
                  <option value="hypertrophie">Hypertrophie (prise de masse)</option>
                  <option value="force">Force</option>
                  <option value="endurance">Endurance musculaire</option>
                  <option value="perte_de_poids">Perte de poids</option>
                  <option value="bodybuilding">Bodybuilding professionnel</option>
                  <option value="powerlifting">Powerlifting</option>
                  <option value="fonctionnel">Entraînement fonctionnel</option>
                </select>
              </div>
              
              {/* Niveau */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Niveau</label>
                <select 
                  name="fitnessLevel"
                  value={formData.fitnessLevel}
                  onChange={handleFormChange}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                  required
                >
                  <option value="">Sélectionner un niveau</option>
                  <option value="débutant">Débutant (0-1 an)</option>
                  <option value="intermédiaire">Intermédiaire (1-3 ans)</option>
                  <option value="avancé">Avancé (3-5 ans)</option>
                  <option value="expert">Expert (5+ ans)</option>
                  <option value="professionnel">Niveau professionnel</option>
                </select>
              </div>
              
              {/* Durée */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Durée du programme (semaines)</label>
                <input 
                  type="number" 
                  min="1"
                  max="52"
                  name="duration"
                  value={formData.duration}
                  onChange={handleFormChange}
                  placeholder="Ex: 12"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                  required
                />
              </div>
              
              {/* Fréquence */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Fréquence (jours par semaine)</label>
                <input 
                  type="number" 
                  min="1"
                  max="7"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleFormChange}
                  placeholder="Ex: 4"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                  required
                />
              </div>
              
              {/* Âge */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Âge</label>
                <input 
                  type="number" 
                  min="16"
                  max="80"
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  placeholder="Ex: 30"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                />
              </div>
              
              {/* Sexe */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Sexe</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                >
                  <option value="">Sélectionner</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              {/* Taille */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Taille (cm)</label>
                <input 
                  type="number" 
                  min="100"
                  max="250"
                  name="height"
                  value={formData.height}
                  onChange={handleFormChange}
                  placeholder="Ex: 175"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                />
              </div>
              
              {/* Poids */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Poids (kg)</label>
                <input 
                  type="number" 
                  min="30"
                  max="250"
                  name="weight"
                  value={formData.weight}
                  onChange={handleFormChange}
                  placeholder="Ex: 75"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                />
              </div>
            </div>
            
            {/* Groupes musculaires à cibler */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Groupes musculaires à cibler (sélection multiple)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {['Quadriceps', 'Ischio-jambiers', 'Fessiers', 'Mollets', 'Pectoraux', 'Dorsaux', 'Épaules', 'Biceps', 'Triceps', 'Abdominaux', 'Avant-bras', 'Trapèzes'].map((muscle) => (
                  <label key={muscle} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="focusAreas"
                      value={muscle.toLowerCase()}
                      checked={formData.focusAreas.includes(muscle.toLowerCase())}
                      onChange={handleMuscleGroupChange}
                      className="rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-300 text-sm">{muscle}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Performances actuelles */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-200">Performances actuelles (en kg)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Squat</label>
                  <input 
                    type="number" 
                    name="squat"
                    value={formData.strengthLevels?.squat || ''}
                    onChange={handleStrengthLevelChange}
                    placeholder="Ex: 100"
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Développé couché</label>
                  <input 
                    type="number" 
                    name="bench"
                    value={formData.strengthLevels?.bench || ''}
                    onChange={handleStrengthLevelChange}
                    placeholder="Ex: 80"
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Soulevé de terre</label>
                  <input 
                    type="number" 
                    name="deadlift"
                    value={formData.strengthLevels?.deadlift || ''}
                    onChange={handleStrengthLevelChange}
                    placeholder="Ex: 120"
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                  />
                </div>
              </div>
            </div>
            
            {/* Equipement disponible */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Equipement disponible</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Salle complète', 'Haltères', 'Barres', 'Machines', 'Kettlebells', 'TRX/Sangles', 'Bandes élastiques', 'Poids de corps uniquement'].map((equipment) => (
                  <label key={equipment} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="equipmentAccess"
                      value={equipment.toLowerCase()}
                      checked={formData.equipmentAccess.includes(equipment.toLowerCase())}
                      onChange={handleEquipmentChange}
                      className="rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-300 text-sm">{equipment}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Limitations ou blessures */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Limitations ou blessures (optionnel)</label>
              <input
                type="text"
                name="limitations"
                value={formData.limitations.join(', ')}
                onChange={handleLimitationsChange}
                placeholder="Ex: Douleur lombaire, problème d'épaule"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
              />
            </div>
            
            {/* Objectifs spécifiques */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Objectifs spécifiques</label>
              <textarea
                name="specificGoals"
                value={formData.specificGoals}
                onChange={handleFormChange}
                placeholder="Ex: Je souhaite développer principalement mes épaules et mes bras. Je me prépare pour une compétition dans 6 mois."
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Génération en cours...' : 'Générer mon programme'}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Afficher le programme généré */}
      {showGeneratedProgram && generatedProgram && (
        <div className="bg-black/50 border border-purple-500/20 rounded-xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{generatedProgram.title}</h2>
            <button 
              onClick={() => setShowGeneratedProgram(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-500/80 rounded-full text-xs font-medium text-white">
                {generatedProgram.type}
              </span>
              <span className="px-3 py-1 bg-blue-500/80 rounded-full text-xs font-medium text-white">
                {generatedProgram.duration} semaines
              </span>
              <span className="px-3 py-1 bg-green-500/80 rounded-full text-xs font-medium text-white">
                {generatedProgram.frequency} séances/semaine
              </span>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm bg-gray-800/50 p-4 rounded-lg">
                {generatedProgram.description}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 