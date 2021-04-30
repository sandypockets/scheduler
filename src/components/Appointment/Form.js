import React, { useState } from 'react';

import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [currentName, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const [error, setError] = useState("");

  const reset = () => {
    setName("")
    setInterviewer(null)
    return
  }
  const cancel = () => {
    reset()
    props.onCancel()
  }


  
  function validate() {
    if (currentName === "") {
      setError("Student name cannot be blank");
      return;
    }
    // add validatetion to interviewer
    if (!interviewer) {
      setError('Interviewer name cannot be blank');
      return;
    }

    setError("");
    props.onSave(currentName, interviewer);
  }




  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={currentName}
            onChange={(event) => setName(event.target.value)}
            onSubmit={(e) => {e.preventDefault()}}
          />
        </form>

        <section className="appointment__validation">{error}</section>

        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}