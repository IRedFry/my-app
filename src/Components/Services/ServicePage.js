import React, { useState } from 'react'
import Service from "./Service"
import AppoinmentModal from "../Appoinment/AppoinmentModal"
/*
    TODO:
*/

const ServicePage = ({services, doctors, user }) => {
    console.log("ServicePage");
    console.log(user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentServiceId, setCurrentServiceId] = useState(null)

    return (
        <>
            <div className="PageHeader FancyText">
                Услуги
            </div>
            {user.IsAuthenticated && user.patient != undefined ?
                (<AppoinmentModal user={user} doctors={doctors} services={services} serviceId={currentServiceId} visible={isModalOpen} setIsModalOpen={setIsModalOpen} patient={user.patient}></AppoinmentModal>) : ("")
            }

            <div className="ServiceContainer">
                {
                    services.map(({ id, name, specializationName, price, duration }) => {
                        return (
                            <Service key={id} user={user} service={{ id, name, specializationName, price, duration }} setIsModalOpen={setIsModalOpen} setCurrentServiceId={setCurrentServiceId} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default ServicePage;