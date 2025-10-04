import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Send, Eye, Edit, Trash2, Calendar, Users, AlertCircle, CheckCircle } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: string[];
  scheduledDate: string;
  expiryDate: string;
  status: 'draft' | 'scheduled' | 'published' | 'expired';
  createdBy: string;
  createdAt: string;
  viewCount: number;
}

interface PublishNoticeCardProps {
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  playSuccessSound: () => void;
}

const PublishNoticeCard: React.FC<PublishNoticeCardProps> = ({
  notices,
  setNotices,
  playSuccessSound
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium' as Notice['priority'],
    targetAudience: [] as string[],
    scheduledDate: '',
    expiryDate: ''
  });
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  const audienceOptions = [
    'All Users',
    'Students',
    'Faculty',
    'Industry Partners',
    'Administrators',
    'Final Year Students',
    'Placement Coordinators'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAudienceToggle = (audience: string) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(audience)
        ? prev.targetAudience.filter(a => a !== audience)
        : [...prev.targetAudience, audience]
    }));
  };

  const createNotice = (isDraft: boolean = false) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    if (formData.targetAudience.length === 0) {
      alert('Please select target audience');
      return;
    }

    const newNotice: Notice = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      priority: formData.priority,
      targetAudience: formData.targetAudience,
      scheduledDate: formData.scheduledDate || new Date().toISOString(),
      expiryDate: formData.expiryDate,
      status: isDraft ? 'draft' : (formData.scheduledDate && new Date(formData.scheduledDate) > new Date() ? 'scheduled' : 'published'),
      createdBy: 'Admin',
      createdAt: new Date().toISOString(),
      viewCount: 0
    };

    setNotices(prev => [newNotice, ...prev]);
    
    // Store in localStorage
    const storedNotices = JSON.parse(localStorage.getItem('adminNotices') || '[]');
    storedNotices.unshift(newNotice);
    localStorage.setItem('adminNotices', JSON.stringify(storedNotices));

    playSuccessSound();
    
    // Reset form
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
      targetAudience: [],
      scheduledDate: '',
      expiryDate: ''
    });

    setActiveTab('manage');
    console.log(`📢 Notice ${isDraft ? 'saved as draft' : 'published'}:`, newNotice.title);
  };

  const updateNotice = (notice: Notice) => {
    setNotices(prev => prev.map(n => n.id === notice.id ? notice : n));
    
    // Update localStorage
    const storedNotices = JSON.parse(localStorage.getItem('adminNotices') || '[]');
    const updatedNotices = storedNotices.map((n: Notice) => n.id === notice.id ? notice : n);
    localStorage.setItem('adminNotices', JSON.stringify(updatedNotices));

    playSuccessSound();
    console.log('📝 Notice updated:', notice.title);
  };

  const deleteNotice = (noticeId: number) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;

    setNotices(prev => prev.filter(n => n.id !== noticeId));
    
    // Update localStorage
    const storedNotices = JSON.parse(localStorage.getItem('adminNotices') || '[]');
    const filteredNotices = storedNotices.filter((n: Notice) => n.id !== noticeId);
    localStorage.setItem('adminNotices', JSON.stringify(filteredNotices));

    playSuccessSound();
    console.log('🗑️ Notice deleted');
  };

  const publishNotice = (noticeId: number) => {
    setNotices(prev => prev.map(n => 
      n.id === noticeId 
        ? { ...n, status: 'published' as const, scheduledDate: new Date().toISOString() }
        : n
    ));
    
    playSuccessSound();
    console.log('🚀 Notice published immediately');
  };

  const getPriorityColor = (priority: Notice['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: Notice['status']) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderCreateForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter notice title..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          placeholder="Enter notice content..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date (Optional)</label>
          <input
            type="datetime-local"
            value={formData.scheduledDate}
            onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
        <input
          type="datetime-local"
          value={formData.expiryDate}
          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
        <div className="grid grid-cols-2 gap-2">
          {audienceOptions.map((audience) => (
            <label key={audience} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.targetAudience.includes(audience)}
                onChange={() => handleAudienceToggle(audience)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{audience}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => createNotice(false)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Send className="w-4 h-4 mr-2" />
          Publish Now
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => createNotice(true)}
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          <Edit className="w-4 h-4 mr-2" />
          Save as Draft
        </motion.button>
      </div>
    </div>
  );

  const renderManageNotices = () => (
    <div className="space-y-4 max-h-80 overflow-y-auto">
      {notices.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No notices created yet</p>
        </div>
      ) : (
        notices.map((notice) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">{notice.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{notice.content}</p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notice.priority)}`}>
                  {notice.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(notice.status)}`}>
                  {notice.status}
                </span>
              </div>
            </div>

            <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {notice.targetAudience.length} audiences
              </div>
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {notice.viewCount} views
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(notice.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Target: {notice.targetAudience.slice(0, 2).join(', ')}
                {notice.targetAudience.length > 2 && ` +${notice.targetAudience.length - 2} more`}
              </div>
              
              <div className="flex space-x-2">
                {notice.status === 'draft' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => publishNotice(notice.id)}
                    className="text-green-600 hover:text-green-800"
                    title="Publish now"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditingNotice(notice)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit notice"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteNotice(notice.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete notice"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Scheduling info */}
            {notice.scheduledDate && (
              <div className="mt-2 text-xs text-blue-600 bg-blue-50 rounded px-2 py-1">
                <Calendar className="w-3 h-3 inline mr-1" />
                Scheduled: {new Date(notice.scheduledDate).toLocaleString()}
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
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Bell className="w-8 h-8 text-yellow-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Publish Notice</h3>
            <p className="text-sm text-gray-600">Create and manage system notices</p>
          </div>
        </div>
        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
          <AlertCircle className="w-4 h-4 text-yellow-600 mr-1" />
          <span className="text-sm font-medium text-yellow-600">
            {notices.filter(n => n.status === 'published').length} active
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'create', label: 'Create Notice', icon: Edit },
          { key: 'manage', label: 'Manage Notices', icon: Bell }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-1" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'create' && renderCreateForm()}
      {activeTab === 'manage' && renderManageNotices()}

      {/* Edit Modal */}
      {editingNotice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setEditingNotice(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">Edit Notice</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={editingNotice.title}
                onChange={(e) => setEditingNotice({...editingNotice, title: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Title"
              />
              <textarea
                value={editingNotice.content}
                onChange={(e) => setEditingNotice({...editingNotice, content: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg resize-none"
                rows={3}
                placeholder="Content"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    updateNotice(editingNotice);
                    setEditingNotice(null);
                  }}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditingNotice(null)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PublishNoticeCard;