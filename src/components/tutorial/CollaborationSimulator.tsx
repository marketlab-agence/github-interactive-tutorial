@@ .. @@
 import Button from '../ui/Button';
 import Card from '../ui/Card';
 
-const CollaborationSimulator: React.FC = () => {
+interface CollaborationSimulatorProps {
+  onComplete?: () => void;
+}
+
+const CollaborationSimulator: React.FC<CollaborationSimulatorProps> = ({ onComplete }) => {
   const [selectedPR, setSelectedPR] = useState<PullRequest | null>(pullRequests[0]);
+  const [simulationComplete, setSimulationComplete] = useState(false);
 
@@ .. @@
     setSelectedPR(prev => prev ? { ...prev, status: 'merged' as const } : null);
   };
 
+  // Function to complete the simulation and advance the tutorial
+  const handleComplete = () => {
+    setSimulationComplete(true);
+    if (onComplete) {
+      setTimeout(() => onComplete(), 1000);
+    }
+  };
+
@@ .. @@
           </div>
         </Card>
       </div>
+      
+      {/* Completion Button */}
+      <Card>
+        <div className="text-center space-y-4">
+          <h3 className="text-xl font-semibold text-white">Comprendre la collaboration</h3>
+          <p className="text-gray-300 mb-4">
+            Maintenant que vous avez exploré le simulateur de collaboration, essayez d'approuver une Pull Request
+            puis de la fusionner pour comprendre le flux de travail collaboratif complet.
+          </p>
+          <Button onClick={handleComplete} size="lg" disabled={simulationComplete}>
+            {simulationComplete ? 'Progression enregistrée...' : 'Terminer cette section'}
+          </Button>
+        </div>
+      </Card>
     </div>
   );
 };