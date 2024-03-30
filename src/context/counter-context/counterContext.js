import { createContext } from "react";

export const reducer = (state, action) => {
  const actionHandlers = {
    increment: () => ({ ...state, count: state.count + 1 }),
    decrement: () => ({ ...state, count: state.count - 1 }),
    reset: () => ({ ...state, count: 0 }),
  };

  if(actionHandlers[action.type]){
    return actionHandlers[action.type]();
  }

  return state
};

export const CounterContext = createContext();
