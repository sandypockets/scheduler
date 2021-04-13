import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const { days } = props;

  const day = days.map((days, index) => {
    return (
        <DayListItem
        key={index}
        name={days.name}
        spots={days.spots}
        selected={days.name === props.day}
        setDay={props.setDay} 
      />
    )
  })

  return (
    <ul>
      {day}
    </ul>
  )
}