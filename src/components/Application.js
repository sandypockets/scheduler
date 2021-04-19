import React from 'react';
import 'components/Application.scss';
import Appointment from 'components/Appointment';
import DayList from 'components/DayList';
import useApplicationData from '../hooks/useApplicationData';
import getAppointmentsForDay from '../helpers/selectors';
import getInterview from '../helpers/getInterview'
import getInterviewersForDay from '../helpers/getInterviewsForDay';
import { state, setDay, bookInterview, cancelInterview } from '../hooks/useApplicationData';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day)
  const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview} />
    )
  });

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {appointments}
        < Appointment key='last' time='5pm' />
      </section>
    </main>
  );
};