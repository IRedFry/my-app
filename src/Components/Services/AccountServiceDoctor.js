import React, { useState } from "react";
import { Collapse } from "antd";
import { Button, Modal, Form, Input, notification } from "antd";
/* 
    TODO:

*/

const { Panel } = Collapse;

const AccountServiceDoctor = ({ id, name, specialization, price, clientFIO, date, statusId, conclusion, setHasChange, hasChange, startTimeString }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const conclustionButtonClick = () => {
        setIsModalOpen(true);
    }

    const renderErrorMessage = () => {
        errorMessages.map((index, error) => <div key={index}>{error}</div>);
    };

    const sendConclusion = async (formValues) => {
        console.log(formValues);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                formValues.conclusionField
            )
        };
        setIsModalOpen(false);
        setHasChange(true);
        console.log(hasChange);
        return await fetch(`/api/DoctorService/Conclusion/${id}`, requestOptions).then(
            (response) => {
                console.log(response);
                return response.json();
            })
            .then(
                (data) => {
                    if ( data.error != undefined) {
                        notification.open({
                            message: "Невозможно поставить заключение",
                            description: data.message,
                            className: 'custom-class',
                            style: {
                                width: 600,
                              },
                        })
                        console.log("Data: ", data);
                    }
                    else
                    {
                        notification.open({
                            message: "Заключение успешно поставлено",
                            description: data.message,
                            className: 'custom-class-2',
                            style: {
                                width: 600,
                              },
                        })
                        console.log("Data: ", data);
                    }
                    setErrorMessages(data.error);
                }, (error) => {
                    console.log(error);
                }
            )

    }


    const GetDateString = (olddate) => {
        let date = new Date(olddate);
        let day = date.getDate(); // 1
        day = day.toString().padStart(2, '0'); // '01'
        let month = date.getMonth() + 1; // 1
        month = month.toString().padStart(2, '0'); // '01'
        let year = date.getFullYear(); // 2020
        return day + '-' + month + '-' + year;
      }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    return (
        <>
            <Collapse className="ServiceCollapse">
                <Panel header={name} key={id} className="ServicePanel">
                    <div className="SeriveFiledsWrapper">
                        <p className="ServiceField"> <div>Цена:</div> <span>{price}</span> </p>
                        <p className="ServiceField"> <div>Специальность:</div> <span>{specialization}</span> </p>
                        <p className="ServiceField"> <div>Клиент:</div> <span>{clientFIO}</span> </p>
                        {statusId === 2 ? (<p className="ServiceField"> <div>Заключение:</div> <span>{conclusion}</span> </p>) : ("")}
                        <p className="ServiceField"> <div>Дата:</div> <span>{GetDateString(date)}</span> </p>
                        <p className="ServiceField"> <div>Время:</div> <span>{startTimeString}</span> </p>
                        {statusId === 1 ? (
                            <div className="butWrap"><Button className="ServiceAppointmentButton FancyText" onClick={conclustionButtonClick}>Поставить заключение</Button></div>
                        ) : (
                            ""
                        )}
                    </div>
                </Panel>
            </Collapse>
            <Modal closable={false} footer={null} open={isModalOpen} destroyOnClose={true} okText={"Закрыть"} cancelText={"Закрыть другого цвета"} onOk={closeModal} onCancel={closeModal}>
                <Form
                    className="ConclusionClass"
                    onFinish={sendConclusion}
                    name="basic"

                    onFinishFailed={renderErrorMessage}
                    autoComplete="off"
                >
                    <Form.Item
                        className="FormItemClass ConclusionLabel"
                        label="Заключение"
                        name="conclusionField"

                        rules={[
                            { required: true, message: "Поставьте заключение" }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className="ConclustionButton" htmlType="submit"> Поставить заключение </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AccountServiceDoctor;