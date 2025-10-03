import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export const LogbookCard = () => {
  const [open, setOpen] = useState(false);

  const tasks = [
    { id: 1, day: "Day 1", task: "Completed company orientation", status: "completed", icon: CheckCircle2, color: "text-accent" },
    { id: 2, day: "Day 2", task: "Submitted report draft", status: "pending", icon: Clock, color: "text-secondary" },
    { id: 3, day: "Day 3", task: "Pending faculty approval", status: "review", icon: AlertCircle, color: "text-destructive" },
    { id: 4, day: "Day 4", task: "Project kickoff meeting", status: "completed", icon: CheckCircle2, color: "text-accent" },
    { id: 5, day: "Day 5", task: "Code review session", status: "pending", icon: Clock, color: "text-secondary" }
  ];

  return (
    <>
      <Card 
        className="rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-secondary/20 bg-gradient-to-br from-card via-card to-secondary/5"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-secondary">
            <FileText className="w-5 h-5" />
            Logbook & Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-smooth">
              <task.icon className={`w-5 h-5 ${task.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{task.day}</p>
                <p className="text-xs text-muted-foreground truncate">{task.task}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="heading-primary text-2xl flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Logbook & Task Tracker
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 transition-smooth"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full bg-muted/50`}>
                    <task.icon className={`w-5 h-5 ${task.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{task.day}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'completed' ? 'bg-accent/20 text-accent' :
                        task.status === 'pending' ? 'bg-secondary/20 text-secondary' :
                        'bg-destructive/20 text-destructive'
                      }`}>
                        {task.status === 'completed' ? 'Completed' :
                         task.status === 'pending' ? 'In Progress' : 'Needs Review'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.task}</p>
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
