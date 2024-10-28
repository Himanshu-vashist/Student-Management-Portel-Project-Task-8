
import React, { useState } from 'react';
import './Timetable.css';

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState('9');
  const [searchTerm, setSearchTerm] = useState('');

  
  const timetableData = {
    '9': [
      { subject: 'Math', time: '8:00 AM - 9:00 AM' },
      { subject: 'Science', time: '9:00 AM - 10:00 AM' },
      { subject: 'English', time: '10:00 AM - 11:00 AM' },
      { subject: 'History', time: '11:00 AM - 12:00 PM' },
      { subject: 'Physical Education', time: '12:00 PM - 1:00 PM' },
    ],
    '10': [
      { subject: 'Math', time: '8:00 AM - 9:00 AM' },
      { subject: 'Biology', time: '9:00 AM - 10:00 AM' },
      { subject: 'Chemistry', time: '10:00 AM - 11:00 AM' },
      { subject: 'Geography', time: '11:00 AM - 12:00 PM' },
      { subject: 'Physical Education', time: '12:00 PM - 1:00 PM' },
    ],
    '11': [
      { subject: 'Physics', time: '8:00 AM - 9:00 AM' },
      { subject: 'Math', time: '9:00 AM - 10:00 AM' },
      { subject: 'Chemistry', time: '10:00 AM - 11:00 AM' },
      { subject: 'Literature', time: '11:00 AM - 12:00 PM' },
      { subject: 'Physical Education', time: '12:00 PM - 1:00 PM' },
    ],
    '12': [
      { subject: 'Math', time: '8:00 AM - 9:00 AM' },
      { subject: 'Physics', time: '9:00 AM - 10:00 AM' },
      { subject: 'Chemistry', time: '10:00 AM - 11:00 AM' },
      { subject: 'Computer Science', time: '11:00 AM - 12:00 PM' },
      { subject: 'Physical Education', time: '12:00 PM - 1:00 PM' },
    ],
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const printTimetable = () => {
    const printContent = document.getElementById('timetable-id').innerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<html><body>${printContent}</body></html>`);
    newWindow.document.close();
    newWindow.print();
  };

  const filteredTimetable = timetableData[selectedClass].filter(item =>
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="timetable-container">
      <h2 className="text-2xl font-bold mb-4">Class Timetable</h2>
      <div className="dropdown">
        <label htmlFor="class-select" className="block mb-2">Select Class:</label>
        <select 
          id="class-select" 
          value={selectedClass} 
          onChange={handleClassChange} 
          className="class-dropdown"
        >
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>
      </div>
      <div className="search-bar mb-4">
        <input 
          type="text" 
          placeholder="Search subjects..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input"
        />
      </div>
      <div className="timetable" id="timetable-id">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredTimetable.length ? (
              filteredTimetable.map((item, index) => (
                <tr key={index}>
                  <td>{item.subject}</td>
                  <td>{item.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">No subjects found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button onClick={printTimetable} className="print-button">Print Timetable</button>
    </div>
  );
};

export default Timetable;
