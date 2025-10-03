import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { OverviewStatsCard } from "@/components/dashboard/admin/OverviewStatsCard";
import { InternshipManagementCard } from "@/components/dashboard/admin/InternshipManagementCard";
import { CompanyPartnersCard } from "@/components/dashboard/admin/CompanyPartnersCard";
import { RecentApplicationsCard } from "@/components/dashboard/admin/RecentApplicationsCard";
import { AnalyticsCard } from "@/components/dashboard/admin/AnalyticsCard";
import { NotificationCenterCard } from "@/components/dashboard/admin/NotificationCenterCard";
import { StudentEnrollmentCard } from "@/components/dashboard/admin/StudentEnrollmentCard";
import { SystemActivityCard } from "@/components/dashboard/admin/SystemActivityCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Check if admin is logged in via LocalStorage
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    const email = localStorage.getItem("admin_email");

    // Debug logging
    console.log("Admin Dashboard - Auth Check:", {
      isLoggedIn,
      email,
      localStorage: {
        admin_logged_in: localStorage.getItem("admin_logged_in"),
        admin_email: localStorage.getItem("admin_email"),
      },
    });

    if (isLoggedIn === "true" && email) {
      console.log("Admin authenticated successfully");
      setUserEmail(email);
      setLoading(false);
    } else {
      console.log("Admin not authenticated, redirecting to home");
      toast.error("Please login first");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_email");
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold heading-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage the entire internship ecosystem
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="md:col-span-2 lg:col-span-3 xl:col-span-4"
          >
            <OverviewStatsCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="md:col-span-2 lg:col-span-2"
          >
            <InternshipManagementCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="md:col-span-1 lg:col-span-1 xl:col-span-2"
          >
            <CompanyPartnersCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="md:col-span-2 lg:col-span-2"
          >
            <RecentApplicationsCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="md:col-span-1 lg:col-span-1 xl:col-span-2"
          >
            <StudentEnrollmentCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="md:col-span-2 lg:col-span-2"
          >
            <AnalyticsCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="md:col-span-1 lg:col-span-1 xl:col-span-2"
          >
            <NotificationCenterCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="md:col-span-2 lg:col-span-2 xl:col-span-2"
          >
            <SystemActivityCard />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
