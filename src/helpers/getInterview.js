export default function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerData = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerData
  }
};