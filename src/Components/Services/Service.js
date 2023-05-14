import React from "react";
import { Collapse } from "antd";
import {Button} from "antd";
/* 
    TODO:

*/

const { Panel } = Collapse;

const Service = ({user, service, setIsModalOpen, setCurrentServiceId}) => {
    console.log(user);

    const openAppoinmentModal = () => {
        setCurrentServiceId(service.id);
        setIsModalOpen(true);
    }

    return(
        <>
        <Collapse className="ServiceCollapse ">
            <Panel header={service.name} key={service.id} className="ServicePanel">
                <div className="SeriveFiledsWrapper">
                    <p className="ServiceField"> <div>Цена:</div> <span>{service.price} Руб.</span> </p>
                    <p className="ServiceField"> <div>Специальность:</div> <span>{service.specializationName}</span> </p>
                    { user.userRole == "user" ? (<div className="butWrap"><Button className="ServiceAppointmentButton FancyText" onClick={openAppoinmentModal}> Записаться </Button></div>) : ("")}
                </div>
            </Panel>
        </Collapse>

        </>
    );
}

export default Service;