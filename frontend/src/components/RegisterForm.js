// RegisterForm.js
import React from 'react';

const RegisterForm = ({ formData, handleChange, handleSubmit, error }) => (
  <div className="container mt-5" style={{ maxWidth: '400px' }}>
    <h2 className="mb-4">Register</h2>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Username</label>
        <input
          type="text"
          name="username"
          className="form-control"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button className="btn btn-primary w-100" type="submit">
        Register
      </button>
    </form>
  </div>
);

export default RegisterForm;
