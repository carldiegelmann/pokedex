import React from 'react';
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const CustomConfirmAlert = (removePokemon) => confirmAlert({
  customUI: ({onClose}) => {
    return (
      <div className='custom-ui'>
        <h1>Are you sure?</h1>
        <p>You want to delete this pokemon from your My Pokemon list?</p>
        <button className="btn btn-primary btn-sm mr-1" onClick={onClose}>No</button>
        <button className="btn btn-danger btn-sm"
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
