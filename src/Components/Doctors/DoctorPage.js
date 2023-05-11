import React, {useState, useEffect} from 'react'
import SpecializationBlock from './SpecializationBlock';

/*
    TODO:
        1) Запросить спецальности у сервера
        2) Map для массива
        3) Передать id специальности и имя специализации в SpecializationBlock

*/

const DoctorPage = () => {

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
    
    return (
        <>
            <div className="PageHeader FancyText">
                Доктора
            </div>
            <div className="SpecializationContainer">
            {
                    specializations.map(({ id, name }) => {
                        return (
                            <SpecializationBlock key={id} id={id} specializationName={name}></SpecializationBlock>
                        )
                    })
                }
            </div>
        </>
    )
}

export default DoctorPage;