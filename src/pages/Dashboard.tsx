
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Bell, ClipboardCheck, CreditCard, FileText } from "lucide-react";
import { Link } from "react-router-dom";

// Dashboard card component
const DashboardCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon,
  link
}: { 
  title: string; 
  value: string; 
  description: string;
  icon: React.ElementType;
  link: string;
}) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-erp-600" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      <Link to={link} className="text-xs text-erp-600 hover:underline mt-2 inline-block">
        View details
      </Link>
    </CardContent>
  </Card>
);

// Recent notifications component
const RecentNotifications = () => {
  const notifications = [
    { id: 1, title: "Exam schedule updated", time: "2 hours ago" },
    { id: 2, title: "Fee payment reminder", time: "Yesterday" },
    { id: 3, title: "New assignment posted", time: "2 days ago" },
    { id: 4, title: "Campus maintenance notice", time: "3 days ago" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Notifications</CardTitle>
        <CardDescription>Latest updates and announcements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className="flex items-start space-x-3 border-b pb-3 last:border-0">
              <Bell className="h-5 w-5 text-erp-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { user } = useAuth();

  // Different dashboard cards based on user role
  const getCardsByRole = () => {
    switch (user?.role) {
      case "admin":
        return [
          { title: "Total Students", value: "1,245", description: "Across all programs", icon: Users, link: "/students" },
          { title: "Faculty Members", value: "87", description: "Across all departments", icon: Users, link: "/faculty" },
          { title: "Active Courses", value: "132", description: "Currently in session", icon: BookOpen, link: "/courses" },
          { title: "Fee Collection", value: "₹24.3L", description: "This semester", icon: CreditCard, link: "/fees" },
          { title: "Attendance Rate", value: "92%", description: "Overall average", icon: ClipboardCheck, link: "/attendance" },
          { title: "Pending Approvals", value: "23", description: "Requires action", icon: FileText, link: "/approvals" },
        ];
      case "faculty":
        return [
          { title: "My Courses", value: "5", description: "Currently teaching", icon: BookOpen, link: "/courses" },
          { title: "Students", value: "187", description: "Under your courses", icon: Users, link: "/students" },
          { title: "Average Attendance", value: "88%", description: "Across all classes", icon: ClipboardCheck, link: "/attendance" },
          { title: "Pending Assignments", value: "17", description: "To be graded", icon: FileText, link: "/assignments" }
        ];
      case "student":
      default:
        return [
          { title: "My Courses", value: "6", description: "Currently enrolled", icon: BookOpen, link: "/courses" },
          { title: "Attendance", value: "95%", description: "Current semester", icon: ClipboardCheck, link: "/attendance" },
          { title: "Fee Status", value: "Paid", description: "Current semester", icon: CreditCard, link: "/fees" },
          { title: "Pending Assignments", value: "3", description: "To be submitted", icon: FileText, link: "/assignments" }
        ];
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">Here's an overview of your {user?.role} dashboard</p>
      </div>
      
      {/* Cards section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {getCardsByRole().map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
      
      {/* Notifications and analytics sections */}
      <div className="grid gap-4 md:grid-cols-2">
        <RecentNotifications />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Links</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/timetable" className="p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-sm">
                View Timetable
              </Link>
              <Link to="/announcements" className="p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-sm">
                Announcements
              </Link>
              <Link to="/syllabus" className="p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-sm">
                Syllabus
              </Link>
              <Link to="/results" className="p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-sm">
                Results
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
