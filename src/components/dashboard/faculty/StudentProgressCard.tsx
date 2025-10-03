import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const progressData = [
  {
    id: "1",
    studentName: "Sneha Kumari",
    company: "TechCorp Ltd",
    position: "Frontend Developer",
    progress: 65,
    weeklyHours: 35,
    tasksCompleted: 8,
    totalTasks: 12,
    lastUpdate: "2024-10-02",
    status: "on-track",
  },
  {
    id: "2",
    studentName: "Ravi Kumar",
    company: "CloudTech",
    position: "Backend Developer",
    progress: 40,
    weeklyHours: 32,
    tasksCompleted: 5,
    totalTasks: 15,
    lastUpdate: "2024-10-01",
    status: "needs-attention",
  },
  {
    id: "3",
    studentName: "Priya Sharma",
    company: "BrandFlow",
    position: "Marketing Intern",
    progress: 100,
    weeklyHours: 40,
    tasksCompleted: 10,
    totalTasks: 10,
    lastUpdate: "2024-09-30",
    status: "completed",
  },
];

export const StudentProgressCard = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "needs-attention":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle2 className="w-4 h-4" />;
      case "needs-attention":
        return <AlertCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const averageProgress = Math.round(
    progressData.reduce((sum, student) => sum + student.progress, 0) /
      progressData.length
  );
  const onTrackStudents = progressData.filter(
    (s) => s.status === "on-track"
  ).length;
  const needsAttention = progressData.filter(
    (s) => s.status === "needs-attention"
  ).length;

  return (
    <Card className="rounded-2xl shadow-elegant border-accent/20 bg-gradient-to-br from-card via-card to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <TrendingUp className="w-5 h-5" />
          Student Progress Tracking
        </CardTitle>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{averageProgress}%</p>
            <p className="text-xs text-muted-foreground">Avg Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {onTrackStudents}
            </p>
            <p className="text-xs text-muted-foreground">On Track</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {needsAttention}
            </p>
            <p className="text-xs text-muted-foreground">Need Attention</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {progressData.map((student) => (
            <div
              key={student.id}
              className="p-4 rounded-lg border border-border bg-card/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{student.studentName}</h4>
                    <Badge className={getStatusColor(student.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(student.status)}
                        {student.status.replace("-", " ")}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {student.position} at {student.company}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Last update:</p>
                  <p>{new Date(student.lastUpdate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span className="font-medium">{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-2 rounded bg-muted/50">
                    <p className="font-medium">{student.weeklyHours}h</p>
                    <p className="text-muted-foreground text-xs">
                      Weekly Hours
                    </p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/50">
                    <p className="font-medium">
                      {student.tasksCompleted}/{student.totalTasks}
                    </p>
                    <p className="text-muted-foreground text-xs">Tasks</p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/50">
                    <p className="font-medium">
                      {Math.round(
                        (student.tasksCompleted / student.totalTasks) * 100
                      )}
                      %
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Task Completion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 border border-border/50">
          <h4 className="font-semibold mb-2">Progress Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">
                Average Weekly Hours:
              </span>
              <p className="font-medium">35.7 hours</p>
            </div>
            <div>
              <span className="text-muted-foreground">
                Task Completion Rate:
              </span>
              <p className="font-medium text-green-600 dark:text-green-400">
                76.7%
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">
                Students Ahead of Schedule:
              </span>
              <p className="font-medium">1</p>
            </div>
            <div>
              <span className="text-muted-foreground">Average Progress:</span>
              <p className="font-medium">{averageProgress}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
