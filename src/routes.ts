import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardHome } from "./components/DashboardHome";
import { StudentRegistration } from "./components/StudentRegistration";
import { StudentAvailability } from "./components/StudentAvailability";
import { TeacherManagement } from "./components/TeacherManagement";
import { MatchingScheduling } from "./components/MatchingScheduling";
import { LessonSchedule } from "./components/LessonSchedule";
import { MasterSchedule } from "./components/MasterSchedule";
import { ParentRegistration } from "./components/ParentRegistration";
import { AvailabilityManagement } from "./components/AvailabilityManagement";
import { TeacherRegistration } from "./components/TeacherRegistration";
import { StudentsListFull } from "./components/students/StudentsListFull";
import { StudentDetails } from "./components/students/StudentDetails";
import { TeachersListFull } from "./components/teachers/TeachersListFull";
import { TeacherDetails } from "./components/teachers/TeacherDetails";
import { TeacherAvailability } from "./components/TeacherAvailability";
import { ParentsList } from "./components/parents/ParentsList";
import { ParentDetails } from "./components/parents/ParentDetails";
import { PaymentsList } from "./components/payments/PaymentsList";
import { PaymentDetails } from "./components/payments/PaymentDetails";
import { PaymentsManagement } from "./components/PaymentsManagement";
import { CompletedLessonsList } from "./components/lessons/CompletedLessonsList";
import { CompletedLessonDetails } from "./components/lessons/CompletedLessonDetails";
import { LessonDetails } from "./components/lessons/LessonDetails";
import { Finance } from "./components/Finance";
import { Subjects } from "./components/Subjects";
import { Diagnostics } from "./components/Diagnostics";
import { Settings } from "./components/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "students", Component: StudentsListFull },
      { path: "students/new", Component: StudentRegistration },
      { path: "students/:id", Component: StudentDetails },
      { path: "students/:id/availability", Component: StudentAvailability },
      { path: "parents", Component: ParentsList },
      { path: "parents/new", Component: ParentRegistration },
      { path: "parents/:id", Component: ParentDetails },
      { path: "teachers", Component: TeachersListFull },
      { path: "teachers/new", Component: TeacherRegistration },
      { path: "teachers/:id", Component: TeacherDetails },
      { path: "teachers/:id/availability", Component: TeacherAvailability },
      { path: "availability", Component: AvailabilityManagement },
      { path: "student-availability", Component: StudentAvailability },
      { path: "teacher-availability", Component: TeacherAvailability },
      { path: "matching", Component: MatchingScheduling },
      { path: "schedule", Component: LessonSchedule },
      { path: "master-schedule", Component: MasterSchedule },
      { path: "lessons/:id", Component: LessonDetails },
      { path: "lessons/completed", Component: CompletedLessonsList },
      { path: "lessons/completed/:id", Component: CompletedLessonDetails },
      { path: "payments", Component: PaymentsList },
      { path: "payments/:id", Component: PaymentDetails },
      { path: "payments/management", Component: PaymentsManagement },
      { path: "finance", Component: Finance },
      { path: "subjects", Component: Subjects },
      { path: "diagnostics", Component: Diagnostics },
      { path: "settings", Component: Settings },
    ],
  },
]);