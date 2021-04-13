import React from 'react';

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {


  return (
    // OnClick is not working - 
    <li className="interviewers__item"
        onClick={props.setInterviewer}
      >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}