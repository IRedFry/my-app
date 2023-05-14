import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, notification } from "antd";
import ShiftSlider from "./ShiftSlider";

const WeekSchedule = ({ user }) => {
    const [selectedDay, setSelectedDay] = useState({});
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const getSchedule = async () => {
            const requestOptions = {
                method: 'GET'
            }

            return await fetch(`/api/Schedule/${user.doctor.id}`, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    console.log('setSchedule:  ', data);
                    setSchedule(data);

                    setSelectedDay(schedule[0]);
                },
                    (error) => {
                        console.log(error);
                    });
        }
        getSchedule();
    }, [setSchedule])

    const saveSchedule = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                schedule
            }),
        };
        console.log("Request");
        console.log(requestOptions);
        await fetch('/api/Schedule/Edit', requestOptions)
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then(
                (data) => {
                    if ( data.error != undefined) {
                        notification.open({
                            message: "Невозможно изменить расписание",
                            description: data.message,
                            className: 'custom-class',
                            style: {
                                width: 600,
                              },
                        })
                        console.log("Data: ", data);
                        handleDayClick(0);
                    }
                    else
                    {
                        notification.open({
                            message: "Расписание успешно изменено",
                            description: data.message,
                            className: 'custom-class-2',
                            style: {
                                width: 600,
                              },
                        })
                        console.log("Data: ", data);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );

        const newRequestOptions = {
            method: 'GET'
        }
        return await fetch(`/api/Schedule/${user.doctor.id}`, newRequestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log('setSchedule:  ', data);
                setSchedule(data);
            },
                (error) => {
                    console.log(error);
                });
    };

    const handleDayClick = (id) => {
        if (id === 0)
        {
            setSelectedDay({});
            return;
        }
        console.log("handleDayClickStart " + id)

        setSelectedDay(schedule[id - 1]);
        console.log("Start: " + schedule[id - 1].startTime);
        console.log("End: " + schedule[id - 1].endTime);
        console.log("handleDayClickEnd")
    };

    const handleShiftChange = (id, startTime, endTime) => {

        const newSchedule = schedule.map((item) =>
            item.id === id ? { ...item, startTime: `${startTime}:00:00.7890123`, endTime: `${endTime}:00:00.7890123` } : item
        );
        setSchedule(newSchedule);
        setSelectedDay(newSchedule.find((item) => item.id === id));
        console.log(newSchedule);
    };


    return (
        <div className="WeekScheduleWrapper">
            <Row className="ScheduleRow" gutter={[16, 16]}>
                {schedule.map(({ id, dayOfWeekString }) => (
                    <Col className="ScheduleCol" span={3} key={id} >
                        <Card className={selectedDay != undefined && selectedDay.id === id ? "ScheduleCard SelectedCard" : "ScheduleCard"} onClick={() => handleDayClick(id)}>
                            <Card.Meta title={dayOfWeekString} />
                        </Card>
                    </Col>
                ))}
                {selectedDay && (
                    <Col span={24}>
                        {
                            console.log(Object.keys(selectedDay).length === 0)
                        }
                        {
                            Object.keys(selectedDay).length !== 0 ?
                                (
                                    <ShiftSlider day={selectedDay} onShiftChange={handleShiftChange} />
                                ) : (
                                    ""
                                )
                        }
                    </Col>
                )}
            </Row>
            <Button className="FancyText SaveScheduleButton" onClick={saveSchedule}>Сохранить изменения</Button>
        </div>

    );
};

export default WeekSchedule;
