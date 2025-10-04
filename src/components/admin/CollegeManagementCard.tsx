import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  MapPin,
  Phone,
  Mail,
  Check,
  X,
} from "lucide-react";

interface College {
  id: number;
  name: string;
  location: string;
  type: "engineering" | "medical" | "commerce" | "arts" | "other";
  accreditation: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  totalStudents: number;
  activeFaculty: number;
  status: "active" | "inactive" | "pending";
  addedDate: string;
  lastUpdated: string;
}

interface CollegeManagementCardProps {
  colleges: College[];
  setColleges: React.Dispatch<React.SetStateAction<College[]>>;
  playSuccessSound: () => void;
}

const CollegeManagementCard: React.FC<CollegeManagementCardProps> = ({
  colleges,
  setColleges,
  playSuccessSound,
}) => {
  const [activeTab, setActiveTab] = useState<"list" | "add" | "edit">("list");
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "engineering" as College["type"],
    accreditation: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    totalStudents: 0,
    activeFaculty: 0,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addCollege = () => {
    if (!formData.name.trim() || !formData.location.trim()) {
      alert("Please fill in required fields (Name, Location)");
      return;
    }

    const newCollege: College = {
      id: Date.now(),
      ...formData,
      status: "active" as const,
      addedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    setColleges((prev) => [newCollege, ...prev]);

    // Store in localStorage
    const storedColleges = JSON.parse(
      localStorage.getItem("adminColleges") || "[]"
    );
    storedColleges.unshift(newCollege);
    localStorage.setItem("adminColleges", JSON.stringify(storedColleges));

    playSuccessSound();

    // Reset form
    setFormData({
      name: "",
      location: "",
      type: "engineering",
      accreditation: "",
      contactEmail: "",
      contactPhone: "",
      website: "",
      totalStudents: 0,
      activeFaculty: 0,
    });

    setActiveTab("list");
    console.log("🏫 College added:", newCollege.name);
  };

  const updateCollege = () => {
    if (!selectedCollege) return;

    const updatedCollege = {
      ...selectedCollege,
      ...formData,
      lastUpdated: new Date().toISOString(),
    };

    setColleges((prev) =>
      prev.map((c) => (c.id === selectedCollege.id ? updatedCollege : c))
    );

    // Update localStorage
    const storedColleges = JSON.parse(
      localStorage.getItem("adminColleges") || "[]"
    );
    const updated = storedColleges.map((c: College) =>
      c.id === selectedCollege.id ? updatedCollege : c
    );
    localStorage.setItem("adminColleges", JSON.stringify(updated));

    playSuccessSound();
    setSelectedCollege(null);
    setActiveTab("list");
    console.log("📝 College updated:", updatedCollege.name);
  };

  const deleteCollege = (collegeId: number) => {
    if (!confirm("Are you sure you want to delete this college?")) return;

    setColleges((prev) => prev.filter((c) => c.id !== collegeId));

    // Update localStorage
    const storedColleges = JSON.parse(
      localStorage.getItem("adminColleges") || "[]"
    );
    const filtered = storedColleges.filter((c: College) => c.id !== collegeId);
    localStorage.setItem("adminColleges", JSON.stringify(filtered));

    playSuccessSound();
    console.log("🗑️ College deleted");
  };

  const toggleCollegeStatus = (
    collegeId: number,
    newStatus: College["status"]
  ) => {
    setColleges((prev) =>
      prev.map((c) =>
        c.id === collegeId
          ? { ...c, status: newStatus, lastUpdated: new Date().toISOString() }
          : c
      )
    );

    playSuccessSound();
    console.log(`🔄 College status changed to: ${newStatus}`);
  };

  const editCollege = (college: College) => {
    setSelectedCollege(college);
    setFormData({
      name: college.name,
      location: college.location,
      type: college.type,
      accreditation: college.accreditation,
      contactEmail: college.contactEmail,
      contactPhone: college.contactPhone,
      website: college.website,
      totalStudents: college.totalStudents,
      activeFaculty: college.activeFaculty,
    });
    setActiveTab("edit");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "engineering":
        return "bg-blue-50 text-blue-800";
      case "medical":
        return "bg-red-50 text-red-800";
      case "commerce":
        return "bg-green-50 text-green-800";
      case "arts":
        return "bg-purple-50 text-purple-800";
      case "other":
        return "bg-gray-50 text-gray-800";
      default:
        return "bg-gray-50 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            College Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter college name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="City, State"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="engineering">Engineering</option>
            <option value="medical">Medical</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Accreditation
          </label>
          <input
            type="text"
            value={formData.accreditation}
            onChange={(e) => handleInputChange("accreditation", e.target.value)}
            placeholder="NAAC A+, NBA, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Email
          </label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) => handleInputChange("contactEmail", e.target.value)}
            placeholder="contact@college.edu"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Phone
          </label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => handleInputChange("contactPhone", e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Website
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => handleInputChange("website", e.target.value)}
          placeholder="https://www.college.edu"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Students
          </label>
          <input
            type="number"
            value={formData.totalStudents}
            onChange={(e) =>
              handleInputChange("totalStudents", parseInt(e.target.value) || 0)
            }
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Active Faculty
          </label>
          <input
            type="number"
            value={formData.activeFaculty}
            onChange={(e) =>
              handleInputChange("activeFaculty", parseInt(e.target.value) || 0)
            }
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={activeTab === "add" ? addCollege : updateCollege}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Check className="w-4 h-4 mr-2" />
          {activeTab === "add" ? "Add College" : "Update College"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setActiveTab("list");
            setSelectedCollege(null);
          }}
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </motion.button>
      </div>
    </div>
  );

  const renderCollegeList = () => (
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {colleges.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No colleges added yet</p>
        </div>
      ) : (
        colleges.map((college) => (
          <motion.div
            key={college.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-800">
                    {college.name}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                      college.type
                    )}`}
                  >
                    {college.type}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      college.status
                    )}`}
                  >
                    {college.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {college.location}
                  </div>
                  {college.contactEmail && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {college.contactEmail}
                    </div>
                  )}
                  {college.contactPhone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {college.contactPhone}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {college.totalStudents}
                </div>
                <div className="text-xs text-gray-500">Students</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {college.activeFaculty}
                </div>
                <div className="text-xs text-gray-500">Faculty</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">
                  {college.accreditation || "N/A"}
                </div>
                <div className="text-xs text-gray-500">Accreditation</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Added: {new Date(college.addedDate).toLocaleDateString()}
              </div>

              <div className="flex space-x-2">
                {college.status === "active" ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCollegeStatus(college.id, "inactive")}
                    className="text-red-600 hover:text-red-800"
                    title="Deactivate"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCollegeStatus(college.id, "active")}
                    className="text-green-600 hover:text-green-800"
                    title="Activate"
                  >
                    <Check className="w-4 h-4" />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => editCollege(college)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteCollege(college.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <GraduationCap className="w-8 h-8 text-emerald-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">College Management</h3>
            <p className="text-sm text-gray-600">
              Manage partner colleges and institutions
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-emerald-50 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-emerald-600">
              {colleges.filter((c) => c.status === "active").length} active
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
        {[
          { key: "list", label: "College List", icon: Eye },
          { key: "add", label: "Add College", icon: Plus },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <tab.icon className="w-4 h-4 mr-1" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "list" && renderCollegeList()}
      {(activeTab === "add" || activeTab === "edit") && renderForm()}

      {/* Summary Stats */}
      {activeTab === "list" && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {colleges.filter((c) => c.status === "active").length}
              </div>
              <div className="text-xs text-gray-600">Active</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">
                {colleges.filter((c) => c.status === "inactive").length}
              </div>
              <div className="text-xs text-gray-600">Inactive</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {colleges.reduce((sum, c) => sum + c.totalStudents, 0)}
              </div>
              <div className="text-xs text-gray-600">Total Students</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">
                {colleges.reduce((sum, c) => sum + c.activeFaculty, 0)}
              </div>
              <div className="text-xs text-gray-600">Total Faculty</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CollegeManagementCard;
