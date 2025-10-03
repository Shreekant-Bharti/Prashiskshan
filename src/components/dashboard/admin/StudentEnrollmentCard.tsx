import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, TrendingUp, Calendar } from "lucide-react";

const enrollmentData = {
  totalStudents: 423,
  enrolledStudents: 267,
  activeStudents: 189,
  graduatedStudents: 78,
  thisMonth: {
    newEnrollments: 23,
    completions: 12,
    trend: "+8.2%",
  },
  byYear: [
    { year: "2nd Year", count: 45 },
    { year: "3rd Year", count: 89 },
    { year: "4th Year", count: 133 },
  ],
  topDepartments: [
    { dept: "Computer Science", count: 156 },
    { dept: "Electronics", count: 67 },
    { dept: "Mechanical", count: 44 },
  ],
};

export const StudentEnrollmentCard = () => {
  const enrollmentPercentage = Math.round(
    (enrollmentData.enrolledStudents / enrollmentData.totalStudents) * 100
  );
  const activePercentage = Math.round(
    (enrollmentData.activeStudents / enrollmentData.enrolledStudents) * 100
  );

  return (
    <Card className="rounded-2xl shadow-elegant border-secondary/20 bg-gradient-to-br from-card via-card to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-secondary">
          <Users className="w-5 h-5" />
          Student Enrollment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {enrollmentData.totalStudents}
              </p>
              <p className="text-xs text-muted-foreground">Total Students</p>
              <div className="mt-2">
                <Badge className="bg-primary/20 text-primary">
                  {enrollmentData.enrolledStudents} enrolled
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 border border-green-200 dark:border-green-800/30">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {enrollmentPercentage}%
              </p>
              <p className="text-xs text-muted-foreground">Enrollment Rate</p>
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  {activePercentage}% active
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* This Month Stats */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 border border-border/50">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            This Month
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-accent">
                {enrollmentData.thisMonth.newEnrollments}
              </p>
              <p className="text-xs text-muted-foreground">New Enrollments</p>
            </div>
            <div>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {enrollmentData.thisMonth.completions}
              </p>
              <p className="text-xs text-muted-foreground">Completions</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                {enrollmentData.thisMonth.trend}
              </p>
              <p className="text-xs text-muted-foreground">Growth</p>
            </div>
          </div>
        </div>

        {/* Year-wise Distribution */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Year-wise Distribution
          </h4>
          <div className="space-y-2">
            {enrollmentData.byYear.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded bg-muted/50"
              >
                <span className="text-sm">{item.year}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full transition-all duration-500"
                      style={{ width: `${(item.count / 133) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Departments */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Top Departments
          </h4>
          <div className="space-y-2">
            {enrollmentData.topDepartments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded bg-muted/50"
              >
                <span className="text-sm">{item.dept}</span>
                <Badge variant="secondary">{item.count}</Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
