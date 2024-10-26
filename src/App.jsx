// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '../src/components/Layout'; // Import Layout
import RegistrationPage from './components/RegistrationPage';
import StudentListPage from './components/StudentListPage';
import StudentDetailsPage from './components/StudentDetailsPage';
import EditStudentPage from './components/EditStudentPage';
import DashboardPage from './components/DashboardPage';
import AttendanceTable from './components/AttendanceTable';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* All routes are nested inside the Layout component */}
        <Route path="/" element={<Layout />}>
          <Route index element={<StudentListPage />} /> {/* Renders StudentListPage at root */}
          <Route path="register" element={<RegistrationPage />} /> 
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="students" element={<StudentListPage />} />
          <Route path="student" element={<StudentDetailsPage />} />
          <Route path="edit/:id" element={<EditStudentPage />} /> {/* Route for editing a student */}
          <Route path="students/:id" element={<StudentDetailsPage />} /> {/* Student details route */}
          <Route path="attendance"  element={<AttendanceTable />}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
