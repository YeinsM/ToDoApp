import React, { useState, useEffect } from 'react';

export const TodoForm = ({ onSubmit, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onSubmit(task.id, { title, description, isCompleted: task.isCompleted });
    } else {
      onSubmit({ title, description, isCompleted: false });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Descripción:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">{task ? 'Actualizar tarea' : 'Agregar tarea'}</button>
    </form>
  );
};

export default TodoForm;