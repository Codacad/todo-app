import React from "react";
import { useReducer } from "react";
import { TodoContext } from "./TodoContext";
import { todoReducer } from "./TodoContext";
const TodoContextProvider = ({ children }) => {
  const initialState = [];

  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
