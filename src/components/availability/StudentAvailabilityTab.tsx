import { useState } from 'react';
import { Search, Save, RotateCcw, Eraser, User, Star, AlertCircle } from 'lucide-react';

type TimeSlot = {
  start: string;
  end: string;
};

type DayAvailability = {
  day: string;
  preferredHours: TimeSlot[];
  prefTeacher: string;
  teacherName: string;
};

type Student = {
  id: string;
  name: string;
};

export function StudentAvailabilityTab() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  // Mock data
  const students: Student[] = [
    { id: 'MID123456', name: 'Ahmed Al-Saud' },
    { id: 'MID234567', name: 'Fatima Hassan' },
    { id: 'MID345678', name: 'Mohammed Ali' },
    { id: 'MID456789', name: 'Sara Ibrahim' },
  ];

  const teachers = [
    { id: 'TCH-001', name: 'Dr. Sarah Johnson' },
    { id: 'TCH-002', name: 'Prof. Ahmed Hassan' },
    { id: 'TCH-003', name: 'Ms. Emily Chen' },
    { id: 'TCH-004', name: 'Mr. David Miller' },
  ];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const timeSlots = [
    { start: '08:00', end: '09:00' },
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '11:00' },
    { start: '11:00', end: '12:00' },
    { start: '14:00', end: '15:00' },
    { start: '15:00', end: '16:00' },
    { start: '16:00', end: '17:00' },
    { start: '17:00', end: '18:00' },
    { start: '18:00', end: '19:00' },
    { start: '19:00', end: '20:00' },
  ];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setSearchQuery('');
    // Initialize availability for all days
    setAvailability(days.map(day => ({
      day,
      preferredHours: [],
      prefTeacher: '',
      teacherName: '',
    })));
    setErrors([]);
  };

  const toggleTimeSlot = (day: string, slot: TimeSlot) => {
    setAvailability(prev => prev.map(dayData => {
      if (dayData.day === day) {
        const exists = dayData.preferredHours.some(
          s => s.start === slot.start && s.end === slot.end
        );
        
        return {
          ...dayData,
          preferredHours: exists
            ? dayData.preferredHours.filter(s => !(s.start === slot.start && s.end === slot.end))
            : [...dayData.preferredHours, slot]
        };
      }
      return dayData;
    }));
  };

  const isSlotSelected = (day: string, slot: TimeSlot) => {
    const dayData = availability.find(d => d.day === day);
    return dayData?.preferredHours.some(s => s.start === slot.start && s.end === slot.end) || false;
  };

  const setPreferredTeacher = (day: string, teacherId: string) => {
    setAvailability(prev => prev.map(dayData => {
      if (dayData.day === day) {
        const teacher = teachers.find(t => t.id === teacherId);
        return {
          ...dayData,
          prefTeacher: teacherId,
          teacherName: teacher?.name || '',
        };
      }
      return dayData;
    }));
  };

  const clearDay = (day: string) => {
    setAvailability(prev => prev.map(dayData =>
      dayData.day === day
        ? { ...dayData, preferredHours: [], prefTeacher: '', teacherName: '' }
        : dayData
    ));
  };

  const resetAll = () => {
    setAvailability(days.map(day => ({
      day,
      preferredHours: [],
      prefTeacher: '',
      teacherName: '',
    })));
    setErrors([]);
  };

  const handleSave = () => {
    const newErrors: string[] = [];

    // Check if any availability is set
    const hasAvailability = availability.some(d => d.preferredHours.length > 0);
    if (!hasAvailability) {
      newErrors.push('Please select at least one time slot for the student');
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      console.log('Saving student availability:', {
        studentId: selectedStudent?.id,
        availability,
      });
      // In real app, save to backend
    }
  };

  const getDaySlotCount = (day: string) => {
    return availability.find(d => d.day === day)?.preferredHours.length || 0;
  };

  const hasPreferredTeacher = (day: string) => {
    return availability.find(d => d.day === day)?.prefTeacher !== '';
  };

  return (
    <div className="space-y-6">
      {/* Student Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Student
        </label>
        
        {selectedStudent ? (
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="size-5 text-blue-700" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedStudent.name}</p>
                <p className="text-sm text-gray-600">{selectedStudent.id}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedStudent(null);
                setAvailability([]);
                setErrors([]);
              }}
              className="px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
            >
              Change Student
            </button>
          </div>
        ) : (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name or ID..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            {searchQuery && filteredStudents.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                {filteredStudents.map(student => (
                  <button
                    key={student.id}
                    onClick={() => handleSelectStudent(student)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.id}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Availability Grid */}
      {selectedStudent && (
        <>
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-red-700 flex items-center gap-2">
                  <AlertCircle className="size-4" />
                  {error}
                </p>
              ))}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 bg-blue-50 border-b border-blue-200">
              <h3 className="font-medium text-gray-900">Weekly Availability Grid</h3>
              <p className="text-sm text-gray-600 mt-1">
                Select preferred time slots and optionally choose a preferred teacher for each day
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-max">
                {days.map(day => {
                  const slotCount = getDaySlotCount(day);
                  const hasTeacher = hasPreferredTeacher(day);
                  const dayData = availability.find(d => d.day === day);

                  return (
                    <div
                      key={day}
                      className={`border-b border-gray-200 last:border-b-0 ${
                        hasTeacher ? 'bg-amber-50' : ''
                      }`}
                    >
                      <div className="flex">
                        {/* Day Header */}
                        <div className="w-40 p-4 border-r border-gray-200 flex-shrink-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{day}</h4>
                            {hasTeacher && (
                              <Star className="size-4 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600">
                            {slotCount} slot{slotCount !== 1 ? 's' : ''} selected
                          </p>
                          {slotCount > 0 && (
                            <button
                              onClick={() => clearDay(day)}
                              className="text-xs text-red-600 hover:text-red-700 mt-2 flex items-center gap-1"
                            >
                              <Eraser className="size-3" />
                              Clear
                            </button>
                          )}
                        </div>

                        {/* Time Slots */}
                        <div className="flex-1 p-4">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {timeSlots.map(slot => {
                              const isSelected = isSlotSelected(day, slot);
                              return (
                                <button
                                  key={`${slot.start}-${slot.end}`}
                                  onClick={() => toggleTimeSlot(day, slot)}
                                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isSelected
                                      ? 'bg-blue-600 text-white border-2 border-blue-600'
                                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300'
                                  }`}
                                >
                                  {slot.start} - {slot.end}
                                </button>
                              );
                            })}
                          </div>

                          {/* Preferred Teacher */}
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                              Preferred Teacher (Optional)
                            </label>
                            <select
                              value={dayData?.prefTeacher || ''}
                              onChange={(e) => setPreferredTeacher(day, e.target.value)}
                              className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">No preference</option>
                              {teachers.map(teacher => (
                                <option key={teacher.id} value={teacher.id}>
                                  {teacher.name}
                                </option>
                              ))}
                            </select>
                            {dayData?.teacherName && (
                              <p className="text-xs text-gray-600 mt-1.5 flex items-center gap-1">
                                <Star className="size-3 text-amber-500" />
                                Preferred: {dayData.teacherName}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <button
              onClick={resetAll}
              className="px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <RotateCcw className="size-4" />
              Reset All
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
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
                <div className="size-4 bg-blue-600 rounded" />
                <span className="text-gray-700">Selected time slot</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="size-4 text-amber-500 fill-amber-500" />
                <span className="text-gray-700">Day with preferred teacher</span>
              </div>
            </div>
          </div>
        </>
      )}

      {!selectedStudent && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <User className="size-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-medium text-gray-900 mb-2">No Student Selected</h3>
          <p className="text-gray-600 text-sm">
            Search and select a student to manage their availability preferences
          </p>
        </div>
      )}
    </div>
  );
}
