import { useEffect, useState } from 'react'
import uniqid from 'uniqid';
function useTaskForm(initialTask,onSubmit) {
    const [task, setTask] = useState(initialTask || { name: '', description: '', deadline: '', column: 'ToDo' });

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask])

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(!initialTask ? { ...task, id: uniqid() } : task);
  };
  return {
    task,
    handleChange,
    handleSubmit
  }
}

export default useTaskForm