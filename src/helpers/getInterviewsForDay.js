export default function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(d => d.name === day);
  const dayInterviewers = filteredDay[0]
  if (dayInterviewers === undefined || dayInterviewers.length === 0) {
    console.log([])
    return []
  } else {
    const detailedInterviewers = dayInterviewers.interviewers.map(id => state.interviewers[id])
    console.log(detailedInterviewers)
    return detailedInterviewers
  }
}