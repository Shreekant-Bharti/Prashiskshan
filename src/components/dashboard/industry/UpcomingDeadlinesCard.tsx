import { Clock, AlertCircle, Calendar, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UpcomingDeadlinesCard = () => {
  const deadlines = [
    {
      id: 1,
      type: "posting",
      title: "Frontend Developer Internship",
      description: "Application deadline",
      daysLeft: 3,
      date: "Oct 15, 2024",
      urgent: true,
    },
    {
      id: 2,
      type: "interview",
      title: "Interview with Sneha Kumari",
      description: "UI/UX Designer position",
      daysLeft: 2,
      date: "Oct 5, 2024",
      time: "2:00 PM",
      urgent: true,
    },
    {
      id: 3,
      type: "review",
      title: "Review Applications",
      description: "Data Analyst position - 15 pending",
      daysLeft: 5,
      date: "Oct 18, 2024",
      urgent: false,
    },
  ];

  const handleNotify = (deadline: any) => {
    // Play lovely notification sound
    const audio = new Audio("data:audio/wav;base64,UklGRhYCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfIBAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWdpY2VqbG5vcXJzdHV2dnd4eXl6enp5eXh3dnZ1dHNycGxoZGBbV1NPS0dDPzs3MzAvLS0sKyopKCgnJiYlJCQjIiIhICAgICAgICAgICAhISIiIyMkJCUmJicnKCkpKissLCwuLzAyNDY4Ojw+QUNCR0pNUFFUV1peY2drcG90eXx/goSGiYuNj5GSlJWWl5iZmZqZmZiYl5aVlJOSkI6MioiGhIJ/fXt5d3VzcXBubGplYl5aV1ROSkdDPzw5NjQxLy0rKScmJCQiISAeHR0cGxoaGRkYGBcXFxYWFRUVFBQUFBQUFBQVFRUVFhYWFxcYGBkZGhobGxwdHR4fICEiIyQlJicpKiwuMDI0Njk7PkBDRklMT1JVWFteYmVpa256foCEh4qNkJOWmJucnp+hoqOkpKWlpaampqampqalpqWkpKOioaCfnZuZl5WTkI6MiYeEgoB9e3l2dHJwbmxqaGZkYmBdW1lXVVJQTktJRkRCQD48Ojg2NDIxLy4sKykoJyYlJCMiISAeHRwaGBYUEhAODAoIBgQCAP7+/Pz6+vn5+Pf39/b29fX09PPz8/Ly8vHx8PDw8PDw8PDw8PDw8PDw8PDx8fHx8vLy8/P09PX19vb39/f4+Pn5+vr7+/z8/f3+/v//AAEBAgMDBAUFBgcHCAgJCgoLCwwNDQ4PDxAREhITFBQVFhYXGBgZGhobHB0dHh8gICEiIyMkJSUmJygpKSorLC0uLy8xMjM0NTY3ODk6Ozw9PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlJTVFVWV1hZWltcXV5fYGFiY2NkZWZnaGlqamts");
    audio.play().catch(() => {});
    audio.play().catch(() => {});

    // Save notification to student dashboard
    const notifications = JSON.parse(localStorage.getItem("student_notifications") || "[]");
    const newNotification = {
      id: Date.now(),
      title: "Deadline Reminder",
      message: `${deadline.title} - ${deadline.description}. Due on ${deadline.date}${deadline.time ? ' at ' + deadline.time : ''}`,
      time: "Just now",
      type: "warning",
      read: false
    };
    notifications.unshift(newNotification);
    localStorage.setItem("student_notifications", JSON.stringify(notifications));

    toast.success("Notification sent successfully to students!");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "interview":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "posting":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
      case "review":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className="h-full hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {deadlines.map((deadline) => (
          <div
            key={deadline.id}
            className={`p-4 rounded-lg border-2 hover:shadow-md transition-all duration-300 ${
              deadline.urgent ? "border-orange-500/50 bg-orange-500/5" : "bg-card"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{deadline.title}</h3>
                  {deadline.urgent && (
                    <AlertCircle className="h-4 w-4 text-orange-500 animate-pulse" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{deadline.description}</p>
              </div>
              <Badge variant="secondary" className={getTypeColor(deadline.type)}>
                {deadline.type.charAt(0).toUpperCase() + deadline.type.slice(1)}
              </Badge>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{deadline.date}</span>
                {deadline.time && <span>• {deadline.time}</span>}
              </div>
              <Badge
                variant={deadline.daysLeft <= 3 ? "destructive" : "secondary"}
                className="font-semibold"
              >
                {deadline.daysLeft} {deadline.daysLeft === 1 ? "day" : "days"} left
              </Badge>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="w-full mt-3 hover:scale-105 transition-transform"
              onClick={() => handleNotify(deadline)}
            >
              <Bell className="h-4 w-4 mr-2" />
              Notify Students
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlinesCard;
