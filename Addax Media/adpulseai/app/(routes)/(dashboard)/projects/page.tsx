'use client';

import { useState } from 'react';
import { Folder, Plus, MoreHorizontal, Users, Calendar, Trash2, Edit, Eye } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: 'Campagne Facebook Q2 2023', 
      description: 'Analyse des performances des publicités Facebook pour le deuxième trimestre 2023',
      createdAt: '12 avril 2023',
      members: 3,
      status: 'actif'
    },
    { 
      id: 2, 
      name: 'Étude comparative Google Ads', 
      description: 'Comparaison des performances entre différentes stratégies d\'enchères',
      createdAt: '5 mai 2023',
      members: 2,
      status: 'archivé'
    },
    { 
      id: 3, 
      name: 'Optimisation LinkedIn Q3', 
      description: 'Projet d\'optimisation des campagnes LinkedIn pour le recrutement',
      createdAt: '20 juin 2023',
      members: 4,
      status: 'actif'
    },
  ]);

  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const handleCreateProject = () => {
    if (newProject.name.trim() === '') return;
    
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects([...projects, {
      id: newId,
      name: newProject.name,
      description: newProject.description,
      createdAt: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      members: 1,
      status: 'actif'
    }]);
    
    setNewProject({ name: '', description: '' });
    setShowNewProjectModal(false);
  };

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projets</h1>
          <p className="text-gray-500 dark:text-gray-400">Gérez vos projets d'analyse publicitaire</p>
        </div>
        <button
          onClick={() => setShowNewProjectModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nouveau projet
        </button>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${
              project.status === 'archivé' ? 'opacity-70' : ''
            }`}
          >
            <div className="relative p-6">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setShowMenu(showMenu === project.id ? null : project.id)}
                  className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                
                {showMenu === project.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="py-1">
                      <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Eye className="w-4 h-4" />
                        Voir les détails
                      </button>
                      <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Edit className="w-4 h-4" />
                        Modifier
                      </button>
                      <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700">
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <Folder className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{project.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4 mr-1" />
                  {project.members} membre{project.members > 1 ? 's' : ''}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {project.createdAt}
                </div>
              </div>
              
              {project.status === 'archivé' && (
                <div className="absolute top-0 left-0 right-0 px-4 py-1 bg-gray-500 dark:bg-gray-700 text-white text-xs text-center">
                  Archivé
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowNewProjectModal(false)}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Créer un nouveau projet</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nom du projet
                    </label>
                    <input
                      type="text"
                      id="project-name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Entrez le nom du projet"
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="project-description"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Décrivez brièvement ce projet"
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setShowNewProjectModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
                    onClick={handleCreateProject}
                  >
                    Créer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 