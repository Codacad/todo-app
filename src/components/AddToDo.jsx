import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowUp } from "react-icons/fa";

const AddToDo = ({ state, dispatch }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
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
    setDescription("")
  };
  return (
    <div className="addTodo w-[100%] mx-auto mt-8 p-2 shadow-2xl rounded-md max-md:mb-4 flex justify-between gap-4">
      <input
        className="focus:ring-2 caret-blue-500 w-full rounded-md px-4 py-1 focus:ring-blue-500 outline-none border-[1px] border-gray-300"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        placeholder="Enter Task Title..."
      />
       <input
        className="focus:ring-2 rounded-md px-4 py-1 w-full focus:ring-blue-500 outline-none border-[1px] border-gray-300"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Description..."
      />
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
  );
};

export default AddToDo;
