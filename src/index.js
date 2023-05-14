import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./index.css";

// Импорты старых докторов
import Doctor from "./Components/Doctors/Doctor";
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

  const [user, setUser] = useState({ isAuthenticated: false, userName: "", userRole: "", patient: {}, doctor: {} });
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
              setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole, patient: data.patient, doctor: data.doctor  });
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getUser();
  }, [setUser]);

  const[specializations, setSpecializations] = useState([]);

  useEffect(() => {
      const getSpecialization = async () => {
          const requestOptions = {
              method : 'GET'
          }
          return await fetch('/api/Specialization', requestOptions)
          .then(response => response.json())
          .then((data) => {
              console.log('SpecializationData:  ', data);
              setSpecializations(data);
          },
          (error) => {
              console.log(error);
          });
      }   
      getSpecialization();
  
  }, [setSpecializations])

  const [services, setServices] = useState([]);

  useEffect(() => {
      const getServices = async () => {
          const requestOptions = {
              method: 'GET'
          }

          return await fetch('/api/Services', requestOptions)
              .then(response => response.json())
              .then((data) => {
                  console.log('ServiceData:  ', data);
                  setServices(data);
              },
                  (error) => {
                      console.log(error);
                  });
      }
      getServices();

  }, [setServices])
  
  const[doctors, setDoctors] = useState([]);
  useEffect(() => {
      const getDoctors = async () => {
          const requestOptions = {
              method : 'GET'
          }
  
          return await fetch('/api/Doctor', requestOptions)
          .then(response => response.json())
          .then((data) => {
              console.log('DoctorsBySpecializationData:  ', data);
              setDoctors(data);
          },
          (error) => {
              console.log(error);
          });
      }
      getDoctors();
  }, [setDoctors])

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
                <DoctorPage specializations={specializations}></DoctorPage>
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
                <ServicePage doctors={doctors} user={user} services={services}></ServicePage>
              </div>
            }
          />
          <Route
            path="/Login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/LogOff" element={<LogOff setUser={setUser} />} />
          <Route path="/Register" element={<Register setUser={setUser} />} />
          <Route path="/Account" element={ user.userRole === "user" ? <Account user={user} setUser={setUser} /> : user.userRole === "doctor" ? <AccountDoctor user={user} setUser={setUser}/> : <Navigate to="/Login" /> } />
          <Route path="/Doctors/:id" element={<Doctor user={user} services={services} doctors={doctors}></Doctor>} /> 
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
