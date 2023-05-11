import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import ShiftSlider from "./ShiftSlider";

const WeekSchedule = () => {
    const [selectedDay, setSelectedDay] = useState(0);
    const [schedule, setSchedule] = useState([
        { id: "0", day: "Понедельник", start: 8, end: 16 },
        { id: "1", day: "Вторник", start: 9, end: 17 },
        { id: "2", day: "Среда", start: 10, end: 18 },
        { id: "3", day: "Четверг", start: 11, end: 19 },
        { id: "4", day: "Пятница", start: 12, end: 20 },
        { id: "5", day: "Суббота", start: 6, end: 14 },
        { id: "6", day: "Воскресенье", start: 8, end: 16 },
    ]);


    const handleDayClick = (id) => {
        console.log("handleDayClickStart")

        setSelectedDay(schedule[id]);
        console.log("Start: " + schedule[id].start);
        console.log("End: " + schedule[id].end);
        console.log("handleDayClickEnd")
    };

    const handleShiftChange = (id, start, end) => {
        const newSchedule = schedule.map((item) =>
            item.id === id ? { ...item, start, end } : item
        );
        setSchedule(newSchedule);
        setSelectedDay(newSchedule.find((item) => item.id === id));
    };



    return (
        <Row className="ScheduleRow" gutter={[16, 16]}>
            {schedule.map(({ id, day }) => (
                <Col className="ScheduleCol" span={3} key={id} >
                    <Card className={selectedDay.id === id ?  "ScheduleCard SelectedCard" : "ScheduleCard"} onClick={() => handleDayClick(id)}>
                        <Card.Meta title={day} />
                    </Card>
                </Col>
            ))}
            {selectedDay && (
                <Col span={24}>
                    <ShiftSlider day={selectedDay} onShiftChange={handleShiftChange} />
                </Col>
            )}
        </Row>
    );
};

export default WeekSchedule;
