
import { Card } from "@/components/ui/card";
import { BarChart, Activity, Timer } from "lucide-react";
import ProgressSection from "@/components/ProgressSection";
import AddWorkoutDialog from "@/components/AddWorkoutDialog";
import { useState } from "react";

interface WorkoutSession {
  title: string;
  duration: string;
  date: string;
}

const Dashboard = () => {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);

  const handleAddWorkout = (workout: WorkoutSession) => {
    setWorkouts([...workouts, workout]);
  };

  return (
    <div className="p-6 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <AddWorkoutDialog onAddWorkout={handleAddWorkout} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Workouts</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center">
            <Timer className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Time Spent</p>
              <p className="text-2xl font-bold">32h</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center">
            <BarChart className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Exercises</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressSection />
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {workouts.map((workout, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">{workout.title}</p>
                    <p className="text-sm text-gray-500">{workout.duration} minutes • {new Date(workout.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
            {workouts.length === 0 && (
              <p className="text-gray-500 text-center py-4">No workout sessions yet. Add your first workout!</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
