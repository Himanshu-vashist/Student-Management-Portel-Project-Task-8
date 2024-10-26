import React, { useState } from 'react';


const RegistrationPage = () => {
  // State to manage form inputs and validation errors
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    classLevel: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
  });

  const [errors, setErrors] = useState({});
  const [studentsList, setStudentsList] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  // Validate form inputs
  const validate = () => {
    let validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!student.firstName) validationErrors.firstName = "First name is required";
    if (!student.lastName) validationErrors.lastName = "Last name is required";
    if (!student.email || !emailRegex.test(student.email))
      validationErrors.email = "Valid email is required";
    if (!student.classLevel) validationErrors.classLevel = "Class is required";
    if (!student.address) validationErrors.address = "Address is required";
    if (!student.phone || !phoneRegex.test(student.phone))
      validationErrors.phone = "Phone number must be 10 digits";
    if (!student.city) validationErrors.city = "City is required";
    if (!student.state) validationErrors.state = "State is required";
    if (!student.zip) validationErrors.zip = "Zip code is required";

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setStudentsList([...studentsList, student]);
      // Clear form fields after submission
      setStudent({
        firstName: '',
        lastName: '',
        email: '',
        classLevel: '',
        address: '',
        phone: '',
        city: '',
        state: '',
        zip: '',
      });
      setErrors({});
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Student Registration</h1>
      
      <form onSubmit={handleSubmit}>
        {/* First and Last Name */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              id="firstName"
              name="firstName"
              value={student.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              id="lastName"
              name="lastName"
              value={student.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
        </div>

        {/* Email and Class */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="inputEmail"
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputClass" className="form-label">Class</label>
            <input
              type="text"
              className={`form-control ${errors.classLevel ? 'is-invalid' : ''}`}
              id="inputClass"
              name="classLevel"
              value={student.classLevel}
              onChange={handleChange}
              placeholder="Enter class"
            />
            {errors.classLevel && <div className="invalid-feedback">{errors.classLevel}</div>}
          </div>
        </div>

        {/* Address */}
        <div className="mb-3">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input
            type="text"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            id="inputAddress"
            name="address"
            value={student.address}
            onChange={handleChange}
            placeholder="1234 Main St"
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label htmlFor="inputPhone" className="form-label">Phone Number</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            id="inputPhone"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        {/* City, State, and Zip */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">City</label>
            <input
              type="text"
              className={`form-control ${errors.city ? 'is-invalid' : ''}`}
              id="inputCity"
              name="city"
              value={student.city}
              onChange={handleChange}
            />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">State</label>
            <select
              id="inputState"
              name="state"
              className={`form-select ${errors.state ? 'is-invalid' : ''}`}
              value={student.state}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="State1">State 1</option>
              <option value="State2">State 2</option>
              <option value="State3">State 3</option>
            </select>
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
            <input
              type="text"
              className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
              id="inputZip"
              name="zip"
              value={student.zip}
              onChange={handleChange}
            />
            {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary btn-block">Register</button>
        </div>
      </form>

      {/* Display Registered Students */}
      <h2 className="mt-5">Registered Students</h2>
      <ul className="list-group">
        {studentsList.map((s, index) => (
          <li key={index} className="list-group-item">
            {s.firstName} {s.lastName} - {s.email} - {s.classLevel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegistrationPage;
