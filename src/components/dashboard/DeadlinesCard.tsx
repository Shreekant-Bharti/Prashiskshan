import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const DeadlinesCard = () => {
  const [open, setOpen] = useState(false);

  const deadlines = [
    { id: 1, title: "Logbook submission", date: "Oct 5, 2025", urgent: true, category: "Internship" },
    { id: 2, title: "Internship report", date: "Oct 15, 2025", urgent: false, category: "Documentation" },
    { id: 3, title: "Quiz on Python", date: "Oct 10, 2025", urgent: true, category: "Assessment" },
    { id: 4, title: "Project presentation", date: "Oct 20, 2025", urgent: false, category: "Academic" }
  ];

  return (
    <>
      <Card 
        className="rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-destructive/20 bg-gradient-to-br from-card via-card to-destructive/5"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Calendar className="w-5 h-5" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {deadlines.slice(0, 3).map((deadline) => (
            <div key={deadline.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium flex items-center gap-2">
                    {deadline.title}
                    {deadline.urgent && <AlertTriangle className="w-3 h-3 text-destructive" />}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3" />
                    {deadline.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-primary text-2xl flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Upcoming Deadlines
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {deadlines.map((deadline) => (
              <div 
                key={deadline.id} 
                className={`p-4 rounded-xl border ${
                  deadline.urgent ? 'border-destructive/50 bg-destructive/5' : 'border-border bg-gradient-to-br from-card to-muted/20'
                } hover:border-primary/50 transition-smooth`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{deadline.title}</h4>
                      {deadline.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {deadline.date}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {deadline.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
