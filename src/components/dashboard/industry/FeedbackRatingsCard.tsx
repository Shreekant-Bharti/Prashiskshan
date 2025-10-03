import { useState } from "react";
import { Star, MessageSquare, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const FeedbackRatingsCard = () => {
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const feedbacks = [
    {
      id: 1,
      studentName: "Sneha Kumari",
      internship: "UI/UX Designer",
      rating: 4,
      feedback: "Great problem-solving skills and creativity. Very quick learner!",
      date: "2 weeks ago",
    },
    {
      id: 2,
      studentName: "Arjun Mehta",
      internship: "Backend Developer",
      rating: 5,
      feedback: "Excellent technical skills and team collaboration. Highly recommended!",
      date: "1 month ago",
    },
    {
      id: 3,
      studentName: "Kavya Reddy",
      internship: "Data Analyst",
      rating: 4,
      feedback: "Strong analytical thinking and attention to detail.",
      date: "3 weeks ago",
    },
  ];

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${interactive ? 'cursor-pointer' : ''} ${
              star <= (interactive ? (hoverRating || rating) : rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }`}
            onClick={interactive ? () => setRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }
    if (!feedbackText.trim()) {
      toast.error("Please provide feedback!");
      return;
    }

    // Play lovely notification sound
    const audio = new Audio("data:audio/wav;base64,UklGRhYCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfIBAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWdpY2VqbG5vcXJzdHV2dnd4eXl6enp5eXh3dnZ1dHNycGxoZGBbV1NPS0dDPzs3MzAvLS0sKyopKCgnJiYlJCQjIiIhICAgICAgICAgICAhISIiIyMkJCUmJicnKCkpKissLCwuLzAyNDY4Ojw+QENCR0pNUFFUV1peY2drcG90eXx/goSGiYuNj5GSlJWWl5iZmZqZmZiYl5aVlJOSkI6MioiGhIJ/fXt5d3VzcXBubGplYl5aV1ROSkdDPzw5NjQxLy0rKScmJCQiISAeHR0cGxoaGRkYGBcXFxYWFRUVFBQUFBQUFBQVFRUVFhYWFxcYGBkZGhobGxwdHR4fICEiIyQlJicpKiwuMDI0Njk7PkBDRklMT1JVWFteYmVpa296foCEh4qNkJOWmJucnp+hoqOkpKWlpaampqampqalpqWkpKOioaCfnZuZl5WTkI6MiYeEgoB9e3l2dHJwbmxqaGZkYmBdW1lXVVJQTktJRkRCQD48Ojg2NDIxLy4sKykoJyYlJCMiISAeHRwaGBYUEhAODAoIBgQCAP7+/Pz6+vn5+Pf39/b29fX09PPz8/Ly8vHx8PDw8PDw8PDw8PDw8PDw8PDx8fHx8vLy8/P09PX19vb39/f4+Pn5+vr7+/z8/f3+/v//AAEBAgMDBAUFBgcHCAgJCgoLCwwNDQ4PDxAREhITFBQVFhYXGBgZGhobHB0dHh8gICEiIyMkJSUmJygpKSorLC0uLy8xMjM0NTY3ODk6Ozw9PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlJTVFVWV1hZWltcXV5fYGFiY2NkZWZnaGlqamts");
    audio.play().catch(() => {});
    audio.play().catch(() => {});

    // Save notification to localStorage for student dashboard
    const notifications = JSON.parse(localStorage.getItem("student_notifications") || "[]");
    const newNotification = {
      id: Date.now(),
      title: "New Rating Received",
      message: `You received a ${rating}-star rating from Infosys for ${selectedStudent.internship} internship. Feedback: "${feedbackText}"`,
      time: "Just now",
      type: "success",
      read: false
    };
    notifications.unshift(newNotification);
    localStorage.setItem("student_notifications", JSON.stringify(notifications));

    toast.success(`Rating submitted! Notification sent to ${selectedStudent.studentName}`);
    
    setSelectedStudent(null);
    setRating(0);
    setFeedbackText("");
  };

  return (
    <>
      <Card className="h-full hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Feedback & Ratings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 rounded-lg border-2 hover:border-primary hover:shadow-md transition-all duration-300 bg-card cursor-pointer"
              onClick={() => setSelectedStudent(feedback)}
            >
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {feedback.studentName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold hover:text-primary">{feedback.studentName}</h3>
                    {renderStars(feedback.rating)}
                  </div>
                  <p className="text-xs text-muted-foreground">{feedback.internship}</p>
                </div>
              </div>

              <p className="text-sm mb-2 italic">"{feedback.feedback}"</p>
              <p className="text-xs text-muted-foreground">{feedback.date}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={!!selectedStudent} onOpenChange={() => {
        setSelectedStudent(null);
        setRating(0);
        setFeedbackText("");
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Rate {selectedStudent?.studentName}</span>
              <Button variant="ghost" size="sm" onClick={() => {
                setSelectedStudent(null);
                setRating(0);
                setFeedbackText("");
              }}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-6 p-4">
              {/* Student Info */}
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-3">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {selectedStudent.studentName.split(" ").map((n: string) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{selectedStudent.studentName}</h3>
                <p className="text-sm text-muted-foreground">{selectedStudent.internship}</p>
              </div>

              {/* Rating */}
              <div className="text-center space-y-2">
                <p className="font-semibold">Select Rating</p>
                {renderStars(rating, true)}
                {rating > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {rating === 5 ? "Excellent!" : rating === 4 ? "Very Good!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Needs Improvement"}
                  </p>
                )}
              </div>

              {/* Feedback */}
              <div className="space-y-2">
                <label className="font-semibold text-sm">Your Feedback</label>
                <Textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share your thoughts about this student's performance..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmitRating}
                className="w-full hover:scale-105 transition-transform"
                disabled={rating === 0 || !feedbackText.trim()}
              >
                Submit Rating & Send Notification
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeedbackRatingsCard;
