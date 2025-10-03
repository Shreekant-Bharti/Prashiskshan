import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, GraduationCap, Code, Plus, X, Phone, Mail, Award, Github, Linkedin, Calendar, MapPin, FileText, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import studentPhoto from "@/assets/student-profile.png";

export const ProfileCard = () => {
  const [open, setOpen] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<string | null>(null);

  const profile = {
    name: "Sneha Kumari",
    college: "BIT Sindri",
    semester: "5th",
    email: "student1@campus.com",
    enrollment: "BIT/2022/1234",
    phone: "+91 98765 43210",
    dob: "15 March 2003",
    cgpa: "8.5",
    address: "Dhanbad, Jharkhand",
    expectedGraduation: "May 2026",
    github: "github.com/snehakumari",
    linkedin: "linkedin.com/in/snehakumari",
    resume: "Resume_Sneha_Kumari.pdf",
    previousExperience: "Web Development Intern at TechStartup (Summer 2024)"
  };

  // Load skills and resume from localStorage on mount
  useEffect(() => {
    const savedSkills = localStorage.getItem("student_skills");
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    } else {
      // Default skills
      const defaultSkills = ["C++", "Python", "Web Dev", "React", "Node.js"];
      setSkills(defaultSkills);
      localStorage.setItem("student_skills", JSON.stringify(defaultSkills));
    }

    const savedResume = localStorage.getItem("student_resume");
    if (savedResume) {
      setResumeFile(savedResume);
    }
  }, []);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      localStorage.setItem("student_skills", JSON.stringify(updatedSkills));
      setNewSkill("");
      setShowSkillForm(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    localStorage.setItem("student_skills", JSON.stringify(updatedSkills));
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        const fileName = file.name;
        setResumeFile(fileName);
        localStorage.setItem("student_resume", fileName);
      } else {
        alert("Please upload a PDF file only");
      }
    }
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    localStorage.removeItem("student_resume");
  };

  return (
    <>
      <Card 
        className="rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-primary/20 bg-gradient-to-br from-card via-card to-primary/5"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <User className="w-5 h-5" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={studentPhoto} 
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover shadow-glow border-2 border-primary/20"
            />
            <div>
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.college}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-accent" />
            <span>Semester: <strong>{profile.semester}</strong></span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Code className="w-4 h-4 text-primary" />
                <span className="font-medium">Technical Skills:</span>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSkillForm(!showSkillForm);
                }}
                className="h-7 px-2"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {showSkillForm && (
              <div className="p-3 rounded-lg bg-muted/50 space-y-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <Label htmlFor="new-skill" className="text-xs">Add New Skill</Label>
                <div className="flex gap-2">
                  <Input
                    id="new-skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g., JavaScript"
                    className="h-8 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button size="sm" onClick={handleAddSkill} className="h-8">
                    Add
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill) => (
                <Badge key={skill} className="bg-primary text-primary-foreground font-medium">
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge className="bg-secondary text-secondary-foreground">
                  +{skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-primary text-2xl">Student Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img 
                src={studentPhoto} 
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover shadow-glow border-4 border-primary/20"
              />
              <div>
                <h3 className="text-2xl font-bold">{profile.name}</h3>
                <p className="text-muted-foreground">{profile.college}</p>
                <p className="text-sm text-muted-foreground">Enrollment: {profile.enrollment}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Email</p>
                </div>
                <p className="font-semibold text-sm">{profile.email}</p>
              </div>
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-accent" />
                  <p className="text-sm text-muted-foreground">Semester</p>
                </div>
                <p className="font-semibold">{profile.semester}</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-secondary" />
                  <p className="text-sm text-muted-foreground">Phone</p>
                </div>
                <p className="font-semibold text-sm">{profile.phone}</p>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">CGPA</p>
                </div>
                <p className="font-semibold">{profile.cgpa} / 10.0</p>
              </div>
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-accent" />
                  <p className="text-sm text-muted-foreground">Expected Graduation</p>
                </div>
                <p className="font-semibold text-sm">{profile.expectedGraduation}</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <p className="text-sm text-muted-foreground">Location</p>
                </div>
                <p className="font-semibold text-sm">{profile.address}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Professional Links</h4>
              <div className="grid gap-3">
                <div className="p-3 rounded-lg bg-muted/50 border border-border flex items-center gap-3 hover:border-primary/50 transition-smooth">
                  <Github className="w-5 h-5 text-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">GitHub</p>
                    <p className="text-sm font-medium">{profile.github}</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border flex items-center gap-3 hover:border-primary/50 transition-smooth">
                  <Linkedin className="w-5 h-5 text-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">LinkedIn</p>
                    <p className="text-sm font-medium">{profile.linkedin}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-secondary" />
                Previous Experience
              </h4>
              <p className="text-sm text-muted-foreground">{profile.previousExperience}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Resume
                </h4>
              </div>
              
              {resumeFile ? (
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">{resumeFile}</p>
                        <p className="text-xs text-muted-foreground">PDF Document</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={handleRemoveResume}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-smooth bg-muted/30">
                  <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-sm font-medium">Upload Resume</p>
                      <p className="text-xs text-muted-foreground">PDF format only (Max 5MB)</p>
                    </div>
                  </label>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Technical Skills
                </h4>
                <Button 
                  size="sm" 
                  onClick={() => setShowSkillForm(!showSkillForm)}
                  className="gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Skill
                </Button>
              </div>
              
              {showSkillForm && (
                <div className="p-4 rounded-lg bg-muted/50 space-y-3 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="modal-skill">Skill Name</Label>
                    <Input
                      id="modal-skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g., JavaScript, React, SQL"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddSkill();
                        }
                      }}
                    />
                  </div>
                  <Button onClick={handleAddSkill} className="w-full">
                    Add Skill
                  </Button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    className="px-4 py-2 text-sm bg-gradient-primary text-white hover:opacity-90 transition-smooth group relative"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">Profile Completion</p>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-primary h-3 rounded-full transition-smooth" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">85% Complete</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
