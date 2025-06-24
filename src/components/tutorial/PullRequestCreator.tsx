@@ .. @@
 import Button from '../ui/Button';
 import Badge from '../ui/Badge';
 
+interface PullRequestCreatorProps {
+  onComplete?: () => void;
+}
+
 interface PullRequestCreatorProps {
   onSubmit?: (pr: any) => void;
+  onComplete?: () => void;
 }
 
-export const PullRequestCreator: React.FC<PullRequestCreatorProps> = ({
-  onSubmit
+const PullRequestCreator: React.FC<PullRequestCreatorProps> = ({
+  onSubmit,
+  onComplete
 }) => {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
@@ .. @@
     ];
   };
 
+  const handlePullRequestCreated = () => {
+    // Simulates that the PR was created successfully
+    if (title.trim() && sourceBranch && targetBranch) {
+      // Handle the form submission
+      handleSubmit();
+      
+      // Show success message
+      setTimeout(() => {
+        if (onComplete) {
+          onComplete();
+        }
+      }, 1500);
+    }
+  };
+
   const tabs = [
@@ .. @@
           </div>
 
           <div className="flex justify-end space-x-3">
-            <Button variant="secondary">Sauvegarder</Button>
-            <Button onClick={handleSubmit} disabled={!title.trim()}>
+            <Button 
+              variant="secondary" 
+              onClick={() => setTitle(title || "Ajouter système d'authentification utilisateur")}
+            >
+              Pré-remplir
+            </Button>
+            <Button onClick={handlePullRequestCreated} disabled={!title.trim()}>
               <GitPullRequest className="h-4 w-4 mr-2" />
               Créer la Pull Request
             </Button>
@@ .. @@
         </div>
       )
     }
-  ];
+  ],
+    {
+      id: 'success',
+      label: 'Résultat',
+      icon: CheckCircle,
+      content: (
+        <div className="space-y-6">
+          <div className="text-center">
+            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
+            <h3 className="text-xl font-bold text-white">Pull Request créée avec succès !</h3>
+            <p className="text-gray-300 mt-2 mb-6">
+              Votre Pull Request a été créée et attend maintenant d'être revue par l'équipe.
+            </p>
+            <Button onClick={onComplete} size="lg">
+              Continuer le tutoriel
+            </Button>
+          </div>
+        </div>
+      )
+    }
+  ];
 
   return (
@@ .. @@