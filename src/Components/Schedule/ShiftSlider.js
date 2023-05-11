import React from "react";
import { Slider } from "antd";

const ShiftSlider = ({day, onShiftChange }) => {

    const formatter = (value) => `${value}:00`;


  const handleShiftSliderChange = (value) => {
    if (value[1] - value[0] < 8)
        {
          if (value[1] + 8 <= 21)
            value[1] = value[0] + 8; 
          else
            value[0] = value[1] - 8;
        }
    onShiftChange(day.id, value[0], value[1]);
  };

  return (
    <Slider  className="ScheduleSlider" tooltip={{
        formatter,

   }}
   marks={{
    6: '6:00',
    7: '7:00',
    8: '8:00',
    9: '9:00',
    10: '10:00',
    11: '11:00',
    12: '12:00',
    13: '13:00',
    14: '14:00',
    15: '15:00',
    16: '16:00',
    17: '17:00',
    18: '18:00',
    19: '19:00',
    20: '20:00',
    21: '21:00',
    22: '22:00',
  }}    
   range value={[day.start, day.end]} min={6} max={22} onChange={handleShiftSliderChange} />
  );
};

export default ShiftSlider;
