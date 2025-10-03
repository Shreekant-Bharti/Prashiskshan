import { useState } from "react";
import { Plus, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Checkbox } from "@/components/ui/checkbox";

const PostInternshipCard = () => {
  const [showForm, setShowForm] = useState(false);
  const [internshipType, setInternshipType] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  
  const colleges = [
    "VIT Vellore",
    "SRM Institute of Science and Technology",
    "Anna University",
    "NIT Trichy",
    "IIT Madras",
    "PSG College of Technology",
    "Thiagarajar College of Engineering"
  ];
  
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    stipend: "",
    mode: "",
    eligibilityYear: "",
    eligibilityBranch: "",
    description: "",
    colleges: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Play success sound
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSyBzvLZiTYIGGm98OScTgwOUKnk7bhlHAU2j9nyxnkpBSp+zPDajz4JFF+28OqnVRQJRZ/h88BtIQUsgc7y2Ik2CBhqvvDknE4MDlCp5O24ZRwENI/Z8sZ5KQUpfszw2o8+CRVftPDqp1UUCUSe4fPAbSEFLIHO8tmJNggZa77w5JxODA5QqeTtuGUcBDSP2fLGeSgFK37M8NqPPgkVX7Tw6qdVFAlEn+HzwG0hBSyBzvLZiTYIGWy+8OScTgwOUKnk7bhlHAU0j9nyxnkoBSx+zPDajz4JFF+08OqnVRQKQ5/h88BtIQUsgc7y2Yk2CBlsvvDknE4MDlCp5O24ZRwFNI/Z8sZ5KAUsfszw2o8+CRVftPDqp1UUCkSf4fPAbSEFLIHO8tmJNggZa77w5JxODA5QqeTtuGUcBTSP2fLGeSgFLH7M8NqPPgkUX7Tw6qdVFApDn+HzwG0hBSyBzvLZiTYIGWu+8OScTgwOUKnk7bhlHAU0j9nyxnkoBSx+zPDajz4JFF+08OqnVRQKQ5/h88BtIQUsgc7y2Yk2CBlrvvDknE4MDlCp5O24ZRwFNI/Z8sZ5KAUsfs==");
    audio.play().catch(() => {});

    const newInternship = {
      ...formData,
      type: internshipType,
      company: "Infosys",
      id: Date.now(),
      postedDate: new Date().toISOString(),
      selectedColleges: internshipType === "college-specific" ? selectedColleges : [],
    };

    if (internshipType === "universal") {
      // Universal internships - auto approve after 10 seconds
      setShowSuccess(true);
      
      setTimeout(() => {
        // Auto-approve and add to my internships
        const myInternships = JSON.parse(localStorage.getItem("my_internships") || "[]");
        myInternships.push({
          ...newInternship,
          status: "active",
          applications: 0,
        });
        localStorage.setItem("my_internships", JSON.stringify(myInternships));
        
        toast.success("Internship approved and posted successfully!");
        
        setShowSuccess(false);
        setShowForm(false);
        setFormData({
          title: "",
          duration: "",
          stipend: "",
          mode: "",
          eligibilityYear: "",
          eligibilityBranch: "",
          description: "",
          colleges: "",
        });
        setInternshipType("");
        setSelectedColleges([]);
      }, 10000); // 10 seconds
    } else {
      // College-specific internships - need admin approval
      const pendingInternships = JSON.parse(localStorage.getItem("pending_internships") || "[]");
      pendingInternships.push({
        ...newInternship,
        status: "pending",
      });
      localStorage.setItem("pending_internships", JSON.stringify(pendingInternships));

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowForm(false);
        setFormData({
          title: "",
          duration: "",
          stipend: "",
          mode: "",
          eligibilityYear: "",
          eligibilityBranch: "",
          description: "",
          colleges: "",
        });
        setInternshipType("");
        setSelectedColleges([]);
      }, 3000);
    }
  };

  return (
    <Card className="h-full hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Post New Internship
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!showForm ? (
          <Button
            onClick={() => setShowForm(true)}
            className="w-full h-24 text-lg hover:scale-105 transition-transform duration-300"
          >
            <Plus className="h-6 w-6 mr-2" />
            Create Internship Posting
          </Button>
        ) : (
          <AnimatePresence>
            {showSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 space-y-4"
              >
                <CheckCircle className="h-20 w-20 text-green-500 animate-pulse" />
                <h3 className="text-2xl font-bold text-center">Internship Submitted!</h3>
                <p className="text-muted-foreground text-center">
                  {internshipType === "college-specific" 
                    ? "Waiting for Admin approval..." 
                    : "Processing your internship..."}
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-4 max-h-[500px] overflow-y-auto pr-2"
              >
                <div className="space-y-2">
                  <Label>Internship Title *</Label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Frontend Developer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration *</Label>
                    <Input
                      required
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 3 months"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stipend *</Label>
                    <Input
                      required
                      value={formData.stipend}
                      onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                      placeholder="e.g., ₹15,000/month"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Mode *</Label>
                  <Select required value={formData.mode} onValueChange={(value) => setFormData({ ...formData, mode: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">Onsite</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Eligibility Year *</Label>
                    <Select required value={formData.eligibilityYear} onValueChange={(value) => setFormData({ ...formData, eligibilityYear: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2nd">2nd Year</SelectItem>
                        <SelectItem value="3rd">3rd Year</SelectItem>
                        <SelectItem value="4th">4th Year</SelectItem>
                        <SelectItem value="all">All Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Branch *</Label>
                    <Input
                      required
                      value={formData.eligibilityBranch}
                      onChange={(e) => setFormData({ ...formData, eligibilityBranch: e.target.value })}
                      placeholder="e.g., CSE, IT"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Internship Type *</Label>
                  <Select required value={internshipType} onValueChange={setInternshipType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="universal">Universal (All Students)</SelectItem>
                      <SelectItem value="college-specific">College-Specific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {internshipType === "college-specific" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <Label>Select Colleges *</Label>
                    <div className="border-2 rounded-lg p-4 space-y-2 max-h-48 overflow-y-auto bg-card">
                      {colleges.map((college) => (
                        <div key={college} className="flex items-center space-x-2">
                          <Checkbox
                            id={college}
                            checked={selectedColleges.includes(college)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedColleges([...selectedColleges, college]);
                              } else {
                                setSelectedColleges(selectedColleges.filter(c => c !== college));
                              }
                            }}
                          />
                          <label
                            htmlFor={college}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {college}
                          </label>
                        </div>
                      ))}
                    </div>
                    {selectedColleges.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {selectedColleges.length} college(s) selected
                      </p>
                    )}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the internship responsibilities and requirements..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 hover:scale-105 transition-transform">
                    Submit for Approval
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
};

export default PostInternshipCard;
