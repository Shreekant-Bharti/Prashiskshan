import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Award, TrendingUp } from "lucide-react";

export const CreditsTrackerCard = () => {
  const [open, setOpen] = useState(false);

  const credits = {
    earned: 8,
    required: 20,
    percentage: 40,
    breakdown: [
      { category: "Internships", earned: 4, total: 10 },
      { category: "Skill Certifications", earned: 2, total: 4 },
      { category: "Industry Projects", earned: 2, total: 6 }
    ]
  };

  return (
    <>
      <Card 
        className="rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-accent/20 bg-gradient-to-br from-card via-card to-accent/5"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Award className="w-5 h-5" />
            NEP Credits Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="hsl(var(--accent))"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - credits.percentage / 100)}`}
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold heading-accent">{credits.percentage}%</span>
                <span className="text-xs text-muted-foreground">Complete</span>
              </div>
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold">{credits.earned} / {credits.required}</p>
            <p className="text-sm text-muted-foreground">Credits Earned</p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-accent text-2xl flex items-center gap-2">
              <Award className="w-6 h-6" />
              NEP Credits Tracker
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Progress</p>
                <p className="text-4xl font-bold heading-accent">{credits.earned} / {credits.required}</p>
                <p className="text-sm text-muted-foreground mt-1">Credits Earned</p>
              </div>
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="hsl(var(--accent))"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - credits.percentage / 100)}`}
                    className="transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{credits.percentage}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Credits Breakdown
              </h4>
              {credits.breakdown.map((item, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{item.category}</h5>
                    <span className="text-sm font-semibold">{item.earned} / {item.total}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-accent h-2 rounded-full transition-smooth" 
                      style={{ width: `${(item.earned / item.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
