
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Bell, Search, Plus, Pin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Announcement data mock
const announcementsData = [
  {
    id: "ann1",
    title: "End Semester Examination Schedule",
    content: "The end semester examinations for the Fall 2023 semester will commence from November 20, 2023. The detailed schedule has been published on the examination portal. All students are advised to check their respective exam timings and venues.",
    category: "exams",
    date: "2023-10-25",
    author: "Examination Controller",
    important: true
  },
  {
    id: "ann2",
    title: "Fee Payment Deadline Extension",
    content: "The deadline for payment of tuition fees for the Fall 2023 semester has been extended to October 15, 2023. Students who have not yet paid their fees are advised to do so before the revised deadline to avoid late payment penalties.",
    category: "fees",
    date: "2023-10-01",
    author: "Finance Department",
    important: true
  },
  {
    id: "ann3",
    title: "Campus Maintenance Notice",
    content: "The main campus building will undergo maintenance work on October 8, 2023 (Sunday). All classrooms and laboratories in the main building will be unavailable on this day. Classes scheduled for this day will be held in the auxiliary building.",
    category: "campus",
    date: "2023-10-02",
    author: "Administration Department",
    important: false
  },
  {
    id: "ann4",
    title: "Workshop on AI and Machine Learning",
    content: "The Computer Science Department is organizing a workshop on 'Advances in AI and Machine Learning' on October 12, 2023. The workshop will be conducted by Dr. Alan Smith, a renowned expert in the field. Interested students can register through the department portal.",
    category: "events",
    date: "2023-09-28",
    author: "Computer Science Department",
    important: false
  },
  {
    id: "ann5",
    title: "Library Book Return Reminder",
    content: "Students who have borrowed books from the library are reminded to return them by October 20, 2023, before the commencement of end-semester examinations. Late returns will attract fines as per library rules.",
    category: "library",
    date: "2023-09-25",
    author: "Library Department",
    important: false
  },
];

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    category: "",
    important: false
  });
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Filter announcements based on search term
  const filteredAnnouncements = announcementsData.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAnnouncement = () => {
    // Validate form
    if (!newAnnouncement.title || !newAnnouncement.content || !newAnnouncement.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Announcement Posted",
      description: "Your announcement has been successfully posted.",
    });

    // Reset form and close dialog
    setNewAnnouncement({
      title: "",
      content: "",
      category: "",
      important: false
    });
    setIsDialogOpen(false);
  };

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Category badge component
  const CategoryBadge = ({ category }: { category: string }) => {
    const categoryStyles: Record<string, string> = {
      exams: "bg-purple-100 text-purple-800",
      fees: "bg-blue-100 text-blue-800",
      campus: "bg-green-100 text-green-800",
      events: "bg-amber-100 text-amber-800",
      library: "bg-rose-100 text-rose-800"
    };
    
    return (
      <Badge className={`font-normal ${categoryStyles[category] || "bg-gray-100 text-gray-800"}`} variant="outline">
        {category}
      </Badge>
    );
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">Latest news and updates from the institute</p>
        </div>
        
        {(user?.role === "admin" || user?.role === "faculty") && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-erp-600 hover:bg-erp-700">
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Post New Announcement</DialogTitle>
                <DialogDescription>
                  Create a new announcement that will be visible to all users.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    placeholder="Enter announcement title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content" 
                    rows={5}
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    placeholder="Enter announcement details"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newAnnouncement.category}
                      onValueChange={(value) => setNewAnnouncement({...newAnnouncement, category: value})}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exams">Exams</SelectItem>
                        <SelectItem value="fees">Fees</SelectItem>
                        <SelectItem value="campus">Campus</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="library">Library</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end mb-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="important" 
                        className="rounded text-erp-600 focus:ring-erp-500"
                        checked={newAnnouncement.important}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, important: e.target.checked})}
                      />
                      <Label htmlFor="important">Mark as important</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-erp-600 hover:bg-erp-700" onClick={handleAddAnnouncement}>
                  Post Announcement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search announcements..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Announcements list */}
      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map(announcement => (
            <Card key={announcement.id} className={announcement.important ? "border-l-4 border-l-red-500" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center">
                      {announcement.title}
                      {announcement.important && (
                        <Pin className="h-4 w-4 ml-2 text-red-500" />
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <CategoryBadge category={announcement.category} />
                      <div className="flex items-center text-gray-500 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(announcement.date)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-gray-700">{announcement.content}</p>
              </CardContent>
              <CardFooter className="pt-1 text-xs text-gray-500">
                Posted by: {announcement.author}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-md">
            <Bell className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <h3 className="text-lg font-medium">No announcements found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Announcements;
