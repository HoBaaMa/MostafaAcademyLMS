import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, AlertCircle, Calendar, ArrowRight, RefreshCw } from 'lucide-react';

type MatchingPair = {
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  grade: string;
  overlappingSlots: number;
  validations: {
    subjectMatch: boolean;
    gradeMatch: boolean;
    availabilityOverlap: boolean;
  };
};

export function MatchingScheduling() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState(false);

  // Mock matching data
  const matchingPairs: MatchingPair[] = [
    {
      studentId: 'STU-001',
      studentName: 'John Smith',
      teacherId: 'TCH-001',
      teacherName: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      grade: 'Grade 10',
      overlappingSlots: 8,
      validations: {
        subjectMatch: true,
        gradeMatch: true,
        availabilityOverlap: true,
      },
    },
    {
      studentId: 'STU-002',
      studentName: 'Emma Davis',
      teacherId: 'TCH-002',
      teacherName: 'Prof. Ahmed Hassan',
      subject: 'Chemistry',
      grade: 'Grade 11',
      overlappingSlots: 6,
      validations: {
        subjectMatch: true,
        gradeMatch: true,
        availabilityOverlap: true,
      },
    },
    {
      studentId: 'STU-003',
      studentName: 'Michael Chen',
      teacherId: 'TCH-004',
      teacherName: 'Mr. David Miller',
      subject: 'Computer Science',
      grade: 'Grade 12',
      overlappingSlots: 4,
      validations: {
        subjectMatch: true,
        gradeMatch: true,
        availabilityOverlap: true,
      },
    },
    {
      studentId: 'STU-004',
      studentName: 'Sophia Brown',
      teacherId: 'TCH-003',
      teacherName: 'Ms. Emily Chen',
      subject: 'English',
      grade: 'Grade 9',
      overlappingSlots: 2,
      validations: {
        subjectMatch: true,
        gradeMatch: true,
        availabilityOverlap: false, // Low overlap
      },
    },
  ];

  const handleGenerateSchedule = () => {
    setIsGenerating(true);
    // Simulate schedule generation
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedSchedule(true);
    }, 2000);
  };

  const handleViewSchedule = () => {
    navigate('/schedule');
  };

  const allValidPairs = matchingPairs.filter(pair =>
    pair.validations.subjectMatch &&
    pair.validations.gradeMatch &&
    pair.validations.availabilityOverlap
  );

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Workflow Step 4 of 5</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">Matching & Scheduling</h1>
          <p className="text-gray-600 mt-1">
            Automatically match students and teachers based on subject, grade, and availability
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Matches</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{matchingPairs.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Valid Matches</p>
            <p className="text-2xl font-semibold text-green-600 mt-1">{allValidPairs.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Needs Review</p>
            <p className="text-2xl font-semibold text-orange-600 mt-1">
              {matchingPairs.length - allValidPairs.length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Avg. Overlap</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              {Math.round(matchingPairs.reduce((sum, p) => sum + p.overlappingSlots, 0) / matchingPairs.length)} slots
            </p>
          </div>
        </div>

        {/* Matching Results */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Matching Results</h2>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <RefreshCw className="size-4" />
                Re-run Matching
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {matchingPairs.map((pair) => {
                const allValid = pair.validations.subjectMatch &&
                  pair.validations.gradeMatch &&
                  pair.validations.availabilityOverlap;

                return (
                  <div
                    key={pair.studentId}
                    className={`border rounded-lg p-5 ${
                      allValid
                        ? 'border-green-200 bg-green-50'
                        : 'border-orange-200 bg-orange-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div>
                            <p className="text-sm text-gray-600">Student</p>
                            <p className="font-medium text-gray-900">{pair.studentName}</p>
                            <p className="text-xs text-gray-500">{pair.studentId}</p>
                          </div>
                          <ArrowRight className="size-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Teacher</p>
                            <p className="font-medium text-gray-900">{pair.teacherName}</p>
                            <p className="text-xs text-gray-500">{pair.teacherId}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-600">Subject:</span>
                            <span className="font-medium text-gray-900">{pair.subject}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-600">Grade:</span>
                            <span className="font-medium text-gray-900">{pair.grade}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-600">Overlapping Slots:</span>
                            <span className="font-medium text-gray-900">{pair.overlappingSlots}</span>
                          </div>
                        </div>
                      </div>

                      <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        allValid
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {allValid ? 'Valid Match' : 'Needs Review'}
                      </div>
                    </div>

                    {/* Validation Checks */}
                    <div className="grid grid-cols-3 gap-3">
                      <ValidationCheck
                        label="Subject Match"
                        valid={pair.validations.subjectMatch}
                      />
                      <ValidationCheck
                        label="Grade Match"
                        valid={pair.validations.gradeMatch}
                      />
                      <ValidationCheck
                        label="Availability Overlap"
                        valid={pair.validations.availabilityOverlap}
                        details={`${pair.overlappingSlots} slots`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Generate Schedule */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6">
            {!generatedSchedule ? (
              <div className="text-center py-8">
                <Calendar className="size-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Ready to Generate Schedule</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  The system will automatically create lesson schedule entries for all valid matches.
                  Invalid matches will be skipped and require manual review.
                </p>
                <button
                  onClick={handleGenerateSchedule}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 mx-auto disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="size-5 animate-spin" />
                      Generating Schedule...
                    </>
                  ) : (
                    <>
                      <Calendar className="size-5" />
                      Generate Lesson Schedule
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="size-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Schedule Generated Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Created {allValidPairs.length} lesson schedule entries based on valid matches.
                </p>
                <button
                  onClick={handleViewSchedule}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 mx-auto"
                >
                  View Lesson Schedule
                  <ArrowRight className="size-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ValidationCheck({
  label,
  valid,
  details,
}: {
  label: string;
  valid: boolean;
  details?: string;
}) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
      valid
        ? 'bg-white border-green-200'
        : 'bg-white border-orange-200'
    }`}>
      {valid ? (
        <CheckCircle2 className="size-4 text-green-600 flex-shrink-0" />
      ) : (
        <AlertCircle className="size-4 text-orange-600 flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${
          valid ? 'text-green-900' : 'text-orange-900'
        }`}>
          {label}
        </p>
        {details && (
          <p className="text-xs text-gray-600">{details}</p>
        )}
      </div>
    </div>
  );
}
