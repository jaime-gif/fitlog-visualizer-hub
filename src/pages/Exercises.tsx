
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ExerciseCard from "@/components/ExerciseCard";
import AddExerciseDialog from "@/components/AddExerciseDialog";
import DeleteExerciseDialog from "@/components/DeleteExerciseDialog";
import { useExercises } from "@/hooks/useExercises";
import type { Exercise } from "@/types/workout";

const Exercises = () => {
  const { data: exercises = [], isLoading, deleteExercise } = useExercises();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteExercise = (exerciseId: string) => {
    console.log("Handling delete for exercise ID:", exerciseId);
    deleteExercise.mutate(exerciseId);
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <AddExerciseDialog onAddExercise={(exercise: Exercise) => {
            // Exercise will be added automatically through React Query
          }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="relative">
            <ExerciseCard {...exercise} />
            <div className="absolute top-2 right-2">
              <DeleteExerciseDialog 
                onDelete={() => handleDeleteExercise(exercise.id)} 
              />
            </div>
          </div>
        ))}
      </div>

      {isLoading && <div>Loading exercises...</div>}
      {!isLoading && filteredExercises.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No exercises found. Try a different search or add a new exercise.
        </div>
      )}
    </div>
  );
};

export default Exercises;
