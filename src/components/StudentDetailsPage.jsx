// src/components/StudentDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const StudentDetailsPage = () => {
  const { id } = useParams(); // Get student ID from URL
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch('/data/students.json'); 
        if (!response.ok) throw new Error('Network response was not ok');
        const students = await response.json();
        const foundStudent = students.find((s) => s.id === parseInt(id));
        setStudent(foundStudent);
      } catch (error) {
        console.error('Failed to fetch student:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>Student not found.</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{student.name}'s Details</h1>
      <ul className="list-group">
        <li className="list-group-item"><strong>Email:</strong> {student.email}</li>
        <li className="list-group-item"><strong>Age:</strong> {student.age}</li>
        <li className="list-group-item"><strong>Class:</strong> {student.class}</li>
        <li className="list-group-item"><strong>Address:</strong> {student.address}</li>
        <li className="list-group-item"><strong>Phone:</strong> {student.phone}</li>
      </ul>
      <Link to="/students" className="btn btn-primary mt-4">Back to Students List</Link>
    </div>
  );
};

export default StudentDetailsPage;
