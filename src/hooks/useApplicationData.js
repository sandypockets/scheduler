import React, { useState } from 'react';
import 'components/Application.scss';
import axios from 'axios';

export default function useApplicationData() {
  const confirmDay = (id) => {
    let dayId = null;
    for (const dayObj of state.days) {
      if (dayObj.appointments.includes(id)) {
        dayId = dayObj.id;
      }
    }
    return dayId;
  }

  let [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  React.useEffect(() => {
    const promiseDay = axios.get(`/api/days`);
    const promiseAppointment = axios.get(`api/appointments`);
    const promiseInterviewer = axios.get(`api/interviewers`)
    const promises = [promiseDay, promiseAppointment, promiseInterviewer];

    Promise.all(promises)
      .then((all) => {
        //console.log(all[2].data)
        console.log(all[2])
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview, create = false) {
    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => {
        const newInterview = { ...interview }
        const appointment = {
          ...state.appointments[id],
          interview: { ...newInterview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = state.days.map(day => {
          return (create ? day.id === confirmDay(id) ? { ...day, spots: day.spots - 1 } : { ...day } : { ...day })
        })
        setState({
          ...state,
          days,
          appointments
        });
      });
  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(resp => {
        const interview = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: interview
        };
        const days = state.days.map(day => {
          return (day.id === confirmDay(id) ? { ...day, spots: day.spots + 1 } : { ...day })
        });
      })
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
};