
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useExercises } from "@/hooks/useExercises";
import type { Exercise } from "@/types/workout";

interface ExerciseFormData {
  name: string;
  category: string;
  difficulty: string;
  equipment: string;
}

interface AddExerciseDialogProps {
  onAddExercise: (exercise: Exercise) => void;
}

const AddExerciseDialog = ({ onAddExercise }: AddExerciseDialogProps) => {
  const { addExercise } = useExercises();
  const [formData, setFormData] = useState<ExerciseFormData>({
    name: "",
    category: "",
    difficulty: "",
    equipment: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    
    if (!formData.name || !formData.category || !formData.difficulty || !formData.equipment) {
      toast.error("Please fill in all fields");
      return;
    }
    
    addExercise.mutate(formData, {
      onSuccess: (newExercise) => {
        onAddExercise(newExercise);
        setFormData({ name: "", category: "", difficulty: "", equipment: "" });
        setIsOpen(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Exercise</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Exercise Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Push-ups"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Chest">Chest</SelectItem>
                <SelectItem value="Back">Back</SelectItem>
                <SelectItem value="Legs">Legs</SelectItem>
                <SelectItem value="Arms">Arms</SelectItem>
                <SelectItem value="Core">Core</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty</label>
            <Select
              value={formData.difficulty}
              onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Equipment</label>
            <Select
              value={formData.equipment}
              onValueChange={(value) => setFormData({ ...formData, equipment: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select equipment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Body Weight">Body Weight</SelectItem>
                <SelectItem value="Dumbbell">Dumbbell</SelectItem>
                <SelectItem value="Barbell">Barbell</SelectItem>
                <SelectItem value="Machine">Machine</SelectItem>
                <SelectItem value="Resistance Band">Resistance Band</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">Add Exercise</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseDialog;
