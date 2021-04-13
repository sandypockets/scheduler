import React from 'react';
import "../Appointment/styles.scss";

export default function Appointment(props) {

  return (
    <article
      className="appointment"
      time={props.time}
      >
    </article>
  )
}