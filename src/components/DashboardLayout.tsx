import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Calendar, 
  BookOpen,
  GraduationCap,
  UserCog,
  Presentation,
  DollarSign,
  Settings,
  Activity,
  UsersRound,
  ChevronRight
} from 'lucide-react';

export function DashboardLayout() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Students', path: '/students', icon: UsersRound },
    { name: 'Parents', path: '/parents', icon: UserCog },
    { name: 'Teachers', path: '/teachers', icon: Presentation },
    { name: 'Availability', path: '/availability', icon: Calendar },
    { name: 'Lesson Schedule', path: '/schedule', icon: BookOpen },
    { name: 'Finance', path: '/finance', icon: DollarSign },
    { name: 'Diagnostics', path: '/diagnostics', icon: Activity },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-8 text-blue-600" />
            <div>
              <h1 className="font-semibold text-gray-900">LMS Admin</h1>
              <p className="text-sm text-gray-500">Operations Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="size-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@lms.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}