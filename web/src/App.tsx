import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetail } from './components/CourseDetail';
import { Login } from './components/Login';
import { StudentSignup } from './components/StudentSignup';
import { TeacherSignup } from './components/TeacherSignup';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { CoursePlayer } from './components/CoursePlayer';
import { AdminDashboard } from './components/AdminDashboard';
import { GradesPage } from './components/GradesPage';
import { CreateCourse } from './components/CreateCourse';
import { EditCourse } from './components/EditCourse';
import { ManageCourseContent } from './components/ManageCourseContent';

export type UserRole = 'student' | 'teacher' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === 'student') {
      setCurrentPage('student-dashboard');
    } else if (userData.role === 'teacher') {
      setCurrentPage('teacher-dashboard');
    } else if (userData.role === 'admin') {
      setCurrentPage('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const navigateTo = (page: string, courseId?: string) => {
    setCurrentPage(page);
    if (courseId) {
      setSelectedCourseId(courseId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' && (
        <LandingPage onNavigate={navigateTo} />
      )}
      {currentPage === 'catalog' && (
        <CourseCatalog onNavigate={navigateTo} user={user} />
      )}
      {currentPage === 'course-detail' && selectedCourseId && (
        <CourseDetail 
          courseId={selectedCourseId} 
          onNavigate={navigateTo} 
          user={user} 
        />
      )}
      {currentPage === 'login' && (
        <Login onLogin={handleLogin} onNavigate={navigateTo} />
      )}
      {currentPage === 'student-signup' && (
        <StudentSignup onSignup={handleLogin} onNavigate={navigateTo} />
      )}
      {currentPage === 'teacher-signup' && (
        <TeacherSignup onSignup={handleLogin} onNavigate={navigateTo} />
      )}
      {currentPage === 'student-dashboard' && user && (
        <StudentDashboard 
          user={user} 
          onNavigate={navigateTo} 
          onLogout={handleLogout} 
        />
      )}
      {currentPage === 'teacher-dashboard' && user && (
        <TeacherDashboard 
          user={user} 
          onNavigate={navigateTo} 
          onLogout={handleLogout} 
        />
      )}
      {currentPage === 'course-player' && selectedCourseId && user && (
        <CoursePlayer 
          courseId={selectedCourseId} 
          user={user} 
          onNavigate={navigateTo} 
        />
      )}
      {currentPage === 'admin-dashboard' && user && (
        <AdminDashboard 
          user={user} 
          onNavigate={navigateTo} 
          onLogout={handleLogout} 
        />
      )}
      {currentPage === 'grades' && user && (
        <GradesPage 
          onNavigate={navigateTo} 
        />
      )}
      {currentPage === 'create-course' && user && (
        <CreateCourse 
          user={user} 
          onNavigate={navigateTo} 
        />
      )}
      {currentPage === 'edit-course' && selectedCourseId && user && (
        <EditCourse 
          courseId={selectedCourseId} 
          onNavigate={navigateTo} 
        />
      )}
      {currentPage === 'manage-course-content' && selectedCourseId && user && (
        <ManageCourseContent 
          courseId={selectedCourseId} 
          onNavigate={navigateTo} 
        />
      )}
    </div>
  );
}

export default App;