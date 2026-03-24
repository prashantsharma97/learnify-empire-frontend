import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import toast from "react-hot-toast";
import { UserContext } from '../../components/context/UserContext';
import { User, Mail, Lock, Bell, CreditCard, Download, EyeOff, Eye } from 'lucide-react';
import { getInstructorDetails, updateInstructorDetails, changePassword } from '../../apiComponents/apiService.jsx';

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

  const { user } = React.useContext(UserContext);
  const [imageFile, setImageFile] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };



  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
  ];

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchInstructorDetails = async () => {
    try {
      const response = await getInstructorDetails();
      const details = response.data.user;
      setProfileData({
        username: details.username || "",
        email: details.email || "",
        phone: details.phone || "",
        role: details.role || "",
        profileImage: details.profileImage || "",
        bio: details.bio || "",
      });
    } catch (error) {
      console.error("Error fetching instructor details:", error);
    } 
  };

  const fetchCourse = async () => {
    try {
      setLoading(true);
      if (user.role === "instructor") {
        await fetchInstructorDetails();
      } else if (user.role === "student") {
        await fetchInstructorDetails();
        console.log("Student profile fetch logic goes here");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching course data:", error);
      setLoading(false);
    }
  };


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", profileData.username);
      formData.append("email", profileData.email);
      formData.append("phone", profileData.phone);
      formData.append("bio", profileData.bio);
      formData.append("profileImage", imageFile as any);

      if (user.role === "instructor") {
        await updateInstructorDetails(formData);
        console.log("Instructor profile updated successfully");
      } else if (user.role === "student") {
        // formData.append("role", "student");
        await updateInstructorDetails(formData);
        console.log("Student profile update logic goes here----");
      } else {
        // formData.append("role", "admin");
        console.log("Admin profile update logic goes here");
      }
      // const response = await updateInstructorDetails(formData);
      setLoading(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    try {
      setLoading(true);
      if (user.role === "instructor") {
        await changePassword(passwordData);
      } else if (user.role === "student") {
        await changePassword(passwordData);
      } else {
        console.log("Admin password change logic goes here");
      }
      setLoading(false);
      toast.success("Password changed successfully!");
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
      console.error("Error changing password:", error);
      setLoading(false);
    } finally {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filee = e.target.files[0];
      setImageFile(filee as any);
    }
  };

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    return "Strong";
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
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3 space-y-4">

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-student-primary"
                    value={profileData.username}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                    Email
                  </label>
                  <div className="flex">
                    <div className="flex-grow">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-student-primary"
                        value={profileData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="ml-2">
                      <Button variant="student" size="sm" className="h-full" >
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
                    name="phone"
                    id="phoneNumber"
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-student-primary"
                    value={profileData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 text-gray-600
                   focus:outline-none focus:ring-2 focus:ring-student-primary"
                    value={profileData.bio}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div>
                  <Button variant="student" className="btn btn-instructor text-sm px-4 py-2  btn btn-instructor text-sm px-4 py-2 rounded-lg hover:bg-neon-purple/10 hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300 bg-neon-blue/20 text-white border border-neon-blue/30" type="submit" disabled={loading}
                  > {loading ? "Saving..." : "Save Changes"}</Button>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    {imageFile ? (
                      <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-32 h-32 rounded-full border-4 border-student-primary" />
                    ) : (
                      <img
                        src={import.meta.env.VITE_APP_BASE_URL_IMAGE + (profileData.profileImage ? profileData.profileImage : "https://i.pravatar.cc/150?img=1")}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-student-primary"
                      />
                    )}
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute bottom-0 right-0 opacity-0 cursor-pointer w-8 h-8 z-10"
                    />
                    <button
                      className="absolute bottom-0 right-0 bg-dark-200 p-2 rounded-full border border-gray-700 text-student-primary hover:bg-dark-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>

                  <h3 className="text-white font-medium mt-4">{profileData.username}</h3>
                  <p className="text-gray-400 text-sm">{profileData.role}</p>
                </div>
              </div>

            </div>
          </form>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card variant="student">
          <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
          <div className="space-y-6 translate-x-0 fixed md:relative md:translate-x-0">
            <div>
              <h3 className="text-white font-medium mb-4">Change Password</h3>
              <div className="space-y-4">

                {/* Current Password */}
                <div className="relative">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400 mb-1">
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-student-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neon-blue"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* New Password */}
                <div className="relative">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400 mb-1">
                    New Password
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-student-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neon-blue"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                  {/* Password Strength Bar */}
                  {passwordData.newPassword && (
                    <div className="mt-2">
                      <p
                        className={`text-sm ${getPasswordStrength(passwordData.newPassword) === "Weak"
                          ? "text-red-500"
                          : getPasswordStrength(passwordData.newPassword) === "Medium"
                            ? "text-yellow-400"
                            : "text-green-500"
                          }`}
                      >
                        Strength: {getPasswordStrength(passwordData.newPassword)}
                      </p>
                      <div className="w-full h-2 bg-gray-700 rounded mt-1">
                        <div
                          className={`h-2 rounded transition-all duration-300 ${getPasswordStrength(passwordData.newPassword) === "Weak"
                            ? "bg-red-500 w-1/3"
                            : getPasswordStrength(passwordData.newPassword) === "Medium"
                              ? "bg-yellow-400 w-2/3"
                              : "bg-green-500 w-full"
                            }`}
                        ></div>
                      </div>

                      {/* Live Checklist */}
                      <div className="text-sm mt-2 space-y-1">
                        <p className={passwordData.newPassword.length >= 6 ? "text-green-500" : "text-gray-400"}>
                          ✔ At least 6 characters
                        </p>
                        <p className={/[A-Z]/.test(passwordData.newPassword) ? "text-green-500" : "text-gray-400"}>
                          ✔ One uppercase letter
                        </p>
                        <p className={/[a-z]/.test(passwordData.newPassword) ? "text-green-500" : "text-gray-400"}>
                          ✔ One lowercase letter
                        </p>
                        <p className={/[0-9]/.test(passwordData.newPassword) ? "text-green-500" : "text-gray-400"}>
                          ✔ One number
                        </p>
                        <p className={/[^a-zA-Z0-9]/.test(passwordData.newPassword) ? "text-green-500" : "text-gray-400"}>
                          ✔ One special character
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-student-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neon-blue"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                  {/* Confirm Match */}
                  {passwordData.confirmPassword && (
                    <p className={`text-sm mt-1 ${passwordData.confirmPassword === passwordData.newPassword
                      ? "text-green-500"
                      : "text-red-500"
                      }`}>
                      {passwordData.confirmPassword === passwordData.newPassword
                        ? "✔ Passwords match"
                        : "✖ Passwords do not match"}
                    </p>
                  )}
                </div>

                <div>
                  <Button
                    className='btn btn-instructor text-sm px-4 py-2 rounded-lg hover:bg-neon-purple/10 hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300 bg-neon-blue/20 text-white border border-neon-blue/30'
                    onClick={handlePasswordSubmit}
                    disabled={loading}
                  >
                    Update Password
                  </Button>
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