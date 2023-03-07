// Redux... more efficiently state management for app
const reducer = (state, action) => {
    switch (action.type) {
      // Get state request
      case 'GET_TASKS_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      // Get success state
      case 'GET_TASKS_SUCCESS':
        return {
          ...state,
          isLoading: false,
          tasks: action.payload,
        };
      // Get error state
      case 'GET_TASKS_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      // Post success state
      case 'ADD_TASK_SUCCESS':
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
      // Edit success state
      case 'UPDATE_TASK_SUCCESS':
        const updatedTaskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
        if (updatedTaskIndex === -1) {
          return state;
        }
        const updatedTasks = [...state.tasks];
        updatedTasks.splice(updatedTaskIndex, 1, action.payload);
        return {
          ...state,
          tasks: updatedTasks,
        };
      // Delete success state
      case 'DELETE_TASK_SUCCESS':
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  