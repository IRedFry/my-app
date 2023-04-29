import React from "react";
import DoctorMini from "./DoctorMini";

/* 
    TODO:
        1) Получить id специализации
        3) Запросить всех врачей по id специлизации 
*/

const SpecializationBlock = ({ specializationName }) => {
    const doctors = [{ 'id': 0, 'fio': "Горохов Тимофей Вадимович", 'years': '5' }, { 'id': 1, 'fio': "Баженов Андрей Алексеевич", 'years': '3' }, { 'id': 2, 'fio': "Морозова Алина Романовна", 'years': '10' }, { 'id': 3, 'fio': "Васильева Анастасия Евгеньевна", 'years': '12' }];
    return (
        <div className="SpecializationBlock">
            <p className="SpecializationHeader FancyText"> {specializationName} </p>
            <div className="DoctorMiniContainer">
                {
                    doctors.map(({ id, fio, years }) => {
                        return (
                            <DoctorMini key={id} id={id} fio={fio} years={years}></DoctorMini>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SpecializationBlock;