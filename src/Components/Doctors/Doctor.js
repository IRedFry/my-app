import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "antd";
import logo from "../../Images/DoctorPhotos/m1.jpg"
import logo2 from "../../Images/DoctorPhotos/w1.jpg"

const Doctor = () => {
  //const doctors = [{ 'id': 0, 'fio': "Горохов Тимофей Вадимович", 'specialization': 'Офтальмолог','years': '5' }, { 'id': 1, 'fio': "Баженов Андрей Алексеевич",'specialization': 'Хирург', 'years': '3' }, { 'id': 2, 'fio': "Морозова Алина Романовна", 'specialization': 'Педиатр', 'years': '10' }, { 'id': 3, 'fio': "Васильева Анастасия Евгеньевна",'specialization': 'Просто', 'years': '12' }];
  const {id} = useParams();
  
  const[doctor, setDoctor] = useState([]);
  useEffect(() => {
      const getDoctor = async () => {
          const requestOptions = {
              method : 'GET'
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
    return (
      <div>Это {value.date() % 2 == 0 ? (<span> рабочий день</span>) : (<span>выходной</span>)}</div>
    );
  }

  const cellRender = (current) => {

    return dateCellRender(current);
  };
  
  return (
    <>
      <div className="PageHeader FancyText">
                {doctor.sername + ' ' + doctor.name}
      </div>

      <div className="MainInfoBlock">
        <img className="DoctorImage" src={id % 2 == 0 ? logo : logo2}></img>
        <div className="TextInfoBlock">
          <p>{doctor.sername + '\n' + doctor.name}</p>
          <p style={{display: 'flex', gap: '10px'}}><strong>Специальность:</strong> {doctor.specializationName}</p>
          <p style={{display: 'flex', gap: '10px'}}><strong>Стаж: </strong> {doctor.years == 1 ? (<div> {doctor.years} год</div>) : doctor.years < 5 ? (<div> {doctor.years}  года</div>) : (<div> {doctor.years}  лет </div>)}</p>
        </div>
      </div>

      <div className="ScheduleBlock">
          <Calendar cellRender={cellRender}></Calendar>
      </div>
    </>
  );
};
export default Doctor;
