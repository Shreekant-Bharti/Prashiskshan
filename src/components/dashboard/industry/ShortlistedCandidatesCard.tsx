import { useState, useEffect } from "react";
import { Star, FileText, Mail, Phone, GraduationCap, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ShortlistedCandidatesCard = () => {
  const [shortlisted, setShortlisted] = useState<any[]>([]);
  const [selectedResume, setSelectedResume] = useState<any | null>(null);

  useEffect(() => {
    // Load from localStorage
    const loadShortlisted = () => {
      const storedShortlisted = JSON.parse(localStorage.getItem("shortlisted_candidates") || "[]");
      setShortlisted(storedShortlisted);
    };

    loadShortlisted();

    // Listen for storage changes and refresh
    const handleStorageChange = () => {
      loadShortlisted();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Refresh every second to catch updates
    const interval = setInterval(loadShortlisted, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <Card className="h-full hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Shortlisted Candidates ({shortlisted.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
        {shortlisted.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No shortlisted candidates yet. Shortlist candidates from Applications Tracker!
          </div>
        ) : (
          shortlisted.map((candidate) => (
            <div
              key={candidate.id}
              className="p-4 rounded-lg border-2 hover:border-primary hover:shadow-md transition-all duration-300 bg-card"
            >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{candidate.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-muted-foreground">{candidate.college}</p>
                  {candidate.isYourCollege && (
                    <Badge variant="outline" className="text-xs">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      Your College
                    </Badge>
                  )}
                </div>
              </div>
              <Badge>CGPA: {candidate.cgpa}</Badge>
            </div>

            <div className="space-y-2 mb-3">
              <p className="text-sm">
                <span className="font-medium">Applied for:</span> {candidate.internship}
              </p>
              <div className="flex flex-wrap gap-1">
                {candidate.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-1 mb-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>{candidate.phone}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full hover:scale-105 transition-transform"
              onClick={() => setSelectedResume(candidate)}
            >
              <FileText className="h-3 w-3 mr-2" />
              View Resume
            </Button>
          </div>
          ))
        )}
      </CardContent>

      <Dialog open={!!selectedResume} onOpenChange={() => setSelectedResume(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedResume?.name} - Resume</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedResume(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedResume && (
            <div className="space-y-6 p-6 bg-card rounded-lg border-2">
              {/* Header */}
              <div className="text-center border-b-2 pb-4">
                <h1 className="text-3xl font-bold">{selectedResume.name}</h1>
                <p className="text-muted-foreground mt-2">{selectedResume.internship} Intern</p>
                <div className="flex justify-center gap-4 mt-3 text-sm flex-wrap">
                  <span>📧 {selectedResume.email}</span>
                  <span>📱 {selectedResume.phone}</span>
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
                  {selectedResume.skills.concat(["Python", "MySQL", "Git", "AWS"]).map((skill: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="justify-center py-2">
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
                      <li>Developed web applications using modern frameworks</li>
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
    </Card>
  );
};

export default ShortlistedCandidatesCard;
