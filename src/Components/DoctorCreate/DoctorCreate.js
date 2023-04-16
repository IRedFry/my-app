//import userEvent from "@testing-library/user-event";
import React from "react";

const DoctorCreate = ({ user, addDoctor }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const id = e.target.elements.idField.value;
    const name = e.target.elements.nameField.value;
    const sername = e.target.elements.sernameField.value;
    const specializationId = e.target.elements.specializationIdField.value;
    const scheduleId = e.target.elements.scheduleIdField.value;
    const salary = e.target.elements.salaryField.value;
    const startDate = e.target.elements.dateField.value;
    const login = e.target.elements.loginField.value;
    const password = e.target.elements.passwordField.value;
    console.log(e.target.elements);
    const doctorDto = {
      id: id,
      name: name,
      sername: sername,
      specializationId: specializationId,
      scheduleId: scheduleId,
      salary: salary,
      startDate: startDate,
      login: login,
      password: password,
    };

    const createDoctor = async () => {
      console.log(doctorDto);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorDto),
      };

      const response = await fetch("/api/Doctor/", requestOptions);
      return await response.json().then(
        (data) => {
          console.log(data);

          if (response.ok) {
            addDoctor(data);
            e.target.elements = [];
          }
        },
        (error) => console.log(error)
      );
    };
    createDoctor();
  };

  return (
    <React.Fragment>
      {user.IsAuthenticated && user.userRole == "admin" ? (
      <><h3>Добавление нового доктора</h3>
      <form onSubmit={handleSubmit}>
        <label>Id: </label>
        <input type="number" name="idField" placeholder="Введите Id:" />
        <br />
        <label>Имя: </label>
        <input type="text" name="nameField" placeholder="Введите Имя:" />
        <br />
        <label>Фамилия: </label>
        <input type="text" name="sernameField" placeholder="Введите Фамилию:" />
        <br />
        <label>Специализация: </label>
        <input
          type="number"
          name="specializationIdField"
          placeholder="Введите Id Специализации:"
        />
        <br />
        <label>Расписание: </label>
        <input
          type="number"
          name="scheduleIdField"
          placeholder="Введите Id Расписания:"
        />
        <br />
        <label>Зарплата: </label>
        <input
          type="number"
          name="salaryField"
          placeholder="Введите Зарплату:"
        />
        <br />
        <label>Дата начада: </label>
        <input
          type="date"
          name="dateField"
          placeholder="Введите Дату начала:"
        />
        <br />
        <label>Логин: </label>
        <input type="text" name="loginField" placeholder="Введите Логин:" />
        <br />
        <label>Пароль: </label>
        <input type="text" name="passwordField" placeholder="Введите Пароль:" />
        <br />
        <br />
        <button type="submit">Добавить</button>
      </form>
      </>) : ("")}
      
    </React.Fragment>
  );
};

export default DoctorCreate;
