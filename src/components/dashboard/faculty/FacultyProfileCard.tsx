import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Building2, Award, Users } from "lucide-react";

const facultyProfile = {
  name: "Dr. Rajesh Kumar",
  designation: "Assistant Professor",
  department: "Computer Science & Engineering",
  email: "rajesh.kumar@college.edu",
  phone: "+91 98765 43210",
  experience: "8 years",
  specialization: "Software Engineering, AI/ML",
  assignedStudents: 24,
  completedInternships: 67,
  averageRating: 4.6,
  activeProjects: 3,
};

export const FacultyProfileCard = () => {
  return (
    <Card className="rounded-2xl shadow-elegant border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <User className="w-5 h-5" />
          Faculty Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h3 className="font-bold text-lg">{facultyProfile.name}</h3>
          <p className="text-muted-foreground">{facultyProfile.designation}</p>
          <p className="text-sm text-muted-foreground">
            {facultyProfile.department}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{facultyProfile.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{facultyProfile.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-muted-foreground" />
            <span>{facultyProfile.experience} experience</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
          <p className="text-sm font-medium mb-1">Specialization</p>
          <p className="text-sm text-muted-foreground">
            {facultyProfile.specialization}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-center">
            <p className="text-xl font-bold text-accent">
              {facultyProfile.assignedStudents}
            </p>
            <p className="text-xs text-muted-foreground">Assigned Students</p>
          </div>
          <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-center">
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {facultyProfile.completedInternships}
            </p>
            <p className="text-xs text-muted-foreground">
              Completed Supervisions
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div>
            <p className="text-sm font-medium">Average Rating</p>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-primary">
                {facultyProfile.averageRating}
              </span>
              <div className="flex text-yellow-400">
                {"★".repeat(Math.floor(facultyProfile.averageRating))}
                {"☆".repeat(5 - Math.floor(facultyProfile.averageRating))}
              </div>
            </div>
          </div>
          <Badge className="bg-primary/20 text-primary">
            {facultyProfile.activeProjects} Active Projects
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
