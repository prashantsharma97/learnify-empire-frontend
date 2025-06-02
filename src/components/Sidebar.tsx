import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    DollarSign,
    Settings,
    LogOut,
    BarChart2,
    FileText,
    UploadCloud,
    TrendingUp,
    CreditCard
} from 'lucide-react';

// Define a type for a sidebar item
interface SidebarItem {
    label: string;
    path: string;
    icon: React.ElementType;
}

// Define the type for different roles
type Role = 'admin' | 'instructor' | 'student';

interface SidebarProps {
    role: Role;
}

const sidebarItems: Record<Role, SidebarItem[]> = {
    admin: [
        { label: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard },
        { label: 'Users', path: '/dashboard/admin/users', icon: Users },
        { label: 'Analytics', path: '/dashboard/admin/analytics', icon: BarChart2 },
        { label: 'Reports', path: '/dashboard/admin/reports', icon: FileText }
    ],
    instructor: [
        { label: 'Dashboard', path: '/dashboard/instructor', icon: LayoutDashboard },
        { label: 'My Courses', path: '/dashboard/instructor/my-courses', icon: BookOpen },
        { label: 'Upload Course', path: '/dashboard/instructor/upload-course', icon: UploadCloud },
        { label: 'Earnings', path: '/dashboard/instructor/earnings', icon: DollarSign }
    ],
    student: [
        { label: 'Dashboard', path: '/dashboard/student', icon: LayoutDashboard },
        { label: 'My Courses', path: '/dashboard/student/my-courses', icon: BookOpen },
        { label: 'Progress', path: '/dashboard/student/progress', icon: TrendingUp },
        { label: 'Payments', path: '/dashboard/student/payments', icon: CreditCard }
    ]
};


const Sidebar: React.FC<SidebarProps> = ({ role }) => {
    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    const location = useLocation();
    return (
        <aside className="w-64 h-full-screen bg-glass-dark backdrop-blur-sm p-4 border-r border-neon-blue/20">
            <Link to="/" className="flex items-center mb-8 px-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                    Learnify
                </span>
            </Link>

            <nav>
                <ul className="space-y-2">
                    {sidebarItems[role]?.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300 ${isActive
                                            ? 'bg-neon-blue/20 text-white border border-neon-blue/30'
                                            : 'text-gray-400 hover:text-white hover:bg-neon-blue/10'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-8">
                    <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Settings
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/admin/settings"
                                className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300"
                            >
                                <Settings className="w-5 h-5 mr-3" />
                                Settings
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={onLogout}
                                className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-pink/10 
                           hover:text-white hover:border hover:border-neon-pink/30 transition-all duration-300"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
