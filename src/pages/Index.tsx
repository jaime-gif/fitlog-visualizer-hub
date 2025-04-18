
import { Link } from "react-router-dom";
import { Dumbbell, BarChart, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Track Your Fitness Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Log workouts, track progress, and achieve your fitness goals
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <Dumbbell className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Exercise Library</h3>
            <p className="text-gray-600">
              Access a comprehensive library of exercises with detailed instructions
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm">
            <BarChart className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor your progress with detailed charts and analytics
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm">
            <Users className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              Connect with other fitness enthusiasts and share your journey
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm">
            <Trophy className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Achievements</h3>
            <p className="text-gray-600">
              Earn badges and track your milestones as you progress
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
