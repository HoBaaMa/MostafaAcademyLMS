import { useState } from 'react';
import { 
  Terminal,
  ChevronDown,
  ChevronUp,
  Play,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  History
} from 'lucide-react';

type CommandCategory = {
  id: string;
  title: string;
  emoji: string;
  requiresConfirmation: boolean;
  commands: Command[];
};

type Command = {
  id: string;
  label: string;
  emoji: string;
  functionName: string;
  description: string;
};

type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';

type ExecutionHistory = {
  id: string;
  commandLabel: string;
  functionName: string;
  timestamp: string;
  runBy: string;
  status: 'success' | 'error';
  duration: number;
  errorMessage?: string;
};

export function Menus() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['table-tools']));
  const [executionStatus, setExecutionStatus] = useState<Record<string, ExecutionStatus>>({});
  const [confirmModal, setConfirmModal] = useState<{ show: boolean; command: Command | null; category: string }>({
    show: false,
    command: null,
    category: ''
  });
  const [toast, setToast] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  });
  const [showHistory, setShowHistory] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<ExecutionHistory[]>([
    {
      id: '1',
      commandLabel: '✨ Update Master',
      functionName: 'generateMasterSchedule',
      timestamp: '2024-02-15 10:30:15',
      runBy: 'Admin User',
      status: 'success',
      duration: 2.3
    },
    {
      id: '2',
      commandLabel: '💰 التقرير المالي العام',
      functionName: 'generateFinancialReport',
      timestamp: '2024-02-15 09:15:42',
      runBy: 'Admin User',
      status: 'success',
      duration: 4.1
    },
  ]);

  const commandCategories: CommandCategory[] = [
    {
      id: 'table-tools',
      title: 'أدوات الجدول',
      emoji: '✅',
      requiresConfirmation: false,
      commands: [
        {
          id: 'custom-schedule',
          label: 'جدول مخصص',
          emoji: '🎯',
          functionName: 'generateScheduleForStudent',
          description: 'Generate a custom schedule for a specific student'
        },
        {
          id: 'create-table',
          label: 'Creat Table',
          emoji: '🧮',
          functionName: 'runScheduleWithOptionsUI',
          description: 'Create a new schedule table with options'
        },
        {
          id: 'update-master',
          label: 'Update Master',
          emoji: '✨',
          functionName: 'generateMasterSchedule',
          description: 'Update the master schedule with latest data'
        },
        {
          id: 'master-filter',
          label: 'Master_Filter',
          emoji: '🖋️',
          functionName: 'openFilterDialog',
          description: 'Open filter dialog for master schedule'
        },
        {
          id: 'update-teachers',
          label: 'Update Teachers Table',
          emoji: '🌟',
          functionName: 'createTeacherSheets',
          description: 'Update the teachers table with current data'
        }
      ]
    },
    {
      id: 'office-tools',
      title: 'أدوات مكتبية',
      emoji: '🧬',
      requiresConfirmation: false,
      commands: [
        {
          id: 'move-lessons',
          label: 'نقل الحصص المكتملة و الملغية',
          emoji: '📋',
          functionName: 'moveLessonsByStatus',
          description: 'Move completed and cancelled lessons'
        },
        {
          id: 'teacher-spare',
          label: 'حصص الفراغ للمعلمين',
          emoji: '🗄️',
          functionName: 'generateTeacherSpareTime',
          description: 'Generate teacher spare time slots'
        },
        {
          id: 'teacher-stats',
          label: 'احصائية حصص المعلمين',
          emoji: '🧑‍💼',
          functionName: 'createTeacherLessonCount',
          description: 'Create teacher lesson statistics'
        },
        {
          id: 'student-stats',
          label: 'احصائية حصص الطلاب',
          emoji: '👥',
          functionName: 'generateStudentReport',
          description: 'Generate student lesson statistics'
        }
      ]
    },
    {
      id: 'finance',
      title: 'المالية',
      emoji: '🚀',
      requiresConfirmation: true,
      commands: [
        {
          id: 'price-completed',
          label: 'تسعير الحصص المكتملة',
          emoji: '📋',
          functionName: 'updateFinalPricesMaster',
          description: 'Update prices for completed lessons'
        },
        {
          id: 'financial-report',
          label: 'التقرير المالي العام',
          emoji: '💰',
          functionName: 'generateFinancialReport',
          description: 'Generate general financial report'
        },
        {
          id: 'daily-financial',
          label: 'التقرير المالي اليومي',
          emoji: '💸',
          functionName: 'generateComprehensivePaymentReport',
          description: 'Generate daily financial report'
        },
        {
          id: 'detailed-financial',
          label: 'تقارير مالية تفصيلية',
          emoji: '💸',
          functionName: 'showFinancialReportsMenu1',
          description: 'Show detailed financial reports menu'
        },
        {
          id: 'currency-report',
          label: 'تقرير مالي حسب العملة',
          emoji: '🪙',
          functionName: 'generateFinancialReportBerCurr',
          description: 'Generate financial report by currency'
        },
        {
          id: 'payroll',
          label: 'الرواتب',
          emoji: '💰',
          functionName: 'runPayrollForMonth',
          description: 'Run monthly payroll processing'
        }
      ]
    },
    {
      id: 'audit-tools',
      title: 'أدوات التدقيق',
      emoji: '🛠️',
      requiresConfirmation: true,
      commands: [
        {
          id: 'payment-notes',
          label: 'ملاحظات الدفعات المالية',
          emoji: '🪙',
          functionName: 'generateWarningsReport',
          description: 'Generate payment warnings report'
        },
        {
          id: 'check-conflicts',
          label: 'فحص وتلوين التعارضات',
          emoji: '🧰',
          functionName: 'checkAndColorScheduleConflicts_FAST',
          description: 'Check and color schedule conflicts'
        },
        {
          id: 'check-subjects',
          label: 'فحص أسماء المواد الدراسية',
          emoji: '🧾',
          functionName: 'analyzeSubjectsWithCaseDetection',
          description: 'Analyze subject names with case detection'
        },
        {
          id: 'analyze-subjects',
          label: 'تحليل المواد الدراسية',
          emoji: '📚',
          functionName: 'generateDetailedSubjectReport',
          description: 'Generate detailed subject analysis'
        },
        {
          id: 'check-unscheduled',
          label: 'فحص الطلاب الغير مجدولين',
          emoji: '🧑‍🎓',
          functionName: 'diagnoseMissingSchedulesDeep1',
          description: 'Diagnose unscheduled students'
        },
        {
          id: 'check-teachers-generated',
          label: 'فحص المعلمين والمواد في جدول الحصص المولد',
          emoji: '🧑‍🏫',
          functionName: 'showTeachersAndSubjectsReport_2',
          description: 'Check teachers and subjects in generated schedule'
        },
        {
          id: 'check-teachers-completed',
          label: 'فحص المعلمين والمواد في جدول المكتملة',
          emoji: '🧑‍🏫',
          functionName: 'showTeachersAndSubjectsReport',
          description: 'Check teachers and subjects in completed lessons'
        },
        {
          id: 'audit-schedules',
          label: 'تدقيق مواعيد الطلاب',
          emoji: '🧑‍🎓',
          functionName: 'highlightDuplicates_DayHoursTeacher',
          description: 'Audit student schedules for duplicates'
        }
      ]
    },
    {
      id: 'admin',
      title: 'ADMIN',
      emoji: '⚙️',
      requiresConfirmation: true,
      commands: [
        {
          id: 'currency-signals',
          label: 'Currency Conversion Signals',
          emoji: '🪙',
          functionName: 'markNonCadLessonsInCompleted',
          description: 'Mark non-CAD lessons in completed'
        },
        {
          id: 'advanced-xero',
          label: 'Advenced Xero',
          emoji: '😈',
          functionName: 'generateLessonsFinancialReport',
          description: 'Generate advanced Xero financial report'
        },
        {
          id: 'normalize-sheets',
          label: 'Sheets Normalization',
          emoji: '📌',
          functionName: 'normalizeAllSheets',
          description: 'Normalize all sheets structure'
        },
        {
          id: 'validate-sheets',
          label: 'Sheets Validation',
          emoji: '📌',
          functionName: 'validateSubjectsAgainstMaster',
          description: 'Validate subjects against master list'
        },
        {
          id: 'normalize-completed',
          label: 'Completed Normalization & Validation',
          emoji: '❗',
          functionName: 'normalizeAndValidateCompleted',
          description: 'Normalize and validate completed lessons'
        },
        {
          id: 'normalize-cancelled',
          label: 'Cancelled Normalization & Validation',
          emoji: '❗',
          functionName: 'normalizeAndValidateCancelled',
          description: 'Normalize and validate cancelled lessons'
        }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleRunCommand = (command: Command, category: CommandCategory) => {
    if (category.requiresConfirmation) {
      setConfirmModal({
        show: true,
        command,
        category: category.title
      });
    } else {
      executeCommand(command);
    }
  };

  const executeCommand = async (command: Command) => {
    setExecutionStatus(prev => ({ ...prev, [command.id]: 'running' }));
    setConfirmModal({ show: false, command: null, category: '' });

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
      
      // Random success/failure for demo
      const success = Math.random() > 0.1;
      
      if (success) {
        setExecutionStatus(prev => ({ ...prev, [command.id]: 'success' }));
        showToast('success', `${command.emoji} ${command.label} completed successfully!`);
        
        // Add to history
        const newHistoryItem: ExecutionHistory = {
          id: Date.now().toString(),
          commandLabel: `${command.emoji} ${command.label}`,
          functionName: command.functionName,
          timestamp: new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
          }),
          runBy: 'Admin User',
          status: 'success',
          duration: 2 + Math.random() * 3
        };
        setExecutionHistory(prev => [newHistoryItem, ...prev]);
      } else {
        throw new Error('Function execution failed');
      }
      
      // Reset after 3 seconds
      setTimeout(() => {
        setExecutionStatus(prev => ({ ...prev, [command.id]: 'idle' }));
      }, 3000);
    } catch (error) {
      setExecutionStatus(prev => ({ ...prev, [command.id]: 'error' }));
      showToast('error', `${command.emoji} ${command.label} failed to execute.`);
      
      // Add to history
      const newHistoryItem: ExecutionHistory = {
        id: Date.now().toString(),
        commandLabel: `${command.emoji} ${command.label}`,
        functionName: command.functionName,
        timestamp: new Date().toLocaleString(),
        runBy: 'Admin User',
        status: 'error',
        duration: 1 + Math.random() * 2,
        errorMessage: 'Function execution failed'
      };
      setExecutionHistory(prev => [newHistoryItem, ...prev]);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setExecutionStatus(prev => ({ ...prev, [command.id]: 'idle' }));
      }, 3000);
    }
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: 'success', message: '' });
    }, 5000);
  };

  const getCommandStatus = (commandId: string): ExecutionStatus => {
    return executionStatus[commandId] || 'idle';
  };

  const getStatusIcon = (status: ExecutionStatus) => {
    switch (status) {
      case 'running':
        return <Loader2 className="size-4 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle className="size-4 text-green-600" />;
      case 'error':
        return <XCircle className="size-4 text-red-600" />;
      default:
        return <Play className="size-4" />;
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Menus (Apps Script Commands)
              </h1>
            </div>
            <p className="text-gray-600">Execute backend functions and automation scripts</p>
          </div>
          
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
          >
            <History className="size-4" />
            {showHistory ? 'Hide' : 'Show'} History
          </button>
        </div>

        {/* Warning Banner */}
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-orange-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-800">
              <p className="font-medium mb-1">Admin Command Center - Use with Caution</p>
              <p>
                These commands trigger backend Apps Script functions. Finance, Audit, and Admin commands require confirmation before execution.
                All executions are logged for audit purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Execution History Panel */}
        {showHistory && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Execution History</h2>
                <span className="ml-auto text-sm text-gray-600">Last {executionHistory.length} runs</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">Command</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">Function</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">Timestamp</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">Run By</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">Duration</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {executionHistory.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{item.commandLabel}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-700">{item.functionName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.timestamp}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.runBy}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.duration.toFixed(1)}s</td>
                      <td className="px-4 py-3 text-sm">
                        {item.status === 'success' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="size-3" />
                            Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircle className="size-3" />
                            Error
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Command Categories */}
        <div className="space-y-4">
          {commandCategories.map(category => {
            const isExpanded = expandedCategories.has(category.id);
            
            return (
              <div key={category.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.emoji}</span>
                    <div className="text-left">
                      <h2 className="font-semibold text-gray-900 text-lg">{category.title}</h2>
                      <p className="text-sm text-gray-600">{category.commands.length} commands available</p>
                    </div>
                    {category.requiresConfirmation && (
                      <span className="ml-3 px-2.5 py-0.5 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                        Requires Confirmation
                      </span>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="size-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="size-5 text-gray-600" />
                  )}
                </button>

                {/* Category Commands */}
                {isExpanded && (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.commands.map(command => {
                      const status = getCommandStatus(command.id);
                      const isRunning = status === 'running';
                      
                      return (
                        <div
                          key={command.id}
                          className={`border rounded-lg p-4 transition-all ${
                            status === 'success'
                              ? 'border-green-300 bg-green-50'
                              : status === 'error'
                              ? 'border-red-300 bg-red-50'
                              : status === 'running'
                              ? 'border-blue-300 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{command.emoji}</span>
                              <div>
                                <h3 className="font-semibold text-gray-900">{command.label}</h3>
                                <p className="text-xs font-mono text-gray-600 mt-0.5">{command.functionName}</p>
                              </div>
                            </div>
                            {getStatusIcon(status)}
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{command.description}</p>
                          
                          <button
                            onClick={() => handleRunCommand(command, category)}
                            disabled={isRunning}
                            className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                              isRunning
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : status === 'success'
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : status === 'error'
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {isRunning ? (
                              <>
                                <Loader2 className="size-4 animate-spin" />
                                Running...
                              </>
                            ) : status === 'success' ? (
                              <>
                                <CheckCircle className="size-4" />
                                Run Again
                              </>
                            ) : status === 'error' ? (
                              <>
                                <XCircle className="size-4" />
                                Retry
                              </>
                            ) : (
                              <>
                                <Play className="size-4" />
                                Run Command
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.show && confirmModal.command && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="size-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Confirm Execution</h2>
              </div>
              <p className="text-sm text-gray-600 ml-13">
                Category: <span className="font-semibold">{confirmModal.category}</span>
              </p>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{confirmModal.command.emoji}</span>
                  <h3 className="font-semibold text-gray-900">{confirmModal.command.label}</h3>
                </div>
                <p className="text-sm text-gray-700 mb-2">{confirmModal.command.description}</p>
                <p className="text-xs font-mono text-gray-600">
                  Function: {confirmModal.command.functionName}
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r-lg mb-4">
                <p className="text-sm text-orange-800">
                  <span className="font-semibold">Warning:</span> This command will execute backend operations that may affect data. Please confirm you want to proceed.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmModal({ show: false, command: null, category: '' })}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => executeCommand(confirmModal.command!)}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center gap-2"
              >
                <Play className="size-4" />
                Execute Command
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className={`rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[320px] ${
            toast.type === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle className="size-5 flex-shrink-0" />
            ) : (
              <XCircle className="size-5 flex-shrink-0" />
            )}
            <p className="font-medium text-sm">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
