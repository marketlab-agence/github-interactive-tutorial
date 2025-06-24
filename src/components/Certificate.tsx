import React from 'react';
import { Award, Download, Share } from 'lucide-react';

const Certificate: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Award className="h-16 w-16 text-purple-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Certificat de Complétion</h2>
        <p className="text-gray-300">Félicitations ! Vous avez terminé le tutoriel</p>
      </div>
      
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-500/30">
        <div className="text-center space-y-6">
          <Award className="h-20 w-20 text-yellow-400 mx-auto" />
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Certificat d'Excellence</h3>
            <p className="text-gray-300">Tutoriel Git & GitHub Interactif</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6">
            <p className="text-lg text-white mb-2">Décerné à</p>
            <p className="text-2xl font-bold text-purple-400 mb-4">Votre Nom</p>
            <p className="text-gray-300">
              Pour avoir complété avec succès le parcours d'apprentissage 
              Git & GitHub et démontré une maîtrise des concepts essentiels.
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Télécharger PDF</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Share className="h-5 w-5" />
              <span>Partager</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;