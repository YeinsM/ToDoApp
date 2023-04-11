import { Alert, AlertTitle, AppBar, Toolbar, Typography } from "@mui/material";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import reducer from "./services/reducer";
import { del, get, post, put } from "./services/toDoServices";
import { CenteredContainer } from "./utils/customContainer";
import { MenuButton } from "./components/MenuButton";

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedTask, setSelectedTask] = useState(null);

  const tasksMap = useMemo(() => new Map(state.tasks.map(task => [task.id, task])), [state.tasks]);

  const todoListRef = useRef(null);
  const todoFormRef = useRef(null);

  const scrollToTodoList = () =>
    todoListRef.current.scrollIntoView({ behavior: "smooth" });

  const scrollToTodoForm = () =>
    todoFormRef.current.scrollIntoView({ behavior: "smooth" });

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
        scrollToTodoList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateTask = (id, task) => {
    put(id, task)
      .then((data) => {
        dispatch({ type: "UPDATE_TASK_SUCCESS", payload: data });
        scrollToTodoList();
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
    const taskToEdit = tasksMap.get(id);
    setSelectedTask(taskToEdit);
    scrollToTodoForm();
  };

  const handleCancelEdit = () => {
    setSelectedTask(null);
  };

  useEffect(() => {
    if (state.tasks.length > 0) {
      scrollToTodoList();
    }
  }, [state.tasks]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <MenuButton
            scrollToTodoForm={scrollToTodoForm}
            scrollToTodoList={scrollToTodoList}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            fontFamily="GalaxyFont"
          >
            Menu
          </Typography>
        </Toolbar>
      </AppBar>

      <CenteredContainer background={"#581845"} refComponent={todoFormRef}>
        <TodoForm
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onCancelEdit={handleCancelEdit}
          selectedTask={selectedTask}
        />
      </CenteredContainer>
      {state.isLoading && (
        <Alert severity="info">
          <AlertTitle>Loading</AlertTitle>
          Loading <strong>all tasks!</strong>
        </Alert>
      )}
      {state.error && <p>{state.error}</p>}
      {!state.isLoading && !state.error && (
        <CenteredContainer background={"#900C3F"} refComponent={todoListRef}>
          <TodoList
            tasks={state.tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </CenteredContainer>
      )}
    </>
  );
};

export default TodoApp;
