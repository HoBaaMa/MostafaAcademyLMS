import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

type TimeSlot = {
  day: string;
  time: string;
};

export function StudentAvailability() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
  ];

  const toggleSlot = (day: string, time: string) => {
    const slot = { day, time };
    const exists = selectedSlots.some(s => s.day === day && s.time === time);
    
    if (exists) {
      setSelectedSlots(selectedSlots.filter(s => !(s.day === day && s.time === time)));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const isSelected = (day: string, time: string) => {
    return selectedSlots.some(s => s.day === day && s.time === time);
  };

  const handleSave = () => {
    // In a real app, save to backend
    navigate('/');
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Workflow Step 2 of 5</span>
            <span className="text-gray-400">•</span>
            <span>Student ID: {id}</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">Student Availability Setup</h1>
          <p className="text-gray-600 mt-1">
            Define preferred days and hours for the student
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Availability Grid */}
          <div className="col-span-2 bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Weekly Availability Grid</h2>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Click to select preferred time slots
              </p>
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
                        <div className="flex flex-col items-center">
                          <span>{day.slice(0, 3)}</span>
                        </div>
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
                                  ? 'bg-blue-50 border-blue-500 hover:bg-blue-100'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {selected && (
                                <CheckCircle2 className="size-4 text-blue-600 mx-auto" />
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
          </div>

          {/* Summary Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Availability Summary</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Slots Selected</span>
                  <span className="font-semibold text-gray-900">{selectedSlots.length}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected Times</p>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedSlots.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">No slots selected yet</p>
                    ) : (
                      selectedSlots.map((slot, index) => (
                        <div
                          key={index}
                          className="text-sm px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                          <span className="font-medium text-blue-900">{slot.day}</span>
                          <span className="text-blue-700 ml-2">{slot.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Next Step</h4>
              <p className="text-sm text-blue-700">
                After saving availability, the system will match this student with available teachers based on subject, grade, and time overlap.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={selectedSlots.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Availability
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
