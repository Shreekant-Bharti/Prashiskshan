import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, XCircle, Clock, Eye, Download, AlertCircle } from 'lucide-react';

interface InternshipApplication {
  id: number;
  studentName: string;
  studentId: string;
  companyName: string;
  position: string;
  duration: string;
  startDate: string;
  stipend: number;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  priority: 'high' | 'medium' | 'low';
}

interface InternshipApprovalsCardProps {
  pendingApplications: InternshipApplication[];
  setPendingApplications: React.Dispatch<React.SetStateAction<InternshipApplication[]>>;
  approvedApplications: InternshipApplication[];
  setApprovedApplications: React.Dispatch<React.SetStateAction<InternshipApplication[]>>;
  rejectedApplications: InternshipApplication[];
  setRejectedApplications: React.Dispatch<React.SetStateAction<InternshipApplication[]>>;
  playSuccessSound: () => void;
}

const InternshipApprovalsCard: React.FC<InternshipApprovalsCardProps> = ({
  pendingApplications,
  setPendingApplications,
  approvedApplications,
  setApprovedApplications,
  rejectedApplications,
  setRejectedApplications,
  playSuccessSound
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedApplication, setSelectedApplication] = useState<InternshipApplication | null>(null);

  const handleApprove = (application: InternshipApplication) => {
    // Remove from pending
    setPendingApplications(prev => prev.filter(app => app.id !== application.id));
    
    // Add to approved with updated status
    const approvedApp = { ...application, status: 'approved' as const };
    setApprovedApplications(prev => [...prev, approvedApp]);
    
    playSuccessSound();
    
    // Store in localStorage
    const approvedList = JSON.parse(localStorage.getItem('approvedInternships') || '[]');
    approvedList.push(approvedApp);
    localStorage.setItem('approvedInternships', JSON.stringify(approvedList));
    
    console.log('🎉 Internship approved:', application.studentName, 'at', application.companyName);
  };

  const handleReject = (application: InternshipApplication, reason: string = 'No reason provided') => {
    // Remove from pending
    setPendingApplications(prev => prev.filter(app => app.id !== application.id));
    
    // Add to rejected with updated status and reason
    const rejectedApp = { ...application, status: 'rejected' as const, rejectionReason: reason };
    setRejectedApplications(prev => [...prev, rejectedApp]);
    
    playSuccessSound();
    
    // Store in localStorage
    const rejectedList = JSON.parse(localStorage.getItem('rejectedInternships') || '[]');
    rejectedList.push(rejectedApp);
    localStorage.setItem('rejectedInternships', JSON.stringify(rejectedList));
    
    console.log('❌ Internship rejected:', application.studentName, 'at', application.companyName, 'Reason:', reason);
  };

  const viewDocument = (docName: string) => {
    // Simulate document viewing
    window.open(`/documents/${docName}`, '_blank');
    console.log('📄 Viewing document:', docName);
  };

  const downloadDocument = (docName: string) => {
    // Simulate document download
    console.log('⬇️ Downloading document:', docName);
    // In real implementation, this would trigger actual download
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderApplications = (applications: InternshipApplication[]) => (
    <div className="space-y-4 max-h-80 overflow-y-auto">
      {applications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No {activeTab} applications</p>
        </div>
      ) : (
        applications.map((application) => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-800">{application.studentName}</h4>
                <p className="text-sm text-gray-600">ID: {application.studentId}</p>
                <p className="text-sm font-medium text-blue-600">{application.position}</p>
                <p className="text-sm text-gray-600">{application.companyName}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(application.priority)}`}>
                  {application.priority} priority
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Submitted: {new Date(application.submissionDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <span className="text-gray-500">Duration:</span>
                <span className="ml-2 font-medium">{application.duration}</span>
              </div>
              <div>
                <span className="text-gray-500">Start Date:</span>
                <span className="ml-2 font-medium">{application.startDate}</span>
              </div>
              <div>
                <span className="text-gray-500">Stipend:</span>
                <span className="ml-2 font-medium">₹{application.stipend.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Documents:</span>
                <span className="ml-2 font-medium">{application.documents.length} files</span>
              </div>
            </div>

            {/* Documents */}
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-2">Documents:</p>
              <div className="flex flex-wrap gap-2">
                {application.documents.map((doc, index) => (
                  <div key={index} className="flex items-center bg-white rounded px-2 py-1 border">
                    <span className="text-xs text-gray-600 mr-2">{doc}</span>
                    <button
                      onClick={() => viewDocument(doc)}
                      className="text-blue-600 hover:text-blue-800 mr-1"
                      title="View document"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => downloadDocument(doc)}
                      className="text-green-600 hover:text-green-800"
                      title="Download document"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons for pending applications */}
            {activeTab === 'pending' && (
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApprove(application)}
                  className="flex items-center px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const reason = prompt('Enter rejection reason:');
                    if (reason) handleReject(application, reason);
                  }}
                  className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedApplication(application)}
                  className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </motion.button>
              </div>
            )}

            {/* Status indicator for approved/rejected */}
            {activeTab !== 'pending' && (
              <div className="flex items-center justify-between">
                <div className={`flex items-center text-sm ${
                  application.status === 'approved' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {application.status === 'approved' ? (
                    <CheckCircle className="w-4 h-4 mr-1" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-1" />
                  )}
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </div>
                {application.status === 'rejected' && (application as any).rejectionReason && (
                  <span className="text-xs text-gray-500">
                    Reason: {(application as any).rejectionReason}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        ))
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Briefcase className="w-8 h-8 text-purple-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Internship Approvals</h3>
            <p className="text-sm text-gray-600">Review and approve internship applications</p>
          </div>
        </div>
        <div className="flex items-center bg-red-50 px-3 py-1 rounded-full">
          <Clock className="w-4 h-4 text-red-600 mr-1" />
          <span className="text-sm font-medium text-red-600">
            {pendingApplications.length} pending
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'pending', label: 'Pending', count: pendingApplications.length, color: 'text-orange-600' },
          { key: 'approved', label: 'Approved', count: approvedApplications.length, color: 'text-green-600' },
          { key: 'rejected', label: 'Rejected', count: rejectedApplications.length, color: 'text-red-600' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.key ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Applications List */}
      {activeTab === 'pending' && renderApplications(pendingApplications)}
      {activeTab === 'approved' && renderApplications(approvedApplications)}
      {activeTab === 'rejected' && renderApplications(rejectedApplications)}

      {/* Application Detail Modal */}
      {selectedApplication && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedApplication(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Application Details</h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Student Name:</label>
                  <p className="font-semibold">{selectedApplication.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Student ID:</label>
                  <p className="font-semibold">{selectedApplication.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Company:</label>
                  <p className="font-semibold">{selectedApplication.companyName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Position:</label>
                  <p className="font-semibold">{selectedApplication.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Duration:</label>
                  <p className="font-semibold">{selectedApplication.duration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Start Date:</label>
                  <p className="font-semibold">{selectedApplication.startDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Stipend:</label>
                  <p className="font-semibold">₹{selectedApplication.stipend.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Priority:</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedApplication.priority)}`}>
                    {selectedApplication.priority}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Documents:</label>
                <div className="mt-2 space-y-2">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded p-2">
                      <span className="text-sm">{doc}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewDocument(doc)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => downloadDocument(doc)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InternshipApprovalsCard;