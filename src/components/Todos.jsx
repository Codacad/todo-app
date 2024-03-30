import React, { useContext, useState } from "react";
import Todo from "./Todo";
import toast from "react-hot-toast";
import { TodoContext } from "../context/todo-context/TodoContext";
import AddToDo from "./AddToDo";
const Todos = () => {
  const { state, dispatch } = useContext(TodoContext);

  return (
    <>
      <div className="todo-app md:p-8 p-2 rounded-md md:grid grid-cols-12 gap-4 bg-glass md:w-[70%] w-[100%] mx-auto">
        <AddToDo state={state} dispatch={dispatch} />
        <div className="todos w-[100%] min-h-[100vh] col-span-9">
          {state.length > 0 ? (
            <div className="flex flex-col gap-2">
              {state &&
                state.map((todo) => (
                  <Todo key={todo.id} todo={todo} dispatch={dispatch} />
                ))}
            </div>
          ) : (
            <div className="ex justify-start p-8 text-gray-500 border-gray-400 rounded-md bg-gray-200 border-[1px]">
              <p>No tasks added yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Todos;
