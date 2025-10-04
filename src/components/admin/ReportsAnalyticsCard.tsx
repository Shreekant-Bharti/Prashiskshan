import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  TrendingUp,
  Users,
  Briefcase,
  Download,
  Calendar,
  Filter,
  RefreshCw,
} from "lucide-react";

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalInternships: number;
  approvedInternships: number;
  monthlyRegistrations: { month: string; count: number }[];
  internshipsByCategory: { category: string; count: number }[];
  userGrowth: { period: string; growth: number }[];
  topColleges: { name: string; students: number }[];
  topCompanies: { name: string; internships: number }[];
}

interface ReportsAnalyticsCardProps {
  analyticsData: AnalyticsData;
  setAnalyticsData: React.Dispatch<React.SetStateAction<AnalyticsData>>;
  playSuccessSound: () => void;
}

const ReportsAnalyticsCard: React.FC<ReportsAnalyticsCardProps> = ({
  analyticsData,
  setAnalyticsData,
  playSuccessSound,
}) => {
  const [activeView, setActiveView] = useState<
    "overview" | "users" | "internships" | "growth"
  >("overview");
  const [dateRange, setDateRange] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data refresh
  const refreshData = async () => {
    setIsLoading(true);
    playSuccessSound();

    // Simulate API call delay
    setTimeout(() => {
      // Update analytics data with some random variations
      setAnalyticsData((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 20),
        approvedInternships:
          prev.approvedInternships + Math.floor(Math.random() * 5),
      }));
      setIsLoading(false);
      console.log("📊 Analytics data refreshed");
    }, 1500);
  };

  // Generate and download report
  const downloadReport = (type: "pdf" | "excel" | "csv") => {
    playSuccessSound();
    console.log(
      `📄 Downloading ${type.toUpperCase()} report for ${dateRange} period`
    );

    // Simulate report generation
    const reportData = {
      type,
      dateRange,
      generatedAt: new Date().toISOString(),
      data: analyticsData,
    };

    // In a real app, this would trigger actual file download
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campus2career-report-${dateRange}-${Date.now()}.${type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-r ${color} p-4 rounded-lg text-white`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <p
              className={`text-xs ${
                change > 0 ? "text-green-200" : "text-red-200"
              }`}
            >
              {change > 0 ? "+" : ""}
              {change}% from last {dateRange}
            </p>
          )}
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </motion.div>
  );

  const ProgressBar = ({
    label,
    value,
    max,
    color,
  }: {
    label: string;
    value: number;
    max: number;
    color: string;
  }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">
          {value}/{max}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Total Users"
          value={analyticsData.totalUsers.toLocaleString()}
          change={12}
          icon={Users}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Active Users"
          value={analyticsData.activeUsers.toLocaleString()}
          change={8}
          icon={TrendingUp}
          color="from-green-500 to-green-600"
        />
        <StatCard
          title="Total Internships"
          value={analyticsData.totalInternships.toLocaleString()}
          change={15}
          icon={Briefcase}
          color="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Approved Applications"
          value={analyticsData.approvedInternships.toLocaleString()}
          change={-3}
          icon={BarChart}
          color="from-orange-500 to-orange-600"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Quick Insights</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>User Engagement Rate:</span>
            <span className="font-medium text-green-600">78.5%</span>
          </div>
          <div className="flex justify-between">
            <span>Internship Success Rate:</span>
            <span className="font-medium text-blue-600">64.2%</span>
          </div>
          <div className="flex justify-between">
            <span>Average Response Time:</span>
            <span className="font-medium text-purple-600">2.3 days</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">User Distribution</h4>
        <ProgressBar
          label="Students"
          value={2840}
          max={3000}
          color="bg-blue-500"
        />
        <ProgressBar
          label="Faculty"
          value={156}
          max={200}
          color="bg-green-500"
        />
        <ProgressBar
          label="Industry Partners"
          value={89}
          max={150}
          color="bg-purple-500"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Top Colleges</h4>
        <div className="space-y-2">
          {analyticsData.topColleges.map((college, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{college.name}</span>
              <span className="font-medium text-blue-600">
                {college.students}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInternships = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Internships by Category</h4>
        <div className="space-y-2">
          {analyticsData.internshipsByCategory.map((category, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{category.category}</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{
                      width: `${
                        (category.count /
                          Math.max(
                            ...analyticsData.internshipsByCategory.map(
                              (c) => c.count
                            )
                          )) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="font-medium text-blue-600 w-8">
                  {category.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Top Companies</h4>
        <div className="space-y-2">
          {analyticsData.topCompanies.map((company, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{company.name}</span>
              <span className="font-medium text-purple-600">
                {company.internships}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGrowth = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Monthly Registrations</h4>
        <div className="space-y-2">
          {analyticsData.monthlyRegistrations.map((month, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{month.month}</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{
                      width: `${
                        (month.count /
                          Math.max(
                            ...analyticsData.monthlyRegistrations.map(
                              (m) => m.count
                            )
                          )) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="font-medium text-green-600 w-8">
                  {month.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Growth Trends</h4>
        <div className="space-y-2">
          {analyticsData.userGrowth.map((period, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{period.period}</span>
              <span
                className={`font-medium ${
                  period.growth > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {period.growth > 0 ? "+" : ""}
                {period.growth}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart className="w-8 h-8 text-indigo-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Reports & Analytics</h3>
            <p className="text-sm text-gray-600">
              View detailed system analytics and reports
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshData}
            disabled={isLoading}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </motion.button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
        {[
          { key: "week", label: "Week" },
          { key: "month", label: "Month" },
          { key: "quarter", label: "Quarter" },
          { key: "year", label: "Year" },
        ].map((range) => (
          <button
            key={range.key}
            onClick={() => setDateRange(range.key as typeof dateRange)}
            className={`flex-1 px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
              dateRange === range.key
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* View Tabs */}
      <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
        {[
          { key: "overview", label: "Overview", icon: BarChart },
          { key: "users", label: "Users", icon: Users },
          { key: "internships", label: "Internships", icon: Briefcase },
          { key: "growth", label: "Growth", icon: TrendingUp },
        ].map((view) => (
          <button
            key={view.key}
            onClick={() => setActiveView(view.key as typeof activeView)}
            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeView === view.key
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <view.icon className="w-4 h-4 mr-1" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="max-h-80 overflow-y-auto">
        {activeView === "overview" && renderOverview()}
        {activeView === "users" && renderUsers()}
        {activeView === "internships" && renderInternships()}
        {activeView === "growth" && renderGrowth()}
      </div>

      {/* Download Reports */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Export Reports:
          </span>
          <div className="flex space-x-2">
            {["pdf", "excel", "csv"].map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => downloadReport(type as "pdf" | "excel" | "csv")}
                className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
              >
                <Download className="w-3 h-3 mr-1" />
                {type.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportsAnalyticsCard;
