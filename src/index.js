import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

// Импорты старых докторов
import Doctor from "./Components/Doctors/Doctor";
//import CreateDoctor from "./Components/DoctorCreate/DoctorCreate.js";
import DoctorPage from "./Components/Doctors/DoctorPage";
import ServicePage from "./Components/Services/ServicePage";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import LogOff from "./Components/LogOff/LogOff";
import Register from "./Components/Register/Register";
import LandingPage from "./Components/LandingPage/LandingPage";
import Account from "./Components/Account/Account"
import AccountDoctor from "./Components/Account/AccountDoctor";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

const App = () => {


  // Старые переменные для докторов
  //const [doctors, setDoctors] = useState([]);
  //const createDoctor = (doctor) => setDoctors([...doctors, doctor]);
  //const removeDoctor = (removeId) =>
  //setDoctors(doctors.filter(({ id }) => id !== removeId));

  const [user, setUser] = useState({ isAuthenticated: false, userName: "", userRole: "" });
  useEffect(() => {

    const getUser = async () => {
      return await fetch("/api/Account/IsAuthenticated")
        .then((response) => {
          response.status === 401 &&
            setUser({ isAuthenticated: false, userName: "" });
          return response.json;
        })
        .then(
          (data) => {
            if (
              typeof data != "undefined" &&
              typeof data.userName != "undefined"
            ) {
              setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole });
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getUser();
  }, [setUser]);

  user.userRole = "doctor";

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout user={user}></Layout>} >
          <Route index element={
            <div>
              <LandingPage></LandingPage>
            </div>
          } />
          <Route
            path="/Doctors"
            element={
              <div>
                <DoctorPage></DoctorPage>
                {/* <CreateDoctor user={user} createDoctor={createDoctor} />
              <Doctor
                user = {user}
                doctors={doctors}
                setDoctors={setDoctors}
                removeDoctor={removeDoctor}
              /> */}

              </div>
            }
          />
          <Route
            path="/Services"
            element={
              <div>
                <ServicePage></ServicePage>
              </div>
            }
          />
          <Route
            path="/Login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/LogOff" element={<LogOff setUser={setUser} />} />
          <Route path="/Register" element={<Register setUser={setUser} />} />
          <Route path="/Account" element={ user.userRole === "client" ? <Account /> : <AccountDoctor/>} />
          <Route path="/Doctors/:id" element={<Doctor></Doctor>} />
          <Route path="*" element={<h3>404</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <App />
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
