import { Alert, AlertTitle, Container } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList, reset } from "./components/TodoList";
import reducer from "./services/reducer";
import { del, get, post, put } from "./services/toDoServices";

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedTask, setSelectedTask] = useState(null);

  const getTasks = () => {
    dispatch({ type: "GET_TASKS_REQUEST" });
    get()
      .then((data) => {
        dispatch({ type: "GET_TASKS_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "GET_TASKS_FAILURE", payload: error.message });
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleAddTask = async (task) => {
    post(task)
      .then((data) => {
        dispatch({ type: "ADD_TASK_SUCCESS", payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateTask = (id, task) => {
    put(id, task)
      .then((data) => {
        dispatch({ type: "UPDATE_TASK_SUCCESS", payload: data });
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteTask = (id) => {
    del(id)
      .then(() => {
        dispatch({ type: "DELETE_TASK_SUCCESS", payload: id });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditTask = (id) => {
    setSelectedTask(state.tasks.find((task) => task.id === id));
    window.scrollTo(0, 0);
  };

  const handleCancelEdit = () => {
    setSelectedTask(null);
  };

  return (
    <Container maxWidth="md">
      <TodoForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onCancelEdit={handleCancelEdit}
        selectedTask={selectedTask}
      />
      {state.isLoading && (
        <Alert severity="info">
          <AlertTitle>Loading</AlertTitle>
          Loading <strong>all tasks!</strong>
        </Alert>
      )}
      {state.error && <p>{state.error}</p>}
      {!state.isLoading && !state.error && (
        <TodoList
          tasks={state.tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </Container>
  );
};

export default TodoApp;
