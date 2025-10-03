import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  Eye,
  MessageSquare,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  email: string;
  semester: string;
  cgpa: number;
  internshipStatus: "not-applied" | "applied" | "in-progress" | "completed";
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  progress: number;
}

const initialStudents: Student[] = [
  {
    id: "1",
    name: "Sneha Kumari",
    email: "sneha@student.edu",
    semester: "6th",
    cgpa: 8.5,
    internshipStatus: "in-progress",
    company: "TechCorp Ltd",
    position: "Frontend Developer Intern",
    startDate: "2024-09-01",
    endDate: "2024-12-01",
    progress: 65,
  },
  {
    id: "2",
    name: "Rahul Singh",
    email: "rahul@student.edu",
    semester: "6th",
    cgpa: 7.8,
    internshipStatus: "applied",
    company: "DataWorks Inc",
    position: "Data Science Intern",
    progress: 0,
  },
  {
    id: "3",
    name: "Priya Sharma",
    email: "priya@student.edu",
    semester: "7th",
    cgpa: 9.1,
    internshipStatus: "completed",
    company: "BrandFlow",
    position: "Marketing Intern",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    progress: 100,
  },
  {
    id: "4",
    name: "Amit Patel",
    email: "amit@student.edu",
    semester: "5th",
    cgpa: 8.2,
    internshipStatus: "not-applied",
    progress: 0,
  },
  {
    id: "5",
    name: "Ravi Kumar",
    email: "ravi@student.edu",
    semester: "6th",
    cgpa: 7.5,
    internshipStatus: "in-progress",
    company: "CloudTech",
    position: "Backend Developer Intern",
    startDate: "2024-08-15",
    endDate: "2024-11-15",
    progress: 40,
  },
];

export const AssignedStudentsCard = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const updateStudentStatus = (
    studentId: string,
    newStatus: Student["internshipStatus"]
  ) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? { ...student, internshipStatus: newStatus }
          : student
      )
    );
    toast.success(`Student status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "not-applied":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
      case "applied":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "in-progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "not-applied":
        return <AlertTriangle className="w-4 h-4" />;
      case "applied":
        return <Clock className="w-4 h-4" />;
      case "in-progress":
        return <Eye className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const statusCounts = {
    "not-applied": students.filter((s) => s.internshipStatus === "not-applied")
      .length,
    applied: students.filter((s) => s.internshipStatus === "applied").length,
    "in-progress": students.filter((s) => s.internshipStatus === "in-progress")
      .length,
    completed: students.filter((s) => s.internshipStatus === "completed")
      .length,
  };

  return (
    <Card className="rounded-2xl shadow-elegant border-secondary/20 bg-gradient-to-br from-card via-card to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-secondary">
          <Users className="w-5 h-5" />
          Assigned Students ({students.length})
        </CardTitle>
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-600 dark:text-gray-400">
              {statusCounts["not-applied"]}
            </p>
            <p className="text-xs text-muted-foreground">Not Applied</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {statusCounts.applied}
            </p>
            <p className="text-xs text-muted-foreground">Applied</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {statusCounts["in-progress"]}
            </p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              {statusCounts.completed}
            </p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {students.map((student) => (
            <div
              key={student.id}
              className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{student.name}</h4>
                    <Badge className={getStatusColor(student.internshipStatus)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(student.internshipStatus)}
                        {student.internshipStatus.replace("-", " ")}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {student.email}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Sem: {student.semester}</span>
                    <span>CGPA: {student.cgpa}</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  {selectedStudent && (
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          {selectedStudent.name} - Details
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedStudent.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Current Status
                            </p>
                            <Badge
                              className={getStatusColor(
                                selectedStudent.internshipStatus
                              )}
                            >
                              {selectedStudent.internshipStatus.replace(
                                "-",
                                " "
                              )}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Semester</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedStudent.semester}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">CGPA</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedStudent.cgpa}
                            </p>
                          </div>
                        </div>

                        {selectedStudent.company && (
                          <div className="p-4 rounded-lg bg-muted/50 border">
                            <h4 className="font-medium mb-2">
                              Current Internship
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="font-medium">Company</p>
                                <p className="text-muted-foreground">
                                  {selectedStudent.company}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Position</p>
                                <p className="text-muted-foreground">
                                  {selectedStudent.position}
                                </p>
                              </div>
                              {selectedStudent.startDate && (
                                <div>
                                  <p className="font-medium">Start Date</p>
                                  <p className="text-muted-foreground">
                                    {new Date(
                                      selectedStudent.startDate
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              )}
                              {selectedStudent.endDate && (
                                <div>
                                  <p className="font-medium">End Date</p>
                                  <p className="text-muted-foreground">
                                    {new Date(
                                      selectedStudent.endDate
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              )}
                            </div>
                            {selectedStudent.internshipStatus ===
                              "in-progress" && (
                              <div className="mt-3">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{selectedStudent.progress}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${selectedStudent.progress}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Send Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-1" />
                            View Reports
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </div>

              {student.company && (
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">{student.position}</span> at{" "}
                  {student.company}
                </div>
              )}

              {student.internshipStatus === "in-progress" && (
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
