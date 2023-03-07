import React from 'react';

// Long verification for tasks, delete for tasks

export const TodoList = ({ tasks, onEdit, onDelete }) => (
  <div>
    {tasks.length > 0 ? (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong>{task.title}</strong>
              <button onClick={() => onEdit(task.id)}>Editar</button>
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

export default TodoList;