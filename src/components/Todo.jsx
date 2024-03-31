import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdDone, MdStar } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const Todo = ({ todo, dispatch }) => {
  let [isEdit, setIsEdit] = useState(false);
  let [editTitle, setEditTitle] = useState(todo.title);
  let [editDescription, setEditDescription] = useState(todo.description);
  let [isCompleted, setIsCompleted] = useState(false);
  let [isFavorite, setIsFavorite] = useState(false);
  let ms = todo?.createdAt;

  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Remove Todo
  const removeTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  // Save Editing
  const saveEditing = (todo) => {
    if (editTitle === "" || editDescription === "") {
      toast("Please fill the inputs...");
      return;
    }
    dispatch({ type: "SAVE_EDITING", payload: todo });
    console.log("Editing Todo from TODO", todo);
    setIsEdit(false);
  };

  // Cancel Editing
  const cancelEditing = (e) => {
    e.preventDefault();
    setIsEdit(false);
  };

  // Edit Todo
  const editTodo = () => {
    setIsEdit(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  // Mark Completed
  const markCompleted = (id) => {
    dispatch({ type: "COMPLETED", payload: id });
    setIsCompleted(!isCompleted);
  };

  // Add to Favorite
  const addToFavorite = (id) => {
    dispatch({ type: "ADD_FAVORITE", payload: id });
  };

  // Remove Completed
  const removeCompleted = (id) => {
    dispatch({ type: "REMOVE_COMPLETED", payload: id });
  };

  // Remove Favorite
  const removeFavorites = (id) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
  };

  const favorite = (id) => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      if (!newIsFavorite) {
        removeFavorites(id);
      } else {
        addToFavorite(id);
      }
      return newIsFavorite;
    });
  };

  // Complete
  const complete = (id) => {
    setIsCompleted((prevIsComplete) => {
      const newIsComplete = !prevIsComplete;
      if (!newIsComplete) {
        removeCompleted(id);
      } else {
        markCompleted(id);
      }
      return newIsComplete;
    });
  };
  return (
    <>
      <div className="todo relative border-b-[1px] last:border-none border-gray-300 p-4">
        <div className="flex items-center mb-4">
          <span
            className={`text-sm px-2 py-[1px] ${
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
                <MdIncompleteCircle className="mr-2 animate-spin" />{" "}
                <span>Pending</span>
              </span>
            )}
          </span>
          {todo?.favorite ? (
            <MdFavorite className="ml-2 text-red-500 cursor-pointer" />
          ) : (
            ""
          )}
          <div className="ml-auto flex gap-2 context-actions">
            <MdStar
              onClick={() => favorite(todo.id)}
              className={`${
                isFavorite ? "text-red-500" : "text-gray-700"
              } shadow-sm cursor-pointer`}
              size={20}
            />
            <MdDone
              onClick={() => complete(todo.id)}
              size={20}
              className={`${
                isCompleted ? "bg-green-500" : "bg-gray-700"
              } shadow-sm cursor-pointer p-1 rounded-full text-white`}
            />
          </div>
        </div>
        <h2 className="flex items-center text-gray-700 font-semibold mb-2">
          <span className={`${todo?.completed ? "line-through" : ""}`}>
            {todo.title}
          </span>
        </h2>
        <p className="text-sm text-gray-500">
          <span className={`${todo?.completed ? "line-through" : ""}`}>
            {todo.description}
          </span>
        </p>
        <div className="mt-2">
          {todo?.createdAt ? (
            <span className="text-sm text-gray-500 font-thin">{`${day}/${month}/${year}`}</span>
          ) : (
            ""
          )}
        </div>
        <div className="actions flex gap-2">
          <button
            className="bg-blue-600 flex items-center text-white py-1 hover:ring-2 ring-blue-500 px-2 mt-6 rounded-md text-sm"
            onClick={() => removeTodo(todo.id)}
          >
            <MdDelete className="mr-1" />
            <span>Delete</span>
          </button>
          {todo?.completed ? (
            ""
          ) : (
            <button
              onClick={() => editTodo()}
              className="bg-blue-600 flex items-center text-white py-1 hover:ring-2 ring-blue-500 px-2 mt-6 rounded-md text-sm"
            >
              <MdEdit className="mr-1" />
              <span>Edit</span>
            </button>
          )}
        </div>
        <div
          className={`edit-todo w-[100%] bg-white rounded-md ease-cubic transition-height duration-300 ${
            isEdit ? "h-[100%]" : "h-[0] scale-0"
          }`}
        >
          <div className="w-[100%] rounded-e-md mt-4 p-6 mx-auto flex flex-col gap-4 shadow-2xl">
            <h1 className="text-2xl text-gray-600 text-center">Edit Task</h1>
            <div className="group">
              <label for="title" class="block mb-2 text-sm font-medium">
                Title
              </label>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                type="text"
                id="title"
                className="bg-gray-50 border-[1px] focus:ring-2 outline-none ring-blue-500 border-gray-100 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
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
                className="bg-gray-50 border-[1px] focus:ring-2 outline-none ring-blue-500 border-gray-100 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                className="px-2 py-1 focus:scale-90 transition-transform duration-75 active:scale-95 rounded-md text-sm hover:ring-2 bg-blue-600 text-white hover:ring-blue-500"
              >
                Save
              </button>
              <button
                className="px-2 py-1 focus:scale-90 transition-transform duration-75 active:scale-95 text-white bg-blue-600 rounded-md text-sm hover:ring-2 hover:ring-blue-500"
                onClick={(e) => cancelEditing(e)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* <div className="context hidden">
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
            <li
              onClick={() => addToFavorite(todo.id)}
              className="p-2 text-sm hover:bg-gray-100 rounded-sm cursor-pointer"
            >
              <span className="flex items-center click-effect">
                <MdFavorite className="mr-1 text-red-500" />{" "}
                <span>Add to Favorite</span>
              </span>
            </li>
            <li
              onClick={() => markCompleted(todo.id)}
              className="p-2 text-sm hover:bg-gray-100 rounded-sm cursor-pointer"
            >
              <span className="flex items-center click-effect">
                {" "}
                <IoCheckmarkDoneCircle className="mr-1 text-green-500" />{" "}
                <span>Mark Completed</span>
              </span>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default Todo;
