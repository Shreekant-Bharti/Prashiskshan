import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, Trophy, TrendingUp } from "lucide-react";

const analyticsData = {
  studentsHandled: 24,
  completionRate: 87.5,
  averageRating: 4.2,
  skillsImproved: [
    { skill: "Problem Solving", improvement: 85 },
    { skill: "Communication", improvement: 78 },
    { skill: "Technical Skills", improvement: 92 },
    { skill: "Team Work", improvement: 81 },
  ],
  semesterStats: {
    current: { enrolled: 15, completed: 9 },
    previous: { enrolled: 12, completed: 11 },
  },
  topPerformers: 6,
  industryFeedback: 4.6,
};

export const FacultyAnalyticsCard = () => {
  return (
    <Card className="rounded-2xl shadow-elegant border-accent/20 bg-gradient-to-br from-card via-card to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <BarChart className="w-5 h-5" />
          Faculty Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
            <p className="text-2xl font-bold text-primary">
              {analyticsData.studentsHandled}
            </p>
            <p className="text-xs text-muted-foreground">Students Handled</p>
          </div>
          <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {analyticsData.completionRate}%
            </p>
            <p className="text-xs text-muted-foreground">Completion Rate</p>
          </div>
        </div>

        {/* Skills Improvement */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Skills Improved by Students
          </h4>
          <div className="space-y-2">
            {analyticsData.skillsImproved.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{skill.skill}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${skill.improvement}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-10">
                    {skill.improvement}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Semester Comparison */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 border border-border/50">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Semester Comparison
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current Semester</p>
              <p className="text-lg font-bold">
                {analyticsData.semesterStats.current.enrolled} enrolled
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                {analyticsData.semesterStats.current.completed} completed
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Previous Semester</p>
              <p className="text-lg font-bold">
                {analyticsData.semesterStats.previous.enrolled} enrolled
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {analyticsData.semesterStats.previous.completed} completed
              </p>
            </div>
          </div>
        </div>

        {/* Performance Highlights */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-1 text-yellow-600 dark:text-yellow-400" />
            <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {analyticsData.topPerformers}
            </p>
            <p className="text-xs text-muted-foreground">Top Performers</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {analyticsData.industryFeedback}
              </span>
              <div className="flex text-yellow-400 text-sm">
                {"★".repeat(Math.floor(analyticsData.industryFeedback))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Industry Feedback</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
