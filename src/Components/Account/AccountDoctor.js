import React, {useState, useEffect} from "react";
import { Button } from "antd"
import { useNavigate } from "react-router-dom";
import AccountServiceDoctor  from "../Services/AccountServiceDoctor"
import WeekSchedule from "../Schedule/WeekSchedule"

const AccountDoctor = ({user, setUser}) => {

    const [presentServices, setPresentServices] = useState([]);
    const [alreadyServices, setAlreadyServices] = useState([]);
    const [hasChange, setHasChange] = useState(false);
    console.log(hasChange);
    useEffect(() => {
        const getPresentServices = async () => {
            const requestOptions = {
                method : 'GET'
            }
    
            return await fetch(`/api/DoctorService/Present/${user.doctor.id}`, requestOptions)
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
        setHasChange(false);
    },[hasChange, setHasChange])

    useEffect(() => {
        const getAlreadyServices = async () => {
            const requestOptions = {
                method : 'GET'
            }
    
            return await fetch(`/api/DoctorService/Already/${user.doctor.id}`, requestOptions)
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
        setHasChange(false);
    },[hasChange,setHasChange])


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
                <div className="AccountFIO FancyText"> {user.doctor.sername + ' ' + user.doctor.name } </div>
                <div className="AccountDOB FancyText"> Дата начала работы: {  new Date(user.doctor.startDate).getDate() + '.' + new Date(user.doctor.startDate).getMonth() + '.' + new Date(user.doctor.startDate).getFullYear() + ' г.'}</div>
            </div>
            <Button className="FormButton LogoffButton" onClick={logOff}> Выйти </Button>
        </div>
        <div className="AccountBlock">
            <div className="AccoutBlockHeader"> Текущие услуги</div>
            {
            presentServices.map(({ id, serviceName, specializationName, price, patientFIO, date, statusId, conclusion, startTimeString }) => {
                        return (
                            <AccountServiceDoctor key={id} id={id} name={serviceName} startTimeString={startTimeString} hasChange={hasChange} setHasChange={setHasChange} statusId={statusId} conclusion={conclusion} specialization={specializationName} price={price} clientFIO={patientFIO} date={date}/>
                        )
                    })
                }
        </div>
        <div className="AccountBlock">
            <div className="AccoutBlockHeader WhiteHeader"> Оказанные услуги</div>
            {
            alreadyServices.map(({ id, serviceName, specializationName, price, patientFIO, date, statusId, conclusion, startTimeString }) => {
                        return (
                            <AccountServiceDoctor key={id} id={id} name={serviceName} startTimeString={startTimeString} hasChange={hasChange} setHasChange={setHasChange} statusId={statusId} conclusion={conclusion} specialization={specializationName} price={price} clientFIO={patientFIO} date={date}/>
                        )
                    })
                }
        </div>
        <div className="AccountBlock">
            <div className="AccoutBlockHeader"> Расписание </div>
           <WeekSchedule user={user}></WeekSchedule>
        </div>
      </div>
      </>
    )
}

export default AccountDoctor;