import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Edit,
  Save,
  Camera,
  Shield,
  Key,
  Bell,
  Globe,
  Moon,
  Sun,
  Lock,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  lastLogin: string;
  avatar: string;
  permissions: string[];
  preferences: {
    theme: "light" | "dark" | "auto";
    notifications: boolean;
    emailUpdates: boolean;
    language: string;
    timezone: string;
  };
}

interface AdminProfileCardProps {
  adminProfile: AdminProfile;
  setAdminProfile: React.Dispatch<React.SetStateAction<AdminProfile>>;
  playSuccessSound: () => void;
}

const AdminProfileCard: React.FC<AdminProfileCardProps> = ({
  adminProfile,
  setAdminProfile,
  playSuccessSound,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "preferences"
  >("profile");
  const [formData, setFormData] = useState({
    name: adminProfile.name,
    email: adminProfile.email,
    phone: adminProfile.phone,
    department: adminProfile.department,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [preferences, setPreferences] = useState(adminProfile.preferences);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePreferenceChange = (field: string, value: string | boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveProfile = () => {
    setAdminProfile((prev) => ({
      ...prev,
      ...formData,
      preferences,
    }));

    // Save to localStorage
    const updatedProfile = {
      ...adminProfile,
      ...formData,
      preferences,
    };
    localStorage.setItem("adminProfile", JSON.stringify(updatedProfile));

    setIsEditing(false);
    playSuccessSound();
    console.log("✅ Admin profile updated");
  };

  const changePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      alert("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    // In real app, verify current password with backend
    if (passwordData.currentPassword !== "Admin@123") {
      alert("Current password is incorrect");
      return;
    }

    // Save new password (in real app, hash and store securely)
    localStorage.setItem("adminPassword", passwordData.newPassword);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    playSuccessSound();
    alert("Password changed successfully");
    console.log("🔒 Password updated");
  };

  const uploadAvatar = () => {
    // Simulate file upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const avatar = e.target?.result as string;
          setAdminProfile((prev) => ({ ...prev, avatar }));
          localStorage.setItem("adminAvatar", avatar);
          playSuccessSound();
          console.log("📷 Avatar updated");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4" />;
      case "dark":
        return <Moon className="w-4 h-4" />;
      case "auto":
        return <Globe className="w-4 h-4" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-4">
      {/* Avatar Section */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {adminProfile.avatar ? (
              <img
                src={adminProfile.avatar}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              adminProfile.name.charAt(0).toUpperCase()
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={uploadAvatar}
            className="absolute -bottom-1 -right-1 p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            <Camera className="w-3 h-3" />
          </motion.button>
        </div>
        <div>
          <h4 className="text-lg font-semibold">{adminProfile.name}</h4>
          <p className="text-sm text-gray-600">{adminProfile.role}</p>
          <p className="text-xs text-gray-500">{adminProfile.department}</p>
        </div>
      </div>

      {/* Profile Fields */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isEditing ? "bg-gray-50" : ""
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
              className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEditing ? "bg-gray-50" : ""
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEditing ? "bg-gray-50" : ""
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isEditing ? "bg-gray-50" : ""
            }`}
          />
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-blue-600 mr-2" />
            <div>
              <div className="text-xs text-blue-600 font-medium">Joined</div>
              <div className="text-sm text-blue-800">
                {new Date(adminProfile.joinDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center">
            <Shield className="w-4 h-4 text-green-600 mr-2" />
            <div>
              <div className="text-xs text-green-600 font-medium">
                Last Login
              </div>
              <div className="text-sm text-green-800">
                {new Date(adminProfile.lastLogin).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Permissions
        </label>
        <div className="flex flex-wrap gap-2">
          {adminProfile.permissions.map((permission, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {permission}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <Lock className="w-5 h-5 text-yellow-600 mr-2" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-800">
              Security Settings
            </h4>
            <p className="text-xs text-yellow-700">
              Manage your account security and password
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
            placeholder="Enter current password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
            placeholder="Enter new password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            placeholder="Confirm new password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={changePassword}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Change Password
        </motion.button>
      </div>

      {/* Security Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          Password Requirements
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• At least 8 characters long</li>
          <li>• Include uppercase and lowercase letters</li>
          <li>• Include at least one number</li>
          <li>• Include at least one special character</li>
        </ul>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Theme
        </label>
        <div className="flex space-x-2">
          {[
            { key: "light", label: "Light" },
            { key: "dark", label: "Dark" },
            { key: "auto", label: "Auto" },
          ].map((theme) => (
            <button
              key={theme.key}
              onClick={() => handlePreferenceChange("theme", theme.key)}
              className={`flex items-center px-3 py-2 rounded-lg border transition ${
                preferences.theme === theme.key
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {getThemeIcon(theme.key)}
              <span className="ml-2 text-sm">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Language
        </label>
        <select
          value={preferences.language}
          onChange={(e) => handlePreferenceChange("language", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
          <option value="te">Telugu</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Timezone
        </label>
        <select
          value={preferences.timezone}
          onChange={(e) => handlePreferenceChange("timezone", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Asia/Kolkata">India Standard Time (IST)</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">Eastern Time</option>
          <option value="Europe/London">GMT</option>
        </select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-4 h-4 text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Push Notifications
            </span>
          </div>
          <button
            onClick={() =>
              handlePreferenceChange(
                "notifications",
                !preferences.notifications
              )
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              preferences.notifications ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                preferences.notifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="w-4 h-4 text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Email Updates
            </span>
          </div>
          <button
            onClick={() =>
              handlePreferenceChange("emailUpdates", !preferences.emailUpdates)
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              preferences.emailUpdates ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                preferences.emailUpdates ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <User className="w-8 h-8 text-indigo-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Admin Profile</h3>
            <p className="text-sm text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {activeTab === "profile" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isEditing) {
                  saveProfile();
                } else {
                  setIsEditing(true);
                }
              }}
              className={`flex items-center px-3 py-1 rounded-lg transition text-sm ${
                isEditing
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              {isEditing ? (
                <Save className="w-4 h-4 mr-1" />
              ) : (
                <Edit className="w-4 h-4 mr-1" />
              )}
              {isEditing ? "Save" : "Edit"}
            </motion.button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
        {[
          { key: "profile", label: "Profile", icon: User },
          { key: "security", label: "Security", icon: Shield },
          { key: "preferences", label: "Preferences", icon: Bell },
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
      <div className="max-h-80 overflow-y-auto">
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "security" && renderSecurityTab()}
        {activeTab === "preferences" && renderPreferencesTab()}
      </div>
    </motion.div>
  );
};

export default AdminProfileCard;
