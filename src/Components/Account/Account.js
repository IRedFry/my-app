import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd"

import AccountServiceClient  from "../Services/AccountSerivceClient"
const Account = ({user, setUser}) => {
    console.log(user);

    const [presentServices, setPresentServices] = useState([]);
    const [alreadyServices, setAlreadyServices] = useState([]);
    const [hasChange, setHasChange] = useState(false);
    const GetDateString = (olddate) => {
      let date = new Date(olddate);
      let day = date.getDate(); // 1
      day = day.toString().padStart(2, '0'); // '01'
      let month = date.getMonth() + 1; // 1
      month = month.toString().padStart(2, '0'); // '01'
      let year = date.getFullYear(); // 2020
      return day + '-' + month + '-' + year;
    }
   

    useEffect(() => {
        const getPresentServices = async () => {
            const requestOptions = {
                method : 'GET'
            }
    
            return await fetch(`/api/PatientService/Present/${user.patient.id}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log('setPresentServices:  ', data);
                setPresentServices(data);
            },
            (error) => {
                console.log(error);
            });
        }   
        getPresentServices();
    },[hasChange, setHasChange])

    useEffect(() => {
        const getAlreadyServices = async () => {
            const requestOptions = {
                method : 'GET'
            }
    
            return await fetch(`/api/PatientService/Already/${user.patient.id}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log('setAlreadyServices:  ', data);
                setAlreadyServices(data);
            },
            (error) => {
                console.log(error);
            });
        }   
        getAlreadyServices();
    },[hasChange, setHasChange])

    const navigate = useNavigate();
    const logOff = async (event) => {
        event.preventDefault();
    
        const requestOptions = {
          method: "POST",
        };
        return await fetch("/api/Account/LogOff", requestOptions).then(
          (response) => {
            response.status === 200 &&
              setUser({ isAuthenticated: false, userName: "" });
            response.status === 401 ? navigate("/Login") : navigate("/");
          }
        );
      };
    
    return (
        <>
        <div className="PageHeader FancyText">
              Личный кабинет
      </div>
      <div className="AccountContainer">
        <div className="AccountBlock AccountFirstBlock">
            <div>
                <div className="AccountFIO FancyText"> {user.patient.serName + ' ' + user.patient.name} </div>
                <div className="AccountDOB FancyText"> Дата рождения: {GetDateString(user.patient.dateOfBirth) + 'г.'}</div>
            </div>
            <Button className="FormButton LogoffButton" onClick={logOff}> Выйти </Button>
        </div>
        <div className="AccountBlock">
            <div className="AccoutBlockHeader"> Текущие услуги</div>
            {
            presentServices.map(({ id, serviceName, specializationName, price, doctorFIO, date, startTimeString }) => {
                        return (
                            <AccountServiceClient key={id} id={id} name={serviceName} startTimeString={startTimeString} hasChange={hasChange} setHasChange={setHasChange} specialization={specializationName} price={price} doctorFIO={doctorFIO} date={GetDateString(date)} isPresent={true}/>
                        )
                    })
                }
        </div>
        <div className="AccountBlock">
            <div className="AccoutBlockHeader WhiteHeader"> Оказанные услуги</div>
            {
            alreadyServices.map(({ id, serviceName, specializationName, price, doctorFIO, date, statusId, conclusion, startTimeString }) => {
                        return (
                            <AccountServiceClient key={id} id={id} name={serviceName} startTimeString={startTimeString} hasChange={hasChange} setHasChange={setHasChange} statusId={statusId} conclusion={conclusion} specialization={specializationName} price={price} doctorFIO={doctorFIO} date={GetDateString(date)} isPresent={false}/>
                        )
                    })
                }
        </div>
      </div>
      </>
    )
}

export default Account;