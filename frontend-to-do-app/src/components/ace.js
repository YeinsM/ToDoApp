import React from 'react';

export const TodoList = ({ tasks, onEdit, onDelete }) => {
  const handleEdit = (task) => {
    onEdit(task);
  };

  return (
    <div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div>
                <strong>{task.title}</strong>
                <button onClick={() => handleEdit(task)}>Editar</button>
                <button onClick={() => onDelete(task.id)}>Eliminar</button>
              </div>
              <div>{task.description}</div>
              <div>{task.isCompleted ? 'Completada' : 'Pendiente'}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay tareas</p>
      )}
    </div>
  );
};

export default TodoList;
