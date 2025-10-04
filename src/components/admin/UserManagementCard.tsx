import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, CheckCircle, XCircle, UserCheck, UserX, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any;
}

interface UserManagementCardProps {
  pendingUsers: {
    students: User[];
    faculty: User[];
    industry: User[];
  };
  setPendingUsers: React.Dispatch<React.SetStateAction<any>>;
  activeUsers: {
    students: User[];
    faculty: User[];
    industry: User[];
  };
  setActiveUsers: React.Dispatch<React.SetStateAction<any>>;
  rejectedUsers: {
    students: User[];
    faculty: User[];
    industry: User[];
  };
  setRejectedUsers: React.Dispatch<React.SetStateAction<any>>;
  playSuccessSound: () => void;
}

const UserManagementCard: React.FC<UserManagementCardProps> = ({
  pendingUsers,
  setPendingUsers,
  activeUsers,
  setActiveUsers,
  rejectedUsers,
  setRejectedUsers,
  playSuccessSound
}) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedUserType, setSelectedUserType] = useState('students');

  const handleApprove = (userType: string, userId: number) => {
    const user = pendingUsers[userType as keyof typeof pendingUsers].find((u: User) => u.id === userId);
    if (!user) return;

    // Remove from pending
    setPendingUsers(prev => ({
      ...prev,
      [userType]: prev[userType as keyof typeof prev].filter((u: User) => u.id !== userId)
    }));

    // Add to active
    setActiveUsers(prev => ({
      ...prev,
      [userType]: [...prev[userType as keyof typeof prev], user]
    }));

    playSuccessSound();
    toast.success(`✅ ${user.name} approved successfully!`);
    console.log(`✅ User approved: ${user.name} (${userType})`);
  };

  const handleReject = (userType: string, userId: number) => {
    const user = pendingUsers[userType as keyof typeof pendingUsers].find((u: User) => u.id === userId);
    if (!user) return;

    const reason = prompt('Please provide a reason for rejection:') || 'No reason provided';

    // Remove from pending
    setPendingUsers(prev => ({
      ...prev,
      [userType]: prev[userType as keyof typeof prev].filter((u: User) => u.id !== userId)
    }));

    // Add to rejected with reason
    setRejectedUsers(prev => ({
      ...prev,
      [userType]: [...prev[userType as keyof typeof prev], { ...user, rejectionReason: reason }]
    }));

    toast.error(`❌ ${user.name} rejected`);
    console.log(`❌ User rejected: ${user.name} (${userType}) - Reason: ${reason}`);
  };

  const handleSuspend = (userType: string, userId: number) => {
    const user = activeUsers[userType as keyof typeof activeUsers].find((u: User) => u.id === userId);
    if (!user) return;

    // Remove from active (in real app, would mark as suspended)
    setActiveUsers(prev => ({
      ...prev,
      [userType]: prev[userType as keyof typeof prev].filter((u: User) => u.id !== userId)
    }));

    toast.warning(`⚠️ ${user.name} suspended`);
    console.log(`⚠️ User suspended: ${user.name} (${userType})`);
  };

  const renderUserList = (users: User[], userType: string, actions: string[]) => (
    <div className="space-y-3">
      {users.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No {userType} found</p>
      ) : (
        users.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.email}</p>
                {user.college && <p className="text-xs text-gray-500">📍 {user.college}</p>}
                {user.rejectionReason && (
                  <p className="text-xs text-red-600 mt-1">Reason: {user.rejectionReason}</p>
                )}
              </div>
              <div className="flex space-x-2">
                {actions.includes('approve') && (
                  <button
                    onClick={() => handleApprove(userType, user.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition duration-200 flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </button>
                )}
                {actions.includes('reject') && (
                  <button
                    onClick={() => handleReject(userType, user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition duration-200 flex items-center"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </button>
                )}
                {actions.includes('suspend') && (
                  <button
                    onClick={() => handleSuspend(userType, user.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition duration-200 flex items-center"
                  >
                    <UserX className="w-4 h-4 mr-1" />
                    Suspend
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition duration-300">
      <div className="flex items-center mb-6">
        <Users className="w-8 h-8 text-blue-600 mr-3" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <p className="text-sm text-gray-600">Manage user approvals and status</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        {['pending', 'active', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition duration-200 ${
              activeTab === tab
                ? 'bg-blue-500 text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* User Type Selection */}
      <div className="flex space-x-2 mb-4">
        {['students', 'faculty', 'industry'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedUserType(type)}
            className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
              selectedUserType === type
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* User List */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'pending' && (
            <motion.div
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderUserList(
                pendingUsers[selectedUserType as keyof typeof pendingUsers],
                selectedUserType,
                ['approve', 'reject']
              )}
            </motion.div>
          )}
          {activeTab === 'active' && (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderUserList(
                activeUsers[selectedUserType as keyof typeof activeUsers],
                selectedUserType,
                ['suspend']
              )}
            </motion.div>
          )}
          {activeTab === 'rejected' && (
            <motion.div
              key="rejected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderUserList(
                rejectedUsers[selectedUserType as keyof typeof rejectedUsers],
                selectedUserType,
                []
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-blue-600">
              {Object.values(pendingUsers).flat().length}
            </div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">
              {Object.values(activeUsers).flat().length}
            </div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-red-600">
              {Object.values(rejectedUsers).flat().length}
            </div>
            <div className="text-xs text-gray-500">Rejected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementCard;