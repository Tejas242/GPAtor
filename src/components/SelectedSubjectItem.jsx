import React from "react";

const SelectedSubjectItem = ({ subject, onRemove }) => {
  return (
    <li className="selected-subject-item">
      {subject.name} - {subject.grade}
      <button className="remove-button" onClick={() => onRemove(subject)}>
        Remove
      </button>
    </li>
  );
};

export default SelectedSubjectItem;
