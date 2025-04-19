
export interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  equipment: string;
}

export interface WorkoutSession {
  id: string;
  title: string;
  duration: number;
  date: string;
  created_at: string;
}

export interface WorkoutExercise {
  id: string;
  workout_id: string;
  exercise_id: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
  exercise?: Exercise;
}
