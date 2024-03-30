import React, {useState} from "react";
import toast from "react-hot-toast";

const AddToDo = ({state, dispatch}) => {
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
    <div className="addTodo max-md:mb-4 flex flex-col gap-4 col-span-3 lg:sticky top-0">
     
      <input
        className="focus:ring-2 rounded-md px-4 py-1 focus:ring-purple-500 outline-none border-2 border-gray-300"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <input
        className="focus:ring-2 rounded-md px-4 py-1 focus:ring-purple-500 outline-none border-2 border-gray-300"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={() =>
          addTask({
            id: state.length,
            title,
            description,
            completed: false,
            favorite:false,
            createdAt: new Date().getTime(),
          })
        }
        className="bg-purple-800 px-2 py-2 focus:scale-95 active:scale-90 text-white rounded-md"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddToDo;