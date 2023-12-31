import React, { useState, useContext } from 'react';
import moment from 'moment';
import './task.css';

import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { CiHeart } from 'react-icons/ci';
import { FaHeart, FaEdit } from 'react-icons/fa';

function Task({ task, id }) {
  const [taskStatus, setTaskStatus] = useState(task.status || 'progress');
  const [editMode, setEditMode] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(task.title);
  const [isFavorite, setIsFavorite] = useState(task.favorite || false);
  const [searchInput, setSearchInput] = useState('');
  const { tasks, dispatch } = useContext(TaskContext);

  const handleRemove = (e) => {
    e.preventDefault();

    dispatch({
      type: 'REMOVE_TASK',
      id,
    });
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setTaskStatus(newStatus);

    dispatch({
      type: 'MARK_DONE',
      id,
      status: newStatus,
    });
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = () => {
    dispatch({
      type: 'EDIT_TASK',
      id,
      title: editedTaskTitle,
      status: taskStatus,
      favorite: isFavorite,
    });
    setEditMode(false);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const filterTasks = (task) => {
    const lowercasedInput = searchInput.toLowerCase();
    return lowercasedInput.trim() === '' || task.title.toLowerCase().includes(lowercasedInput);
  };
  
  const filteredTasks = tasks.filter(filterTasks);

  return (
    <>
      <input
        type="text"
        placeholder="Search tasks"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-input"
      />
      {editMode ? (
        <>
          <input
            type="text"
            value={editedTaskTitle}
            onChange={(e) => setEditedTaskTitle(e.target.value)}
            className="edit-input"
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          {filteredTasks.map((filteredTask) => (
            <div key={filteredTask.id} className="bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3">
              <div className="task-info text-slate-900 text-sm w-10/12">
                <h4 className="task-title text-lg capitalize">{filteredTask.title}</h4>
                <div className="italic opacity-60">
                  {filteredTask?.createdAt ? (
                    <p>{moment(filteredTask.createdAt).fromNow()}</p>
                  ) : (
                    <p>just now</p>
                  )}
                </div>
              </div>
              <div className="status-dropdown">
                <select
                  value={taskStatus}
                  onChange={handleStatusChange}
                  className="task-status-dropdown"
                >
                  <option value="progress">in-progress</option>
                  <option value="completed">Completed</option>
                  <option value="onHold">on-hold</option>
                </select>
              </div>

              <div className="remove-task flex gap-4 text-sm text-white">
                <button onClick={handleEditClick}><FaEdit className='text-black text-2xl' /></button>
                <DeleteIcon
                  style={{ fontSize: 30, cursor: 'pointer' }}
                  size="large"
                  onClick={handleRemove}
                  className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
                />
              </div>
              <div className="favorite-task text-sm text-white">
                <button onClick={handleToggleFavorite}>
                  {isFavorite ? <FaHeart className='text-black text-2xl' /> : <CiHeart className='text-red-600 text-3xl' />}
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Task;
