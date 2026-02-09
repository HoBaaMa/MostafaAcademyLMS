import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardHome } from "./components/DashboardHome";
import { StudentRegistration } from "./components/StudentRegistration";
import { StudentAvailability } from "./components/StudentAvailability";
import { TeacherManagement } from "./components/TeacherManagement";
import { MatchingScheduling } from "./components/MatchingScheduling";
import { LessonSchedule } from "./components/LessonSchedule";
import { ParentRegistration } from "./components/ParentRegistration";
import { AvailabilityManagement } from "./components/AvailabilityManagement";
import { TeacherRegistration } from "./components/TeacherRegistration";
import { StudentsListFull } from "./components/students/StudentsListFull";
import { StudentDetails } from "./components/students/StudentDetails";
import { TeachersList } from "./components/teachers/TeachersList";
import { TeacherDetails } from "./components/teachers/TeacherDetails";
import { ParentsList } from "./components/parents/ParentsList";
import { ParentDetails } from "./components/parents/ParentDetails";
import { Finance } from "./components/Finance";
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
      { path: "teachers", Component: TeachersList },
      { path: "teachers/new", Component: TeacherRegistration },
      { path: "teachers/:id", Component: TeacherDetails },
      { path: "availability", Component: AvailabilityManagement },
      { path: "matching", Component: MatchingScheduling },
      { path: "schedule", Component: LessonSchedule },
      { path: "finance", Component: Finance },
      { path: "diagnostics", Component: Diagnostics },
      { path: "settings", Component: Settings },
    ],
  },
]);