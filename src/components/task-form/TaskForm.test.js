import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import TaskForm from './TaskForm';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

const renderTaskForm = (initialTask) => {
  render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} initialTask={initialTask} />);
};

test('renders TaskForm with initial task data', () => {
  const initialTask = {
    name: 'Task 1',
    description: 'Description for Task 1',
    deadline: '2023-12-01',
    column: 'ToDo',
  };

  renderTaskForm(initialTask);

  expect(screen.getByTestId('name-select')).toHaveValue('Task 1');
  expect(screen.getByTestId('desc-select')).toHaveValue('Description for Task 1');
  expect(screen.getByTestId('deadline-select')).toHaveValue('2023-12-01');
  expect(screen.getByTestId('status-select')).toHaveValue('ToDo');
});

test('handles form submission with new task data', () => {
  renderTaskForm();

  fireEvent.change(screen.getByTestId('name-select'), { target: { value: 'New Task' } });
  fireEvent.change(screen.getByTestId('desc-select'), { target: { value: 'New Description' } });
  fireEvent.change(screen.getByTestId('deadline-select'), { target: { value: '2024-01-01' } });

  fireEvent.click(screen.getByText(/save/i));

  
  expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
    name: 'New Task',
    description: 'New Description',
    deadline: '2024-01-01'
  }));
});

test('handles form submission with editing task data', () => {
  const initialTask = {
    name: 'Task 1',
    description: 'Description for Task 1',
    deadline: '2023-12-01',
    column: 'ToDo',
  };

  renderTaskForm(initialTask);

  fireEvent.change(screen.getByTestId('name-select'), { target: { value: 'Edited Task' } });
  fireEvent.change(screen.getByTestId('desc-select'), { target: { value: 'Edited Description' } });
  fireEvent.change(screen.getByTestId('deadline-select'), { target: { value: '2024-02-01' } });
  fireEvent.change(screen.getByTestId('status-select'), { target: { value: 'Done' } });

  fireEvent.click(screen.getByText(/save/i));

  expect(mockOnSubmit).toHaveBeenCalledWith({
    name: 'Edited Task',
    description: 'Edited Description',
    deadline: '2024-02-01',
    column: 'Done',
  });
});

test('handles form cancellation', () => {
  renderTaskForm();

  fireEvent.click(screen.getByText(/cancel/i));

  expect(mockOnCancel).toHaveBeenCalled();
});
