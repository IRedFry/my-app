import React, { useState } from "react";
import { Collapse } from "antd";
import { Button, Modal, notification } from "antd";
/* 
    TODO:

*/

const { Panel } = Collapse;

const AccountServiceClient = ({ id, name, specialization, price, doctorFIO, date, statusId, conclusion, isPresent, setHasChange, hasChange, startTimeString}) => {
    console.log(conclusion);
    const [modalOpen, setModelOpen] = useState(false);

    const handleCancel = () => {
        setModelOpen(false)
    }

    const refuse = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                3
            )
        };
        setModelOpen(false);
        return await fetch(`/api/PatientService/Refuse/${id}`, requestOptions).then(
            (response) => {
                console.log(response);
                setHasChange(!hasChange);
                console.log(hasChange);
                notification.open({
                    message: `Вы отказались от услуги ${name}`,
                    className: 'custom-class-2',
                    style: {
                        width: 600,
                      },
                })
            }
        );
    };
    return (
        <>
            <Collapse className="ServiceCollapse">
                <Panel header={name} key={id} className="ServicePanel">
                    <div className="SeriveFiledsWrapper">
                        <p className="ServiceField"> <div>Цена:</div> <span>{price}</span> </p>
                        <p className="ServiceField"> <div>Специальность:</div> <span>{specialization}</span> </p>
                        <p className="ServiceField"> <div>Врач:</div> <span>{doctorFIO}</span> </p>
                        <p className="ServiceField"> <div>Дата:</div> <span>{date}</span> </p>
                        <p className="ServiceField"> <div>Время:</div> <span>{startTimeString}</span> </p>
                        {statusId === 2 ? (<p className="ServiceField"> <div>Заключение:</div> <span>{conclusion}</span> </p>) : ("")}
                        {isPresent ? (<div className="butWrap"><Button className="ServiceAppointmentButton FancyText" onClick={() => setModelOpen(true)}> Отказаться </Button></div>) : (<></>)}
                    </div>
                </Panel>
            </Collapse>
            <Modal title="Отказаться от приема" open={modalOpen} onOk={refuse} onCancel={handleCancel}>
                <p>Вы уверены, что хотите отказаться?</p>
            </Modal>
        </>
    );
}

export default AccountServiceClient;