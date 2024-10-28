import React, { useEffect, useState } from 'react';

const AttendanceTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('/data/students.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setStudents(data);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
        
        setStudents([]);
      });
  }, []);

  // Function to change student status
  const handleStatusChange = (id, newStatus) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, status: newStatus } : student
    ));
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Daily Attendance</h2>
        <div className="flex space-x-4 items-center">
          <span className="text-gray-600 font-medium">CLASS 9</span>
          <input type="date" className="border border-gray-300 rounded px-2 py-1" />
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Export Report</button>
        </div>
      </header>

      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-100">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Student Name</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Previous 7 Days Status</th>
            <th className="py-2 px-4">Absent Days</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(students) && students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <div>
                    <strong>{student.name}</strong>
                    <p className="text-gray-500 text-xs">{student.rollNumber}</p>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleStatusChange(student.id, 'present')}
                      className={`px-2 py-1 rounded ${student.status === 'present' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      Present
                    </button>
                    <button onClick={() => handleStatusChange(student.id, 'absent')}
                      className={`px-2 py-1 rounded ${student.status === 'absent' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
                      Absent
                    </button>
                    <button onClick={() => handleStatusChange(student.id, 'late')}
                      className={`px-2 py-1 rounded ${student.status === 'late' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>
                      Late
                    </button>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex space-x-1">
                    {Array.isArray(student.weeklyStatus) && student.weeklyStatus.map((dayStatus, dayIndex) => (
                      <span key={dayIndex} className={`text-xs font-bold p-1 rounded ${dayStatus === 'present' ? 'text-green-500' : dayStatus === 'absent' ? 'text-red-500' : 'text-yellow-500'}`}>
                        {dayStatus === 'present' ? '✔️' : dayStatus === 'absent' ? '❌' : '⚠️'}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4 text-center">{student.absentDays}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
