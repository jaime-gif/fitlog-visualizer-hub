
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgressSection = () => {
  const progressData = [
    { name: "Weekly Goal", progress: 75 },
    { name: "Monthly Workouts", progress: 60 },
    { name: "Strength Progress", progress: 85 },
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
