
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ExerciseCard from "@/components/ExerciseCard";
import AddExerciseDialog from "@/components/AddExerciseDialog";

interface Exercise {
  name: string;
  category: string;
  difficulty: string;
  equipment: string;
}

const initialExercises = [
  {
    name: "Bench Press",
    category: "Chest",
    difficulty: "Intermediate",
    equipment: "Barbell",
  },
  {
    name: "Squats",
    category: "Legs",
    difficulty: "Beginner",
    equipment: "Barbell",
  },
  {
    name: "Pull-ups",
    category: "Back",
    difficulty: "Advanced",
    equipment: "Body Weight",
  },
];

const Exercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);

  const handleAddExercise = (newExercise: Exercise) => {
    setExercises([...exercises, newExercise]);
  };

  return (
    <div className="p-6 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Exercise Library</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search exercises..."
              className="pl-8"
            />
          </div>
          <AddExerciseDialog onAddExercise={handleAddExercise} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} {...exercise} />
        ))}
      </div>
    </div>
  );
};

export default Exercises;
