import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "antd";
import moment from "moment";
import AppoinmentModal from "../Appoinment/AppoinmentModal"
import logo from "../../Images/DoctorPhotos/w1.jpg"
import logo2 from "../../Images/DoctorPhotos/m1.jpg"

const Doctor = ({ services, user, doctors }) => {
 const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [schedule, setSchedule] = useState([]);

  const [calendarDate, setCalendarDate] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getSchedule = async () => {
      const requestOptions = {
        method: 'GET'
      }

      return await fetch(`/api/Schedule/${id}`, requestOptions)
        .then(response => response.json())
        .then((data) => {
          console.log('setSchedule:  ', data);
          setSchedule(data);
        },
          (error) => {
            console.log(error);
          });
    }
    getSchedule();
  }, [setSchedule])

  useEffect(() => {
    const getDoctor = async () => {
      const requestOptions = {
        method: 'GET'
      }
      return await fetch(`/api/Doctor/${id}`, requestOptions)
        .then(response => response.json())
        .then((data) => {
          console.log('DoctorsByIdData:  ', data);
          setDoctor(data);
        },
          (error) => {
            console.log(error);
          });
    }
    getDoctor();
  }, [setDoctor])


  const dateCellRender = (value) => {

    if (schedule.length !== 0) {
      let dayOfWeek = value.$d.getDay();


      if (disabledDate(value)) {
        const dateStyle = {};
        dateStyle.backgroundColor = '#f5f5f5'; // set background color for disabled cells
        dateStyle.opacity = 0.5; // set opacity for disabled cells
        return <div style={dateStyle}></div>; 
      }

      let scheduleDay = schedule[dayOfWeek];
      let startHour = (scheduleDay.startTime.split(":"))[0] + ":00";
      let endHour = (scheduleDay.endTime.split(":"))[0] + ":00";

      return (
        <div>Это {scheduleDay.isHoliday ? (<span>Выходной</span>) : (<><span>Рабочий день </span><br /><span>С: <strong>{startHour}</strong></span><span> До: <strong>{endHour}</strong></span></>)}</div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }

  function disabledDate(current) {
    // Disable all dates before today and after 30 days from today
    return current && (current < moment().startOf('day') || current > moment().add(30, 'days'));
  }

  const onDateSelect = (date) => {
    console.log(date);
    if (!schedule[date.$d.getDay()].isHoliday)
    {
        setCalendarDate(date);
        setIsModalOpen(true);
    }
    else
    console.log('asdasd');
  }

  return (
    <>
      <div className="PageHeader FancyText">
        {doctor.sername + ' ' + doctor.name}
      </div>

      <div className="MainInfoBlock">
        <img className="DoctorImage" src={id % 2 == 0 ? logo : logo2}></img>
        <div className="TextInfoBlock">
          <p>{doctor.sername + '\n' + doctor.name}</p>
          <p style={{ display: 'flex', gap: '10px' }}><strong>Специальность:</strong> {doctor.specializationName}</p>
          <p style={{ display: 'flex', gap: '10px' }}><strong>Стаж: </strong> {doctor.years == 1 ? (<div> {doctor.years} год</div>) : doctor.years < 5 ? (<div> {doctor.years}  года</div>) : (<div> {doctor.years}  лет </div>)}</p>
        </div>
      </div>

      <div className="ScheduleBlock">
        <Calendar disabledDate={disabledDate} cellRender={dateCellRender} onSelect={onDateSelect}></Calendar>
      </div>
      {user.IsAuthenticated && user.patient != undefined && Object.keys(doctor).length !== 0  ? 
         (<AppoinmentModal user={user} date={calendarDate} services={services} doctors={doctors} doctorId={id} visible={isModalOpen} setIsModalOpen={setIsModalOpen} patient={user.patient}></AppoinmentModal>) : ("")
      }
    </>
  );
};
export default Doctor;
