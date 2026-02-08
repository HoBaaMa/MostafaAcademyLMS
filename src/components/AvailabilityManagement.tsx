import { useState } from 'react';
import { Calendar, Info } from 'lucide-react';
import { StudentAvailabilityTab } from './availability/StudentAvailabilityTab';
import { TeacherAvailabilityTab } from './availability/TeacherAvailabilityTab';

type Tab = 'students' | 'teachers';

export function AvailabilityManagement() {
  const [activeTab, setActiveTab] = useState<Tab>('students');

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="size-6 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Availability Management
            </h1>
          </div>
          <p className="text-gray-600">
            Define and manage availability schedules for students and teachers
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <Info className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">Understanding Availability</p>
              <div className="text-blue-700 space-y-1">
                <p><span className="font-medium">Student Availability:</span> Preferred days and hours when students want lessons (with optional teacher preference)</p>
                <p><span className="font-medium">Teacher Availability:</span> Actual working hours when teachers can teach</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('students')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'students'
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  Student Availability
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === 'students'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    Preferences
                  </span>
                </span>
                {activeTab === 'students' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('teachers')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'teachers'
                    ? 'text-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  Teacher Availability
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === 'teachers'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    Working Hours
                  </span>
                </span>
                {activeTab === 'teachers' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'students' ? (
              <StudentAvailabilityTab />
            ) : (
              <TeacherAvailabilityTab />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
