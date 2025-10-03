import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Building2,
  Calendar,
  Target,
  AlertCircle,
} from "lucide-react";

// Dummy data for overall statistics
const overviewData = {
  totalInternships: 156,
  activeInternships: 89,
  totalStudents: 423,
  enrolledStudents: 267,
  totalCompanies: 45,
  activeCompanies: 32,
  applicationsThisMonth: 178,
  completedInternships: 145,
  pendingApprovals: 23,
  successRate: 87.5,
};

export const OverviewStatsCard = () => {
  return (
    <Card className="rounded-2xl shadow-elegant border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <TrendingUp className="w-5 h-5" />
          System Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                Total Internships
              </span>
            </div>
            <p className="text-2xl font-bold text-primary">
              {overviewData.totalInternships}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                {overviewData.activeInternships} Active
              </Badge>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Students</span>
            </div>
            <p className="text-2xl font-bold text-accent">
              {overviewData.totalStudents}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                {overviewData.enrolledStudents} Enrolled
              </Badge>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-secondary" />
              <span className="text-xs text-muted-foreground">Companies</span>
            </div>
            <p className="text-2xl font-bold text-secondary">
              {overviewData.totalCompanies}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                {overviewData.activeCompanies} Active
              </Badge>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-green-100 to-green-50 border border-green-200 dark:from-green-900/20 dark:to-green-800/10 dark:border-green-800/30">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-xs text-muted-foreground">This Month</span>
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {overviewData.applicationsThisMonth}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Badge className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                Applications
              </Badge>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 dark:from-blue-900/20 dark:to-blue-800/10 dark:border-blue-800/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {overviewData.completedInternships}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Badge className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {overviewData.successRate}% Success
              </Badge>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-200 dark:from-orange-900/20 dark:to-orange-800/10 dark:border-orange-800/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-xs text-muted-foreground">Pending</span>
            </div>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {overviewData.pendingApprovals}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Badge className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                Approvals
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-border/50">
          <h4 className="font-semibold mb-2">Quick Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Most Popular Field:</span>
              <p className="font-medium">Software Development (34%)</p>
            </div>
            <div>
              <span className="text-muted-foreground">Average Duration:</span>
              <p className="font-medium">3.2 months</p>
            </div>
            <div>
              <span className="text-muted-foreground">Completion Rate:</span>
              <p className="font-medium text-green-600 dark:text-green-400">
                {overviewData.successRate}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
