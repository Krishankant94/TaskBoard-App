import React from 'react';
import './Task.css';
import MudraButton from '../ui/button/MudraButton';

const Task = ({ task, onEdit, onDelete, onFavorite }) => {
  return (
    <div className='task'>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Deadline: {task.deadline}</p>
      <div className='task-buttons'>
      <MudraButton color="secondary" variant="outlined" onClick={() => onEdit(task)}>Edit</MudraButton>
      <MudraButton color="secondary" variant="outlined" onClick={() => onDelete(task)}>Delete</MudraButton>
      <MudraButton color="success"variant="outlined" onClick={() => onFavorite(task)}>Favorite</MudraButton>
      </div>
    </div>
  );
};

export default Task;
