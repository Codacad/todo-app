import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
const Todo = ({ todo, dispatch }) => {
  let [isEdit, setIsEdit] = useState(false);
  let [editTitle, setEditTitle] = useState(todo.title);
  let [editDescription, setEditDescription] = useState(todo.description);
  let [toggleContextMenu, setToggleContextMenu] = useState(false);
  let ms = todo?.createdAt
  
  const date = new Date(ms)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const  year = date.getFullYear()
  
  //Referencing the title and description input fields within the component so that we
  const removeTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };
  const saveEditing = (todo) => {
    if (editTitle === "" || editDescription === "") {
      toast("Please fill the inputs...");
      return;
    }
    dispatch({ type: "SAVE_EDITING", payload: todo });
    console.log("Editing Todo from TODO", todo);
    setIsEdit(false);
  };
  const cancelEditing = (e) => {
    e.preventDefault();
    setIsEdit(false);
  };

  const editTodo = () => {
    setIsEdit(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const markCompleted = (id) => {
    dispatch({ type: "COMPLETED", payload: id });
    setToggleContextMenu(false);
  };
  const addToFavorite = (id) => {
    dispatch({type:"ADD_FAVORITE", payload:id})
    setToggleContextMenu(false)
  }
  return (
    <>
      <div className="todo relative border-[1px] border-gray-200 rounded-md p-4">
        <h2 className="text-2xl flex items-center text-gray-700 font-semibold mb-2">
          <span className={`${todo?.completed ? "line-through" : ""}`}>
            {todo.title}
          </span>
          <span
            className={`text-sm ml-4 px-2 py-[1px] ${
              todo?.completed
                ? "bg-green-100 text-green-600 border border-green-500"
                : "bg-yellow-100 border border-yellow-500 text-yellow-600"
            }  rounded-md`}
          >
            {todo?.completed ? (
              <span className="flex items-center">
                <MdDone className="bg-green-500 rounded-full text-md mr-2 p-1 text-white  leading-2" />{" "}
                Completed
              </span>
            ) : (
              <span className="flex items-center">
                <MdIncompleteCircle className="mr-2 animate-spin" /> <span>Pending</span>
              </span>
            )}
          </span>
          {todo?.favorite ? <MdFavorite className="ml-2 text-red-500 cursor-pointer"/> : ""}
            {todo?.createdAt ? <span className="text-sm text-gray-500 ml-4 font-thin">{`${day}/${month}/${year}`}</span> : ""}
        </h2>
        <p className="text-sm text-gray-500">
          <span className={`${todo?.completed ? "line-through" : ""}`}>
            {todo.description}
          </span>
        </p>
        <div className="actions flex gap-2">
          <button
            className="bg-red-300 py-1 hover:ring-2 text-red-600 ring-red-600 px-2 mt-6 rounded-md text-sm"
            onClick={() => removeTodo(todo.id)}
          >
            Delete
          </button>
          {todo?.completed ? (
            ""
          ) : (
            <button
              onClick={() => editTodo()}
              className="bg-purple-300 text-purple-600 py-1 hover:ring-2 ring-purple-600 px-2 mt-6 rounded-md text-sm"
            >
              Edit
            </button>
          )}
        </div>
        <div
          className={`edit-todo w-[100%] bg-transparent  ease-cubic transition-height duration-300 ${
            isEdit ? "h-[100%]" : "h-[0] scale-0"
          }`}
        >
          <div className="w-[100%] rounded-e-md p-6 mx-auto flex flex-col gap-4 shadow-2xl">
            <h1 className="text-2xl text-gray-600">Edit Task: </h1>
            <div className="group">
              <label for="title" class="block mb-2 text-sm font-medium">
                Title
              </label>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                type="text"
                id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="John"
                required
                autoFocus
              />
            </div>
            <div className="group">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                type="text"
                id="description"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="John"
                required
              />
            </div>

            <div className="editing-actions flex gap-1">
              <button
                onClick={(e) =>
                  saveEditing({
                    ...todo,
                    title: editTitle,
                    description: editDescription,
                  })
                }
                className="px-2 py-1 focus:scale-90 transition-transform duration-75 active:scale-95 text-green-700 bg-green-200 rounded-md text-sm hover:ring-2 hover:ring-green-500"
              >
                Save
              </button>
              <button
                className="px-2 py-1 focus:scale-90 transition-transform duration-75 active:scale-95 text-yellow-700 bg-yellow-200 rounded-md text-sm hover:ring-2 hover:ring-yellow-500"
                onClick={(e) => cancelEditing(e)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="context">
          <div
            onClick={() => setToggleContextMenu(!toggleContextMenu)}
            className="flex justify-center focus:scale-90 active:scale-90 hover:bg-[rgba(0,0,0,.05)] items-center  absolute top-5 w-8 h-8 rounded-full right-5"
          >
            <BsThreeDotsVertical
              size={20}
              className="text-gray-600 cursor-pointer"
            />
          </div>
          <ul
            className={`absolute context-menu shadow-2xl top-16 transition-all duration-200 flex flex-col rounded-md bg-white right-6 ${
              toggleContextMenu ? "h-auto" : "h-0 overflow-hidden"
            }`}
          >
            <li onClick={() => addToFavorite(todo.id)} className="p-2 text-sm hover:bg-gray-100 rounded-sm cursor-pointer">
              <span className="flex items-center click-effect">
                <MdFavorite className="mr-2" /> <span>Add to Favorite</span>
              </span>
            </li>
            <li
              onClick={() => markCompleted(todo.id)}
              className="p-2 text-sm hover:bg-gray-100 rounded-sm cursor-pointer"
            >
              <span className="flex items-center click-effect">
                {" "}
                <IoCheckmarkDoneCircle className="mr-2" />{" "}
                <span>Mark Completed</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;
