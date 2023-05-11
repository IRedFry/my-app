import React, {useState, useEffect} from 'react'
import Service from "./Service"
import AppoinmentModal from "../Appoinment/AppoinmentModal"
/*
    TODO:
*/

const ServicePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null)

    const[services, setServices] = useState([]);

    useEffect(() => {
        const getServices = async () => {
            const requestOptions = {
                method : 'GET'
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

    // const services = [  {id: 0, name: "Проверка зрения", specialization: "Офтальмолог", price: "1200руб.", duration: 1},
    //                     {id: 1, name: "УЗИ", specialization: "Хирург", price: "3300руб.", duration: 3},
    //                     {id: 2, name: "Проверка работоспособности ребёнка", specialization: "Педиатр", price: "50руб. за кг ребёнка", duration: 2},
    //                     {id: 3, name: "Свиная вырезка", specialization: "Хирург", price: "1000руб. за кг", duration: 1}];
    return (
        <>
            <div className="PageHeader FancyText">
                Услуги
            </div>
            <AppoinmentModal service={currentService} visible={isModalOpen} setIsModalOpen={setIsModalOpen}></AppoinmentModal>
            <div className="ServiceContainer">
                {
                    services.map(({ id, name, specializationName, price, duration }) => {
                        return (
                            <Service key={id} service={{id, name, specializationName, price, duration}} setIsModalOpen={setIsModalOpen} setCurrentService={setCurrentService}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ServicePage;