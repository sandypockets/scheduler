import React from 'react';
import Confirm from './Confirm';
import Empty from '../Appointment/Empty';
import Error from './Error';
import Form from '../Appointment/Form';
import Header from '../Appointment/Header';
import Show from '../Appointment/Show';
import Status from '../Appointment/Status';
import useVisualMode from '../../hooks/useVisualMode';
import 'components/Appointment/styles.scss';


export default function Appointment(props) {
  console.log('Line 15', props);
  console.log('Line 16', props.bookInterview);

  const SHOW = 'SHOW';
  const EMPTY = 'EMPTY';

  const CREATE = 'CREATE';
  const SAVING = 'SAVING';

  const CONFIRM = 'CONFIRM';
  const DELETE = 'DELETE';
  const EDIT = 'EDIT';

  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, create) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview, create)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  };

  function deleting() {
    transition(CONFIRM)
  };
  function confirmDelete() {
    transition(DELETE, true)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  };

  function editing() {
    transition(EDIT);
  };

  function closeError() {
    back()
  };

console.log("LINE 64 ------", props)
return (
    <article className='appointment' data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty alt='Add' onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (<Form
        onCancel={() => back()}
        interviewers={props.interviewers}
        onSave={save}
      />)}
      {mode === EDIT && <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onCancel={() => back()}
        interviewers={props.interviewers}
        onSave={save}
      />}
      {mode === SAVING && <Status message='Saving...' />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer}
          onDelete={deleting}
          onEdit={editing}
        />
      )}
      {mode === CONFIRM && <Confirm onCancel={() => transition(SHOW)} onConfirm={() => transition(confirmDelete)} message='Are you sure you want to delete your appointment?' />}
      {mode === DELETE && <Status message='Cancelling...' />}
      {mode === ERROR_SAVE && <Error message='Your appointment was not saved.' onClose={closeError} />}
      {mode === ERROR_DELETE && <Error message='Your appointment was not deleted.' onClose={closeError} />}
    </article>
  )
};