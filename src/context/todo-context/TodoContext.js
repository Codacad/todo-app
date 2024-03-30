import { createContext } from "react";

export const todoReducer = (state, action) => {
  // Add todo
  const addTodo = () => {
    return [...state, action.payload];
  };

  // Remove Todo
  const removeTodo = () => {
    return state.filter((todo) => todo.id !== action.payload);
  };

  // Edit Todo
  const saveEditing = () => {
    const updatedState = state.map((todo) => {
      return todo.id === action.payload.id ? action.payload : todo;
    });
    return updatedState;
  };

  // Cancel Edit
  const cancelEditing = () => {
    console.log("Cancel Editing");
  };

  const addToFavorite = () => {
    const updatedState = state.map((todo) =>
      todo.id === action.payload ? { ...todo, favorite: true } : todo
    );
    return updatedState
  };

  const completed = () => {
    let newState = state.map((todo) =>
      todo.id === action.payload ? { ...todo, completed: true } : todo
    );
    return newState;
  };

  const actionHandler = {
    ADD_TODO: addTodo,
    REMOVE_TODO: removeTodo,
    CANCEL_EDITING: cancelEditing,
    SAVE_EDITING: saveEditing,
    ADD_FAVORITE: addToFavorite,
    COMPLETED: completed,
  };

  if (actionHandler[action.type]) {
    return actionHandler[action.type]();
  }

  return state;
};

export const TodoContext = createContext();
