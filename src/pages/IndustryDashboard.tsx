import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CompanyProfileCard from "@/components/dashboard/industry/CompanyProfileCard";
import PostInternshipCard from "@/components/dashboard/industry/PostInternshipCard";
import InternshipListingsCard from "@/components/dashboard/industry/InternshipListingsCard";
import ApplicationsTrackerCard from "@/components/dashboard/industry/ApplicationsTrackerCard";
import ShortlistedCandidatesCard from "@/components/dashboard/industry/ShortlistedCandidatesCard";
import CommunicationHubCard from "@/components/dashboard/industry/CommunicationHubCard";
import ReportsAnalyticsCard from "@/components/dashboard/industry/ReportsAnalyticsCard";
import FeedbackRatingsCard from "@/components/dashboard/industry/FeedbackRatingsCard";
import UpcomingDeadlinesCard from "@/components/dashboard/industry/UpcomingDeadlinesCard";

const IndustryDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isIndustryLoggedIn");
    if (!isLoggedIn) {
      toast.error("Please login first");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isIndustryLoggedIn");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Industry Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Manage internships and connect with talent</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 hover:scale-105 transition-transform duration-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <CompanyProfileCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <PostInternshipCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <InternshipListingsCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-2"
          >
            <ApplicationsTrackerCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ShortlistedCandidatesCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
          >
            <CommunicationHubCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <ReportsAnalyticsCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
          >
            <FeedbackRatingsCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <UpcomingDeadlinesCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IndustryDashboard;
