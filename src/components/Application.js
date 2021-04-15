import React, { useState, useEffect } from "react";
import axios from 'axios'
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import getAppointmentsForDay from "../helpers/selectors"


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
        console.log("90 - All: ", all)
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviers: all[2].data}))
    })
  }, []);

  const app = getAppointmentsForDay(state, state.day).map((apt) => {
    return (
      <Appointment key={apt.id} {...apt} />
    )
  })

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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};