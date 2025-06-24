@@ .. @@
 import Button from '../ui/Button';
 import Card from '../ui/Card';
 
+interface BranchCreatorProps {
+  onComplete?: () => void;
+}
+
 interface Branch {
   name: string;
   commits: string[];
@@ .. @@
   active: boolean;
 }
 
-const BranchCreator: React.FC = () => {
+const BranchCreator: React.FC<BranchCreatorProps> = ({ onComplete }) => {
   const [branches, setBranches] = useState<Branch[]>([
     { name: 'main', commits: ['Initial commit', 'Add README'], color: 'blue', active: true }
   ]);
   const [newBranchName, setNewBranchName] = useState('');
   const [activeBranch, setActiveBranch] = useState('main');
+  const [taskCompleted, setTaskCompleted] = useState(false);
 
   const colors = ['blue', 'green', 'purple', 'orange', 'pink'];
@@ .. @@
+  // Check if task is completed - when user has created at least one branch and made a commit
+  useEffect(() => {
+    if (!taskCompleted && branches.length > 1) {
+      // Check if any branch other than main has commits
+      const hasBranchWithCommits = branches.some(branch => 
+        branch.name !== 'main' && branch.commits.length > 0
+      );
+      
+      if (hasBranchWithCommits) {
+        setTaskCompleted(true);
+      }
+    }
+  }, [branches, taskCompleted]);
+
@@ .. @@
+      
+      {taskCompleted && (
+        <Card className="mt-6">
+          <div className="text-center space-y-4">
+            <h3 className="text-xl font-semibold text-green-400">Bravo !</h3>
+            <p className="text-gray-300">
+              Vous avez réussi à créer une branche et à y ajouter des commits.
+            </p>
+            <Button onClick={onComplete}>
+              Continuer
+            </Button>
+          </div>
+        </Card>
+      )}
     </div>
   );
 };