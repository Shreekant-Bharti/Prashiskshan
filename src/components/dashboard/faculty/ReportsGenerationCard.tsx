import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, User, BarChart } from "lucide-react";
import { toast } from "sonner";

const reportTypes = [
  {
    id: "individual",
    title: "Individual Student Report",
    description: "Detailed progress report for a specific student",
    icon: User,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "weekly",
    title: "Weekly Progress Report",
    description: "Summary of all students' weekly activities",
    icon: Calendar,
    color: "text-green-600 dark:text-green-400",
  },
  {
    id: "analytics",
    title: "Analytics Report",
    description: "Performance metrics and insights",
    icon: BarChart,
    color: "text-purple-600 dark:text-purple-400",
  },
];

const recentReports = [
  {
    id: "1",
    title: "Sneha Kumari - Mid-term Report",
    date: "2024-10-01",
    type: "Individual",
    status: "Generated",
  },
  {
    id: "2",
    title: "Week 8 Progress Summary",
    date: "2024-09-30",
    type: "Weekly",
    status: "Generated",
  },
  {
    id: "3",
    title: "September Analytics Report",
    date: "2024-09-28",
    type: "Analytics",
    status: "Generated",
  },
];

export const ReportsGenerationCard = () => {
  const generateReport = (type: string) => {
    toast.success(
      `${type} report generation started. You'll be notified when ready.`
    );
  };

  const downloadReport = (reportId: string, title: string) => {
    toast.success(`Downloading ${title}...`);
  };

  return (
    <Card className="rounded-2xl shadow-elegant border-secondary/20 bg-gradient-to-br from-card via-card to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-secondary">
          <FileText className="w-5 h-5" />
          Reports Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Types */}
        <div>
          <h4 className="font-medium mb-3 text-sm">Generate New Report</h4>
          <div className="space-y-2">
            {reportTypes.map((report) => {
              const IconComponent = report.icon;
              return (
                <div
                  key={report.id}
                  className="p-3 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <IconComponent
                        className={`w-5 h-5 mt-0.5 ${report.color}`}
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{report.title}</h5>
                        <p className="text-xs text-muted-foreground">
                          {report.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => generateReport(report.title)}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <h4 className="font-medium mb-3 text-sm">Recent Reports</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="p-3 rounded-lg border border-border bg-card/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{report.title}</h5>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>{new Date(report.date).toLocaleDateString()}</span>
                      <span>Type: {report.type}</span>
                      <span className="text-green-600 dark:text-green-400">
                        • {report.status}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => downloadReport(report.id, report.title)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 border border-border/50">
          <h4 className="font-medium mb-2 text-sm">Report Statistics</h4>
          <div className="grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <p className="font-bold text-lg">{recentReports.length}</p>
              <p className="text-muted-foreground">This Month</p>
            </div>
            <div>
              <p className="font-bold text-lg text-green-600 dark:text-green-400">
                12
              </p>
              <p className="text-muted-foreground">Total Generated</p>
            </div>
            <div>
              <p className="font-bold text-lg text-blue-600 dark:text-blue-400">
                8
              </p>
              <p className="text-muted-foreground">Downloaded</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
