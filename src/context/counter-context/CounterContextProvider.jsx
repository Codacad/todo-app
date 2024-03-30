import React from "react";
import { CounterContext } from "./counterContext";
import { useReducer } from "react";
import { reducer } from "./counterContext";
const CounterContextProvider = ({ children }) => {
  const initialState = {
    count: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export default CounterContextProvider;
