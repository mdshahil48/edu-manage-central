
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { 
  BookOpen, 
  UserCircle, 
  Users, 
  CreditCard, 
  FileText, 
  ClipboardCheck, 
  BookMarked, 
  Bell, 
  Calendar, 
  GraduationCap, 
  LogOut, 
  FileInput,
  CheckSquare,
  MessageSquare,
  BarChart4,
  FileQuestion
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  closeSidebar: () => void;
}

// Navigation item type
interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  roles: UserRole[];
}

// Navigation items based on role
const navigationItems: NavItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: BarChart4, roles: ["admin", "faculty", "student"] },
  { name: "Courses", path: "/courses", icon: BookOpen, roles: ["admin", "faculty", "student"] },
  { name: "Students", path: "/students", icon: Users, roles: ["admin", "faculty"] },
  { name: "Faculty", path: "/faculty", icon: UserCircle, roles: ["admin"] },
  { name: "Attendance", path: "/attendance", icon: ClipboardCheck, roles: ["admin", "faculty", "student"] },
  { name: "Fees", path: "/fees", icon: CreditCard, roles: ["admin", "student"] },
  { name: "Syllabus", path: "/syllabus", icon: FileText, roles: ["admin", "faculty", "student"] },
  { name: "Exams", path: "/exams", icon: BookMarked, roles: ["admin", "faculty", "student"] },
  { name: "Announcements", path: "/announcements", icon: Bell, roles: ["admin", "faculty", "student"] },
  { name: "Timetable", path: "/timetable", icon: Calendar, roles: ["admin", "faculty", "student"] },
  { name: "Assignments", path: "/assignments", icon: FileInput, roles: ["admin", "faculty", "student"] },
  { name: "No Dues", path: "/no-dues", icon: CheckSquare, roles: ["admin", "student"] },
  { name: "Results", path: "/results", icon: GraduationCap, roles: ["admin", "faculty", "student"] },
  { name: "Feedback", path: "/feedback", icon: MessageSquare, roles: ["admin", "faculty", "student"] },
  { name: "Lecture Notes", path: "/notes", icon: FileQuestion, roles: ["admin", "faculty", "student"] },
];

export function Sidebar({ closeSidebar }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  // Check if a navigation item is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-full flex flex-col bg-white shadow-lg border-r w-64">
      {/* Logo and title */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-erp-800">EduManage ERP</h1>
        <p className="text-sm text-gray-500">Institute Management System</p>
      </div>

      {/* User info */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
            <AvatarFallback>{user?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                onClick={closeSidebar}
                className={`flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive(item.path) 
                    ? "bg-erp-100 text-erp-800 font-medium" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className={`h-5 w-5 mr-3 ${isActive(item.path) ? "text-erp-600" : "text-gray-500"}`} />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center text-gray-700 hover:text-red-600"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
