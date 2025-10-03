import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bell, CheckCircle, AlertCircle, Clock, Briefcase, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const NotificationsCard = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  
  useEffect(() => {
    const loadNotifications = () => {
      // Load notifications from localStorage
      const storedNotifications = JSON.parse(localStorage.getItem("student_notifications") || "[]");
      
      // Load posted internships
      const myInternships = JSON.parse(localStorage.getItem("my_internships") || "[]");
      
      // Create internship notifications
      const internshipNotifications = myInternships.map((internship: any) => ({
        id: `internship-${internship.id}`,
        title: "New Internship Posted",
        message: `${internship.title} at ${internship.company} is now available. ${internship.type === "college-specific" ? "🎓 College-specific opportunity" : "🌐 Universal opportunity"}`,
        time: formatTime(internship.postedDate),
        type: "info",
        iconName: "Briefcase",
        internshipData: internship,
      }));
      
      const defaultNotifications = [
        {
          id: 1,
          title: "Logbook Entry Approved",
          message: "Your logbook entry for Web Dev Internship is approved.",
          time: "1 hr ago",
          type: "success",
          iconName: "CheckCircle"
        },
        {
          id: 3,
          title: "Logbook Submission Reminder",
          message: "Submit logbook for Marketing Internship by Oct 5.",
          time: "5 hrs ago",
          type: "warning",
          iconName: "Clock"
        },
        {
          id: 4,
          title: "Skill Assessment Available",
          message: "New Python skill assessment is ready for you.",
          time: "1 day ago",
          type: "info",
          iconName: "Bell"
        }
      ];
  
      // Sort notifications by time (newest first)
      const allNotifications = [...internshipNotifications, ...storedNotifications, ...defaultNotifications];
      setNotifications(allNotifications);
    };

    loadNotifications();
    
    // Refresh every 2 seconds to catch new notifications
    const interval = setInterval(loadNotifications, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Bell,
      CheckCircle,
      AlertCircle,
      Clock,
      Briefcase,
      Star,
    };
    return icons[iconName] || Bell;
  };

  return (
    <>
      <Card 
        className="rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-accent/20 bg-gradient-to-br from-card via-card to-accent/5"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Bell className="w-5 h-5" />
            Recent Notifications
            <Badge className="ml-auto bg-destructive text-white">{notifications.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.slice(0, 3).map((notif) => {
            const IconComponent = getIcon(notif.iconName);
            return (
              <div key={notif.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth">
                <div className="flex items-start gap-2">
                  <IconComponent className={`w-4 h-4 mt-0.5 ${
                    notif.type === 'success' ? 'text-accent' : 
                    notif.type === 'warning' ? 'text-destructive' : 
                    'text-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{notif.title}</p>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="heading-accent text-2xl flex items-center gap-2">
              <Bell className="w-6 h-6" />
              All Notifications
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {notifications.map((notif) => {
              const IconComponent = getIcon(notif.iconName);
              return (
                <div 
                  key={notif.id} 
                  className="p-4 rounded-xl border border-border hover:border-primary/50 transition-smooth bg-gradient-to-br from-card to-muted/20"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      notif.type === 'success' ? 'bg-accent/20 text-accent' : 
                      notif.type === 'warning' ? 'bg-destructive/20 text-destructive' : 
                      'bg-primary/20 text-primary'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{notif.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notif.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
