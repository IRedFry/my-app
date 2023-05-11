import React, { useState, useEffect } from "react";
import {Radio} from "antd"

const AppoinmentSchedule = ({ date, duration, schedule }) => {
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [scheduleItem, setScheduleItem] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    const dayIndex = new Date(date).getDay() == 0 ? 6 : new Date(date).getDay() - 1;

    setDayOfWeek(dayIndex);
  }, [date]);

  useEffect(() => {
    if (dayOfWeek !== null) {
      const item = schedule.find((s) => s.id == dayOfWeek);
      setScheduleItem(item);
    }
  }, [dayOfWeek, schedule]);

  useEffect(() => {
    if (scheduleItem !== null) {
      const availableSlots = [];
      console.log("SCHEDULE START");
      for (let i = parseInt(scheduleItem.start); i + parseInt(duration) <= parseInt(scheduleItem.end); i++) {
        console.log("I == " + i);
        availableSlots.push({ start: i, end: i + parseInt(duration) });
      }
      setAvailableTimeSlots(availableSlots);
      console.log("AVALIABLE SLOTS");
      console.log(availableSlots);
    }
  }, [duration, scheduleItem]);

  return (
    <div>
      {dayOfWeek !== null && scheduleItem !== null && (
        <>
          <h3>Расписание на {scheduleItem.day}</h3>
          {availableTimeSlots.length === 0 ? (
            <p>Нет доступных слотов на сегодня</p>
          ) : (
            <>
              <p>Доступные слоты:</p>
              <Radio.Group className="SlotGroup" buttonStyle="solid" size="large">     
                {availableTimeSlots.map((slot) => (
                    <Radio.Button className="SlotButton" key={slot.start} value={slot.start}>
                    {slot.start}:00 - {slot.end}:00
                    </Radio.Button>
                ))}
              </Radio.Group>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AppoinmentSchedule;
