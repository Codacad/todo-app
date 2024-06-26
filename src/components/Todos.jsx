import React, { useContext, useState } from "react";
import Todo from "./Todo";
import toast from "react-hot-toast";
import { TodoContext } from "../context/todo-context/TodoContext";
import AddToDo from "./AddToDo";
import { FcTodoList } from "react-icons/fc"
const Todos = () => {
  const { state, dispatch } = useContext(TodoContext);
  return (
    <>
      <div className="todo-app p-2 rounded-md md:w-[70%] w-[100%] max-h[100vh] mx-auto">
        <div className="todos w-[100%] h-auto">
          {state.length > 0 ? (
            <div className="flex flex-col gap-2">
              {state &&
                state.map((todo) => (
                  <Todo key={todo.id} todo={todo} dispatch={dispatch} />
                ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center p-8 text-gray-500 border-gray-400 rounded-md bg-gray-100 border-[1px]">
              <p className="md:text-4xl text-md text-yellow-700 text-center">No todos added yet! Start by adding one now.</p>
              <FcTodoList size={300} className="mt-8"/>
            </div>
          )}
        </div>
        <AddToDo state={state} dispatch={dispatch} />
      </div>
    </>
  );
};

export default Todos;
