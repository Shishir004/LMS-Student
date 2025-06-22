import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";

import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <main>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <Courses />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <AuthenticatedUser>
                    <Login />
                  </AuthenticatedUser>
                }
              />

              {/* Protected Student Routes */}
              <Route
                path="/my-learning"
                element={
                  <ProtectedRoute>
                    <MyLearning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course/search"
                element={
                  <ProtectedRoute>
                    <SearchPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course-detail/:courseId"
                element={
                  <ProtectedRoute>
                    <CourseDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course-progress/:courseId"
                element={
                  <ProtectedRoute>
                    <PurchaseCourseProtectedRoute>
                      <CourseProgress />
                    </PurchaseCourseProtectedRoute>
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Sidebar />
                  </AdminRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="course" element={<CourseTable />} />
                <Route path="course/create" element={<AddCourse />} />
                <Route path="course/:courseId" element={<EditCourse />} />
                <Route
                  path="course/:courseId/lecture"
                  element={<CreateLecture />}
                />
                <Route
                  path="course/:courseId/lecture/:lectureId"
                  element={<EditLecture />}
                />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </main>
  );
}

export default App;
