// App.js manage application state and renders for the whole component
import { useEffect, useReducer } from 'react';
import Menu from './components/Menu';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import reducer from './services/reducer';
import { del, get, post, put } from './services/toDoServices';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'GET_TASKS_REQUEST' });
    get()
      .then(data => {
        dispatch({ type: 'GET_TASKS_SUCCESS', payload: data });
      })
      .catch(error => {
        dispatch({ type: 'GET_TASKS_FAILURE', payload: error.message });
      });
  }, []);

  const handleAddTask = task => {
    post(task)
      .then(data => {
        dispatch({ type: 'ADD_TASK_SUCCESS', payload: data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdateTask = (id, task) => {
    put(id, task)
      .then(data => {
        dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteTask = id => {
    del(id)
      .then(() => {
        dispatch({ type: 'DELETE_TASK_SUCCESS', payload: id });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Menu />
      {state.isLoading && <p>Loading...</p>}
      {state.error && <p>{state.error}</p>}
      {!state.isLoading && !state.error && (
        <>
          <TodoForm onAddTask={handleAddTask} />
          <TodoList tasks={state.tasks} onEdit={handleUpdateTask} onDelete={handleDeleteTask} />
        </>
      )}
    </div>
  );
}

export default App;
