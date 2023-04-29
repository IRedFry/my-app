import React, { useEffect } from "react";
import "./Style.css";

const Doctor = ({ user, doctors, setDoctors, removeDoctor }) => {
  useEffect(() => {
    const getDoctors = async () => {
      const requestOptions = {
        method: "GET",
      };
      return await fetch("/api/Doctor/", requestOptions)
        .then((response) => response.json())
        .then(
          (data) => {
            console.log("Data:", data);
            setDoctors(data);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getDoctors();
  }, [setDoctors]);

  const deleteItem = async ({ id }) => {
    const requestOptions = {
      method: "DELETE",
    };
    return await fetch(`/api/Doctor/${id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          removeDoctor(id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <React.Fragment>
      <h3>Список докторов</h3>
      {doctors.map(({ id, name, salary, specialization }) => (
        <div className="Doctor" key={id} id={id}>
          <strong>
            {id} : {name}
          </strong>
          {user.IsAuthenticated && user.userRole == "admin" ? (
            <button onClick={() => deleteItem({ id })}>Уволить</button>
          ) : (
            ""
          )}

          <div className="DoctorSalary">Зарплата : {salary} руб.</div>
          <div
            className="DoctorSpecialization"
            key={specialization.id}
            id={specialization.id}
          >
            Специализация : {specialization.name}
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
export default Doctor;
