import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { User, Mail, Lock, Bell, CreditCard, Download } from 'lucide-react';
import { updateInstructorDetails } from '../../apiComponents/apiService.jsx';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: " ",
    email: " ",
    phone: " ",
    role: " ",
    profileImage: " ",
    bio: " ",
  });


  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
  ];

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await updateInstructorDetails(id,data);
      const details = response.data.user;
      console.log("Fetched details data:", details);
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
        profileImage: user.profileImage || ""
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching course data:", error);
      setLoading(false);
    }
  };
  

  return (
    <div className="space-y-6 translate-x-0 fixed md:relative md:translate-x-0">
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === tab.id
              ? 'bg-student-primary/20 text-student-primary'
              : 'bg-dark-200 text-gray-400 hover:bg-dark-100'
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <Card variant="student">
          <h2 className="text-xl font-semibold text-white mb-6">Profile Settings</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-student-primary"
                    defaultValue="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-student-primary"
                    defaultValue="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <div className="flex">
                  <div className="flex-grow">
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-student-primary"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div className="ml-2">
                    <Button variant="student" size="sm" className="h-full">
                      <Mail className="w-4 h-4 mr-1" />
                      Verify
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-student-primary"
                  defaultValue="+1 234 567 890"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-gray-600
 focus:outline-none focus:ring-2 focus:ring-student-primary"
                  defaultValue="I'm a student passionate about web development and design. Currently learning React and JavaScript."
                ></textarea>
              </div>

              <div>
                <Button variant="student" className="btn btn-instructor text-sm px-4 py-2  btn btn-instructor text-sm px-4 py-2 rounded-lg hover:bg-neon-purple/10 hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300 bg-neon-blue/20 text-white border border-neon-blue/30">Save Changes</Button>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?img=1"
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-student-primary"
                  />
                  <button className="absolute bottom-0 right-0 bg-dark-200 p-2 rounded-full border border-gray-700 text-student-primary hover:bg-dark-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <h3 className="text-white font-medium mt-4">John Doe</h3>
                <p className="text-gray-400 text-sm">Student</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card variant="student">
          <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>

          <div className="space-y-6 translate-x-0 fixed md:relative md:translate-x-0">
            <div>
              <h3 className="text-white font-medium mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-student-primary"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-student-primary"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-student-primary"
                  />
                </div>
                <div>
                  <Button variant="student">Update Password</Button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-white font-medium mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Protect your account with 2FA</p>
                  <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-student-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'notifications' && (
        <Card variant="student">
          <h2 className="text-xl font-semibold text-white mb-6">Notification Settings</h2>

          <div className="space-y-6 translate-x-0 fixed md:relative md:translate-x-0">
            <div className="space-y-4">
              <h3 className="text-white font-medium">Email Notifications</h3>

              <div className="flex items-center justify-between py-3 border-b border-gray-800">
                <div>
                  <p className="text-white">Course Updates</p>
                  <p className="text-gray-400 text-sm">Receive updates about your enrolled courses</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-student-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-800">
                <div>
                  <p className="text-white">New Lessons</p>
                  <p className="text-gray-400 text-sm">Get notified when new lessons are available</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-student-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-800">
                <div>
                  <p className="text-white">Promotions</p>
                  <p className="text-gray-400 text-sm">Receive promotional offers and discounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-student-primary"></div>
                </label>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-white font-medium">Push Notifications</h3>

              <div className="flex items-center justify-between py-3 border-b border-gray-800">
                <div>
                  <p className="text-white">Assignment Reminders</p>
                  <p className="text-gray-400 text-sm">Get reminders about upcoming deadlines</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-student-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-800">
                <div>
                  <p className="text-white">Forum Mentions</p>
                  <p className="text-gray-400 text-sm">Get notified when you're mentioned in a forum</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-student-primary"></div>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="student">Save Preferences</Button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'billing' && (
        <Card variant="student">
          <h2 className="text-xl font-semibold text-white mb-6">Billing Settings</h2>

          <div className="space-y-6 translate-x-0 fixed md:relative md:translate-x-0">
            <div>
              <h3 className="text-white font-medium mb-4">Payment Methods</h3>

              <div className="bg-dark-200 p-4 rounded-lg border border-gray-700 mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-student-primary" />
                    <div>
                      <p className="text-white">•••• •••• •••• 4242</p>
                      <p className="text-gray-400 text-xs">Expires 05/25</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-student-primary/20 text-student-primary">
                      Default
                    </span>
                    <button className="text-gray-400 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <Button variant="student" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Payment Method
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-white font-medium mb-4">Billing History</h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-800">
                      <th className="pb-3 text-gray-400 font-medium">Invoice</th>
                      <th className="pb-3 text-gray-400 font-medium">Date</th>
                      <th className="pb-3 text-gray-400 font-medium">Amount</th>
                      <th className="pb-3 text-gray-400 font-medium">Status</th>
                      <th className="pb-3 text-gray-400 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-white">INV-001</td>
                      <td className="py-3 text-white">Aug 15, 2023</td>
                      <td className="py-3 text-white">$129.99</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">
                          Paid
                        </span>
                      </td>
                      <td className="py-3">
                        <Button size="sm" className="bg-dark-100 text-gray-300 hover:bg-dark-200">
                          <Download className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-white">INV-002</td>
                      <td className="py-3 text-white">Jul 22, 2023</td>
                      <td className="py-3 text-white">$89.99</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">
                          Paid
                        </span>
                      </td>
                      <td className="py-3">
                        <Button size="sm" className="bg-dark-100 text-gray-300 hover:bg-dark-200">
                          <Download className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Settings;