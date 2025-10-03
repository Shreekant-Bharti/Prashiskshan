import { BarChart3, TrendingUp, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReportsAnalyticsCard = () => {
  const stats = [
    {
      title: "Total Applications",
      value: "145",
      change: "+12%",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Shortlisted",
      value: "32",
      change: "+8%",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Hired This Month",
      value: "8",
      change: "+3",
      icon: Award,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const topColleges = [
    { name: "IIT Delhi", applicants: 28 },
    { name: "NIT Trichy", applicants: 24 },
    { name: "BITS Pilani", applicants: 19 },
  ];

  const monthlyHires = [
    { month: "Jan", count: 5 },
    { month: "Feb", count: 7 },
    { month: "Mar", count: 8 },
    { month: "Apr", count: 6 },
  ];

  return (
    <Card className="hover:scale-[1.01] hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Reports & Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-lg border-2 hover:border-primary hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className="text-sm font-medium text-green-500">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Top Colleges */}
        <div className="space-y-3">
          <h3 className="font-semibold">Top 3 Colleges by Applicants</h3>
          {topColleges.map((college, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                  {idx + 1}
                </div>
                <span className="font-medium">{college.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{college.applicants} applicants</span>
            </div>
          ))}
        </div>

        {/* Monthly Hires Chart */}
        <div className="space-y-3">
          <h3 className="font-semibold">Hires per Month</h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {monthlyHires.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-primary to-purple-600 rounded-t-lg hover:scale-105 transition-transform"
                  style={{ height: `${(data.count / 10) * 100}%`, minHeight: "20%" }}
                >
                  <div className="flex items-start justify-center pt-2">
                    <span className="text-xs font-bold text-primary-foreground">{data.count}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsAnalyticsCard;
