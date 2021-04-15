import React, { useState, useEffect } from "react";
import axios from 'axios'
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import getAppointmentsForDay from "../helpers/selectors";
import getInterview from "../helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });



  useEffect(() => {
    const daysUrl = `/api/days`;
    const appointmentsUrl = `/api/appointments`;
    const interviewersUrl = `/api/interviewers`;
    const promiseDays = axios.get(daysUrl);
    const promiseAppointments = axios.get(appointmentsUrl);
    const promiseInterviewers = axios.get(interviewersUrl);
    Promise.all([
      promiseDays,
      promiseAppointments,
      promiseInterviewers
    ]).then((all) => {
        console.log("90 - All: ", all[2].data)
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviers: all[2].data}))
    })
  }, []);

  const app = getAppointmentsForDay(state, state.day).map((apt) => {
    return (
      <Appointment key={apt.id} {...apt} />
    )
  })

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {app}
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};