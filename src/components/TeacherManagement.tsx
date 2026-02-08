import { useState } from 'react';
import { Plus, Search, CheckCircle2, Clock, BookOpen, GraduationCap } from 'lucide-react';

type Teacher = {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  grades: string[];
  available: boolean;
  totalSlots: number;
};

type TimeSlot = {
  day: string;
  time: string;
};

export function TeacherManagement() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teacherSlots, setTeacherSlots] = useState<TimeSlot[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock teachers data
  const teachers: Teacher[] = [
    {
      id: 'TCH-001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.j@lms.com',
      subjects: ['Mathematics', 'Physics'],
      grades: ['Grade 10', 'Grade 11', 'Grade 12'],
      available: true,
      totalSlots: 24,
    },
    {
      id: 'TCH-002',
      name: 'Prof. Ahmed Hassan',
      email: 'ahmed.h@lms.com',
      subjects: ['Chemistry', 'Biology'],
      grades: ['Grade 9', 'Grade 10', 'Grade 11'],
      available: true,
      totalSlots: 18,
    },
    {
      id: 'TCH-003',
      name: 'Ms. Emily Chen',
      email: 'emily.c@lms.com',
      subjects: ['English', 'Arabic'],
      grades: ['Grade 7', 'Grade 8', 'Grade 9'],
      available: false,
      totalSlots: 12,
    },
    {
      id: 'TCH-004',
      name: 'Mr. David Miller',
      email: 'david.m@lms.com',
      subjects: ['Computer Science'],
      grades: ['Grade 10', 'Grade 11', 'Grade 12'],
      available: true,
      totalSlots: 15,
    },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
  ];

  const toggleSlot = (day: string, time: string) => {
    const slot = { day, time };
    const exists = teacherSlots.some(s => s.day === day && s.time === time);
    
    if (exists) {
      setTeacherSlots(teacherSlots.filter(s => !(s.day === day && s.time === time)));
    } else {
      setTeacherSlots([...teacherSlots, slot]);
    }
  };

  const isSelected = (day: string, time: string) => {
    return teacherSlots.some(s => s.day === day && s.time === time);
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>Workflow Step 3 of 5</span>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900">Teacher Management</h1>
            <p className="text-gray-600 mt-1">
              Define teacher availability and subjects
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
            <Plus className="size-4" />
            Add New Teacher
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Teacher List */}
          <div className="col-span-1 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teachers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Teachers */}
            <div className="space-y-2">
              {filteredTeachers.map((teacher) => (
                <button
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher)}
                  className={`w-full text-left bg-white rounded-lg border p-4 transition-all ${
                    selectedTeacher?.id === teacher.id
                      ? 'border-blue-500 ring-2 ring-blue-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{teacher.name}</h3>
                      <p className="text-sm text-gray-500">{teacher.id}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      teacher.available
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {teacher.available ? 'Available' : 'Not Available'}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <BookOpen className="size-3.5" />
                      <span className="text-xs">{teacher.subjects.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <GraduationCap className="size-3.5" />
                      <span className="text-xs">{teacher.grades.length} grades</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Clock className="size-3.5" />
                      <span className="text-xs">{teacher.totalSlots} time slots</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Teacher Profile & Availability */}
          <div className="col-span-2 space-y-6">
            {selectedTeacher ? (
              <>
                {/* Teacher Profile */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="font-semibold text-gray-900 mb-4">Teacher Profile</h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teacher Name
                      </label>
                      <input
                        type="text"
                        value={selectedTeacher.name}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={selectedTeacher.email}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subjects Taught
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedTeacher.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grades
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedTeacher.grades.map((grade) => (
                          <span
                            key={grade}
                            className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                          >
                            {grade}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Availability Grid */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="size-5 text-gray-600" />
                        <h2 className="font-semibold text-gray-900">Weekly Availability</h2>
                      </div>
                      <span className="text-sm text-gray-600">
                        {teacherSlots.length} slots selected
                      </span>
                    </div>
                  </div>

                  <div className="p-6 overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="text-left text-sm font-medium text-gray-700 pb-3 pr-4 sticky left-0 bg-white">
                            Time
                          </th>
                          {days.map((day) => (
                            <th key={day} className="text-center text-sm font-medium text-gray-700 pb-3 px-2">
                              {day.slice(0, 3)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {timeSlots.map((time) => (
                          <tr key={time}>
                            <td className="text-sm text-gray-600 py-2 pr-4 font-medium sticky left-0 bg-white">
                              {time}
                            </td>
                            {days.map((day) => {
                              const selected = isSelected(day, time);
                              return (
                                <td key={day} className="px-2 py-2">
                                  <button
                                    type="button"
                                    onClick={() => toggleSlot(day, time)}
                                    className={`w-full h-10 rounded-lg border-2 transition-all ${
                                      selected
                                        ? 'bg-green-50 border-green-500 hover:bg-green-100'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                                  >
                                    {selected && (
                                      <CheckCircle2 className="size-4 text-green-600 mx-auto" />
                                    )}
                                  </button>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Save Teacher Availability
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Clock className="size-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Select a Teacher</h3>
                <p className="text-gray-600">
                  Choose a teacher from the list to view and edit their profile and availability
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
