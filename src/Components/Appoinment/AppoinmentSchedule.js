import React, { useState, useEffect } from "react";
import { Radio } from "antd"

const AppoinmentSchedule = ({ date, service, doctor, setPickedSlot }) => {
  const [scheduleDayWithSlots, setScheduleDayWithSlots] = useState(null);

  useEffect(() => {
    console.log("getSetScheduleWithSlots")
    const getScheduleDayWithSlots = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          date: date
        }),
      };
      await fetch(`/api/Schedule/${doctor.id}`, requestOptions)
        .then((response) => response.json())
        .then(
          (data) => {
            console.log("Data: ", data);
            setScheduleDayWithSlots(data);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getScheduleDayWithSlots();
  });


  const OnSlotChange = (e) => {
    console.log(e.target.value);
    setPickedSlot(e.target.value);
  }

  return (
    <div>
      {scheduleDayWithSlots !== null && (
        <>
          <h3>Расписание на {scheduleDayWithSlots.scheduleDay.dayOfWeekString}</h3>
          {scheduleDayWithSlots.slots.length === 0 ? (
            <p>Нет доступных слотов на сегодня</p>
          ) : (
            <>
              <p>Доступные слоты:</p>
              <Radio.Group className="SlotGroup" buttonStyle="solid" size="large" onChange={OnSlotChange}>
                {scheduleDayWithSlots.slots.map(({startTime, endTime}) => (
                  <Radio.Button className="SlotButton" key={startTime} value={startTime} >
                    {startTime.split(":")[0]}:00 - {endTime.split(":")[0]}:00
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
