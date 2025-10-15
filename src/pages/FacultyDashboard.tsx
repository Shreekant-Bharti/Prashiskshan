import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { FacultyProfileCard } from "@/components/dashboard/faculty/FacultyProfileCard";
import { AssignedStudentsCard } from "@/components/dashboard/faculty/AssignedStudentsCard";
import { StudentProgressCard } from "@/components/dashboard/faculty/StudentProgressCard";
import { FeedbackManagementCard } from "@/components/dashboard/faculty/FeedbackManagementCard";
import { FacultyAnalyticsCard } from "@/components/dashboard/faculty/FacultyAnalyticsCard";
import { LogbookReviewCard } from "@/components/dashboard/faculty/LogbookReviewCard";
import { ReportsGenerationCard } from "@/components/dashboard/faculty/ReportsGenerationCard";
import { StudentMeetingsCard } from "@/components/dashboard/faculty/StudentMeetingsCard";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Check if faculty is logged in via LocalStorage
    const isLoggedIn = localStorage.getItem("faculty_logged_in");
    const email = localStorage.getItem("faculty_email");

    if (isLoggedIn === "true" && email) {
      setUserEmail(email);
      setLoading(false);
    } else {
      toast.error("Please login first");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("faculty_logged_in");
    localStorage.removeItem("faculty_email");
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/10 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold heading-primary mb-2">
              Faculty Dashboard
            </h1>
            <p className="text-muted-foreground">
              Guide and monitor student internship progress
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="col-span-1"
          >
            <FacultyProfileCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="col-span-1 md:col-span-2 lg:col-span-2"
          >
            <AssignedStudentsCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="col-span-1 md:col-span-2 lg:col-span-2"
          >
            <StudentProgressCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="col-span-1"
          >
            <FacultyAnalyticsCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="col-span-1 md:col-span-2 lg:col-span-2"
          >
            <FeedbackManagementCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="col-span-1"
          >
            <LogbookReviewCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="col-span-1"
          >
            <ReportsGenerationCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="col-span-1"
          >
            <StudentMeetingsCard />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FacultyDashboard;
