import React from "react";

export default function DataDetail({ toggleModal, selectedStudent }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Student Detail</h5>
          <button
            type="button"
            className="btn-close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={toggleModal}
          ></button>
        </div>
        <div className="modal-body">
          <p>
            <strong>Name :</strong> {selectedStudent.name}
          </p>
          <p>
            <strong>Class :</strong> {selectedStudent.class}
          </p>
          <p>
            <strong>Year :</strong> {selectedStudent.year}
          </p>
          <p>
            <strong>NIM :</strong> {selectedStudent.nim}
          </p>
          <p>
            <strong>Guardian Name :</strong> {selectedStudent.guardian_name}
          </p>
          <p>
            <strong>Birth Date :</strong> {selectedStudent.birthDate}
          </p>
          <p>
            <strong>Gender :</strong> {selectedStudent.gender}
          </p>
          <p>
            <strong>Address :</strong> {selectedStudent.address}
          </p>
        </div>
      </div>
    </div>
  );
}
