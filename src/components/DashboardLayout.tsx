import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
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
  Receipt,
  CheckCircle,
  Library,
  Clock,
  UserCheck,
  CreditCard,
  CalendarCheck,
  XCircle
} from 'lucide-react';

type NavItem = {
  number: string;
  name: string;
  path: string;
  icon: any;
};

type NavSection = {
  title: string;
  bgColor: string;
  activeColor: string;
  items: NavItem[];
};

export function DashboardLayout() {
  const location = useLocation();

  const navigationSections: NavSection[] = [
    {
      title: 'DATA & OPERATIONS',
      bgColor: 'bg-blue-50',
      activeColor: 'bg-blue-600 text-white',
      items: [
        { number: '1', name: 'Students', path: '/students', icon: UsersRound },
        { number: '2', name: 'Parents', path: '/parents', icon: UserCog },
        { number: '3', name: 'Teachers', path: '/teachers', icon: Presentation },
        { number: '4', name: 'Subjects', path: '/subjects', icon: Library },
        { number: '5', name: 'Student Availability', path: '/student-availability', icon: Clock },
        { number: '6', name: 'Teacher Availability', path: '/teacher-availability', icon: UserCheck },
        { number: '7', name: 'Process Payments', path: '/payments/management', icon: CreditCard },
      ]
    },
    {
      title: 'REPORTS & MONITORING',
      bgColor: 'bg-gray-100',
      activeColor: 'bg-green-600 text-white',
      items: [
        { number: '8', name: 'Lesson Schedule', path: '/schedule', icon: BookOpen },
        { number: '9', name: 'Master Schedule', path: '/master-schedule', icon: CalendarCheck },
        { number: '10', name: 'Completed Lessons', path: '/lessons/completed', icon: CheckCircle },
        { number: '11', name: 'Canceled Lessons', path: '/lessons/canceled', icon: XCircle },
        { number: '12', name: 'Payments', path: '/payments', icon: Receipt },
        { number: '13', name: 'Finance', path: '/finance', icon: DollarSign },
        { number: '14', name: 'Diagnostics', path: '/diagnostics', icon: Activity },
      ]
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap className="size-6 text-blue-600" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">LMS Admin</h1>
              <p className="text-xs text-blue-100">Operations Portal</p>
            </div>
          </div>
        </div>

        {/* Dashboard Link */}
        <div className="p-4">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              isActive('/')
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="size-5 flex-shrink-0" />
            <span className="font-semibold text-sm">Dashboard Home</span>
          </Link>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 p-3 space-y-4">
          {navigationSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-2">
              {/* Section Label */}
              <div className="px-3 pt-2 pb-1">
                <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                  {section.title}
                </p>
              </div>

              {/* Section Items */}
              <div className={`${section.bgColor} rounded-lg p-2 space-y-0.5`}>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all group ${
                        active
                          ? section.activeColor + ' shadow-sm'
                          : 'text-gray-700 hover:bg-white/60'
                      }`}
                    >
                      {/* Number Badge */}
                      <div className={`flex items-center justify-center size-6 rounded flex-shrink-0 text-xs font-bold ${
                        active 
                          ? 'bg-white/20' 
                          : sectionIndex === 0 
                            ? 'bg-blue-200 text-blue-700'
                            : 'bg-gray-300 text-gray-700'
                      }`}>
                        {item.number}
                      </div>
                      
                      {/* Icon */}
                      <Icon className={`size-4 flex-shrink-0 ${
                        active ? '' : 'text-gray-600'
                      }`} />
                      
                      {/* Label */}
                      <span className={`font-medium text-sm flex-1 ${
                        active ? '' : 'text-gray-800'
                      }`}>
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Separator between sections */}
              {sectionIndex < navigationSections.length - 1 && (
                <div className="h-px bg-gray-200 my-3" />
              )}
            </div>
          ))}
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              isActive('/settings')
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Settings className="size-5 flex-shrink-0" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="size-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
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