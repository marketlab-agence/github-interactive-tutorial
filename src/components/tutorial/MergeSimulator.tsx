@@ .. @@
 import Button from '../ui/Button';
 import Alert from '../ui/Alert';
 
+interface MergeSimulatorProps {
+  onComplete?: () => void;
+}
+
 interface MergeScenario {
   id: string;
   name: string;
@@ .. @@
   };
 }
 
-const MergeSimulator: React.FC = () => {
+const MergeSimulator: React.FC<MergeSimulatorProps> = ({ onComplete }) => {
   const [currentStep, setCurrentStep] = useState(0);
   const [selectedScenario, setSelectedScenario] = useState<MergeScenario>(scenarios[0]);
   const [mergeStep, setMergeStep] = useState<'select' | 'preview' | 'conflicts' | 'complete'>('select');
   const [resolvedConflicts, setResolvedConflicts] = useState<string[]>([]);
+  const [scenarioCompleted, setScenarioCompleted] = useState(false);
 
   const startMerge = (scenario: MergeScenario) => {
     setSelectedScenario(scenario);
@@ .. @@
+    setScenarioCompleted(true);
   };
 
   const resetSimulator = () => {
@@ .. @@
+      {scenarioCompleted && (
+        <Card className="mt-6">
+          <div className="text-center space-y-4">
+            <h3 className="text-xl font-semibold text-green-400">Exercice réussi !</h3>
+            <p className="text-gray-300">
+              Vous avez correctement simulé et complété un scénario de fusion Git.
+            </p>
+            <div className="flex justify-center space-x-4">
+              <Button variant="secondary" onClick={resetSimulator}>
+                Essayer un autre scénario
+              </Button>
+              <Button onClick={onComplete}>
+                Continuer le tutoriel
+              </Button>
+            </div>
+          </div>
+        </Card>
+      )}
     </div>
   );
 };