import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Settings,
  BarChart3,
  PieChart,
  Plus,
  Search,
  Trash,
  X,
  MessageCircle
} from 'lucide-react';
import ChatWindow from '../../components/ChatWindow';
import { ServiceRequest, getServiceRequests, saveServiceRequests } from '../../utils/storage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Users state (previously recentClients)
  const [users, setUsers] = useState([
    { id: 1, name: 'Tech Solutions Ltd', email: 'contact@techsolutions.co.ke', status: 'active', plan: 'Premium' },
    { id: 2, name: 'Green Valley Farms', email: 'info@greenvalley.co.ke', status: 'active', plan: 'Standard' },
    { id: 3, name: 'Urban Retail Co', email: 'admin@urbanretail.co.ke', status: 'pending', plan: 'Basic' },
    { id: 4, name: 'Digital Marketing Pro', email: 'hello@digitalmarketing.co.ke', status: 'active', plan: 'Standard' }
  ]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Service requests state
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(getServiceRequests());

  // Sync service requests with storage/events
  useEffect(() => {
    const sync = () => setServiceRequests(getServiceRequests());
    window.addEventListener('service-requests-updated', sync);
    return () => window.removeEventListener('service-requests-updated', sync);
  }, []);

  const updateStatus = (id: number, status: ServiceRequest['status']) => {
    setServiceRequests((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, status } : r));
      saveServiceRequests(updated);
      return updated;
    });
  };

  const stats = [
    {
      title: 'Total Clients',
      value: '127',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Monthly Revenue',
      value: 'KSh 3,200,000',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Active Projects',
      value: '45',
      change: '+5',
      trend: 'up',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      title: 'Completion Rate',
      value: '94.5%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const recentTasks = [
    { client: 'Tech Solutions Ltd', task: 'Monthly Financial Report', due: '2024-03-20', priority: 'high', status: 'in-progress' },
    { client: 'Green Valley Farms', task: 'Tax Return Preparation', due: '2024-03-22', priority: 'medium', status: 'pending' },
    { client: 'Urban Retail Co', task: 'Payroll Processing', due: '2024-03-18', priority: 'high', status: 'completed' },
    { client: 'Digital Marketing Pro', task: 'Quarterly Review', due: '2024-03-25', priority: 'low', status: 'pending' }
  ];

  const revenueData = [
    { month: 'Jan', amount: 2800000 },
    { month: 'Feb', amount: 3100000 },
    { month: 'Mar', amount: 3200000 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'services', label: 'Services', icon: FileText },
    { id: 'contacts', label: 'Contacts', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Listen for custom event to add user
  useEffect(() => {
    const handleAddUser = (e: Event) => {
      const newUser = (e as CustomEvent).detail as typeof users[number];
      setUsers((prev) => [newUser, ...prev]);
    };
    window.addEventListener('add-user', handleAddUser);
    return () => window.removeEventListener('add-user', handleAddUser);
  }, []);

  const [selectedChat, setSelectedChat] = useState<number | null>(null);

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
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your accounting practice and monitor business performance
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
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-semibold text-gray-900">
                      Recent Tasks
                    </h2>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentTasks.map((task, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-lg rounded-xl shadow-md hover:shadow-xl transition-transform"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            task.priority === 'high' ? 'bg-red-500' :
                            task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <p className="font-medium text-gray-900">{task.task}</p>
                            <p className="text-sm text-gray-500">{task.client} • Due: {task.due}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add New Client</span>
                    </button>
                    <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>Create Report</span>
                    </button>
                  </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
                    Monthly Revenue
                  </h3>
                  <div className="space-y-3">
                    {revenueData.map((data, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -2, boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-lg rounded-lg shadow hover:shadow-md transition-transform"
                      >
                        <span className="text-sm text-gray-600">{data.month}</span>
                        <span className="font-medium text-gray-900">
                          KSh {(data.amount / 1000000).toFixed(1)}M
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-gray-900">
                User Management
              </h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add User</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Plan</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <motion.tr
                      key={user.id}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="border-b border-gray-100 hover:bg-white/60 hover:backdrop-blur-lg"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                          {user.plan}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          View
                        </button>
                        <button
                          onClick={() => setUsers((prev) => prev.filter((u) => u.id !== user.id))}
                          className="text-red-600 hover:text-red-700"
                          title="Delete user"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6">
              Service Requests
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Due</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceRequests.map((req) => (
                    <motion.tr
                      key={req.id}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="border-b border-gray-100 hover:bg-white/60 hover:backdrop-blur-lg"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">{req.title}</td>
                      <td className="py-3 px-4 text-gray-600">{req.due || '-'}</td>
                      <td className="py-3 px-4 text-gray-600">{req.priority}</td>
                      <td className="py-3 px-4">
                        <select
                          value={req.status}
                          onChange={(e) => updateStatus(req.id, e.target.value as ServiceRequest['status'])}
                          className="border rounded px-2 py-1"
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Users list */}
            <div className="border-r pr-4 space-y-2 col-span-1">
              <h3 className="text-lg font-semibold mb-4">Clients</h3>
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedChat(u.id)}
                  className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                >
                  {u.name}
                </button>
              ))}
            </div>
            {/* Chat window */}
            <div className="col-span-2">
              {selectedChat ? (
                <ChatWindow participant="admin" />
              ) : (
                <p className="text-gray-500">Select a client to view conversation</p>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6">Platform Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Placeholder analytics cards */}
              <div className="p-6 bg-gray-50 rounded-xl shadow">
                <h3 className="text-lg font-medium mb-2">User Growth</h3>
                <p className="text-3xl font-bold">+12%</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl shadow">
                <h3 className="text-lg font-medium mb-2">Monthly Revenue</h3>
                <p className="text-3xl font-bold">KSh 3.2M</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl shadow">
                <h3 className="text-lg font-medium mb-2">Tasks Completed</h3>
                <p className="text-3xl font-bold">94%</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl shadow">
                <h3 className="text-lg font-medium mb-2">Churn Rate</h3>
                <p className="text-3xl font-bold">3%</p>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddUserModal && (
          <AddUserModal onClose={() => setShowAddUserModal(false)} />
        )}
      </div>
    </div>
  );
};

// Modal component
const AddUserModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState<'Basic' | 'Standard' | 'Premium'>('Basic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    // Dispatch custom event to parent
    const newUser = { id: Date.now(), name, email, status: 'active', plan };
    window.dispatchEvent(new CustomEvent('add-user', { detail: newUser }));
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
            <Plus className="h-5 w-5 text-primary-500" /> New User
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="User name"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="user@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Plan</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as 'Basic' | 'Standard' | 'Premium')}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option>Basic</option>
                <option>Standard</option>
                <option>Premium</option>
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
                Add
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminDashboard;