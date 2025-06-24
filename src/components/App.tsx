@@ .. @@
   // Si on est en mode admin et pas encore connecté
   if (isAdminMode && !isAdminLoggedIn) {
     return <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />;
   }
 
   // Si on est en mode admin et connecté
   if (isAdminMode && isAdminLoggedIn) {
     return <AdminDashboard />;
   }
 
   // Vérifier si l'URL contient /admin pour activer le mode admin
   React.useEffect(() => {
     if (window.location.pathname.includes('/admin')) {
       setIsAdminMode(true);
     }
   }, []);
 
   const renderMainContent = () => {
     if (selectedItem === 'tutorial') {
-      return <TutorialContent onReturnToHome={() => setSelectedItem('accueil')} />;
+      // Forcer l'affichage du composant TutorialContent même si on vient de cliquer sur tutorial
+      // Cela permettra d'afficher le contenu de cours en fonction de userProgress.lastPosition
+      return <TutorialContent key={Date.now()} onReturnToHome={() => setSelectedItem('accueil')} />;
     }
     
@@ .. @@
                     if (!isChapterUnlocked(itemId)) {
                       // Chapitre verrouillé, ne pas changer de vue
                       return;
                     }
-                    setSelectedItem(itemId);
+                    // Rediriger directement vers le contenu du tutoriel avec le chapitre sélectionné
+                    setSelectedItem('tutorial');
                     setLastPosition({
                       view: 'chapter-intro',
                       chapterId: itemId
                     });
                   }
                 }}