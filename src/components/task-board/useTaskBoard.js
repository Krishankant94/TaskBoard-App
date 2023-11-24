import { useState } from 'react'

function useTaskBoard(initialTasks,STORAGE_KEY) {
    const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState({
    'ToDo': initialTasks.filter(task => task.column === 'ToDo'),
    'In Progress': initialTasks.filter(task => task.column === 'In Progress'),
    'Done': initialTasks.filter(task => task.column === 'Done'),
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddTask,setAddTask] = useState(false);
  
  const persistData = (data) => {
    //save data to localstorage
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
    setTasks(data);
  }

  const addTask = (newTask) => {
    persistData([...tasks, newTask]);
    setColumns({ ...columns, 'ToDo': [...columns['ToDo'], newTask] });
    setSelectedTask(null);
    setAddTask(false);
  };

  const editTask = (editedTask) => {
    // Implement task editing logic
    const updatedTasks = tasks.map((task) => (task.id === editedTask.id ? editedTask : task));
    persistData(updatedTasks);

    const updatedColumns = { ...columns };
    // Update the column of the edited task if it moved
    Object.entries(updatedColumns).forEach(([columnName, columnTasks]) => {
      updatedColumns[columnName] = columnTasks.filter((task) => task.id !== editedTask.id);
    });
    updatedColumns[editedTask.column].push(editedTask);

    setColumns(updatedColumns);
    setSelectedTask(null);
  };

  const deleteTask = (deletedTask) => {
    // Implement task deletion logic
    const updatedTasks = tasks.filter((task) => task.id !== deletedTask.id);
    persistData(updatedTasks);

    const updatedColumns = { ...columns };
    // Remove the task from its column
    Object.entries(updatedColumns).forEach(([columnName, columnTasks]) => {
      updatedColumns[columnName] = columnTasks.filter((task) => task.id !== deletedTask.id);
    });

    setColumns(updatedColumns);
    setSelectedTask(null);
  };

  const onFavorite = (favoritedTask) => {
    // Implement favoriting logic
    const updatedTasks = tasks.map((task) =>
      task.name === favoritedTask.name ? { ...task, favorite: !task.favorite } : task
    );
    persistData(updatedTasks);
  };

  const moveTask = (task, newColumn) => {
    // Implement task moving logic
    const updatedColumns = { ...columns };
    updatedColumns[task.column] = updatedColumns[task.column].filter(
      (t) => t.name !== task.name
    );
    updatedColumns[newColumn].push({ ...task, column: newColumn });
    setColumns(updatedColumns);
  };

  const openTaskForm = (task) => {
    setSelectedTask(task);
    setAddTask(false);
  };

  const closeTaskForm = () => {
    setSelectedTask(null);
    setAddTask(false);
  };

  const addNewTask =()=>setAddTask(true);
  return {
    tasks,
    columns,
    selectedTask,
    isAddTask,
    addTask,
    deleteTask,
    onFavorite,
    moveTask,
    openTaskForm,
    closeTaskForm,
    editTask,
    addNewTask,
  }
}

export default useTaskBoard