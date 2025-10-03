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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit3,
  Trash2,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  field: string;
  status: "active" | "inactive" | "draft";
  applications: number;
  description: string;
}

const initialInternships: Internship[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechCorp Ltd",
    location: "Bangalore",
    duration: "3 months",
    stipend: "₹15,000/month",
    field: "Software Development",
    status: "active",
    applications: 23,
    description: "Work on React-based web applications",
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "DataWorks Inc",
    location: "Hyderabad",
    duration: "4 months",
    stipend: "₹18,000/month",
    field: "Data Science",
    status: "active",
    applications: 31,
    description: "Machine learning and data analysis projects",
  },
  {
    id: "3",
    title: "Marketing Intern",
    company: "BrandFlow",
    location: "Mumbai",
    duration: "2 months",
    stipend: "₹12,000/month",
    field: "Marketing",
    status: "draft",
    applications: 0,
    description: "Digital marketing campaigns and social media management",
  },
];

export const InternshipManagementCard = () => {
  const [internships, setInternships] =
    useState<Internship[]>(initialInternships);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<Internship>>({});

  const handleAddInternship = () => {
    if (!formData.title || !formData.company || !formData.location) {
      toast.error("Please fill all required fields");
      return;
    }

    const newInternship: Internship = {
      id: Date.now().toString(),
      title: formData.title!,
      company: formData.company!,
      location: formData.location!,
      duration: formData.duration || "3 months",
      stipend: formData.stipend || "₹10,000/month",
      field: formData.field || "General",
      status: "draft",
      applications: 0,
      description: formData.description || "",
    };

    setInternships([...internships, newInternship]);
    setFormData({});
    setIsAddDialogOpen(false);
    toast.success("Internship added successfully!");
  };

  const handleEditInternship = () => {
    if (!editingInternship) return;

    const updatedInternships = internships.map((internship) =>
      internship.id === editingInternship.id
        ? { ...internship, ...formData }
        : internship
    );

    setInternships(updatedInternships);
    setEditingInternship(null);
    setFormData({});
    toast.success("Internship updated successfully!");
  };

  const handleDeleteInternship = (id: string) => {
    setInternships(internships.filter((internship) => internship.id !== id));
    toast.success("Internship deleted successfully!");
  };

  const toggleStatus = (id: string) => {
    const updatedInternships = internships.map((internship) =>
      internship.id === id
        ? {
            ...internship,
            status:
              internship.status === "active"
                ? "inactive"
                : ("active" as "active" | "inactive"),
          }
        : internship
    );
    setInternships(updatedInternships);
    toast.success("Status updated successfully!");
  };

  const openEditDialog = (internship: Internship) => {
    setEditingInternship(internship);
    setFormData(internship);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "inactive":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case "draft":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <Card className="rounded-2xl shadow-elegant border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Briefcase className="w-5 h-5" />
            Internship Management
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Internship
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Internship</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Frontend Developer Intern"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="e.g., TechCorp Ltd"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g., Bangalore"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field">Field</Label>
                  <Select
                    value={formData.field || ""}
                    onValueChange={(value) =>
                      setFormData({ ...formData, field: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software Development">
                        Software Development
                      </SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="e.g., 3 months"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stipend">Stipend</Label>
                  <Input
                    id="stipend"
                    value={formData.stipend || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, stipend: e.target.value })
                    }
                    placeholder="e.g., ₹15,000/month"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Internship description..."
                    rows={3}
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
                <Button onClick={handleAddInternship}>Add Internship</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="p-4 rounded-lg border border-border bg-card/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{internship.title}</h4>
                    <Badge className={getStatusColor(internship.status)}>
                      {internship.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {internship.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {internship.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {internship.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {internship.stipend}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {internship.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm font-medium">
                      {internship.applications} applications
                    </span>
                    <Badge variant="secondary">{internship.field}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStatus(internship.id)}
                  >
                    {internship.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEditDialog(internship)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Internship</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-title">Title</Label>
                          <Input
                            id="edit-title"
                            value={formData.title || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-company">Company</Label>
                          <Input
                            id="edit-company"
                            value={formData.company || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                company: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-location">Location</Label>
                          <Input
                            id="edit-location"
                            value={formData.location || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                location: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-stipend">Stipend</Label>
                          <Input
                            id="edit-stipend"
                            value={formData.stipend || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                stipend: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            value={formData.description || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setEditingInternship(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleEditInternship}>Update</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteInternship(internship.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
