import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "motion/react";
import {
  LogOut,
  Users,
  CheckCircle,
  XCircle,
  FileText,
  BarChart3,
  MessageSquare,
  Building,
  User,
  Bell,
  TrendingUp,
  Calendar,
  Shield,
} from "lucide-react";

// Import admin components
import UserManagementCard from "../components/admin/UserManagementCard";
import InternshipApprovalsCard from "../components/admin/InternshipApprovalsCard";
import ReportsAnalyticsCard from "../components/admin/ReportsAnalyticsCard";
import PublishNoticeCard from "../components/admin/PublishNoticeCard";
import ApprovalHistoryCard from "../components/admin/ApprovalHistoryCard";
import FeedbackComplaintsCard from "../components/admin/FeedbackComplaintsCard";
import CollegeManagementCard from "../components/admin/CollegeManagementCard";
import AdminProfileCard from "../components/admin/AdminProfileCard";

// Dummy data - declared outside component for persistence
const DUMMY_PENDING_USERS = {
  students: [
    {
      id: 1,
      name: "Sneha Kumari",
      email: "sneha@college.edu",
      college: "MIT Manipal",
      course: "B.Tech CSE",
      semester: "6th",
    },
    {
      id: 2,
      name: "Ravi Kumar",
      email: "ravi@college.edu",
      college: "VIT Chennai",
      course: "B.Tech ECE",
      semester: "4th",
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya@college.edu",
      college: "BITS Pilani",
      course: "B.Tech IT",
      semester: "5th",
    },
  ],
  faculty: [
    {
      id: 1,
      name: "Dr. Sharma",
      email: "sharma@college.edu",
      college: "MIT Manipal",
      department: "Computer Science",
      experience: "10 years",
    },
    {
      id: 2,
      name: "Prof. Verma",
      email: "verma@college.edu",
      college: "VIT Chennai",
      department: "Electronics",
      experience: "8 years",
    },
  ],
  industry: [
    {
      id: 1,
      name: "Infosys Ltd",
      email: "hr@infosys.com",
      type: "IT Services",
      size: "500+",
      location: "Bangalore",
    },
    {
      id: 2,
      name: "TCS",
      email: "careers@tcs.com",
      type: "IT Consulting",
      size: "500+",
      location: "Mumbai",
    },
  ],
};

const DUMMY_INTERNSHIPS = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    company: "Infosys Ltd",
    duration: "6 months",
    stipend: "₹25,000/month",
    skills: ["React", "Node.js", "MongoDB"],
    college: "MIT Manipal",
    description: "Work on real-world projects using modern web technologies",
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "TCS",
    duration: "4 months",
    stipend: "₹30,000/month",
    skills: ["Python", "Machine Learning", "SQL"],
    college: "VIT Chennai",
    description: "Analyze large datasets and build predictive models",
  },
  {
    id: 3,
    title: "Frontend Developer Intern",
    company: "Wipro",
    duration: "3 months",
    stipend: "₹20,000/month",
    skills: ["React", "TypeScript", "CSS"],
    college: "BITS Pilani",
    description: "Create responsive and interactive user interfaces",
  },
];

const DUMMY_FEEDBACK = [
  {
    id: 1,
    type: "complaint",
    user: "Ravi Kumar",
    message: "Login issue - unable to access student portal",
    status: "pending",
  },
  {
    id: 2,
    type: "feedback",
    user: "Dr. Sharma",
    message: "Internship listings not visible in faculty dashboard",
    status: "pending",
  },
  {
    id: 3,
    type: "complaint",
    user: "Priya Sharma",
    message: "Application submission failed multiple times",
    status: "resolved",
  },
];

const DUMMY_HISTORY = [
  {
    id: 1,
    action: "Student Sneha Kumari approved",
    date: "Oct 2, 2025",
    type: "approval",
  },
  {
    id: 2,
    action: "Industry Infosys internship rejected",
    date: "Sep 28, 2025",
    type: "rejection",
  },
  {
    id: 3,
    action: "Faculty Dr. Sharma approved",
    date: "Sep 25, 2025",
    type: "approval",
  },
  {
    id: 4,
    action: "Notice published: New internship guidelines",
    date: "Sep 20, 2025",
    type: "notice",
  },
];

