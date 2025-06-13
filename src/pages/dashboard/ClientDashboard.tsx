import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coins, 
  FileText, 
  Calendar, 
  TrendingUp, 
  MessageCircle,
  Bell,
  Download,
  Plus,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DocumentManager from '../../components/DocumentManager';
import ChatWindow from '../../components/ChatWindow';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Account Balance',
      value: 'KSh 2,450,000',
      change: '+12.5%',
      trend: 'up',
      icon: Coins,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Expenses',
      value: 'KSh 180,000',
      change: '-5.2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Invoices',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      title: 'Tax Savings',
      value: 'KSh 45,000',
      change: '+8.1%',
      trend: 'up',
      icon: Calendar,
      color: 'text-purple-600'
    }
  ];

  const initialDocuments = [
    { name: 'Monthly Financial Report - March 2024', date: '2024-03-15', type: 'PDF', status: 'completed' },
    { name: 'Tax Return 2023', date: '2024-03-10', type: 'PDF', status: 'pending' },
    { name: 'Payroll Summary - Q1 2024', date: '2024-03-08', type: 'Excel', status: 'completed' },
    { name: 'Expense Report - February', date: '2024-03-05', type: 'PDF', status: 'completed' }
  ];
  const [documents, setDocuments] = useState(initialDocuments);

  const recentDocuments = [
    { name: 'Monthly Financial Report - March 2024', date: '2024-03-15', type: 'PDF', status: 'completed' },
    { name: 'Tax Return 2023', date: '2024-03-10', type: 'PDF', status: 'pending' },
    { name: 'Payroll Summary - Q1 2024', date: '2024-03-08', type: 'Excel', status: 'completed' },
    { name: 'Expense Report - February', date: '2024-03-05', type: 'PDF', status: 'completed' }
  ];

  const upcomingTasks = [
    { task: 'Quarterly Tax Filing', due: '2024-04-15', priority: 'high' },
    { task: 'Monthly Reconciliation', due: '2024-03-30', priority: 'medium' },
    { task: 'Expense Report Review', due: '2024-03-25', priority: 'low' },
    { task: 'Payroll Processing', due: '2024-03-28', priority: 'high' }
  ];

  const notifications = [
    { message: 'Your monthly report is ready for review', time: '2 hours ago', type: 'info' },
    { message: 'Tax deadline reminder: 15 days remaining', time: '1 day ago', type: 'warning' },
    { message: 'Payment received: KSh 150,000', time: '2 days ago', type: 'success' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Coins },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'services', label: 'Services', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageCircle }
  ];

  // Service Requests State
  const initialRequests = [
    { id: 1, title: 'Quarterly Tax Filing', due: '2024-04-15', priority: 'High', status: 'Pending' }
  ];
  const [serviceRequests, setServiceRequests] = useState(initialRequests);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showRequestModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [showRequestModal]);

  // Modal component for new request
  const NewRequestModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [due, setDue] = useState('');
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title) return;
      setServiceRequests((prev) => [
        { id: Date.now(), title, due, priority, status: 'Pending' },
        ...prev
      ]);
      onClose();
    };

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary-500" /> New Service Request
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder="e.g. Annual Audit"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                <input
                  type="date"
                  value={due}
                  onChange={(e) => setDue(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-gray-300 dark:border-gray-600 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your financial dashboard
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gray-50`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Documents */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-semibold text-gray-900">
                      Recent Documents
                    </h2>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentDocuments.map((doc, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-lg rounded-xl shadow-md hover:shadow-xl transition-transform"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            doc.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.status}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.95, rotate: -10 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            className="px-2 py-1 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors focus:ring focus:ring-primary-200 focus:ring-opacity-50 shadow-sm"
                            aria-label={`Download ${doc.name}`}
                            title="Download document"
                          >
                            <Download className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Tasks */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
                    Upcoming Tasks
                  </h3>
                  <div className="space-y-3">
                    {upcomingTasks.map((task, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          task.priority === 'high' ? 'bg-red-500' :
                          task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{task.task}</p>
                          <p className="text-xs text-gray-500">{task.due}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
                    Recent Notifications
                  </h3>
                  <div className="space-y-3">
                    {notifications.map((notification, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Bell className="h-4 w-4 text-primary-500 mt-1" />
                        <div>
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <DocumentManager
              documents={documents}
              onAdd={(d) => setDocuments((prev) => [d, ...prev])}
              onDelete={(index) =>
                setDocuments((prev) => prev.filter((_, i) => i !== index))
              }
            />
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-gray-900">
                Service Requests
              </h2>
              <button
                onClick={() => setShowRequestModal(true)}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Request</span>
              </button>
            </div>
            {/* Requests Table */}
            {serviceRequests.length ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-600">Title</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-600">Due</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-600">Priority</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {serviceRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 whitespace-nowrap">{req.title}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{req.due || '-'}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{req.priority}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{req.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-12">No requests yet</p>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-gray-900">
                Message Center
              </h2>
            </div>
            <ChatWindow participant="client" />
          </div>
        )}
      </div>
      {/* Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <NewRequestModal onClose={() => setShowRequestModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientDashboard;