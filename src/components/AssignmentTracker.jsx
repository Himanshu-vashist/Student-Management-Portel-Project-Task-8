
import React, { useState } from 'react';
import './Assigment.css'; // Import CSS file

const AssignmentTracker = () => {

  const [assignments, setAssignments] = useState([
    {
      subject: 'Mathematics',
      title: 'Algebra Homework',
      dueDate: '2024-11-05',
      status: 'not started',
    },
    {
      subject: 'Science',
      title: 'Lab Report',
      dueDate: '2024-10-30',
      status: 'in progress',
    },
    {
      subject: 'History',
      title: 'Essay on World War II',
      dueDate: '2024-11-10',
      status: 'completed',
    },
  ]);

  const [newAssignment, setNewAssignment] = useState({
    subject: '',
    title: '',
    dueDate: '',
    status: 'not started',
  });

  const [filter, setFilter] = useState('all');


  const addAssignment = (e) => {
    e.preventDefault();
    if (newAssignment.subject && newAssignment.title && newAssignment.dueDate) {
      setAssignments((prevAssignments) => [
        ...prevAssignments,
        { ...newAssignment },
      ]);
      // Reset the form
      setNewAssignment({ subject: '', title: '', dueDate: '', status: 'not started' });
    }
  };


  const filterAssignments = () => {
    const currentDate = new Date();
    return assignments.filter((assignment) => {
      if (filter === 'upcoming') {
        return new Date(assignment.dueDate) > currentDate;
      } else if (filter === 'overdue') {
        return new Date(assignment.dueDate) < currentDate;
      }
      return true; // 'all' case
    });
  };

  return (
    <div className="assignment-tracker">
      <h1 className="header">Assignment Tracker</h1>
      <form className="assignment-form" onSubmit={addAssignment}>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            value={newAssignment.subject}
            onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={newAssignment.dueDate}
            onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            value={newAssignment.status}
            onChange={(e) => setNewAssignment({ ...newAssignment, status: e.target.value })}
            className="input-field"
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Assignment</button>
      </form>

      <div className="filter-section">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field">
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <h2 className="assignments-header">Assignments</h2>
      <ul className="assignment-list">
        {filterAssignments().length === 0 ? (
          <li>No assignments found.</li>
        ) : (
          filterAssignments().map((assignment, index) => (
            <li key={index} className={`assignment-item ${assignment.status}`}>
              <strong>{assignment.subject}</strong>: {assignment.title} (Due: {new Date(assignment.dueDate).toLocaleDateString()}) - Status: {assignment.status}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AssignmentTracker;
