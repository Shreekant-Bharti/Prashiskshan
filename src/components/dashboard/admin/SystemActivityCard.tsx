import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Clock,
  User,
  Database,
  Wifi,
  AlertCircle,
} from "lucide-react";

interface ActivityLog {
  id: string;
  type: "user" | "system" | "application" | "error";
  user: string;
  action: string;
  timestamp: string;
  status: "success" | "warning" | "error";
}

const activityLogs: ActivityLog[] = [
  {
    id: "1",
    type: "application",
    user: "Rahul Kumar",
    action: "Applied for Frontend Developer Intern at TechCorp",
    timestamp: "2024-10-03T10:45:00Z",
    status: "success",
  },
  {
    id: "2",
    type: "user",
    user: "Admin",
    action: "Approved internship application #1234",
    timestamp: "2024-10-03T10:30:00Z",
    status: "success",
  },
  {
    id: "3",
    type: "system",
    user: "System",
    action: "Database backup completed successfully",
    timestamp: "2024-10-03T09:00:00Z",
    status: "success",
  },
  {
    id: "4",
    type: "error",
    user: "System",
    action: "Failed to sync with external API - retrying",
    timestamp: "2024-10-03T08:45:00Z",
    status: "error",
  },
  {
    id: "5",
    type: "application",
    user: "Priya Singh",
    action: "Submitted internship completion report",
    timestamp: "2024-10-03T08:15:00Z",
    status: "success",
  },
];

const systemMetrics = {
  uptime: "99.8%",
  responseTime: "245ms",
  activeUsers: 156,
  totalTransactions: 2847,
  errorRate: "0.2%",
  lastBackup: "2 hours ago",
};

export const SystemActivityCard = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case "system":
        return (
          <Database className="w-4 h-4 text-green-600 dark:text-green-400" />
        );
      case "application":
        return <Wifi className="w-4 h-4 text-primary" />;
      case "error":
        return (
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
        );
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "warning":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "error":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <Card className="rounded-2xl shadow-elegant border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Activity className="w-5 h-5" />
          System Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-center">
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              {systemMetrics.uptime}
            </p>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 text-center">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {systemMetrics.responseTime}
            </p>
            <p className="text-xs text-muted-foreground">Response Time</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
            <p className="text-lg font-bold text-primary">
              {systemMetrics.activeUsers}
            </p>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="font-medium">{systemMetrics.totalTransactions}</p>
            <p className="text-muted-foreground">Transactions</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-red-600 dark:text-red-400">
              {systemMetrics.errorRate}
            </p>
            <p className="text-muted-foreground">Error Rate</p>
          </div>
          <div className="text-center">
            <p className="font-medium">{systemMetrics.lastBackup}</p>
            <p className="text-muted-foreground">Last Backup</p>
          </div>
        </div>

        {/* Activity Log */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent Activity
          </h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {activityLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getActivityIcon(log.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{log.user}</span>
                        <Badge className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {log.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-green-600 dark:text-green-400">
                All Systems Operational
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              Last checked: 2 min ago
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
