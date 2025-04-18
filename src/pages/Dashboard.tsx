
import { Card } from "@/components/ui/card";
import { BarChart, Activity, Timer, Trophy } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 mt-16">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Workouts</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <Timer className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Time Spent</p>
              <p className="text-2xl font-bold">32h</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <BarChart className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Exercises</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Achievements</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Workouts</h2>
          <div className="space-y-4">
            {/* Placeholder for recent workouts */}
            <p className="text-gray-500">No recent workouts</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Progress Overview</h2>
          <div className="space-y-4">
            {/* Placeholder for progress chart */}
            <p className="text-gray-500">No progress data available</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
