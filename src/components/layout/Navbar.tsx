
import { Link } from "react-router-dom";
import { Menu, Dumbbell, LayoutDashboard, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link to="/" className="flex items-center">
              <Dumbbell className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-semibold">FitLog</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="flex items-center">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link to="/exercises">
              <Button variant="ghost" size="sm" className="flex items-center">
                <Dumbbell className="h-5 w-5 mr-2" />
                Exercises
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
