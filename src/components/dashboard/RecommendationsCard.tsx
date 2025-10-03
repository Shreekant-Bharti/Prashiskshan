import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Building2, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const RecommendationsCard = () => {
  const [open, setOpen] = useState(false);
  const [appliedIds, setAppliedIds] = useState<number[]>([]);
  const [skillMismatch, setSkillMismatch] = useState<{ id: number; missing: string[] } | null>(null);
  const { toast } = useToast();

  const recommendations = [
    { 
      id: 1, 
      role: "Backend Developer", 
      company: "Amazon", 
      location: "Bangalore",
      duration: "6 months",
      stipend: "₹50,000/mo",
      match: 95,
      skills: ["Python", "Node.js", "AWS"]
    },
    { 
      id: 2, 
      role: "AI Research Intern", 
      company: "Microsoft", 
      location: "Hyderabad",
      duration: "3 months",
      stipend: "₹60,000/mo",
      match: 88,
      skills: ["Python", "Machine Learning", "TensorFlow"]
    },
    { 
      id: 3, 
      role: "Full Stack Developer", 
      company: "Google", 
      location: "Mumbai",
      duration: "4 months",
      stipend: "₹55,000/mo",
      match: 92,
      skills: ["React", "Node.js", "MongoDB"]
    }
  ];

  const handleApply = (recommendation: any) => {
    // Get student skills from localStorage
    const studentSkills = JSON.parse(localStorage.getItem("student_skills") || "[]");
    
    // Normalize skills for comparison (lowercase, trim)
    const normalizedStudentSkills = studentSkills.map((s: string) => s.toLowerCase().trim());
    const normalizedRequiredSkills = recommendation.skills.map((s: string) => s.toLowerCase().trim());
    
    // Check which skills are missing
    const missingSkills = recommendation.skills.filter((skill: string) => {
      const normalizedSkill = skill.toLowerCase().trim();
      return !normalizedStudentSkills.some((studentSkill: string) => {
        // Check for partial matches (e.g., "ML" matches "Machine Learning")
        return studentSkill.includes(normalizedSkill) || normalizedSkill.includes(studentSkill);
      });
    });

    if (missingSkills.length === 0) {
      // Skills match - apply successfully
      const newApplication = {
        id: recommendation.id + 1000, // Unique ID
        role: recommendation.role,
        company: recommendation.company,
        location: recommendation.location,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: "Application Submitted"
      };

      // Get existing applications
      const existingApps = JSON.parse(localStorage.getItem("applied_internships") || "[]");
      existingApps.push(newApplication);
      localStorage.setItem("applied_internships", JSON.stringify(existingApps));

      // Mark as applied
      setAppliedIds([...appliedIds, recommendation.id]);
      setSkillMismatch(null);

      // Show success toast
      toast({
        title: "✅ Application Submitted Successfully!",
        description: `Your application for ${recommendation.role} at ${recommendation.company} has been submitted. Check the Applied section.`,
        className: "bg-green-50 border-green-200",
      });
    } else {
      // Skills don't match
      setSkillMismatch({ id: recommendation.id, missing: missingSkills });

      // Show error toast
      toast({
        title: "❌ Doesn't Fit Your Profile",
        description: `You're missing: ${missingSkills.join(", ")}. Update your skills in the Profile section.`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card 
        className="rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-primary/20 bg-gradient-to-br from-card via-card to-primary/5"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.slice(0, 3).map((rec) => (
            <div key={rec.id} className="p-3 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 border border-border hover:border-primary/50 transition-smooth">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{rec.role}</p>
                  <p className="text-xs text-muted-foreground truncate">{rec.company}</p>
                </div>
                <Badge className="bg-gradient-primary text-white text-xs">
                  {rec.match}%
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="heading-primary text-2xl flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Personalized Recommendations
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Based on your skills and interests, here are the best internship opportunities for you.
            </p>
            {recommendations.map((rec) => (
              <div 
                key={rec.id} 
                className="p-5 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 transition-smooth"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{rec.role}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{rec.company}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-gradient-primary text-white mb-2">
                      {rec.match}% Match
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {rec.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {rec.duration}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {skillMismatch?.id === rec.id && (
                  <Alert className="mb-4 border-destructive/50 bg-destructive/10 animate-fade-in">
                    <XCircle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-sm">
                      <span className="font-semibold">Missing Skills: </span>
                      {skillMismatch.missing.join(", ")}
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  className="w-full bg-gradient-primary text-white hover:opacity-90 transition-smooth"
                  onClick={() => handleApply(rec)}
                  disabled={appliedIds.includes(rec.id)}
                >
                  {appliedIds.includes(rec.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Applied
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
