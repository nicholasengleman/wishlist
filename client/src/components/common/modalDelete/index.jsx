import React from 'react';

const ModalDelete = ({ onCancel, onConfirm, status, headerText, bodyText }) => {
  if (status.modalDelete === true) {
    return (
      <div className="modal modal-small modal-delete">
        <div className="header">
          <span>{headerText}</span>
        </div>
        <div className="body">{bodyText || 'Are you sure?'}</div>
        <div className="footer">
          <button onClick={() => onCancel()} type="button">
            Cancel
          </button>
          <button onClick={() => onConfirm()} type="button">
            Delete
          </button>
        </div>
      </div>
    );
  }
  return null;
};

export default ModalDelete;
