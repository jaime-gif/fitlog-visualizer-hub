
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Exercise } from "@/types/workout";
import { toast } from "sonner";

export const useExercises = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Exercise[];
    },
  });

  const deleteExercise = useMutation({
    mutationFn: async (exerciseId: string) => {
      console.log("Deleting exercise with ID:", exerciseId);
      
      // First check if exercise exists
      const { data: exercise, error: fetchError } = await supabase
        .from("exercises")
        .select("*")
        .eq("id", exerciseId)
        .single();
      
      if (fetchError) {
        console.error("Error fetching exercise:", fetchError);
        throw fetchError;
      }
      
      if (!exercise) {
        console.error("Exercise not found");
        throw new Error("Exercise not found");
      }
      
      // Then delete the exercise
      const { error } = await supabase
        .from("exercises")
        .delete()
        .eq("id", exerciseId);
      
      if (error) {
        console.error("Delete error:", error);
        throw error;
      }
      
      console.log("Exercise deleted successfully");
      return exerciseId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast.success("Exercise deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete exercise");
      console.error("Delete error:", error);
    }
  });

  return {
    ...query,
    deleteExercise
  };
};
