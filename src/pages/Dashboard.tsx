import { Card } from "@/components/ui/card";
import { Activity, Timer, BarChart } from "lucide-react";
import ProgressSection from "@/components/ProgressSection";
import AddWorkoutDialog from "@/components/AddWorkoutDialog";
import { useWorkouts } from "@/hooks/useWorkouts";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import DeleteWorkoutDialog from "@/components/DeleteWorkoutDialog";

const Dashboard = () => {
  const { user } = useAuth();
  const { data: workouts = [], isLoading, deleteWorkout } = useWorkouts();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const stats = {
    totalWorkouts: workouts.length,
    timeSpent: workouts.reduce((acc, curr) => acc + curr.duration, 0),
    totalExercises: workouts.length * 3, // Average exercises per workout
  };

  return (
    <div className="p-6 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <AddWorkoutDialog />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Workouts</p>
              <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center">
            <Timer className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Time Spent</p>
              <p className="text-2xl font-bold">{stats.timeSpent}m</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center">
            <BarChart className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Exercises</p>
              <p className="text-2xl font-bold">{stats.totalExercises}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressSection workouts={workouts} />
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          {isLoading ? (
            <p className="text-center py-4 text-gray-500">Loading...</p>
          ) : (
            <div className="space-y-4">
              {workouts.map((workout) => (
                <div key={workout.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">{workout.title}</p>
                      <p className="text-sm text-gray-500">
                        {workout.duration} minutes • {new Date(workout.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <DeleteWorkoutDialog 
                    onDelete={() => deleteWorkout.mutate(workout.id)} 
                  />
                </div>
              ))}
              {workouts.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No workout sessions yet. Add your first workout!
                </p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
