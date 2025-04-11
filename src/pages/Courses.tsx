
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, BookOpen, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Course data mock
const coursesData = [
  {
    id: "CS101",
    title: "Introduction to Computer Science",
    department: "Computer Science",
    credits: 4,
    instructor: "Dr. Alan Smith",
    students: 45,
    status: "active",
    semester: "Fall 2023"
  },
  {
    id: "MATH202",
    title: "Advanced Calculus",
    department: "Mathematics",
    credits: 3,
    instructor: "Dr. Maria Johnson",
    students: 38,
    status: "active",
    semester: "Fall 2023"
  },
  {
    id: "PHY101",
    title: "Physics Fundamentals",
    department: "Physics",
    credits: 4,
    instructor: "Dr. Robert Chen",
    students: 52,
    status: "active",
    semester: "Fall 2023"
  },
  {
    id: "ENG205",
    title: "Professional Communication",
    department: "English",
    credits: 2,
    instructor: "Prof. Sarah Williams",
    students: 60,
    status: "active",
    semester: "Fall 2023"
  },
  {
    id: "CS305",
    title: "Database Management Systems",
    department: "Computer Science",
    credits: 4,
    instructor: "Dr. Michael Lee",
    students: 35,
    status: "active",
    semester: "Fall 2023"
  },
  {
    id: "CHEM101",
    title: "General Chemistry",
    department: "Chemistry",
    credits: 4,
    instructor: "Dr. Emily Rodriguez",
    students: 48,
    status: "inactive",
    semester: "Spring 2023"
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();
  const { toast } = useToast();

  // Filter courses based on search term and active tab
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = 
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && course.status === activeTab;
  });

  const handleDownloadSyllabus = (courseId: string) => {
    toast({
      title: "Syllabus Download",
      description: `Syllabus for ${courseId} is being downloaded.`,
    });
  };

  const handleEnrollCourse = (courseId: string) => {
    toast({
      title: "Course Enrollment",
      description: `Successfully enrolled in ${courseId}.`,
    });
  };

  // Course card component
  const CourseCard = ({ course }: { course: typeof coursesData[0] }) => (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{course.id}</CardTitle>
              <Badge variant={course.status === "active" ? "default" : "secondary"}>
                {course.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
            <CardDescription className="mt-1">{course.department}</CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">{course.semester}</span>
            <span className="text-xs text-gray-500">{course.credits} Credits</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-base font-medium mb-2">{course.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>{course.students} Students</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Button 
            size="sm" 
            variant="outline"
            className="flex items-center" 
            onClick={() => handleDownloadSyllabus(course.id)}
          >
            <Download className="h-4 w-4 mr-1" />
            Syllabus
          </Button>
          
          {user?.role === "student" && course.status === "active" && (
            <Button 
              size="sm" 
              className="bg-erp-600 hover:bg-erp-700" 
              onClick={() => handleEnrollCourse(course.id)}
            >
              Enroll
            </Button>
          )}
          
          {user?.role !== "student" && (
            <Button 
              size="sm" 
              variant="outline"
            >
              Manage
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">Browse and manage available courses</p>
      </div>
      
      {/* Search and filter section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search courses..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Archive</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {user?.role !== "student" && (
          <Button className="bg-erp-600 hover:bg-erp-700">
            <BookOpen className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        )}
      </div>
      
      {/* Courses grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-lg font-medium">No courses found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Courses;
