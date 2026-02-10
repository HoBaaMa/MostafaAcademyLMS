import { Link } from 'react-router';
import { 
  UserPlus, 
  Users, 
  Calendar, 
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Receipt
} from 'lucide-react';

export function DashboardHome() {
  const workflowSteps = [
    {
      number: 1,
      title: 'Student Registration',
      description: 'Register new students with basic information',
      path: '/students/new',
      icon: UserPlus,
      color: 'blue',
    },
    {
      number: 2,
      title: 'Availability Setup',
      description: 'Define student preferred schedule',
      path: '/students/new',
      icon: Calendar,
      color: 'purple',
    },
    {
      number: 3,
      title: 'Teacher Setup',
      description: 'Manage teacher availability and subjects',
      path: '/teachers',
      icon: Users,
      color: 'green',
    },
    {
      number: 4,
      title: 'Matching & Scheduling',
      description: 'Auto-match students with teachers',
      path: '/matching',
      icon: CheckCircle2,
      color: 'orange',
    },
    {
      number: 5,
      title: 'Lesson Tracking',
      description: 'Track lessons and trigger financials',
      path: '/schedule',
      icon: BookOpen,
      color: 'pink',
    },
  ];

  const stats = [
    { label: 'Active Students', value: '142', change: '+12 this week' },
    { label: 'Active Teachers', value: '28', change: '3 available now' },
    { label: 'Scheduled Lessons', value: '89', change: 'This week' },
    { label: 'Completed Lessons', value: '1,247', change: 'This month' },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            LMS Operations Portal - Workflow-driven student and teacher management
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Workflow Steps */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">Operational Workflow</h2>
          <div className="grid grid-cols-5 gap-4">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-700 border-blue-200',
                purple: 'bg-purple-50 text-purple-700 border-purple-200',
                green: 'bg-green-50 text-green-700 border-green-200',
                orange: 'bg-orange-50 text-orange-700 border-orange-200',
                pink: 'bg-pink-50 text-pink-700 border-pink-200',
              }[step.color];

              return (
                <div key={step.number} className="relative">
                  <Link
                    to={step.path}
                    className="block bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all group"
                  >
                    <div className={`size-10 rounded-lg ${colorClasses} border flex items-center justify-center mb-3`}>
                      <Icon className="size-5" />
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="flex-shrink-0 size-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-medium">
                        {step.number}
                      </span>
                      <h3 className="text-sm font-medium text-gray-900 leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                    <ArrowRight className="size-4 text-gray-400 mt-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/students/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Register New Student
            </Link>
            <Link
              to="/parents/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Register New Parent
            </Link>
            <Link
              to="/teachers/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Register New Teacher
            </Link>
            <Link
              to="/teachers"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Manage Teachers
            </Link>
            <Link
              to="/schedule"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              View Schedule
            </Link>
            <Link
              to="/lessons/completed"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              View Completed Lessons
            </Link>
            <Link
              to="/payments"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              View Payments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}