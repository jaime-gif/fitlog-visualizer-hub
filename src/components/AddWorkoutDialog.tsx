
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarPlus, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";

const AddWorkoutDialog = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to add a workout");
      return;
    }

    if (!formData.title || !formData.duration || !formData.date) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { error } = await supabase
        .from("workout_sessions")
        .insert({
          title: formData.title,
          duration: parseInt(formData.duration),
          date: formData.date,
          user_id: user.id,
        });

      if (error) throw error;

      toast.success("Workout session added successfully!");
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      setOpen(false);
      setFormData({ title: "", duration: "", date: new Date().toISOString().split('T')[0] });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarPlus className="h-4 w-4" />
          Add Workout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Workout Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Workout Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Morning Cardio"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (minutes)</label>
            <div className="relative">
              <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                className="pl-8"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="45"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full">Add Workout</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkoutDialog;
