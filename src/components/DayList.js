import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  console.log("DayList 5 - ", props)
  const { days } = props;
  console.log("DayList 7 - ", days);

  const day = days.map((days, index) => {
    console.log("DayList 9 - ", days)
    return (
        <DayListItem
        key={index}
        name={days.name}
        spots={days.spots}
        selected={days.name === props.day}
        setDay={props.setDay}
      />
    )
  });

  return (
    <ul>
      {day}
    </ul>
  )
}