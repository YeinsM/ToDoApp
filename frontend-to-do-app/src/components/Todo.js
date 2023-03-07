import React from "react";

const ToDoDetails = ({ toDo }) => {
  return (
    <div>
      <h2>{toDo.title}</h2>
      <p>Status: {toDo.completed ? "Completed" : "Pending"}</p>
    </div>
  );
};

export default ToDoDetails;
