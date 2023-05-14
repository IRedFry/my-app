import React from 'react'
import SpecializationBlock from './SpecializationBlock';

/*
    TODO:
        1) Запросить спецальности у сервера
        2) Map для массива
        3) Передать id специальности и имя специализации в SpecializationBlock

*/

const DoctorPage = ({specializations, doctors}) => {
    
    return (
        <>
            <div className="PageHeader FancyText">
                Доктора
            </div>
            <div className="SpecializationContainer">
            {
                    specializations.map(({ id, name }) => {
                        return (
                            <SpecializationBlock key={id} id={id} specializationName={name} doctors={doctors}></SpecializationBlock>
                        )
                    })
                }
            </div>
        </>
    )
}

export default DoctorPage;