import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, TrendingUp, Search, ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const SkillReadinessCard = () => {
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [showResults, setShowResults] = useState(false);

  const modules = [
    { id: 1, name: "C++ Basics", progress: 80, color: "primary" },
    { id: 2, name: "Python Programming", progress: 60, color: "accent" },
    { id: 3, name: "Data Structures", progress: 40, color: "secondary" },
    { id: 4, name: "Web Development", progress: 75, color: "primary" },
    { id: 5, name: "Database Management", progress: 55, color: "accent" }
  ];

  const contentResults: Record<string, any[]> = {
    "web": [
      { id: 1, title: "Full Stack Web Development", platform: "Udemy", type: "Course", rating: "4.8/5" },
      { id: 2, title: "Web Development Bootcamp", platform: "GeeksforGeeks", type: "Tutorial", rating: "4.5/5" },
      { id: 3, title: "Modern Web Development", platform: "Coursera", type: "Specialization", rating: "4.7/5" }
    ],
    "app": [
      { id: 4, title: "Android App Development", platform: "GeeksforGeeks", type: "Course", rating: "4.6/5" },
      { id: 5, title: "iOS Development Masterclass", platform: "Udemy", type: "Course", rating: "4.7/5" },
      { id: 6, title: "React Native Complete Guide", platform: "Physics Wallah", type: "Tutorial", rating: "4.5/5" }
    ],
    "backend": [
      { id: 7, title: "Backend Development with Node.js", platform: "Physics Wallah", type: "Course", rating: "4.8/5" },
      { id: 8, title: "Backend Engineering Fundamentals", platform: "Udemy", type: "Course", rating: "4.6/5" },
      { id: 9, title: "Advanced Backend Systems", platform: "Coursera", type: "Specialization", rating: "4.7/5" }
    ],
    "aiml": [
      { id: 10, title: "AI for Beginners", platform: "Coursera", type: "Course", rating: "4.9/5" },
      { id: 11, title: "Machine Learning A-Z", platform: "Udemy", type: "Course", rating: "4.8/5" },
      { id: 12, title: "Deep Learning Specialization", platform: "GeeksforGeeks", type: "Tutorial", rating: "4.7/5" }
    ]
  };

  const handleSearch = () => {
    if (selectedSkill) {
      setShowResults(true);
    }
  };

  const handleSkillChange = (value: string) => {
    setSelectedSkill(value);
    setShowResults(false); // Hide results when skill changes
  };

  return (
    <>
      <Card 
        className="rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-primary/20 bg-gradient-to-br from-card via-card to-primary/5"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BookOpen className="w-5 h-5" />
            Skill Readiness Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {modules.slice(0, 3).map((module) => (
            <div key={module.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{module.name}</span>
                <span className="text-muted-foreground">{module.progress}%</span>
              </div>
              <Progress value={module.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="heading-primary text-2xl flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Skill Readiness Hub
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Overall Progress</h4>
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div className="text-3xl font-bold heading-primary">
                {Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length)}%
              </div>
              <p className="text-sm text-muted-foreground">Average completion across all modules</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Training Modules</h4>
              {modules.map((module) => (
                <div 
                  key={module.id} 
                  className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 transition-smooth hover:scale-[1.01] duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium">{module.name}</h5>
                    <span className="text-sm font-semibold text-primary">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-3 mb-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{module.progress < 100 ? 'In Progress' : 'Completed'}</span>
                    <span>{module.progress < 100 ? `${100 - module.progress}% remaining` : '✓ Done'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-secondary" />
                <h4 className="font-semibold text-lg">Find Content</h4>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Which tech skill to learn?</label>
                  <Select value={selectedSkill} onValueChange={handleSkillChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="app">App Development</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="aiml">AI/ML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleSearch} 
                  className="w-full"
                  disabled={!selectedSkill}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Content
                </Button>
              </div>

              {showResults && selectedSkill && (
                <div className="mt-4 space-y-3 animate-fade-in">
                  <h5 className="font-medium text-sm text-muted-foreground">Search Results:</h5>
                  {contentResults[selectedSkill].map((result) => (
                    <div 
                      key={result.id}
                      className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-smooth hover:scale-[1.02] duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h6 className="font-semibold text-sm mb-1">{result.title}</h6>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="font-medium text-primary">{result.platform}</span>
                            <span>•</span>
                            <span>{result.type}</span>
                            <span>•</span>
                            <span>⭐ {result.rating}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
