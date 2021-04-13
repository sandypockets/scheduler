import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers } = props;
  const interviewer = interviewers.map((interviewers) => {
    return (
      <InterviewerListItem
        key={interviewers.id}
        name={interviewers.name}
        avatar={interviewers.avatar}
        selected={interviewers.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewers.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewer}</ul>
    </section>
  )
}