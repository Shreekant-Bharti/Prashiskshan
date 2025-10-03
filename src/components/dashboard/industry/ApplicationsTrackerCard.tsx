import { useState, useEffect } from "react";
import { FileText, CheckCircle, XCircle, Award, GraduationCap, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Application {
  id: number;
  studentName: string;
  college: string;
  internship: string;
  status: "applied" | "shortlisted" | "hired" | "rejected";
  appliedDate: string;
  cgpa: number | string;
  isYourCollege?: boolean;
  email?: string;
  phone?: string;
  semester?: string;
  skills?: string[];
}

const ApplicationsTrackerCard = () => {
  const [selectedInternship, setSelectedInternship] = useState("all");
  const [selectedResume, setSelectedResume] = useState<Application | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  // Load applications from localStorage
  useEffect(() => {
    const loadApplications = () => {
      const industryApps = JSON.parse(localStorage.getItem("industry_applications") || "[]");
      
      // Transform to Application format
      const formattedApps = industryApps.map((app: any) => ({
        id: app.id,
        studentName: app.studentName,
        college: app.college,
        internship: app.role,
        status: app.status === "pending" ? "applied" : app.status,
        appliedDate: app.appliedDate,
        cgpa: app.cgpa,
        email: app.studentEmail,
        phone: app.phone,
        semester: app.semester,
        skills: app.skills,
        isYourCollege: app.college?.toLowerCase().includes("bit sindri")
      }));
      
      setApplications(formattedApps);
    };

    loadApplications();
    
    // Refresh periodically
    const interval = setInterval(loadApplications, 1000);
    window.addEventListener('storage', loadApplications);
    window.addEventListener('internship-updated', loadApplications);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', loadApplications);
      window.removeEventListener('internship-updated', loadApplications);
    };
  }, []);

  const updateStatus = (id: number, newStatus: Application["status"]) => {
    const app = applications.find(a => a.id === id);
    
    // Update in state
    setApplications(apps =>
      apps.map(app => app.id === id ? { ...app, status: newStatus } : app)
    );

    // Update in localStorage
    const industryApps = JSON.parse(localStorage.getItem("industry_applications") || "[]");
    const updatedApps = industryApps.map((a: any) => 
      a.id === id ? { ...a, status: newStatus === "applied" ? "pending" : newStatus } : a
    );
    localStorage.setItem("industry_applications", JSON.stringify(updatedApps));

    if (newStatus === "hired") {
      toast.success(`Hired successfully and sent email to ${app?.studentName}! 🎉`);
    } else if (newStatus === "shortlisted" && app) {
      // Add to shortlisted candidates in localStorage
      const shortlisted = JSON.parse(localStorage.getItem("shortlisted_candidates") || "[]");
      const newShortlisted = {
        id: app.id,
        name: app.studentName,
        college: app.college,
        internship: app.internship,
        cgpa: app.cgpa,
        skills: app.skills || ["React", "TypeScript", "Node.js", "Database Design"],
        email: app.email || `${app.studentName.toLowerCase().replace(/\s+/g, '.')}@student.edu`,
        phone: app.phone || "+91 98765 43210",
        isYourCollege: app.isYourCollege
      };
      
      if (!shortlisted.find((s: any) => s.id === app.id)) {
        shortlisted.push(newShortlisted);
        localStorage.setItem("shortlisted_candidates", JSON.stringify(shortlisted));
      }
      
      toast.success(`${app.studentName} moved to shortlisted candidates!`);
      
      // Trigger update event for ShortlistedCandidatesCard
      window.dispatchEvent(new Event('storage'));
    } else {
      toast.success(`Application ${newStatus}!`);
    }
  };

  const filteredApplications = selectedInternship === "all"
    ? applications
    : applications.filter(app => app.internship === selectedInternship);

  const getStatusBadge = (status: Application["status"]) => {
    const variants = {
      applied: "secondary",
      shortlisted: "default",
      hired: "default",
      rejected: "destructive",
    };
    return (
      <Badge variant={variants[status] as any} className={
        status === "hired" ? "bg-green-500 hover:bg-green-600" :
        status === "shortlisted" ? "bg-blue-500 hover:bg-blue-600" : ""
      }>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <>
      <Card className="hover:scale-[1.01] hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Applications Tracker
            </CardTitle>
            <Select value={selectedInternship} onValueChange={setSelectedInternship}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by internship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Internships</SelectItem>
                <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-lg border-2 hover:border-primary transition-all duration-300 bg-card"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{app.studentName}</h3>
                      {app.isYourCollege && (
                        <Badge variant="outline" className="text-xs">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          Your College
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{app.college}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="text-muted-foreground">
                        Applied for: <span className="font-medium text-foreground">{app.internship}</span>
                      </span>
                      <span className="text-muted-foreground">CGPA: {app.cgpa}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{app.appliedDate}</p>
                  </div>

                  <div className="flex flex-col gap-2 min-w-[180px]">
                    <div className="flex justify-end">{getStatusBadge(app.status)}</div>
                    {app.status === "applied" && (
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          onClick={() => updateStatus(app.id, "shortlisted")}
                          className="flex-1 hover:scale-105 transition-transform"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Shortlist
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateStatus(app.id, "rejected")}
                          className="flex-1 hover:scale-105 transition-transform"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedResume(app)}
                          className="w-full hover:scale-105 transition-transform"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          View Resume
                        </Button>
                      </div>
                    )}
                    {app.status === "shortlisted" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateStatus(app.id, "hired")}
                          className="bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          Hire
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedResume(app)}
                          className="hover:scale-105 transition-transform"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          View Resume
                        </Button>
                      </>
                    )}
                    {app.status === "hired" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedResume(app)}
                        className="hover:scale-105 transition-transform"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        View Resume
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedResume} onOpenChange={() => setSelectedResume(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedResume?.studentName} - Resume</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedResume(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedResume && (
            <div className="space-y-6 p-6 bg-card rounded-lg border-2">
              {/* Header */}
              <div className="text-center border-b-2 pb-4">
                <h1 className="text-3xl font-bold">{selectedResume.studentName}</h1>
                <p className="text-muted-foreground mt-2">{selectedResume.internship} Intern</p>
                <div className="flex justify-center gap-4 mt-3 text-sm flex-wrap">
                  <span>📧 {selectedResume.studentName.toLowerCase().replace(/\s+/g, '.')}@student.edu</span>
                  <span>📱 +91 98765 43210</span>
                  <span>🎓 {selectedResume.college}</span>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  🎓 Education
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between flex-wrap gap-2">
                    <div>
                      <p className="font-semibold">{selectedResume.college}</p>
                      <p className="text-sm text-muted-foreground">B.Tech in Computer Science Engineering</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">CGPA: {selectedResume.cgpa}</p>
                      <p className="text-sm text-muted-foreground">2021 - 2025</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold">Higher Secondary Education</p>
                    <p className="text-sm text-muted-foreground">Chennai Public School • 95.2% • 2021</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  💡 Technical Skills
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {["React", "TypeScript", "Node.js", "Python", "MySQL", "MongoDB", "Git", "AWS", "Docker", "REST APIs"].map(skill => (
                    <Badge key={skill} variant="secondary" className="justify-center py-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  💼 Experience
                </h2>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4">
                    <div className="flex justify-between flex-wrap gap-2">
                      <p className="font-semibold">Software Developer Intern</p>
                      <p className="text-sm text-muted-foreground">Jun 2024 - Aug 2024</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Tech Startup Pvt. Ltd.</p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Developed responsive web applications using React and TypeScript</li>
                      <li>Implemented RESTful API integrations with 30% performance improvement</li>
                      <li>Collaborated with design team to create pixel-perfect UI components</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  🚀 Projects
                </h2>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4">
                    <p className="font-semibold">E-Commerce Platform</p>
                    <p className="text-sm text-muted-foreground mb-2">React, Node.js, MongoDB</p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Built full-stack e-commerce application with payment integration</li>
                      <li>Implemented user authentication and admin dashboard</li>
                      <li>Achieved 1000+ active users within first month</li>
                    </ul>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <p className="font-semibold">Task Management App</p>
                    <p className="text-sm text-muted-foreground mb-2">React, Firebase, Tailwind CSS</p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Created real-time collaborative task management tool</li>
                      <li>Integrated drag-and-drop functionality for task organization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  🏆 Achievements & Certifications
                </h2>
                <ul className="text-sm space-y-2 list-disc list-inside">
                  <li>Won 1st Prize in National Level Hackathon 2024</li>
                  <li>AWS Certified Cloud Practitioner</li>
                  <li>Google UX Design Professional Certificate</li>
                  <li>Published research paper on Machine Learning in IEEE Conference</li>
                </ul>
              </div>

              {/* Languages */}
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  🌐 Languages
                </h2>
                <div className="flex gap-4 flex-wrap">
                  <Badge variant="outline">English - Fluent</Badge>
                  <Badge variant="outline">Tamil - Native</Badge>
                  <Badge variant="outline">Hindi - Intermediate</Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicationsTrackerCard;
