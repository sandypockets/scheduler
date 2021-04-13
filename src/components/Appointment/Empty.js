import React from 'react';

export default function Empty(props) {

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        // Need to add onAdd:Function to be called when the user clicks the Add button
        onClick={props.onAdd}
      />
    </main>
  )
}