
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { WorkoutSession } from "@/types/workout";

export const useWorkouts = () => {
  return useQuery({
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
};
