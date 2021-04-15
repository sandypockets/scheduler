export default function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(elem => day === elem.name);
  if (state.days.length === 0 || filteredDays === undefined) {
    return [];
  }
  return filteredDays.appointments.map(id => state.appointments[id]);
};