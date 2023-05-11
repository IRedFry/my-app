import React, {useState, useEffect} from "react";
import DoctorMini from "./DoctorMini";

/* 
    TODO:
        1) Получить id специализации
        3) Запросить всех врачей по id специлизации 
*/

const SpecializationBlock = ({id, specializationName }) => {

    const[doctors, setDoctors] = useState([]);
    useEffect(() => {
        const getDoctors = async () => {
            const requestOptions = {
                method : 'GET'
            }
    
            return await fetch(`/api/Doctor/specialization/${id}`, requestOptions)
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
    


    //const doctors = [{ 'id': 0, 'fio': "Горохов Тимофей Вадимович", 'years': '5' }, { 'id': 1, 'fio': "Баженов Андрей Алексеевич", 'years': '3' }, { 'id': 2, 'fio': "Морозова Алина Романовна", 'years': '10' }, { 'id': 3, 'fio': "Васильева Анастасия Евгеньевна", 'years': '12' }];
    return (
        <div className="SpecializationBlock">
            <p className="SpecializationHeader FancyText"> {specializationName} </p>
            <div className="DoctorMiniContainer">
                {
                    doctors.map(({ id, name, sername, years }) => {
                        return (
                            <DoctorMini key={id} id={id} fio={sername + ' ' + name} years={years}></DoctorMini>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SpecializationBlock;