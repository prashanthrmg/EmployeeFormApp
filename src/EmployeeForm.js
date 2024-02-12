import React, { useState, useEffect } from 'react';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    city: '',
    gender: '', // Changed to a single string to store the selected gender
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    // Display existing data on page load
    displayData();
  }, []);

  const saveData = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate that at least one gender is selected
    if (!formData.gender) {
      alert('Please select a gender.');
      return;
    }

    // Save data to local storage
    localStorage.setItem('employeeData', JSON.stringify(formData));

    // Display saved data in read-only format
    displayData();

    // Set isFormSubmitted to true to show the content
    setIsFormSubmitted(true);
  };

  const displayData = () => {
    const employeeData = JSON.parse(localStorage.getItem('employeeData'));

    if (employeeData) {
      setFormData(employeeData);
    }
  };

  const editData = () => {
    // Enable editing upon clicking the name
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  return (
    <div>
      <form onSubmit={saveData}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          readOnly={!isEditing}
        />
       <br />
        <label htmlFor="employeeId">Employee ID:</label>
        <input
          type="number"
          id="employeeId"
          name="employeeId"
          placeholder="Enter Employee ID"
          value={formData.employeeId}
          onChange={handleInputChange}
          required
          readOnly={!isEditing}
        />
        <br />
        <label htmlFor="city">City:</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
          disabled={!isEditing}
        >
          <option value="" disabled>
            ▼ Select City ▼
          </option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Tokyo">Tokyo</option>
        </select>
       <br />
        <label>Gender:</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleRadioChange}
            required
            disabled={!isEditing}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleRadioChange}
            required
            disabled={!isEditing}
          />
          Female
        </label>
        <br />
        {isEditing ? (
          <>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </>
        ) : (
          <button type="button" onClick={editData}>
            Edit
          </button>
        )}
      </form>

      {isFormSubmitted && (
        <div>
          <h2>Employee Information</h2>
          <p>Name: {formData.name}</p>
          <p>Employee ID: {formData.employeeId}</p>
          <p>City: {formData.city}</p>
          <p>Gender: {formData.gender}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeForm;
