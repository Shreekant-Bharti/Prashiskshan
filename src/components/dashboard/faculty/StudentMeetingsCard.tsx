import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Plus, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Meeting {
  id: string;
  studentName: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: "in-person" | "virtual";
  status: "scheduled" | "completed" | "cancelled";
  agenda: string;
}

const upcomingMeetings: Meeting[] = [
  {
    id: "1",
    studentName: "Sneha Kumari",
    title: "Mid-term Progress Review",
    date: "2024-10-05",
    time: "10:00 AM",
    duration: "30 mins",
    type: "virtual",
    status: "scheduled",
    agenda: "Discuss project progress, challenges, and next milestones",
  },
  {
    id: "2",
    studentName: "Ravi Kumar",
    title: "Weekly Check-in",
    date: "2024-10-04",
    time: "2:00 PM",
    duration: "20 mins",
    type: "in-person",
    status: "scheduled",
    agenda: "Review weekly tasks and address concerns",
  },
  {
    id: "3",
    studentName: "Priya Sharma",
    title: "Final Evaluation",
    date: "2024-10-03",
    time: "3:30 PM",
    duration: "45 mins",
    type: "in-person",
    status: "completed",
    agenda: "Final internship evaluation and feedback",
  },
];

export const StudentMeetingsCard = () => {
  const scheduleMeeting = () => {
    toast.success("Meeting scheduling dialog would open here");
  };

  const joinMeeting = (meetingId: string) => {
    toast.success("Joining virtual meeting...");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "virtual" ? (
      <Video className="w-4 h-4" />
    ) : (
      <MapPin className="w-4 h-4" />
    );
  };

  const todayMeetings = upcomingMeetings.filter((meeting) => {
    const today = new Date().toISOString().split("T")[0];
    return meeting.date === today && meeting.status === "scheduled";
  }).length;

  const scheduledMeetings = upcomingMeetings.filter(
    (meeting) => meeting.status === "scheduled"
  ).length;

  return (
    <Card className="rounded-2xl shadow-elegant border-accent/20 bg-gradient-to-br from-card via-card to-accent/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-accent">
            <Calendar className="w-5 h-5" />
            Student Meetings
          </CardTitle>
          <Button size="sm" onClick={scheduleMeeting}>
            <Plus className="w-4 h-4 mr-1" />
            Schedule
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {todayMeetings}
            </p>
            <p className="text-xs text-muted-foreground">Today</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">
              {scheduledMeetings}
            </p>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {upcomingMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="p-3 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">
                      {meeting.studentName}
                    </h4>
                    <Badge className={getStatusColor(meeting.status)}>
                      {meeting.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{meeting.title}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(meeting.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {meeting.time} ({meeting.duration})
                    </div>
                    <div className="flex items-center gap-1">
                      {getTypeIcon(meeting.type)}
                      {meeting.type}
                    </div>
                  </div>
                </div>
                {meeting.status === "scheduled" &&
                  meeting.type === "virtual" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => joinMeeting(meeting.id)}
                    >
                      <Video className="w-3 h-3 mr-1" />
                      Join
                    </Button>
                  )}
              </div>

              <p className="text-xs text-muted-foreground">{meeting.agenda}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 border border-border/50">
          <h4 className="font-medium mb-2 text-sm">Meeting Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">This Week:</span>
              <p className="font-medium">5 meetings</p>
            </div>
            <div>
              <span className="text-muted-foreground">Completed:</span>
              <p className="font-medium text-green-600 dark:text-green-400">
                {
                  upcomingMeetings.filter((m) => m.status === "completed")
                    .length
                }
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Virtual:</span>
              <p className="font-medium">
                {upcomingMeetings.filter((m) => m.type === "virtual").length}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Avg Duration:</span>
              <p className="font-medium">32 mins</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
