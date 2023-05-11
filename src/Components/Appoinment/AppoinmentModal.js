import React, { useState } from 'react'
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import AppoinmentSchedule from './AppoinmentSchedule';

const { Option } = Select;

const AppoinmentModal = ({ service, doctor, visible, setIsModalOpen }) => {
    console.log(service?.duration);
    const [form] = Form.useForm();
    const [timeOption, setTimeOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const onSubmit = (values) => {
        console.log(values);
        form.resetFields();
        setTimeOption(false);
    }

    const handleOk = () => {
        form.validateFields().then((values) => {
            onSubmit(values);
        });

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setTimeOption(false);
        setIsModalOpen(false);
    }

    const OnDateChanged = (date) => {
        console.log(date);
        setSelectedDate(date);
        console.log(schedule);

        if (service != null && doctor != null)
            setTimeOption(true);
    }

    const OnDoctorChange = (value) => {
        doctor = doctors[value];
        console.log(doctor)
    }

    //#region 
    const doctors = [{ 'id': 0, 'fio': "Горохов Тимофей Вадимович", 'specialization': 'Офтальмолог', 'years': '5' }, { 'id': 1, 'fio': "Баженов Андрей Алексеевич", 'specialization': 'Хирург', 'years': '3' }, { 'id': 2, 'fio': "Морозова Алина Романовна", 'specialization': 'Педиатр', 'years': '10' }, { 'id': 3, 'fio': "Васильева Анастасия Евгеньевна", 'specialization': 'Просто', 'years': '12' }];
    const services = [
        { id: 0, name: "Проверка зрения", specialization: "Офтальмолог", price: "1200руб.", duration: 2 },
        { id: 1, name: "УЗИ", specialization: "Хирург", price: "3300руб." , duration: 3 },
        { id: 2, name: "Проверка работоспособности ребёнка", specialization: "Педиатр", price: "50руб. за кг ребёнка", duration: 1  },
        { id: 3, name: "Свиная вырезка", specialization: "Хирург", price: "1000руб. за кг", duration: 1  }];
    const placeHolderForForm = { FIO: "Васильева Анастасия Евгеньевна", Service: "asd", Doctor: "Лебедев Илья Игоревич", Date: "2023-05-08" };
    const schedule = [
        { id: "0", day: "Понедельник", start: 8, end: 16 },
        { id: "1", day: "Вторник", start: 9, end: 17 },
        { id: "2", day: "Среда", start: 10, end: 18 },
        { id: "3", day: "Четверг", start: 11, end: 19 },
        { id: "4", day: "Пятница", start: 12, end: 20 },
        { id: "5", day: "Суббота", start: 6, end: 14 },
        { id: "6", day: "Воскресенье", start: 8, end: 16 }
    ]
    //#endregion

    return (
        <Modal open={visible} onOk={handleOk} onCancel={handleCancel}>
            <Form
                initialValues={{
                    fio: placeHolderForForm.FIO,
                }}
                style={{ margin: "15px" }} form={form}>

                <Form.Item label="ФИО" name="fio">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Услуга">
                    {
                        service == null ? (
                            <Select >
                                {
                                    services.map(({ id, name }) => {
                                        return (<Option key={id} value={id}>{name}</Option>)
                                    })}
                            </Select>) : (
                            <Input disabled value={service.name} />
                        )
                    }
                </Form.Item>

                <Form.Item label="Доктор" name="doctor">
                    <Select onChange={OnDoctorChange}>
                        {
                            doctors.map(({ id, fio, specialization }) => {
                                if (service != null) {
                                    if (services[service.id].specialization === specialization)
                                        return (<Option key={id} value={id}>{fio}</Option>)
                                }
                                else {
                                    return (<Option key={id} value={id}>{fio}</Option>)
                                }
                            })}
                    </Select>
                </Form.Item>

                <Form.Item label="Дата" name="date">
                    <DatePicker onChange={OnDateChanged} />
                </Form.Item>
                {timeOption ? (
                    <Form.Item>
                        <AppoinmentSchedule date={selectedDate} duration={service.duration} schedule={schedule}></AppoinmentSchedule>
                    </Form.Item>) : console.log(doctor)}
            </Form>
        </Modal>
    );
};

export default AppoinmentModal;
