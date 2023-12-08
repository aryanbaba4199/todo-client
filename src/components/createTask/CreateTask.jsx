import React, { useState } from "react";
import { useContext } from "react";
import TaskContext from "../../context/TaskContext";
import TokenContext from "../../context/TokenContext";
import axios from "../../Axios/axios.js";
import { FaPlusSquare } from "react-icons/fa";
import "./createTask.css";
function CreateTask() {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  // const [toast, setToast] = useState();
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/task/addTask",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      //setToast(res.data)
      // showToast();
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: "ADD_TASK",
      title,
      description,
    });
    setTitle("");
    setDescription("");
  };

  // const showToast = () => {
  //     const toast = document.getElementById('toast');
  //     toast.style.display = "block"
  //     setTimeout(hideToast,2000)
  // }
  // const hideToast = () => {
  //     const toast = document.getElementById('toast');
  //     toast.style.display = "none"
  // }
  return (
    <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center">
      <div className="w-11/12">
        <form onSubmit={handleAdd} className="flex flex-col">
          <h2 className="text-center font-semibold text-3xl">TODOER</h2>
          <div className="flex w-full justify-center gap">
            <div className="w-full">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className=" bg-black rounded-md text-white px-5 py-1 "
              >
                <FaPlusSquare />
              </button>
            </div>
          </div>
        </form>
        <div
          className="toast bg-green-600 text-white p-3 rounded-xl shadow-2xl text-center absolute bottom-4 left-1/2 -translate-x-1/2"
          id="toast"
        >
          <p>This is test</p>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
