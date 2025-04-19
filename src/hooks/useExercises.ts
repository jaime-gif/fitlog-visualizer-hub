
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
      
      if (!exerciseId) {
        console.error("Invalid exercise ID");
        throw new Error("Invalid exercise ID");
      }
      
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
      
      // Then delete the exercise regardless of whether it's a default one or not
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
    onSuccess: (deletedId) => {
      console.log("Exercise deleted, invalidating queries");
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast.success("Exercise deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete exercise");
      console.error("Delete error:", error);
    }
  });

  const addExercise = useMutation({
    mutationFn: async (exercise: Omit<Exercise, "id">) => {
      console.log("Adding exercise:", exercise);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("User not authenticated");
        throw new Error("User not authenticated");
      }
      
      // Add the exercise with the user's ID
      const { data, error } = await supabase
        .from("exercises")
        .insert([{
          ...exercise,
          created_by: user.id
        }])
        .select();
      
      if (error) {
        console.error("Add exercise error:", error);
        throw error;
      }
      
      console.log("Exercise added successfully:", data);
      return data[0] as Exercise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast.success("Exercise added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add exercise");
      console.error("Add exercise error:", error);
    }
  });

  return {
    ...query,
    deleteExercise,
    addExercise
  };
};
