import React, { Component } from "react";
import DataTable from "../components/DataTable";
import DataForm from "../components/DataForm";
import DataDetail from "../components/DataDetail";
import { get, post, del, edit } from "../utils/api";

export default class DataContainer extends Component {
  state = {
    modalForm: false,
    modalDetail: false,
    isEditing: false,
    editId: null,
    name: "",
    class: "",
    year: "",
    nim: "",
    guardian_name: "",
    birthDate: "",
    address: "",
    gender: "",
    students: [], // data dari api
    selectedStudent: null,
    validated: false,
    errors: {},
  };

  componentDidMount() {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      this.setState({ students: JSON.parse(storedStudents) });
    } else {
      this.fetchStudents();
    }
  }

  fetchStudents = async () => {
    try {
      const response = await get("/students");
      if (response && response.status === "success") {
        this.setState({ students: response.data });
        localStorage.setItem("students", JSON.stringify(response.data));
      } else {
        console.error("Failed to fetch students:", response.message);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  refreshData = async () => {
    await this.fetchStudents();
  };

  toggleModalForm = () => {
    this.setState({
      modalForm: !this.state.modalForm,
      isEditing: false,
      editId: null,
    });
  };

  toggleModalDetail = (student = null) => {
    this.setState({
      modalDetail: !this.state.modalDetail,
      selectedStudent: student, // Menyimpan data siswa yang dipilih
    });
  };

  editStudent = (student) => {
    this.setState({
      modalForm: true,
      isEditing: true,
      editId: student.id,
      name: student.name,
      class: student.class,
      year: student.year,
      nim: student.nim,
      guardian_name: student.guardian_name,
      birthDate: student.birthDate,
      address: student.address,
      gender: student.gender,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errorMessage: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const { year, nim, birthDate, address, students } = this.state;

    if (year < 2000 || year > 2024) {
      this.setState({ errorMessage: "Year must be between 2000 and 2024." });
      return;
    }

    if (students.some((student) => student.nim === nim)) {
      this.setState({ errorMessage: "NIM must be unique." });
      return;
    }

    const birthDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDate.match(birthDatePattern)) {
      this.setState({
        errorMessage: "Birth Date must be in YYYY-MM-DD format.",
      });
      return;
    }

    if (address.length < 20) {
      this.setState({
        errorMessage: "Address must be at least 20 characters long.",
      });
      return;
    }

    if (form.checkValidity()) {
      this.setState({ validated: true });
      try {
        const response = await post(this.state);
        if (response && response.status === "success") {
          alert("Data submitted successfully");
          this.toggleModalForm();
          this.setState({
            name: "",
            class: "",
            year: "",
            nim: "",
            guardian_name: "",
            birthDate: "",
            address: "",
            gender: "",
          });
          this.refreshData();
        } else {
          console.error("Error submitting data:", response.message);
          this.setState({ errorMessage: "Failed to submit data." });
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        this.setState({
          errorMessage: "An error occurred while submitting data.",
        });
      }
    } else {
      this.setState({ validated: false });
      form.classList.add("was-validated");
    }
  };

  handleEditSubmit = async () => {
    try {
      const response = await edit(this.state.editId, this.state);
      if (response && response.status === "success") {
        alert("Data updated successfully");
        this.toggleModalForm();
        this.setState({
          name: "",
          class: "",
          year: "",
          nim: "",
          guardian_name: "",
          birthDate: "",
          address: "",
          gender: "",
          isEditing: false,
          editId: null,
        });
        this.refreshData();
      } else {
        console.error("Error updating data:", response.message);
        this.setState({ errorMessage: "Failed to update data." });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      this.setState({
        errorMessage: "An error occurred while updating data.",
      });
    }
  };

  years = Array.from({ length: 2025 - 2000 }, (_, i) => 2000 + i);

  deleteStudent = async (id) => {
    try {
      const response = await del(id);
      if (response && response.status === "success") {
        alert("Data deleted successfully");
        this.refreshData();
      } else {
        console.error("Error deleting data:", response.message);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("An error occurred while deleting data.");
    }
  };

  render() {
    return (
      <>
        <DataTable
          students={this.state.students}
          toggleModalForm={this.toggleModalForm}
          toggleModalDetail={this.toggleModalDetail}
          deleteStudent={this.deleteStudent}
          editStudent={this.editStudent}
        />

        {this.state.modalForm && (
          <DataForm
            isEditing={this.state.isEditing}
            name={this.state.name}
            class={this.state.class}
            year={this.state.year}
            nim={this.state.nim}
            guardian_name={this.state.guardian_name}
            birthDate={this.state.birthDate}
            address={this.state.address}
            gender={this.state.gender}
            years={this.years}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errorMessage={this.state.errorMessage}
            toggleModal={this.toggleModalForm}
          />
        )}
        {this.state.modalDetail && (
          <DataDetail
            selectedStudent={this.state.selectedStudent}
            toggleModal={this.toggleModalDetail}
          />
        )}
      </>
    );
  }
}
