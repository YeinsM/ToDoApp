import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoApp from "./TodoApp";

function App() {
  return (
    <TodoApp>
      <TodoForm />
      <TodoList />
    </TodoApp>
  );
}

export default App;
