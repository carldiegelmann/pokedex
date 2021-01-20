import React, {useContext} from 'react';
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const CustomConfirmAlert = (removePokemon) => confirmAlert({
  customUI: ({onClose}) => {
    return (
      <div className='custom-ui'>
        <h1>Are you sure?</h1>
        <p>You want to delete this pokemon from your My Pokemon list?</p>
        <button onClick={onClose}>No</button>
        <button
          onClick={() => {
            removePokemon();
            onClose();
          }}
        >
          Yes, Delete it!
          </button>
      </div>
    );
  }
});

export default CustomConfirmAlert;
