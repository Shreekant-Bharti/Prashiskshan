import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  Users,
  Building2,
  Shield,
  X,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

// Form schemas
const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const adminRegisterSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(2, "Role is required"),
  gender: z.string().min(1, "Please select your gender"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const facultyLoginSchema = z.object({
  collegeId: z.string().min(3, "College ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const facultyRegisterSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  collegeId: z.string().min(3, "College ID is required"),
  department: z.string().min(2, "Department is required"),
  gender: z.string().min(1, "Please select your gender"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Form schemas - Updated for email/password auth
const studentLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const studentRegisterSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  collegeId: z.string().min(3, "College ID is required"),
  semester: z.string().min(1, "Semester is required"),
  gender: z.string().min(1, "Please select your gender"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  skills: z.string().min(1, "Please select your skills"),
  otherSkill: z.string().optional(),
});

const industryLoginSchema = z.object({
  companyEmail: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const industryRegisterSchema = z
  .object({
    companyName: z.string().min(2, "Company name is required"),
    companyEmail: z.string().email("Invalid email address"),
    industryType: z.string().min(1, "Industry type is required"),
    companySize: z.string().min(1, "Company size is required"),
    contactPerson: z.string().min(2, "Contact person name is required"),
    contactNumber: z.string().min(10, "Valid contact number is required"),
    designation: z.string().min(2, "Designation is required"),
    gender: z.string().min(1, "Please select your gender"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    country: z.string().min(2, "Country is required"),
    website: z.string().url("Valid website URL is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PortalType = "admin" | "faculty" | "student" | "industry";

const portals = [
  {
    id: "admin" as PortalType,
    icon: Shield,
    title: "Admin Panel",
    description:
      "Manage the entire ecosystem with comprehensive analytics, reporting, and system controls",
    gradient: "from-violet-500 to-purple-500",
    bgColor: "bg-amber-100 dark:bg-amber-950/30",
  },
  {
    id: "faculty" as PortalType,
    icon: Users,
    title: "Faculty Dashboard",
    description:
      "Monitor student progress, provide mentorship, and track internship outcomes in real-time",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-100 dark:bg-blue-950/30",
  },
  {
    id: "student" as PortalType,
    icon: GraduationCap,
    title: "Student Portal",
    description:
      "Access verified internships, track your progress, and build your career with personalized guidance",
    gradient: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-100 dark:bg-purple-950/30",
  },
  {
    id: "industry" as PortalType,
    icon: Building2,
    title: "Industry Collaboration",
    description:
      "Post opportunities, recruit top talent, and collaborate with educational institutions seamlessly",
    gradient: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-100 dark:bg-emerald-950/30",
  },
];

const playNotificationSound = () => {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.5
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
};

export const LoginCardsSection = () => {
  const [expandedCard, setExpandedCard] = useState<PortalType | null>(null);
  const [showRegister, setShowRegister] = useState<PortalType | null>(null);
  const [showSuccess, setShowSuccess] = useState<PortalType | null>(null);

  const handleCardClick = (portalId: PortalType) => {
    setExpandedCard(expandedCard === portalId ? null : portalId);
    setShowRegister(null);
    setShowSuccess(null);
  };

  const handleRegistrationSuccess = (portalId: PortalType) => {
    playNotificationSound();
    setShowSuccess(portalId);
    setTimeout(() => {
      setShowSuccess(null);
      setExpandedCard(null);
      setShowRegister(null);
    }, 4000);
  };

  return (
    <section
      id="portals"
      className="py-24 bg-gradient-to-b from-background to-muted"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 heading-portals">
            Choose Your Portal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access the platform designed specifically for your role in the
            career development ecosystem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {portals.map((portal, index) => (
            <PortalCard
              key={portal.id}
              portal={portal}
              index={index}
              isExpanded={expandedCard === portal.id}
              showRegister={showRegister === portal.id}
              showSuccess={showSuccess === portal.id}
              onCardClick={handleCardClick}
              onToggleRegister={() =>
                setShowRegister(showRegister === portal.id ? null : portal.id)
              }
              onRegistrationSuccess={handleRegistrationSuccess}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface PortalCardProps {
  portal: (typeof portals)[0];
  index: number;
  isExpanded: boolean;
  showRegister: boolean;
  showSuccess: boolean;
  onCardClick: (id: PortalType) => void;
  onToggleRegister: () => void;
  onRegistrationSuccess: (id: PortalType) => void;
}

const PortalCard = ({
  portal,
  index,
  isExpanded,
  showRegister,
  showSuccess,
  onCardClick,
  onToggleRegister,
  onRegistrationSuccess,
}: PortalCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      animate={{
        scale: isExpanded ? 1.02 : 1,
      }}
      className={`${
        portal.bgColor
      } rounded-3xl p-6 relative overflow-hidden border border-border shadow-lg transition-all duration-300 ${
        isExpanded ? "col-span-1 md:col-span-2 lg:col-span-2" : ""
      }`}
    >
      {/* Gradient Border Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 hover:opacity-10 transition-smooth rounded-3xl pointer-events-none`}
      />

      {!isExpanded && (
        <div onClick={() => onCardClick(portal.id)} className="cursor-pointer">
          {/* Icon with Gradient */}
          <div
            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${portal.gradient} mb-6 hover:shadow-glow transition-smooth`}
          >
            <portal.icon className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold mb-3 text-foreground hover:text-primary transition-smooth">
            {portal.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed">
            {portal.description}
          </p>

          {/* Hover Arrow */}
          <div className="mt-6 flex items-center text-primary transition-smooth">
            <span className="text-sm font-semibold">Access Portal</span>
            <svg
              className="w-5 h-5 ml-2 transition-smooth"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${portal.gradient}`}
                >
                  <portal.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {portal.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onCardClick(portal.id)}
                className="hover:bg-foreground/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {showSuccess ? (
              <SuccessMessage portal={portal} />
            ) : showRegister ? (
              <RegistrationForm
                portal={portal}
                onSuccess={() => onRegistrationSuccess(portal.id)}
                onBack={onToggleRegister}
              />
            ) : (
              <LoginForm portal={portal} onRegisterClick={onToggleRegister} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SuccessMessage = ({ portal }: { portal: (typeof portals)[0] }) => {
  const messages = {
    admin: "Thank you for registration. We'll get back to you soon.",
    faculty: "Thank you for registration. Please wait for Admin approval.",
    student: "Thank you for registration. Please wait for Admin approval.",
    industry: "Thank you for registration. We'll get back to you soon.",
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-gradient-to-br ${portal.gradient} p-8 rounded-2xl text-center text-white shadow-glow`}
    >
      <CheckCircle className="w-16 h-16 mx-auto mb-4" />
      <h4 className="text-2xl font-bold mb-2">Success!</h4>
      <p className="text-white/90">{messages[portal.id]}</p>
    </motion.div>
  );
};

const LoginForm = ({
  portal,
  onRegisterClick,
}: {
  portal: (typeof portals)[0];
  onRegisterClick: () => void;
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getSchema = () => {
    switch (portal.id) {
      case "admin":
        return adminLoginSchema;
      case "faculty":
        return facultyLoginSchema;
      case "student":
        return studentLoginSchema;
      case "industry":
        return industryLoginSchema;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(getSchema()),
  });

  const onSubmit = async (data: any) => {
    console.log("Form submitted for portal:", portal.id, "with data:", data);

    if (portal.id === "student") {
      setLoading(true);
      const DUMMY = { email: "student1@campus.com", password: "Student@123" };
      setTimeout(() => {
        const email = String(data.email || "")
          .trim()
          .toLowerCase();
        if (email === DUMMY.email && data.password === DUMMY.password) {
          localStorage.setItem("student_logged_in", "true");
          localStorage.setItem("student_email", String(data.email));
          toast.success("Welcome back!");
          navigate("/student-dashboard");
        } else {
          toast.error("Invalid email or password");
        }
        setLoading(false);
      }, 500);
    } else if (portal.id === "industry") {
      setLoading(true);
      const DUMMY = { email: "industry1@campus.com", password: "Industry@123" };
      console.log("Industry login attempt:", {
        inputEmail: data.companyEmail,
        inputPassword: data.password,
        expectedEmail: DUMMY.email,
        expectedPassword: DUMMY.password,
      });
      setTimeout(() => {
        const email = String(data.companyEmail || "")
          .trim()
          .toLowerCase();
        console.log("Comparing:", {
          email,
          dummyEmail: DUMMY.email,
          match: email === DUMMY.email,
        });
        if (email === DUMMY.email && data.password === DUMMY.password) {
          localStorage.setItem("isIndustryLoggedIn", "true");
          toast.success("Welcome to Industry Dashboard!");
          navigate("/industry-dashboard");
        } else {
          toast.error(
            "Invalid credentials. Use industry1@campus.com / Industry@123"
          );
        }
        setLoading(false);
      }, 500);
    } else if (portal.id === "admin") {
      setLoading(true);
      const DUMMY = { email: "admin@campus.com", password: "Admin@123" };

      console.log("🔐 Admin login attempt:", {
        timestamp: new Date().toISOString(),
        inputEmail: data.email,
        inputPassword: data.password ? "[PROVIDED]" : "[MISSING]",
        expectedEmail: DUMMY.email,
        expectedPassword: "[HIDDEN]",
      });

      setTimeout(() => {
        const email = String(data.email || "")
          .trim()
          .toLowerCase();
        const password = String(data.password || "");

        console.log("🔍 Comparing admin credentials:", {
          inputEmail: email,
          expectedEmail: DUMMY.email,
          emailMatch: email === DUMMY.email,
          passwordMatch: password === DUMMY.password,
          emailLength: email.length,
          passwordLength: password.length,
        });

        if (email === DUMMY.email && password === DUMMY.password) {
          console.log("✅ Admin login successful, setting localStorage");

          // Set admin session (using the same keys as AdminLogin page)
          localStorage.setItem("isAdminLoggedIn", "true");
          localStorage.setItem("adminEmail", String(data.email));
          localStorage.setItem("adminLoginTime", new Date().toISOString());

          // Verify localStorage was set
          const verification = {
            isAdminLoggedIn: localStorage.getItem("isAdminLoggedIn"),
            adminEmail: localStorage.getItem("adminEmail"),
            timestamp: new Date().toISOString(),
          };

          console.log("✅ localStorage verification:", verification);

          toast.success("🎉 Welcome to Admin Dashboard!");

          // Navigate directly to admin dashboard
          console.log("🚀 Navigating to /admin/dashboard");
          navigate("/admin/dashboard");
        } else {
          console.log("❌ Admin login failed - credential mismatch");
          console.log("❌ Failed because:", {
            emailMismatch: email !== DUMMY.email,
            passwordMismatch: password !== DUMMY.password,
            providedEmail: email,
            providedPasswordLength: password.length,
          });
          toast.error(
            "❌ Invalid credentials. Use admin@campus.com / Admin@123"
          );
        }
        setLoading(false);
      }, 500);
    } else if (portal.id === "faculty") {
      setLoading(true);
      const DUMMY = { collegeId: "FAC001", password: "Faculty@123" };
      setTimeout(() => {
        const collegeId = String(data.collegeId || "").trim();
        if (collegeId === DUMMY.collegeId && data.password === DUMMY.password) {
          localStorage.setItem("faculty_logged_in", "true");
          localStorage.setItem("faculty_email", "faculty@campus.com");
          toast.success("Welcome to Faculty Dashboard!");
          navigate("/faculty-dashboard");
        } else {
          toast.error("Invalid credentials. Use FAC001 / Faculty@123");
        }
        setLoading(false);
      }, 500);
    } else {
      console.log("Login data:", data);
      toast.info("This portal is for demonstration only");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {portal.id === "student" ? (
        <div className="space-y-2">
          <Label htmlFor={`${portal.id}-email`}>Email</Label>
          <Input
            id={`${portal.id}-email`}
            type="email"
            placeholder="student1@campus.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">
              {errors.email.message as string}
            </p>
          )}
        </div>
      ) : portal.id === "admin" ? (
        <div className="space-y-2">
          <Label htmlFor={`${portal.id}-email`}>Email</Label>
          <Input
            id={`${portal.id}-email`}
            type="email"
            placeholder="admin@campus.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">
              {errors.email.message as string}
            </p>
          )}
        </div>
      ) : portal.id === "industry" ? (
        <div className="space-y-2">
          <Label htmlFor={`${portal.id}-companyEmail`}>Company Email</Label>
          <Input
            id={`${portal.id}-companyEmail`}
            type="email"
            placeholder="industry1@campus.com"
            {...register("companyEmail")}
          />
          {errors.companyEmail && (
            <p className="text-sm text-destructive">
              {errors.companyEmail.message as string}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor={`${portal.id}-collegeId`}>College ID</Label>
          <Input
            id={`${portal.id}-collegeId`}
            placeholder="FAC001"
            {...register("collegeId")}
          />
          {errors.collegeId && (
            <p className="text-sm text-destructive">
              {errors.collegeId.message as string}
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor={`${portal.id}-password`}>Password</Label>
        <Input
          id={`${portal.id}-password`}
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-destructive">
            {errors.password.message as string}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>

      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onRegisterClick}
          className="text-sm text-primary hover:underline font-medium"
        >
          Don't have an account? Register here
        </button>
      </div>
    </form>
  );
};

const RegistrationForm = ({
  portal,
  onSuccess,
  onBack,
}: {
  portal: (typeof portals)[0];
  onSuccess: () => void;
  onBack: () => void;
}) => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loading, setLoading] = useState(false);

  const getSchema = () => {
    switch (portal.id) {
      case "admin":
        return adminRegisterSchema;
      case "faculty":
        return facultyRegisterSchema;
      case "student":
        return studentRegisterSchema;
      case "industry":
        return industryRegisterSchema;
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(getSchema()),
  });

  const onSubmit = async (data: any) => {
    if (portal.id === "student") {
      setLoading(true);
      setTimeout(() => {
        toast.success(
          "Registration successful! Please login using the dummy credentials."
        );
        onSuccess();
        setLoading(false);
      }, 600);
    } else {
      console.log("Registration data:", data);
      toast.info("This portal is for demonstration only");
      onSuccess();
    }
  };
  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-h-[600px] overflow-y-auto pr-2"
    >
      {portal.id === "admin" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role / Permissions</Label>
            <Input
              id="role"
              placeholder="e.g., Super Admin"
              {...register("role")}
            />
            {errors.role && (
              <p className="text-sm text-destructive">
                {errors.role.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="admin-male" />
                    <Label
                      htmlFor="admin-male"
                      className="cursor-pointer font-normal"
                    >
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="admin-female" />
                    <Label
                      htmlFor="admin-female"
                      className="cursor-pointer font-normal"
                    >
                      Female
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="admin-other" />
                    <Label
                      htmlFor="admin-other"
                      className="cursor-pointer font-normal"
                    >
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <p className="text-sm text-destructive">
                {errors.gender.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
            {errors.dateOfBirth && (
              <p className="text-sm text-destructive">
                {errors.dateOfBirth.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message as string}
              </p>
            )}
          </div>
        </>
      )}

      {portal.id === "faculty" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">
                {errors.fullName.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="faculty@college.edu"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="collegeId">College ID</Label>
            <Input
              id="collegeId"
              placeholder="Your College ID"
              {...register("collegeId")}
            />
            {errors.collegeId && (
              <p className="text-sm text-destructive">
                {errors.collegeId.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              placeholder="e.g., Computer Science"
              {...register("department")}
            />
            {errors.department && (
              <p className="text-sm text-destructive">
                {errors.department.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="faculty-male" />
                    <Label
                      htmlFor="faculty-male"
                      className="cursor-pointer font-normal"
                    >
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="faculty-female" />
                    <Label
                      htmlFor="faculty-female"
                      className="cursor-pointer font-normal"
                    >
                      Female
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="faculty-other" />
                    <Label
                      htmlFor="faculty-other"
                      className="cursor-pointer font-normal"
                    >
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <p className="text-sm text-destructive">
                {errors.gender.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
            {errors.dateOfBirth && (
              <p className="text-sm text-destructive">
                {errors.dateOfBirth.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message as string}
              </p>
            )}
          </div>
        </>
      )}

      {portal.id === "student" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">
                {errors.fullName.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="student@college.edu"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="collegeId">College ID</Label>
            <Input
              id="collegeId"
              placeholder="Your College ID"
              {...register("collegeId")}
            />
            {errors.collegeId && (
              <p className="text-sm text-destructive">
                {errors.collegeId.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Input
              id="semester"
              placeholder="e.g., 5"
              {...register("semester")}
            />
            {errors.semester && (
              <p className="text-sm text-destructive">
                {errors.semester.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Skills / Interests</Label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedSkill(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="C++">C++</SelectItem>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="Angular">Angular</SelectItem>
                    <SelectItem value="Node.js">Node.js</SelectItem>
                    <SelectItem value="SQL">SQL</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="AWS">AWS</SelectItem>
                    <SelectItem value="Azure">Azure</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="Kubernetes">Kubernetes</SelectItem>
                    <SelectItem value="Machine Learning">
                      Machine Learning
                    </SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="Mobile Development">
                      Mobile Development
                    </SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.skills && (
              <p className="text-sm text-destructive">
                {errors.skills.message as string}
              </p>
            )}
          </div>
          {selectedSkill === "Others" && (
            <div className="space-y-2">
              <Label htmlFor="otherSkill">Please specify your skill</Label>
              <Input
                id="otherSkill"
                placeholder="Enter your skill"
                {...register("otherSkill")}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label>Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="student-male" />
                    <Label
                      htmlFor="student-male"
                      className="cursor-pointer font-normal"
                    >
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="student-female" />
                    <Label
                      htmlFor="student-female"
                      className="cursor-pointer font-normal"
                    >
                      Female
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="student-other" />
                    <Label
                      htmlFor="student-other"
                      className="cursor-pointer font-normal"
                    >
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <p className="text-sm text-destructive">
                {errors.gender.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
            {errors.dateOfBirth && (
              <p className="text-sm text-destructive">
                {errors.dateOfBirth.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message as string}
              </p>
            )}
          </div>
        </>
      )}

      {portal.id === "industry" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Your Company Name"
              {...register("companyName")}
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">
                {errors.companyName.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyEmail">Company Email</Label>
            <Input
              id="companyEmail"
              type="email"
              placeholder="contact@company.com"
              {...register("companyEmail")}
            />
            {errors.companyEmail && (
              <p className="text-sm text-destructive">
                {errors.companyEmail.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="industryType">Industry Type</Label>
            <Controller
              name="industryType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.industryType && (
              <p className="text-sm text-destructive">
                {errors.industryType.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Controller
              name="companySize"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.companySize && (
              <p className="text-sm text-destructive">
                {errors.companySize.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person Name</Label>
            <Input
              id="contactPerson"
              placeholder="Full name"
              {...register("contactPerson")}
            />
            {errors.contactPerson && (
              <p className="text-sm text-destructive">
                {errors.contactPerson.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              placeholder="+1234567890"
              {...register("contactNumber")}
            />
            {errors.contactNumber && (
              <p className="text-sm text-destructive">
                {errors.contactNumber.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              placeholder="e.g., HR Manager"
              {...register("designation")}
            />
            {errors.designation && (
              <p className="text-sm text-destructive">
                {errors.designation.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="industry-male" />
                    <Label
                      htmlFor="industry-male"
                      className="cursor-pointer font-normal"
                    >
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="industry-female" />
                    <Label
                      htmlFor="industry-female"
                      className="cursor-pointer font-normal"
                    >
                      Female
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="industry-other" />
                    <Label
                      htmlFor="industry-other"
                      className="cursor-pointer font-normal"
                    >
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <p className="text-sm text-destructive">
                {errors.gender.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
            {errors.dateOfBirth && (
              <p className="text-sm text-destructive">
                {errors.dateOfBirth.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City / Location</Label>
            <Input id="city" placeholder="City name" {...register("city")} />
            {errors.city && (
              <p className="text-sm text-destructive">
                {errors.city.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="State name" {...register("state")} />
            {errors.state && (
              <p className="text-sm text-destructive">
                {errors.state.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Country name"
              {...register("country")}
            />
            {errors.country && (
              <p className="text-sm text-destructive">
                {errors.country.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Company Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://company.com"
              {...register("website")}
            />
            {errors.website && (
              <p className="text-sm text-destructive">
                {errors.website.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Company Logo (Optional)</Label>
            <Input id="logo" type="file" accept="image/*" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mou">MoU / Verification Document (Optional)</Label>
            <Input id="mou" type="file" accept=".pdf,.doc,.docx" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>
        </>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
          disabled={loading}
        >
          Back to Login
        </Button>
        <Button type="submit" className="flex-1" size="lg" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </Button>
      </div>
    </motion.form>
  );
};