const AdminDashboard = () => {
  console.log("🔍 AdminDashboard: Component mounted and loaded");

  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // State for dynamic data
  const [pendingUsers, setPendingUsers] = useState(DUMMY_PENDING_USERS);
  const [activeUsers, setActiveUsers] = useState({
    students: [],
    faculty: [],
    industry: [],
  });
  const [rejectedUsers, setRejectedUsers] = useState({
    students: [],
    faculty: [],
    industry: [],
  });
  const [pendingInternships, setPendingInternships] =
    useState(DUMMY_INTERNSHIPS);
  const [approvedInternships, setApprovedInternships] = useState([]);
  const [rejectedInternships, setRejectedInternships] = useState([]);
  const [feedback, setFeedback] = useState(DUMMY_FEEDBACK);
  const [approvalHistory, setApprovalHistory] = useState([
    {
      id: 1,
      type: "user" as const,
      itemTitle: "Student Registration - Sneha Kumari",
      applicantName: "Sneha Kumari",
      action: "approved" as const,
      actionBy: "Admin",
      actionDate: "2024-01-18T14:30:00Z",
      priority: "medium" as const,
    },
    {
      id: 2,
      type: "internship" as const,
      itemTitle: "Software Developer Intern at Infosys",
      applicantName: "Ravi Kumar",
      action: "pending" as const,
      actionBy: "Admin",
      actionDate: "2024-01-19T09:15:00Z",
      priority: "high" as const,
    },
    {
      id: 3,
      type: "notice" as const,
      itemTitle: "Placement Drive Notice",
      applicantName: "System",
      action: "approved" as const,
      actionBy: "Admin",
      actionDate: "2024-01-17T10:00:00Z",
      priority: "low" as const,
    },
  ]);

  // Additional component states
  const [pendingApplications, setPendingApplications] = useState([
    {
      id: 1,
      studentName: "Sneha Kumari",
      studentId: "CS2021001",
      companyName: "Infosys Ltd",
      position: "Full Stack Developer Intern",
      duration: "6 months",
      startDate: "2024-02-01",
      stipend: 25000,
      documents: ["resume.pdf", "cover_letter.pdf", "transcript.pdf"],
      status: "pending" as const,
      submissionDate: "2024-01-15",
      priority: "high" as const,
    },
  ]);

  const [approvedApplications, setApprovedApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);

  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 4750,
    activeUsers: 4200,
    totalInternships: 245,
    approvedInternships: 120,
    monthlyRegistrations: [
      { month: "Jan", count: 245 },
      { month: "Feb", count: 198 },
      { month: "Mar", count: 289 },
      { month: "Apr", count: 321 },
    ],
    internshipsByCategory: [
      { category: "Software Development", count: 89 },
      { category: "Data Science", count: 67 },
      { category: "Marketing", count: 45 },
      { category: "Design", count: 32 },
    ],
    userGrowth: [
      { period: "Q1 2024", growth: 15.2 },
      { period: "Q4 2023", growth: 12.8 },
    ],
    topColleges: [
      { name: "MIT Manipal", students: 456 },
      { name: "VIT Chennai", students: 389 },
      { name: "BITS Pilani", students: 234 },
    ],
    topCompanies: [
      { name: "Infosys", internships: 45 },
      { name: "TCS", internships: 38 },
      { name: "Wipro", internships: 29 },
    ],
  });

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Placement Drive Announcement",
      content:
        "Major placement drive scheduled for next month with 50+ companies participating.",
      priority: "high" as const,
      targetAudience: ["Students", "Faculty"],
      scheduledDate: "2024-01-20T10:00:00Z",
      expiryDate: "2024-02-20T23:59:59Z",
      status: "published" as const,
      createdBy: "Admin",
      createdAt: "2024-01-15T08:00:00Z",
      viewCount: 234,
    },
  ]);

  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      type: "feedback" as const,
      title: "Great platform for internships",
      content:
        "The platform is very user-friendly and helped me find a great internship opportunity.",
      rating: 5,
      category: "Platform",
      priority: "low" as const,
      status: "open" as const,
      submittedBy: "Sneha Kumari",
      userType: "student" as const,
      submittedAt: "2024-01-15T12:00:00Z",
    },
  ]);

  const [colleges, setColleges] = useState([
    {
      id: 1,
      name: "MIT Manipal",
      location: "Manipal, Karnataka",
      type: "engineering" as const,
      accreditation: "NAAC A+",
      contactEmail: "info@manipal.edu",
      contactPhone: "+91 820 2570 100",
      website: "https://www.manipal.edu",
      totalStudents: 15000,
      activeFaculty: 800,
      status: "active" as const,
      addedDate: "2023-08-15T00:00:00Z",
      lastUpdated: "2024-01-10T00:00:00Z",
    },
  ]);

  const [adminProfile, setAdminProfile] = useState({
    id: "admin001",
    name: "Admin User",
    email: "admin@campus2career.com",
    phone: "+91 98765 43210",
    role: "System Administrator",
    department: "IT Administration",
    joinDate: "2023-01-15T00:00:00Z",
    lastLogin: "2024-01-20T08:30:00Z",
    avatar: "",
    permissions: [
      "User Management",
      "Content Management",
      "System Settings",
      "Reports",
      "Security",
    ],
    preferences: {
      theme: "light" as const,
      notifications: true,
      emailUpdates: true,
      language: "en",
      timezone: "Asia/Kolkata",
    },
  });

  // Stats state
  const [stats, setStats] = useState({
    studentsRegistered: 4500,
    industriesRegistered: 250,
    internshipsApproved: 120,
    applicationsSubmitted: 5000,
  });

  useEffect(() => {
    console.log("🔍 AdminDashboard: Checking authentication...");

    // Check authentication
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    const email = localStorage.getItem("adminEmail");

    if (isLoggedIn !== "true" || !email) {
      console.log("❌ AdminDashboard: Not authenticated, redirecting to login");
      toast.error("Please login to access admin dashboard");
      navigate("/admin");
      return;
    }

    console.log("✅ AdminDashboard: Authenticated successfully");
    setAdminEmail(email);

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    console.log("🚪 AdminDashboard: Logging out...");

    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminLoginTime");

    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const playSuccessSound = () => {
    // Create success sound
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log("Could not play sound:", error);
    }
  };

  // Check if not authenticated, don't render dashboard
  if (!localStorage.getItem("isAdminLoggedIn")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600">Access Denied</h2>
          <p className="text-gray-500">
            Please login to access admin dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      {/* Debug indicator */}
      <h1 className="fixed top-4 left-4 text-sm font-mono text-violet-600 bg-white px-3 py-1 rounded-full shadow z-50">
        🛡️ AdminDashboard Loaded - {currentTime.toLocaleTimeString()}
      </h1>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg border-b border-violet-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-violet-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-500">
                  Campus2Career - Prashiskshan
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {adminEmail}
                </p>
                <p className="text-xs text-gray-500">
                  {currentTime.toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-6 mb-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h2>
          <p className="opacity-90">
            Manage your campus internship ecosystem efficiently
          </p>
        </motion.div>

        {/* Dashboard Cards Grid - All functional components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <UserManagementCard
            pendingUsers={pendingUsers}
            setPendingUsers={setPendingUsers}
            activeUsers={activeUsers}
            setActiveUsers={setActiveUsers}
            rejectedUsers={rejectedUsers}
            setRejectedUsers={setRejectedUsers}
            playSuccessSound={playSuccessSound}
          />

          <InternshipApprovalsCard
            pendingApplications={pendingApplications}
            setPendingApplications={setPendingApplications}
            approvedApplications={approvedApplications}
            setApprovedApplications={setApprovedApplications}
            rejectedApplications={rejectedApplications}
            setRejectedApplications={setRejectedApplications}
            playSuccessSound={playSuccessSound}
          />

          <ReportsAnalyticsCard
            analyticsData={analyticsData}
            setAnalyticsData={setAnalyticsData}
            playSuccessSound={playSuccessSound}
          />

          <PublishNoticeCard
            notices={notices}
            setNotices={setNotices}
            playSuccessSound={playSuccessSound}
          />

          <ApprovalHistoryCard
            approvalHistory={approvalHistory}
            setApprovalHistory={setApprovalHistory}
            playSuccessSound={playSuccessSound}
          />

          <FeedbackComplaintsCard
            feedbacks={feedbacks}
            setFeedbacks={setFeedbacks}
            playSuccessSound={playSuccessSound}
          />

          <CollegeManagementCard
            colleges={colleges}
            setColleges={setColleges}
            playSuccessSound={playSuccessSound}
          />

          <AdminProfileCard
            adminProfile={adminProfile}
            setAdminProfile={setAdminProfile}
            playSuccessSound={playSuccessSound}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
