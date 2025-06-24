@@ .. @@
 import Button from '../ui/Button';
 import Alert from '../ui/Alert';
 
+interface ConflictResolverProps {
+  onComplete?: () => void;
+}
+
 interface ConflictFile {
   path: string;
   content: string;
@@ .. @@
   showDiff?: boolean;
 }
 
-const ConflictResolver: React.FC = () => {
+const ConflictResolver: React.FC<ConflictResolverProps> = ({ onComplete }) => {
   const [conflicts, setConflicts] = useState<ConflictFile[]>([
     {
       filename: 'src/components/Header.tsx',
@@ .. @@
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
-            className="text-center"
+            className="text-center space-y-4"
           >
             <Card>
               <div className="space-y-4">
@@ .. @@
                 <Button size="lg" className="w-full sm:w-auto">
                   <GitMerge className="h-5 w-5 mr-2" />
                   Terminer la fusion
+                </Button>
+              </div>
+            </Card>
+            
+            <Card className="mt-4">
+              <div className="text-center space-y-4">
+                <h3 className="text-xl font-semibold text-green-400">Félicitations !</h3>
+                <p className="text-gray-300">
+                  Vous avez réussi à résoudre tous les conflits de fusion.
+                </p>
+                <Button onClick={onComplete}>
+                  Continuer le tutoriel
                 </Button>
               </div>
             </Card>
@@ .. @@