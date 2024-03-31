import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowUp } from "react-icons/fa";

const AddToDo = ({ state, dispatch }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addTask = (todo) => {
    if (!title || !description) {
      toast.error("Please fill all fields!", {
        className: "bg-red-500",
      });
      return;
    }
    dispatch({ type: "ADD_TODO", payload: todo });
    toast.success("Task Added Successfully...");
    setTitle("");
    setDescription("");
  };
  return (
    <div className="addTodo sticky bottom-0 md:w-[50%] w-[100%] mx-auto mt-8 bg-gray-200 p-2 shadow-2xl rounded-md max-md:mb-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mt-4 text-gray-500">
          Add Task
        </h1>
        <button
          onClick={() =>
            addTask({
              id: state.length,
              title,
              description,
              completed: false,
              favorite: false,
              createdAt: new Date().getTime(),
            })
          }
          className="w-8 h-8 ml-auto bg-blue-500 px-2 py-2 focus:scale-95 active:scale-90 text-white rounded-full"
        >
          <FaArrowUp />
        </button>
      </div>
      <input
        className="focus:ring-2 rounded-md px-4 py-1 focus:ring-blue-500 outline-none border-[1px] border-gray-300"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        placeholder="Enter Task Title..."
      />
      <input
        className="focus:ring-2 rounded-md px-4 py-1 focus:ring-blue-500 outline-none border-[1px] border-gray-300"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Description..."
      />
    </div>
  );
};

export default AddToDo;
