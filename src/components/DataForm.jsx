import React from "react";

export default function DataForm({
  isEditing,
  name,
  class: studentClass,
  year,
  nim,
  guardian_name,
  birthDate,
  address,
  gender,
  years,
  handleChange,
  handleSubmit,
  toggleModal,
  errorMessage,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header mb-4">
          <h2>{isEditing ? "Edit Student" : "New Student"}</h2>
          <button
            type="button"
            className="btn-close"
            onClick={toggleModal}
          ></button>
        </div>
        {errorMessage && (
          <div className="alert-cstm alert alert-danger mb-5">
            {errorMessage}
          </div>
        )}{" "}
        {/* Menampilkan pesan error */}
        <form
          className="row g-4 needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="col-md-4 form-cstm">
            <label htmlFor="name" className="form-label">
              Name :
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              required
              onChange={handleChange}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>

          <div className="col-md-2 form-cstm">
            <label htmlFor="class" className="form-label">
              Class :
            </label>
            <input
              type="text"
              className="form-control"
              name="class"
              value={studentClass}
              required
              onChange={handleChange}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>

          <div className="col-md-2 form-cstm">
            <label htmlFor="year" className="form-label">
              Year :
            </label>
            <input
              list="year-list"
              id="year"
              name="year"
              className="form-control"
              placeholder="Choose"
              value={year}
              required
              onChange={handleChange}
            />
            <datalist id="year-list">
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </datalist>
            <div className="invalid-feedback">Please select a valid year.</div>
          </div>

          <div className="col-md-4 form-cstm">
            <label htmlFor="nim" className="form-label">
              NIM :
            </label>
            <input
              type="text"
              className="form-control"
              name="nim"
              value={nim}
              required
              onChange={handleChange}
            />
            <div className="invalid-feedback">Please provide a valid NIM.</div>
          </div>

          <div className="col-md-6 form-cstm">
            <label htmlFor="guardian_name" className="form-label">
              Guardian Name :
            </label>
            <input
              type="text"
              className="form-control"
              name="guardian_name"
              value={guardian_name}
              required
              onChange={handleChange}
            />
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>

          <div className="col-md-3 form-cstm">
            <label htmlFor="birthDate" className="form-label">
              Birth Date :
            </label>
            <input
              type="date"
              name="birthDate"
              className="form-control"
              value={birthDate}
              required
              onChange={handleChange}
            />
            <div className="invalid-feedback">Please select a valid date.</div>
          </div>

          <div className="col-md-3 form-cstm">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <select
              className="form-select"
              name="gender"
              value={gender}
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="invalid-feedback">
              Please provide a valid gender.
            </div>
          </div>

          <div className="mb-1 form-cstm">
            <label htmlFor="address" className="form-label">
              Address :
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={address}
              minLength={20}
              required
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mt-1">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
