import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, DatePicker, Select, notification } from 'antd';
import AppoinmentSchedule from './AppoinmentSchedule';
import moment from 'moment';

const { Option } = Select;

const AppoinmentModal = ({ user, services, doctors, serviceId, doctorId, visible, setIsModalOpen, patient, date}) => {
    console.log("User check");
    console.log(date);

    const [form] = Form.useForm();
    const [timeOption, setTimeOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);



    const [doctor, setDoctor] = useState({});
    const [service, setService] = useState({});

    const [pickedSlot, setPickedSlot] = useState({});



    useEffect(() => {
        if (serviceId != undefined)
            setService(services[serviceId - 1]);

        if (doctorId != undefined)
            setDoctor(doctors[doctorId - 1]);
        if (date != undefined)
        {
            setSelectedDate(date);
            OnDateChanged(date);
        }
        else
            OnDateChanged(selectedDate);
    })


    const onSubmit = async (values) => {
        console.log("OnSubmit");
        form.submit();

        console.log(values);
        console.log(service);
        console.log(doctor);
        console.log(selectedDate.$d);
        console.log(pickedSlot);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: selectedDate.$d,
                startTime: pickedSlot + '.7890123',
                duration: service.duration,
                patientId: user.patient.id,
                doctorId: doctor.id,
                serviceId: service.id,
                statusId: 1,
                conclusion: "",
                price: service.price
            })
        };
    
    form.resetFields();
    setSelectedDate(null);
    setDoctor({});
    setService({});
    setPickedSlot({});
    setTimeOption(false);

    
    return await fetch("/api/Appointment", requestOptions)
    .then((response) => {
        if (response.status === 400)
        {
            notification.open({
                message: "Не удалось создать запись",
                description: 'Не все поля были заполнены',
                className: 'custom-class',
                style: {
                    width: 600,
                  },
            })
        }
        return response.json();
    })
    .then(
        (data) => {
            console.log("Data: ", data);
            if (data.created != undefined)
                notification.open({
                    message: "Вы успешно записались",
                    description: data.message,
                    className: 'custom-class-2',
                    style: {
                        width: 600,
                    },
                })
        },
        (error) => {
            console.log(error);
        }
    );
}

const handleOk = () => {
    form.validateFields().then((values) => {
        onSubmit(values);
        setIsModalOpen(false);
    });
};

const handleCancel = () => {
    form.resetFields();
    setSelectedDate(null);
    setDoctor({});
    setService({});
    setPickedSlot({});
    setTimeOption(false);
    setIsModalOpen(false);
}

const OnDateChanged = (date) => {
    setSelectedDate(date);
    if (selectedDate != null && service != null && doctor != null && Object.keys(service).length != 0 && Object.keys(doctor).length) {
        setTimeOption(true);
    }
    else {
        setTimeOption(false);
    }
}

const OnDoctorChange = (value) => {
    setDoctor(doctors[value - 1]);
    OnDateChanged(selectedDate);
}

const onServiceChange = (value) => {
    setService(services[value - 1]);
    OnDateChanged(selectedDate);
}

const disabledDate = (current) => {
    return current && (current < moment().add(1, 'days') || current > moment().add(31, 'days'));
  };

return (
    <Modal closable={false} className='AppoitmentModal' destroyOnClose={true} open={visible} onOk={handleOk} onCancel={handleCancel} okText="Записаться" cancelText="Отмена">
        <Form
            preserve={false}
            initialValues={{
                fio: patient.serName + ' ' + patient.name,
            }}
            style={{ margin: "15px" }} form={form}>

            <Form.Item label="ФИО" name="fio" rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
            ]}>
                <Input disabled />
            </Form.Item>

            <Form.Item label="Услуга" rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
            ]}>
                {
                    serviceId == undefined ?
                        (
                            <Select rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]} onChange={onServiceChange}>
                                {
                                    services.map(({ id, name, specializationId }) => {
                                        if (doctorId != undefined) {
                                            if (doctors[doctorId - 1].specializationId === specializationId)
                                                return (<Option key={id} value={id}>{name}</Option>)
                                        }
                                        else {
                                            return (<Option key={id} value={id}>{name}</Option>)
                                        }
                                    })}
                            </Select>) : (
                            <Input rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]} disabled value={service.name} />
                        )
                }
            </Form.Item>

            <Form.Item label="Доктор" rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
            ]}>
                {
                    doctorId == undefined ?
                        (
                            <Select onChange={OnDoctorChange} rules={[{ required: true, message: 'Please select an option!' }]}>
                                {
                                    doctors.map(({ id, name, sername, specializationId }) => {
                                        if (serviceId != undefined) {
                                            if (services[serviceId - 1].specializationId === specializationId)
                                                return (<Option key={id} value={id}>{sername + ' ' + name}</Option>)
                                        }
                                        else {
                                            return (<Option key={id} value={id}>{sername + ' ' + name}</Option>)
                                        }
                                    })}
                            </Select>) : (
                            <Input rules={[
                                {
                                    required: true,
                                },
                            ]} disabled value={doctor.sername + ' ' + doctor.name} />
                        )
                }

            </Form.Item>

            <Form.Item label="Дата" rules={[
                {
                    required: true,
                    message: 'Выберете дату',
                },
            ]}>
                <DatePicker value={date} onChange={OnDateChanged} disabledDate={disabledDate}/>
            </Form.Item>

            {timeOption ? (
                <Form.Item
                    name="slots">
                    <AppoinmentSchedule date={selectedDate} service={service} doctor={doctor} setPickedSlot={setPickedSlot}></AppoinmentSchedule>
                </Form.Item>) : ("")}
        </Form>
    </Modal>
);
};

export default AppoinmentModal;
