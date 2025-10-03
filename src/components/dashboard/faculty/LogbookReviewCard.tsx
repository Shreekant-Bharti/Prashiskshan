import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface LogbookEntry {
  id: string;
  studentName: string;
  week: number;
  submissionDate: string;
  status: "pending" | "reviewed" | "needs-revision";
  completeness: number;
  lastActivity: string;
}

const logbookEntries: LogbookEntry[] = [
  {
    id: "1",
    studentName: "Sneha Kumari",
    week: 8,
    submissionDate: "2024-10-02",
    status: "pending",
    completeness: 95,
    lastActivity: "Added project documentation",
  },
  {
    id: "2",
    studentName: "Ravi Kumar",
    week: 6,
    submissionDate: "2024-10-01",
    status: "needs-revision",
    completeness: 70,
    lastActivity: "Updated task list",
  },
  {
    id: "3",
    studentName: "Priya Sharma",
    week: 12,
    submissionDate: "2024-09-30",
    status: "reviewed",
    completeness: 100,
    lastActivity: "Final submission completed",
  },
];

export const LogbookReviewCard = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "reviewed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "needs-revision":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "reviewed":
        return <CheckCircle className="w-4 h-4" />;
      case "needs-revision":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const pendingCount = logbookEntries.filter(
    (entry) => entry.status === "pending"
  ).length;
  const averageCompleteness = Math.round(
    logbookEntries.reduce((sum, entry) => sum + entry.completeness, 0) /
      logbookEntries.length
  );

  return (
    <Card className="rounded-2xl shadow-elegant border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <FileText className="w-5 h-5" />
          Logbook Review
        </CardTitle>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {pendingCount}
            </p>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {averageCompleteness}%
            </p>
            <p className="text-xs text-muted-foreground">Avg Completeness</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {logbookEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-3 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{entry.studentName}</h4>
                    <Badge className={getStatusColor(entry.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(entry.status)}
                        {entry.status.replace("-", " ")}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Week {entry.week} • Submitted:{" "}
                    {new Date(entry.submissionDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {entry.lastActivity}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Eye className="w-3 h-3 mr-1" />
                  Review
                </Button>
              </div>

              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Completeness</span>
                  <span>{entry.completeness}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${entry.completeness}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-border/50">
          <h4 className="font-medium mb-2 text-sm">Review Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Total Entries:</span>
              <p className="font-medium">{logbookEntries.length}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Reviewed:</span>
              <p className="font-medium text-green-600 dark:text-green-400">
                {logbookEntries.filter((e) => e.status === "reviewed").length}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Need Revision:</span>
              <p className="font-medium text-red-600 dark:text-red-400">
                {
                  logbookEntries.filter((e) => e.status === "needs-revision")
                    .length
                }
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">This Week:</span>
              <p className="font-medium">3 new submissions</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
