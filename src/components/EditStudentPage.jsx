
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Update this line

const EditStudentPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    class: '',
    address: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const fetchStudent = async () => {
      const response = await fetch('/data/students.json'); // Ensure this path is correct
      const students = await response.json();
      const foundStudent = students.find((s) => s.id === parseInt(id));
      if (foundStudent) {
        setStudent(foundStudent);
      }
    };
    fetchStudent();
  }, [id]);

  const validate = () => {
    let formErrors = {};
    if (!student.name) formErrors.name = "Name is required.";
    if (!student.email) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(student.email)) {
      formErrors.email = "Email is invalid.";
    }
    if (!student.phone) {
      formErrors.phone = "Phone number is required.";
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(student.phone)) {
      formErrors.phone = "Phone number must be in the format: XXX-XXX-XXXX.";
    }
    if (!student.age) formErrors.age = "Age is required.";
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      // Normally you would send the updated student data to the backend here
      alert("Student updated successfully!");
      navigate('/students'); // Redirect to the students list page
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={student.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={student.age}
            onChange={handleChange}
          />
          {errors.age && <div className="text-danger">{errors.age}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Class</label>
          <input
            type="text"
            className="form-control"
            name="class"
            value={student.class}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={student.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={student.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>
        <button type="submit" className="btn btn-success">Save Changes</button>
      </form>
    </div>
  );
};

export default EditStudentPage;
