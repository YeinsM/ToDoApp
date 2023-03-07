import { useState } from "react";

export const TodoForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      return;
    }
    const newTask = {
      title,
      description,
      isCompleted,
    };
    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setIsCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
      </label>
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;
