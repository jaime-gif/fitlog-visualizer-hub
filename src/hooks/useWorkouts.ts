
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { WorkoutSession } from "@/types/workout";
import { toast } from "sonner";

export const useWorkouts = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workout_sessions")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      return data as WorkoutSession[];
    },
  });

  const deleteWorkout = useMutation({
    mutationFn: async (workoutId: string) => {
      const { error } = await supabase
        .from("workout_sessions")
        .delete()
        .eq("id", workoutId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      toast.success("Workout deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete workout");
      console.error("Delete error:", error);
    }
  });

  return {
    ...query,
    deleteWorkout
  };
};
