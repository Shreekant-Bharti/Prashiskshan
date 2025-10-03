import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  User,
  Building2,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface Application {
  id: string;
  studentName: string;
  studentEmail: string;
  internshipTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  semester: string;
  cgpa: number;
}

const initialApplications: Application[] = [
  {
    id: "1",
    studentName: "Rahul Kumar",
    studentEmail: "rahul@student.edu",
    internshipTitle: "Frontend Developer Intern",
    company: "TechCorp Ltd",
    location: "Bangalore",
    appliedDate: "2024-10-01",
    status: "pending",
    semester: "6th",
    cgpa: 8.5,
  },
  {
    id: "2",
    studentName: "Priya Singh",
    studentEmail: "priya@student.edu",
    internshipTitle: "Data Science Intern",
    company: "DataWorks Inc",
    location: "Hyderabad",
    appliedDate: "2024-09-28",
    status: "accepted",
    semester: "6th",
    cgpa: 9.1,
  },
  {
    id: "3",
    studentName: "Amit Patel",
    studentEmail: "amit@student.edu",
    internshipTitle: "Marketing Intern",
    company: "BrandFlow",
    location: "Mumbai",
    appliedDate: "2024-09-25",
    status: "completed",
    semester: "5th",
    cgpa: 7.8,
  },
  {
    id: "4",
    studentName: "Sneha Reddy",
    studentEmail: "sneha@student.edu",
    internshipTitle: "UI/UX Design Intern",
    company: "DesignStudio",
    location: "Chennai",
    appliedDate: "2024-10-02",
    status: "pending",
    semester: "7th",
    cgpa: 8.9,
  },
  {
    id: "5",
    studentName: "Vikram Joshi",
    studentEmail: "vikram@student.edu",
    internshipTitle: "Backend Developer Intern",
    company: "CloudTech",
    location: "Pune",
    appliedDate: "2024-09-30",
    status: "rejected",
    semester: "6th",
    cgpa: 7.2,
  },
];

export const RecentApplicationsCard = () => {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  const updateApplicationStatus = (
    id: string,
    newStatus: Application["status"]
  ) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    toast.success(`Application ${newStatus} successfully!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "accepted":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const pendingCount = applications.filter(
    (app) => app.status === "pending"
  ).length;
  const acceptedCount = applications.filter(
    (app) => app.status === "accepted"
  ).length;
  const completedCount = applications.filter(
    (app) => app.status === "completed"
  ).length;

  return (
    <Card className="rounded-2xl shadow-elegant border-accent/20 bg-gradient-to-br from-card via-card to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <Clock className="w-5 h-5" />
          Recent Applications
        </CardTitle>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {pendingCount}
            </p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {acceptedCount}
            </p>
            <p className="text-xs text-muted-foreground">Accepted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {completedCount}
            </p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {applications.map((application) => (
            <div
              key={application.id}
              className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{application.studentName}</h4>
                    <Badge className={getStatusColor(application.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(application.status)}
                        {application.status}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {application.studentEmail}
                  </p>
                  <p className="font-medium text-sm">
                    {application.internshipTitle}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </p>
                  <p>CGPA: {application.cgpa}</p>
                  <p>Sem: {application.semester}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {application.company}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {application.location}
                </div>
              </div>

              {application.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={() =>
                      updateApplicationStatus(application.id, "accepted")
                    }
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() =>
                      updateApplicationStatus(application.id, "rejected")
                    }
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              )}

              {application.status === "accepted" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={() =>
                    updateApplicationStatus(application.id, "completed")
                  }
                >
                  Mark as Completed
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 border border-border/50">
          <h4 className="font-semibold mb-2">Application Trends</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">This Week:</span>
              <p className="font-medium">23 new applications</p>
            </div>
            <div>
              <span className="text-muted-foreground">Acceptance Rate:</span>
              <p className="font-medium text-green-600 dark:text-green-400">
                68%
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Average CGPA:</span>
              <p className="font-medium">8.3</p>
            </div>
            <div>
              <span className="text-muted-foreground">Popular Field:</span>
              <p className="font-medium">Software Development</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
