import { useState, useEffect } from "react";
import "./styles.css";

const Step1 = ({ formData, updateFormData, onValidate }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    updateFormData({
      ...formData,
      [name]: value
    });
  };

  // validate a single field
  const validateField = (name, value) => {
    if (!value) return "This field is required";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid email";
    }

    if (name === "phone") {
      const phoneRegex = /^\+?[0-9\s\-()]+$/;
      if (!phoneRegex.test(value)) return "Invalid phone number";
    }

    return "";
  };

  // blur validation
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  // check overall form validity
  useEffect(() => {
    const isValid =
      formData.name &&
      formData.email &&
      formData.phone &&
      Object.values(errors).every((err) => err === "");

    onValidate(isValid);
  }, [formData, errors]);

  return (
    <div className="step-content">
      <h2>Personal Information</h2>
      <p>Please provide your name, email, and phone number.</p>

      {/* NAME */}
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. Stephen King"
          className={touched.name && errors.name ? "input-error" : ""}
        />
        {touched.name && errors.name && (
          <p className="error-text">{errors.name}</p>
        )}
      </div>

      {/* EMAIL */}
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. stephen@lorem.com"
          className={touched.email && errors.email ? "input-error" : ""}
        />
        {touched.email && errors.email && (
          <p className="error-text">{errors.email}</p>
        )}
      </div>

      {/* PHONE */}
      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. +1 234 567 8900"
          className={touched.phone && errors.phone ? "input-error" : ""}
        />
        {touched.phone && errors.phone && (
          <p className="error-text">{errors.phone}</p>
        )}
      </div>
    </div>
  );
};

export default Step1;