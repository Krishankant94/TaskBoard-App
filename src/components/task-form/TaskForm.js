import React from 'react';
import './TaskForm.css';
import useTaskForm from './useTaskForm';
import MudraButton from '../ui/button/MudraButton';
import MudraInput from '../ui/input/MudraInput';
import MudraDropDown from '../ui/dropdown/MudraDropDown';

const TaskForm = ({ onSubmit, onCancel, initialTask }) => {

  const statusItems = [
    {
      value: 'ToDo',
      label: 'TODO',
    },
    {
      value: 'In Progress',
      label: 'IN-PROGRESS',
    },
    {
      value: 'Done',
      label: 'DONE',
    }
  ];
  const {
    task,
    handleChange,
    handleSubmit
  } = useTaskForm(initialTask,onSubmit);
  
  return (
    <form className='task-form' onSubmit={handleSubmit}>
      
      <MudraInput inputProps={{
       "data-testid":"name-select",
    }}  label='Task Name' name='name' value={task.name} onChange={handleChange} />
      <MudraInput inputProps={{
        "data-testid": "desc-select",
    }} multiline label='Description' name="description" value={task.description} onChange={handleChange} />
      <MudraInput inputProps={{
        "data-testid": "deadline-select",
    }} type='date' helperText="select your deadline date"  name='deadline' value={task.deadline} onChange={handleChange} />
     
      {initialTask &&  <MudraDropDown inputProps={{
        "data-testid": "status-select",
    }}  name="column" label="Select Status" defaultValue="ToDo" menuItems={statusItems}  onChange={handleChange} />}
       <div className='btn-grp'> 
      <MudraButton type="submit">Save</MudraButton>
      <MudraButton variant="outlined" type="button" onClick={onCancel}>Cancel</MudraButton>
      </div>
    </form>
  );
};

export default TaskForm;
