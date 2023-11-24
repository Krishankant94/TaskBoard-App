import React from 'react';
import TaskForm from '../task-form/TaskForm';
import Task from '../task/Task';
import './TaskBoard.css';
import useTaskBoard from './useTaskBoard';
import Container from '@mui/material/Container';
import MudraButton from '../ui/button/MudraButton';
const STORAGE_KEY = 'task-board-key';
const initialTasks =JSON.parse(localStorage.getItem(STORAGE_KEY))||[{ name: '', description: '', deadline: '', column: 'ToDo',id:123 }]; 
const TaskBoard = () => {
  const {
    columns,
    selectedTask,
    isAddTask,
    addTask,
    deleteTask,
    onFavorite,
    moveTask,
    openTaskForm,
    closeTaskForm,
    addNewTask,
    editTask,
  } = useTaskBoard(initialTasks,STORAGE_KEY)

  return (
    <div>
      <MudraButton onClick={addNewTask}>Add </MudraButton>
      {/* Render task board columns */}
      <div className='task-board'>
      {Object.entries(columns).map(([columnName, columnTasks]) => (
        <div className='column' key={columnName}>
          <h2>{columnName}</h2>
          {/* Render tasks in the column */}
          {columnTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={openTaskForm}
              onDelete={deleteTask}
              onFavorite={onFavorite}
              onMove={(newColumn) => moveTask(task, newColumn)}
            />
          ))}
        </div>
      ))}
    {/* Render form for adding/editing tasks */}
    {(isAddTask || selectedTask) && (
        <Container maxWidth="sm">
            <TaskForm
              onSubmit={isAddTask ? addTask : editTask }
              onCancel={closeTaskForm}
              initialTask={isAddTask ?null:selectedTask}
            />
            </Container>
          )} 
    </div>
    </div>
  );
};

export default TaskBoard;
