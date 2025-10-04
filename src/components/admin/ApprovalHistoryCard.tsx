import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  History,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  Download,
  Calendar,
} from "lucide-react";

interface ApprovalRecord {
  id: number;
  type: "user" | "internship" | "notice";
  itemTitle: string;
  applicantName: string;
  action: "approved" | "rejected" | "pending";
  actionBy: string;
  actionDate: string;
  reason?: string;
  priority: "high" | "medium" | "low";
}

interface ApprovalHistoryCardProps {
  approvalHistory: ApprovalRecord[];
  setApprovalHistory: React.Dispatch<React.SetStateAction<ApprovalRecord[]>>;
  playSuccessSound: () => void;
}

const ApprovalHistoryCard: React.FC<ApprovalHistoryCardProps> = ({
  approvalHistory,
  setApprovalHistory,
  playSuccessSound,
}) => {
  const [filterType, setFilterType] = useState<
    "all" | "user" | "internship" | "notice"
  >("all");
  const [filterAction, setFilterAction] = useState<
    "all" | "approved" | "rejected" | "pending"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<
    "all" | "today" | "week" | "month"
  >("all");

  const filteredHistory = approvalHistory.filter((record) => {
    const matchesType = filterType === "all" || record.type === filterType;
    const matchesAction =
      filterAction === "all" || record.action === filterAction;
    const matchesSearch =
      record.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.applicantName.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesDate = true;
    if (dateRange !== "all") {
      const recordDate = new Date(record.actionDate);
      const now = new Date();
      const diffTime = now.getTime() - recordDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (dateRange) {
        case "today":
          matchesDate = diffDays <= 1;
          break;
        case "week":
          matchesDate = diffDays <= 7;
          break;
        case "month":
          matchesDate = diffDays <= 30;
          break;
      }
    }

    return matchesType && matchesAction && matchesSearch && matchesDate;
  });

  const exportHistory = () => {
    playSuccessSound();
    const csvContent = [
      [
        "Date",
        "Type",
        "Title",
        "Applicant",
        "Action",
        "Action By",
        "Reason",
      ].join(","),
      ...filteredHistory.map((record) =>
        [
          new Date(record.actionDate).toLocaleDateString(),
          record.type,
          record.itemTitle,
          record.applicantName,
          record.action,
          record.actionBy,
          record.reason || "",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `approval-history-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("📊 Approval history exported");
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "approved":
        return "bg-green-50 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "user":
        return "bg-blue-50 text-blue-800";
      case "internship":
        return "bg-purple-50 text-purple-800";
      case "notice":
        return "bg-orange-50 text-orange-800";
      default:
        return "bg-gray-50 text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <History className="w-8 h-8 text-teal-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Approval History</h3>
            <p className="text-sm text-gray-600">
              View complete approval activity log
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportHistory}
            className="flex items-center px-3 py-1 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition text-sm"
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or applicant name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter buttons */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as typeof filterType)
              }
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="user">User</option>
              <option value="internship">Internship</option>
              <option value="notice">Notice</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Action
            </label>
            <select
              value={filterAction}
              onChange={(e) =>
                setFilterAction(e.target.value as typeof filterAction)
              }
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Actions</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Date Range
          </label>
          <div className="flex space-x-1">
            {[
              { key: "all", label: "All" },
              { key: "today", label: "Today" },
              { key: "week", label: "Week" },
              { key: "month", label: "Month" },
            ].map((range) => (
              <button
                key={range.key}
                onClick={() => setDateRange(range.key as typeof dateRange)}
                className={`flex-1 px-2 py-1 text-xs font-medium rounded transition ${
                  dateRange === range.key
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No approval records found</p>
          </div>
        ) : (
          filteredHistory.map((record) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        record.type
                      )}`}
                    >
                      {record.type}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(
                        record.action
                      )}`}
                    >
                      {getActionIcon(record.action)}
                      <span className="ml-1">{record.action}</span>
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {record.itemTitle}
                  </h4>
                  <p className="text-xs text-gray-600">
                    by {record.applicantName}
                  </p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(record.actionDate).toLocaleDateString()}
                  </div>
                  <div className="mt-1">
                    {new Date(record.actionDate).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="text-gray-600">
                  Action by:{" "}
                  <span className="font-medium">{record.actionBy}</span>
                </div>
                {record.reason && (
                  <div className="text-gray-500 max-w-xs truncate">
                    Reason: {record.reason}
                  </div>
                )}
              </div>

              {/* Timeline indicator */}
              <div className="mt-2 flex items-center text-xs text-gray-400">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-2">
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(record.actionDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days ago
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">
              {approvalHistory.filter((r) => r.action === "approved").length}
            </div>
            <div className="text-xs text-gray-600">Approved</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">
              {approvalHistory.filter((r) => r.action === "rejected").length}
            </div>
            <div className="text-xs text-gray-600">Rejected</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">
              {approvalHistory.filter((r) => r.action === "pending").length}
            </div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {filteredHistory.length}
            </div>
            <div className="text-xs text-gray-600">Filtered</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApprovalHistoryCard;
