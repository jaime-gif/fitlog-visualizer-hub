
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Award, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ExerciseCardProps {
  name: string;
  category: string;
  difficulty: string;
  equipment: string;
}

const ExerciseCard = ({ name, category, difficulty, equipment }: ExerciseCardProps) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard!");
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <div className="space-y-1 text-sm text-gray-600 mb-4">
        <p>Category: {category}</p>
        <p>Difficulty: {difficulty}</p>
        <p>Equipment: {equipment}</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <Button variant="ghost" size="sm" onClick={handleLike}>
          <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
};

export default ExerciseCard;
