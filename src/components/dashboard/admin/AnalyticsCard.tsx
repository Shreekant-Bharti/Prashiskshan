import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, TrendingUp, Users } from "lucide-react";

const analyticsData = {
  fieldDistribution: [
    { field: "Software Development", count: 45, percentage: 34 },
    { field: "Data Science", count: 28, percentage: 21 },
    { field: "Marketing", count: 22, percentage: 17 },
    { field: "Finance", count: 18, percentage: 14 },
    { field: "Design", count: 12, percentage: 9 },
    { field: "Others", count: 7, percentage: 5 },
  ],
  semesterWise: [
    { semester: "5th", students: 45 },
    { semester: "6th", students: 67 },
    { semester: "7th", students: 89 },
    { semester: "8th", students: 66 },
  ],
  completionRates: {
    overall: 87.5,
    thisMonth: 92.3,
    trend: "+5.2%",
  },
};

export const AnalyticsCard = () => {
  return (
    <Card className="rounded-2xl shadow-elegant border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <BarChart className="w-5 h-5" />
          Analytics & Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Field Distribution */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Popular Internship Fields
          </h4>
          <div className="space-y-2">
            {analyticsData.fieldDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{item.field}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Semester-wise Participation */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Semester-wise Participation
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {analyticsData.semesterWise.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-secondary/10 border border-secondary/20"
              >
                <div className="text-center">
                  <p className="text-lg font-bold text-secondary">
                    {item.students}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.semester} Semester
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Rates */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800/30">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            Completion Rates
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {analyticsData.completionRates.overall}%
              </p>
              <p className="text-xs text-muted-foreground">Overall</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {analyticsData.completionRates.thisMonth}%
              </p>
              <p className="text-xs text-muted-foreground">This Month</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {analyticsData.completionRates.trend}
              </p>
              <p className="text-xs text-muted-foreground">Trend</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-center">
            <p className="text-lg font-bold text-accent">2.8</p>
            <p className="text-xs text-muted-foreground">
              Avg Applications/Student
            </p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
            <p className="text-lg font-bold text-primary">4.2</p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
