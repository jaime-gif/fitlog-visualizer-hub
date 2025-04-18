
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone } from "lucide-react";

const Profile = () => {
  return (
    <div className="p-6 mt-16">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="John Doe"
                  className="pl-8"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="pl-8"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="pl-8"
                />
              </div>
            </div>

            <Button className="w-full">Save Changes</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Stats Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium">April 2024</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Workouts Completed</p>
              <p className="font-medium">24</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Exercise Time</p>
              <p className="font-medium">32 hours</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
