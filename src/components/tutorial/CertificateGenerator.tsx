import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Share, Check, Clipboard, User, Calendar, Gift } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useTutorial } from '../../context/TutorialContext';
import { chapters } from '../../data/tutorialData';

const CertificateGenerator: React.FC = () => {
  const { userProgress } = useTutorial();
  const [userName, setUserName] = useState('');
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isNameCopied, setIsNameCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  
  const currentDate = new Date().toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const completedChapters = userProgress.completedChapters.length;
  const totalChapters = chapters.length;
  const isCompleted = completedChapters === totalChapters;

  const handleGenerateCertificate = () => {
    // Simuler la génération d'un certificat
    if (userName.trim() === '') {
      setIsNameEditing(true);
      return;
    }

    // Simuler l'URL de partage
    setShareUrl(`https://exemple.com/certificat/${encodeURIComponent(userName)}`);
  };

  const copyShareUrl = () => {
    if (navigator.clipboard && shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setIsNameCopied(true);
      setTimeout(() => setIsNameCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Certificat d'Achèvement</h2>
        <p className="text-gray-300">
          {isCompleted 
            ? 'Félicitations pour avoir terminé le tutoriel Git & GitHub !' 
            : `Terminez les ${totalChapters - completedChapters} chapitres restants pour obtenir votre certificat.`}
        </p>
      </motion.div>

      {/* Progression */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Progression du Tutoriel</h3>
          
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-300">Chapitres complétés</span>
            <span className="text-gray-300">{completedChapters} / {totalChapters}</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedChapters / totalChapters) * 100}%` }}
              transition={{ duration: 1 }}
              className={`${isCompleted ? 'bg-green-500' : 'bg-blue-500'} h-2.5 rounded-full`}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {chapters.map((chapter, index) => (
              <div 
                key={chapter.id}
                className={`text-center p-2 rounded ${
                  userProgress.completedChapters.includes(chapter.id) 
                    ? 'bg-green-900/20 border border-green-500/30' 
                    : 'bg-gray-800/50 border border-gray-700'
                }`}
              >
                <div className={`text-sm font-medium ${
                  userProgress.completedChapters.includes(chapter.id) 
                    ? 'text-green-400' 
                    : 'text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {chapter.title.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Certificat */}
      <div className={`${!isCompleted ? 'opacity-60' : ''}`}>
        <Card>
          <div 
            className="relative border-8 border-double border-yellow-600/30 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg"
            style={{ 
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%234b5563' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
              backgroundSize: '100px 100px'
            }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-yellow-400 mb-1">Certificat d'Excellence</h3>
              <div className="text-gray-300 text-sm">Tutoriel Git & GitHub Interactif</div>
            </div>
            
            {/* Seal */}
            <div className="absolute top-6 right-6">
              <div className="w-20 h-20 rounded-full bg-yellow-600/20 border-4 border-yellow-600/30 flex items-center justify-center">
                <GitBranch className="h-10 w-10 text-yellow-500" />
              </div>
            </div>
            
            {/* Content */}
            <div className="text-center space-y-6 py-8 px-4">
              <div className="text-lg text-gray-300">Ce certificat est décerné à</div>
              
              <div className="relative">
                {isNameEditing ? (
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Entrez votre nom"
                    className="bg-transparent border-b-2 border-yellow-500/50 text-white text-2xl font-bold text-center w-full focus:outline-none focus:border-yellow-400"
                    autoFocus
                    onBlur={() => setIsNameEditing(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsNameEditing(false);
                      }
                    }}
                  />
                ) : (
                  <div 
                    className="border-b-2 border-yellow-500/50 text-2xl font-bold text-white min-h-[40px] flex items-center justify-center"
                    onClick={() => setIsNameEditing(true)}
                  >
                    {userName || (
                      <span className="text-gray-500 text-lg italic">Cliquez pour ajouter votre nom</span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="text-center max-w-xl mx-auto">
                <p className="text-gray-300">
                  Pour avoir complété avec succès le cours Git & GitHub et démontré une
                  compréhension approfondie des systèmes de contrôle de version et des
                  bonnes pratiques de collaboration.
                </p>
              </div>
              
              <div className="flex justify-around pt-8">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Date</div>
                  <div className="text-gray-300 font-medium">{currentDate}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Signature</div>
                  <div className="text-gray-300 font-medium italic">GitMaster</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          size="lg"
          disabled={!isCompleted || !userName.trim()}
          onClick={handleGenerateCertificate}
        >
          <Award className="h-5 w-5 mr-2" />
          Générer mon Certificat
        </Button>
        
        {shareUrl && (
          <Button 
            size="lg" 
            variant="secondary"
            onClick={copyShareUrl}
          >
            {isNameCopied ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Copié !
              </>
            ) : (
              <>
                <Clipboard className="h-5 w-5 mr-2" />
                Copier le lien
              </>
            )}
          </Button>
        )}
        
        {shareUrl && (
          <Button 
            size="lg" 
            variant="outline"
          >
            <Download className="h-5 w-5 mr-2" />
            Télécharger PDF
          </Button>
        )}
      </div>

      {/* Skills Section */}
      {isCompleted && (
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Compétences Validées</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Fondamentaux de Git</h4>
                    <p className="text-sm text-gray-300">
                      Commits, branches, merges, et gestion des conflits.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Collaboration GitHub</h4>
                    <p className="text-sm text-gray-300">
                      Pull requests, code reviews et gestion de projets.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Workflows Git</h4>
                    <p className="text-sm text-gray-300">
                      Gitflow, GitHub Flow et stratégies de branche.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">CI/CD avec GitHub Actions</h4>
                    <p className="text-sm text-gray-300">
                      Automatisation des tests et des déploiements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {/* Next Steps */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Prochaines Étapes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <GitBranch className="h-10 w-10 text-blue-400 mb-3" />
                <h4 className="font-medium text-white mb-2">Créez votre Portfolio</h4>
                <p className="text-sm text-gray-300">
                  Appliquez vos compétences Git en créant un site portfolio sur GitHub Pages.
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <Users className="h-10 w-10 text-green-400 mb-3" />
                <h4 className="font-medium text-white mb-2">Contribuez à l'Open Source</h4>
                <p className="text-sm text-gray-300">
                  Trouvez un projet qui vous intéresse et faites votre première contribution.
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <Share className="h-10 w-10 text-purple-400 mb-3" />
                <h4 className="font-medium text-white mb-2">Partagez vos Connaissances</h4>
                <p className="text-sm text-gray-300">
                  Transmettez ce que vous avez appris à d'autres développeurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CertificateGenerator;