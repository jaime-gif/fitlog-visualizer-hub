
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface WorkoutSession {
  title: string;
  duration: string;
  date: string;
}

interface ProgressSectionProps {
  workouts: WorkoutSession[];
}

const ProgressSection = ({ workouts }: ProgressSectionProps) => {
  // Calculate progress based on workouts
  const weeklyGoal = 5; // Assuming 5 workouts per week is the goal
  const monthlyGoal = 20; // Assuming 20 workouts per month is the goal

  const thisWeekWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    return workoutDate >= weekStart;
  }).length;

  const thisMonthWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    const today = new Date();
    return workoutDate.getMonth() === today.getMonth() && 
           workoutDate.getFullYear() === today.getFullYear();
  }).length;

  const progressData = [
    { 
      name: "Weekly Goal", 
      progress: Math.min(Math.round((thisWeekWorkouts / weeklyGoal) * 100), 100) 
    },
    { 
      name: "Monthly Workouts", 
      progress: Math.min(Math.round((thisMonthWorkouts / monthlyGoal) * 100), 100) 
    },
    { 
      name: "Strength Progress", 
      progress: Math.min(Math.round((workouts.length / 30) * 100), 100) // Example calculation
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Progress Overview</h2>
      <div className="space-y-6">
        {progressData.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>{item.progress}%</span>
            </div>
            <Progress value={item.progress} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProgressSection;
