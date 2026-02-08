import { useState } from 'react';
import { Search, Save, Copy, XCircle, User, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

type DaySchedule = {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

type Teacher = {
  id: string;
  name: string;
};

export function TeacherAvailabilityTab() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data
  const teachers: Teacher[] = [
    { id: 'TCH-001', name: 'Dr. Sarah Johnson' },
    { id: 'TCH-002', name: 'Prof. Ahmed Hassan' },
    { id: 'TCH-003', name: 'Ms. Emily Chen' },
    { id: 'TCH-004', name: 'Mr. David Miller' },
  ];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setSearchQuery('');
    // Initialize schedule for all days
    setSchedule(days.map(day => ({
      day,
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: false,
    })));
    setErrors({});
  };

  const updateDaySchedule = (day: string, field: keyof DaySchedule, value: string | boolean) => {
    setSchedule(prev => prev.map(dayData => 
      dayData.day === day ? { ...dayData, [field]: value } : dayData
    ));

    // Clear error for this day when user makes changes
    if (errors[day]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[day];
        return newErrors;
      });
    }
  };

  const validateSchedule = () => {
    const newErrors: Record<string, string> = {};

    schedule.forEach(dayData => {
      if (dayData.isAvailable) {
        // Validate that end time is after start time
        if (dayData.startTime && dayData.endTime) {
          const start = parseTime(dayData.startTime);
          const end = parseTime(dayData.endTime);
          
          if (end <= start) {
            newErrors[dayData.day] = 'End time must be after start time';
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const parseTime = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const handleSave = () => {
    if (!validateSchedule()) {
      return;
    }

    console.log('Saving teacher availability:', {
      teacherId: selectedTeacher?.id,
      schedule: schedule.filter(d => d.isAvailable),
    });
    // In real app, save to backend
  };

  const copyFromPreviousWeek = () => {
    // Mock: In real app, fetch previous week's data
    const mockPreviousWeek: DaySchedule[] = [
      { day: 'Sunday', startTime: '09:00', endTime: '13:00', isAvailable: true },
      { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '14:00', endTime: '18:00', isAvailable: true },
      { day: 'Saturday', startTime: '09:00', endTime: '13:00', isAvailable: false },
    ];
    
    setSchedule(mockPreviousWeek);
    setErrors({});
  };

  const markAllUnavailable = () => {
    setSchedule(prev => prev.map(dayData => ({
      ...dayData,
      isAvailable: false,
    })));
    setErrors({});
  };

  const getAvailableDaysCount = () => {
    return schedule.filter(d => d.isAvailable).length;
  };

  const getTotalHours = () => {
    return schedule
      .filter(d => d.isAvailable)
      .reduce((total, day) => {
        const start = parseTime(day.startTime);
        const end = parseTime(day.endTime);
        return total + (end - start) / 60;
      }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Teacher Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Teacher
        </label>
        
        {selectedTeacher ? (
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="size-5 text-green-700" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedTeacher.name}</p>
                <p className="text-sm text-gray-600">{selectedTeacher.id}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedTeacher(null);
                setSchedule([]);
                setErrors({});
              }}
              className="px-3 py-1.5 text-sm text-green-700 hover:bg-green-100 rounded-lg transition-colors"
            >
              Change Teacher
            </button>
          </div>
        ) : (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by teacher name or ID..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            
            {searchQuery && filteredTeachers.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                {filteredTeachers.map(teacher => (
                  <button
                    key={teacher.id}
                    onClick={() => handleSelectTeacher(teacher)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <p className="font-medium text-gray-900">{teacher.name}</p>
                    <p className="text-sm text-gray-600">{teacher.id}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Schedule Grid */}
      {selectedTeacher && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700">Available Days</p>
              <p className="text-2xl font-semibold text-green-900 mt-1">
                {getAvailableDaysCount()} / {days.length}
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">Total Hours/Week</p>
              <p className="text-2xl font-semibold text-blue-900 mt-1">
                {getTotalHours().toFixed(1)} hrs
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-700">Avg Hours/Day</p>
              <p className="text-2xl font-semibold text-purple-900 mt-1">
                {getAvailableDaysCount() > 0 
                  ? (getTotalHours() / getAvailableDaysCount()).toFixed(1)
                  : '0'} hrs
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyFromPreviousWeek}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
            >
              <Copy className="size-4" />
              Copy From Previous Week
            </button>
            <button
              onClick={markAllUnavailable}
              className="px-4 py-2 text-sm border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center gap-2"
            >
              <XCircle className="size-4" />
              Mark All Unavailable
            </button>
          </div>

          {/* Schedule Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 bg-green-50 border-b border-green-200">
              <h3 className="font-medium text-gray-900">Weekly Working Hours</h3>
              <p className="text-sm text-gray-600 mt-1">
                Define when the teacher is available to teach
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 w-40">
                      Day
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                      Start Time
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                      End Time
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                      Duration
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schedule.map(dayData => {
                    const duration = dayData.isAvailable
                      ? ((parseTime(dayData.endTime) - parseTime(dayData.startTime)) / 60).toFixed(1)
                      : '0';

                    return (
                      <tr
                        key={dayData.day}
                        className={`${
                          dayData.isAvailable ? 'bg-green-50' : 'bg-gray-50'
                        } hover:bg-opacity-75 transition-colors`}
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900">{dayData.day}</span>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="relative max-w-xs">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <input
                              type="time"
                              value={dayData.startTime}
                              onChange={(e) => updateDaySchedule(dayData.day, 'startTime', e.target.value)}
                              disabled={!dayData.isAvailable}
                              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="relative max-w-xs">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <input
                              type="time"
                              value={dayData.endTime}
                              onChange={(e) => updateDaySchedule(dayData.day, 'endTime', e.target.value)}
                              disabled={!dayData.isAvailable}
                              className={`w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                                errors[dayData.day] ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                          </div>
                          {errors[dayData.day] && (
                            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                              <AlertCircle className="size-3" />
                              {errors[dayData.day]}
                            </p>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <span className={`text-sm font-medium ${
                            dayData.isAvailable ? 'text-green-700' : 'text-gray-500'
                          }`}>
                            {duration} hours
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={dayData.isAvailable}
                              onChange={(e) => updateDaySchedule(dayData.day, 'isAvailable', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            <span className="ml-3 text-sm font-medium">
                              {dayData.isAvailable ? (
                                <span className="text-green-700 flex items-center gap-1">
                                  <CheckCircle2 className="size-4" />
                                  Available
                                </span>
                              ) : (
                                <span className="text-gray-600">Not Available</span>
                              )}
                            </span>
                          </label>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <Save className="size-4" />
              Save Availability
            </button>
          </div>

          {/* Legend */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Legend</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="size-4 bg-green-50 border-2 border-green-200 rounded" />
                <span className="text-gray-700">Available day</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-gray-50 border-2 border-gray-200 rounded" />
                <span className="text-gray-700">Unavailable day</span>
              </div>
            </div>
          </div>
        </>
      )}

      {!selectedTeacher && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <User className="size-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-medium text-gray-900 mb-2">No Teacher Selected</h3>
          <p className="text-gray-600 text-sm">
            Search and select a teacher to manage their working hours
          </p>
        </div>
      )}
    </div>
  );
}
