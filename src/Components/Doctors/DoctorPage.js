import React from 'react'
import SpecializationBlock from './SpecializationBlock';

/*
    TODO:
        1) Запросить спецальности у сервера
        2) Map для массива
        3) Передать id специальности и имя специализации в SpecializationBlock

*/

const DoctorPage = () => {
    return (
        <>
            <div className="PageHeader FancyText">
                Доктора
            </div>
            <div className="SpecializationContainer">
                <SpecializationBlock specializationName="Педиатр"></SpecializationBlock>
                <SpecializationBlock specializationName="Хирург"></SpecializationBlock>
                <SpecializationBlock specializationName="Офтальмолог"></SpecializationBlock>
            </div>
        </>
    )
}

export default DoctorPage;