import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Edit, Plus, Star, User } from "lucide-react";
import { toast } from "sonner";

interface Feedback {
  id: string;
  studentName: string;
  studentId: string;
  company: string;
  position: string;
  rating: number;
  feedback: string;
  date: string;
  type: "mid-term" | "final" | "weekly";
}

const initialFeedbacks: Feedback[] = [
  {
    id: "1",
    studentName: "Sneha Kumari",
    studentId: "BIT/2022/1234",
    company: "TechCorp Ltd",
    position: "Frontend Developer Intern",
    rating: 4,
    feedback:
      "Excellent progress in React development. Shows good understanding of component architecture and state management. Recommend focusing on advanced hooks and performance optimization.",
    date: "2024-10-01",
    type: "mid-term",
  },
  {
    id: "2",
    studentName: "Ravi Kumar",
    studentId: "BIT/2022/1245",
    company: "CloudTech",
    position: "Backend Developer Intern",
    rating: 3,
    feedback:
      "Good technical skills but needs improvement in communication and documentation. Suggest regular check-ins and code review sessions.",
    date: "2024-09-28",
    type: "weekly",
  },
  {
    id: "3",
    studentName: "Priya Sharma",
    studentId: "BIT/2021/1156",
    company: "BrandFlow",
    position: "Marketing Intern",
    rating: 5,
    feedback:
      "Outstanding performance throughout the internship. Excellent analytical skills and creative thinking. Successfully completed all assigned projects ahead of schedule.",
    date: "2024-08-30",
    type: "final",
  },
];

export const FeedbackManagementCard = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [formData, setFormData] = useState<Partial<Feedback>>({});

  const handleAddFeedback = () => {
    if (!formData.studentName || !formData.feedback || !formData.rating) {
      toast.error("Please fill all required fields");
      return;
    }

    const newFeedback: Feedback = {
      id: Date.now().toString(),
      studentName: formData.studentName!,
      studentId: formData.studentId || "BIT/2022/XXXX",
      company: formData.company || "Company Name",
      position: formData.position || "Intern",
      rating: formData.rating!,
      feedback: formData.feedback!,
      date: new Date().toISOString().split("T")[0],
      type: (formData.type as "mid-term" | "final" | "weekly") || "weekly",
    };

    setFeedbacks([...feedbacks, newFeedback]);
    setFormData({});
    setIsAddDialogOpen(false);
    toast.success("Feedback added successfully!");
  };

  const handleEditFeedback = () => {
    if (!editingFeedback) return;

    const updatedFeedbacks = feedbacks.map((feedback) =>
      feedback.id === editingFeedback.id
        ? { ...feedback, ...formData }
        : feedback
    );

    setFeedbacks(updatedFeedbacks);
    setEditingFeedback(null);
    setFormData({});
    toast.success("Feedback updated successfully!");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "weekly":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "mid-term":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "final":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const openEditDialog = (feedback: Feedback) => {
    setEditingFeedback(feedback);
    setFormData(feedback);
  };

  const averageRating = (
    feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
    feedbacks.length
  ).toFixed(1);

  return (
    <Card className="rounded-2xl shadow-elegant border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-primary">
            <MessageSquare className="w-5 h-5" />
            Feedback Management
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Feedback
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Student Feedback</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Student Name *</Label>
                    <input
                      id="student-name"
                      className="w-full p-2 border rounded"
                      value={formData.studentName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          studentName: e.target.value,
                        })
                      }
                      placeholder="Enter student name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-id">Student ID</Label>
                    <input
                      id="student-id"
                      className="w-full p-2 border rounded"
                      value={formData.studentId || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, studentId: e.target.value })
                      }
                      placeholder="e.g., BIT/2022/1234"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <input
                      id="company"
                      className="w-full p-2 border rounded"
                      value={formData.company || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="Company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <input
                      id="position"
                      className="w-full p-2 border rounded"
                      value={formData.position || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      placeholder="Internship position"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (1-5) *</Label>
                    <select
                      id="rating"
                      className="w-full p-2 border rounded"
                      value={formData.rating || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value="">Select rating</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Below Average</option>
                      <option value="3">3 - Average</option>
                      <option value="4">4 - Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Feedback Type</Label>
                    <select
                      id="type"
                      className="w-full p-2 border rounded"
                      value={formData.type || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as
                            | "mid-term"
                            | "final"
                            | "weekly",
                        })
                      }
                    >
                      <option value="weekly">Weekly</option>
                      <option value="mid-term">Mid-term</option>
                      <option value="final">Final</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback *</Label>
                  <Textarea
                    id="feedback"
                    value={formData.feedback || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, feedback: e.target.value })
                    }
                    placeholder="Write detailed feedback..."
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddFeedback}>Add Feedback</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {feedbacks.length}
            </p>
            <p className="text-xs text-muted-foreground">Total Feedbacks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {averageRating}
            </p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {feedbacks.filter((f) => f.rating >= 4).length}
            </p>
            <p className="text-xs text-muted-foreground">High Performers</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 rounded-lg border border-border bg-card/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    <h4 className="font-semibold">{feedback.studentName}</h4>
                    <Badge className={getTypeColor(feedback.type)}>
                      {feedback.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {feedback.position} at {feedback.company}
                  </p>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < feedback.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium ml-1">
                      {feedback.rating}/5
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {new Date(feedback.date).toLocaleDateString()}
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEditDialog(feedback)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Feedback</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-rating">Rating (1-5)</Label>
                          <select
                            id="edit-rating"
                            className="w-full p-2 border rounded"
                            value={formData.rating || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                rating: parseInt(e.target.value),
                              })
                            }
                          >
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Below Average</option>
                            <option value="3">3 - Average</option>
                            <option value="4">4 - Good</option>
                            <option value="5">5 - Excellent</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-feedback">Feedback</Label>
                          <Textarea
                            id="edit-feedback"
                            value={formData.feedback || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                feedback: e.target.value,
                              })
                            }
                            rows={4}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setEditingFeedback(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleEditFeedback}>Update</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {feedback.feedback}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
