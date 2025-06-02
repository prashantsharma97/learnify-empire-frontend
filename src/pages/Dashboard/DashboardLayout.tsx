import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';


export default function DashboardLayout({ role }) {
  return (
    <div className="flex text-white min-h-screen">
      <Sidebar role={role} />
      <main className="flex-1 p-6 ">
        <Outlet />
      </main>
    </div>
  );
}