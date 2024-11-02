import React from "react";

export default function DataTable({
  toggleModalForm,
  toggleModalDetail,
  students,
  deleteStudent,
  editStudent,
}) {
  return (
    <div className="table-responsive">
      {/* navbar */}
      <nav className="navbar navbar-responsive navbar-expand-lg mb-5">
        <div className="container-fluid d-flex justify-content-aroud">
          <a className="navbar-brand fw-bold">LIST OF STUDENT</a>
          <div className="">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="px-5" scope="col" colSpan="7">
                <button
                  onClick={() => toggleModalForm()}
                  className="btn btn-primary btn-sm float-start fw-bold"
                >
                  <i className="bi bi-plus-circle"></i>
                </button>
              </th>
            </tr>
            <tr className="text-center">
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">NIM</th>
              <th scope="col">Class</th>
              <th scope="col" colSpan={3}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {students && students.length > 0 ? (
              students.map((students, index) => (
                <tr key={students.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{students.name}</td>
                  <td>{students.nim}</td>
                  <td>{students.class}</td>
                  <td className="action-column">
                    <button onClick={() => deleteStudent(students.id)} className="btn btn-outline-danger btn-m">
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                  <td className="action-column">
                    <button onClick={() => { toggleModalForm(); editStudent(students) }} className="btn btn-outline-warning btn-m">
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                  </td>
                  <td className="action-column">
                    <button
                      onClick={() => toggleModalDetail(students)}
                      className="btn btn-outline-primary btn-m"
                    >
                      <i className="bi bi-info-circle"></i> Info
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No data Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
