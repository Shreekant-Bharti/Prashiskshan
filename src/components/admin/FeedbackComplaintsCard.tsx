import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, AlertTriangle, CheckCircle, Clock, Filter, Reply, Flag } from 'lucide-react';

interface Feedback {
  id: number;
  type: 'feedback' | 'complaint' | 'suggestion';
  title: string;
  content: string;
  rating?: number;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  submittedBy: string;
  userType: 'student' | 'faculty' | 'industry';
  submittedAt: string;
  adminResponse?: string;
  respondedBy?: string;
  respondedAt?: string;
}

interface FeedbackComplaintsCardProps {
  feedbacks: Feedback[];
  setFeedbacks: React.Dispatch<React.SetStateAction<Feedback[]>>;
  playSuccessSound: () => void;
}

const FeedbackComplaintsCard: React.FC<FeedbackComplaintsCardProps> = ({
  feedbacks,
  setFeedbacks,
  playSuccessSound
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'feedback' | 'complaint' | 'suggestion'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in-progress' | 'resolved' | 'closed'>('all');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [responseText, setResponseText] = useState('');

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesTab = activeTab === 'all' || feedback.type === activeTab;
    const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;
    return matchesTab && matchesStatus;
  });

  const updateFeedbackStatus = (feedbackId: number, newStatus: Feedback['status']) => {
    setFeedbacks(prev => prev.map(f => 
      f.id === feedbackId 
        ? { ...f, status: newStatus }
        : f
    ));
    playSuccessSound();
    console.log(`📝 Feedback status updated to: ${newStatus}`);
  };

  const respondToFeedback = (feedbackId: number, response: string) => {
    if (!response.trim()) {
      alert('Please enter a response');
      return;
    }

    setFeedbacks(prev => prev.map(f => 
      f.id === feedbackId 
        ? { 
            ...f, 
            adminResponse: response,
            respondedBy: 'Admin',
            respondedAt: new Date().toISOString(),
            status: 'resolved'
          }
        : f
    ));

    setResponseText('');
    setSelectedFeedback(null);
    playSuccessSound();
    console.log('💬 Response sent to feedback:', feedbackId);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feedback': return <MessageSquare className="w-4 h-4" />;
      case 'complaint': return <AlertTriangle className="w-4 h-4" />;
      case 'suggestion': return <Star className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feedback': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'complaint': return 'bg-red-50 text-red-800 border-red-200';
      case 'suggestion': return 'bg-green-50 text-green-800 border-green-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageSquare className="w-8 h-8 text-pink-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Feedback & Complaints</h3>
            <p className="text-sm text-gray-600">Manage user feedback and complaints</p>
          </div>
        </div>
        <div className="flex items-center bg-pink-50 px-3 py-1 rounded-full">
          <Flag className="w-4 h-4 text-pink-600 mr-1" />
          <span className="text-sm font-medium text-pink-600">
            {feedbacks.filter(f => f.status === 'open' || f.status === 'in-progress').length} pending
          </span>
        </div>
      </div>

      {/* Type Tabs */}
      <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'all', label: 'All', count: feedbacks.length },
          { key: 'feedback', label: 'Feedback', count: feedbacks.filter(f => f.type === 'feedback').length },
          { key: 'complaint', label: 'Complaints', count: feedbacks.filter(f => f.type === 'complaint').length },
          { key: 'suggestion', label: 'Suggestions', count: feedbacks.filter(f => f.type === 'suggestion').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
              activeTab === tab.key ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Status Filter */}
      <div className="mb-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'all', label: 'All Status' },
            { key: 'open', label: 'Open' },
            { key: 'in-progress', label: 'In Progress' },
            { key: 'resolved', label: 'Resolved' },
            { key: 'closed', label: 'Closed' }
          ].map((status) => (
            <button
              key={status.key}
              onClick={() => setFilterStatus(status.key as typeof filterStatus)}
              className={`flex-1 px-2 py-1 text-xs font-medium rounded transition ${
                filterStatus === status.key
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredFeedbacks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No feedback found</p>
          </div>
        ) : (
          filteredFeedbacks.map((feedback) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(feedback.type)}`}>
                      {getTypeIcon(feedback.type)}
                      <span className="ml-1">{feedback.type}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(feedback.priority)}`}>
                      {feedback.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                      {feedback.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">{feedback.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{feedback.content}</p>
                  
                  {feedback.rating && (
                    <div className="flex items-center mb-2">
                      <span className="text-xs text-gray-500 mr-2">Rating:</span>
                      <div className="flex">
                        {renderStars(feedback.rating)}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>By: {feedback.submittedBy} ({feedback.userType})</span>
                    <span>Category: {feedback.category}</span>
                    <span>{new Date(feedback.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Admin Response */}
              {feedback.adminResponse && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="flex items-center mb-1">
                    <Reply className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-sm font-medium text-blue-800">Admin Response</span>
                    <span className="text-xs text-blue-600 ml-2">
                      by {feedback.respondedBy} • {new Date(feedback.respondedAt!).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-blue-700">{feedback.adminResponse}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <div className="flex space-x-2">
                  {feedback.status !== 'resolved' && feedback.status !== 'closed' && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateFeedbackStatus(feedback.id, 'in-progress')}
                        className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition"
                      >
                        In Progress
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedFeedback(feedback)}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
                      >
                        <Reply className="w-3 h-3 inline mr-1" />
                        Respond
                      </motion.button>
                    </>
                  )}
                  {feedback.status === 'resolved' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateFeedbackStatus(feedback.id, 'closed')}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
                    >
                      Close
                    </motion.button>
                  )}
                </div>
                
                {feedback.status === 'resolved' && (
                  <div className="flex items-center text-xs text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Resolved
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Response Modal */}
      {selectedFeedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedFeedback(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">Respond to {selectedFeedback.type}</h3>
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <h4 className="font-semibold text-sm">{selectedFeedback.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{selectedFeedback.content}</p>
            </div>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Enter your response..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => respondToFeedback(selectedFeedback.id, responseText)}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send Response
              </button>
              <button
                onClick={() => {
                  setSelectedFeedback(null);
                  setResponseText('');
                }}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">
              {feedbacks.filter(f => f.status === 'open').length}
            </div>
            <div className="text-xs text-gray-600">Open</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">
              {feedbacks.filter(f => f.status === 'in-progress').length}
            </div>
            <div className="text-xs text-gray-600">In Progress</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {feedbacks.filter(f => f.status === 'resolved').length}
            </div>
            <div className="text-xs text-gray-600">Resolved</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-600">
              {feedbacks.filter(f => f.status === 'closed').length}
            </div>
            <div className="text-xs text-gray-600">Closed</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackComplaintsCard;