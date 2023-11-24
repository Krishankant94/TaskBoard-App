import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Task from './Task';

test('renders task details', () => {
  const task = {
    name: 'Task 1',
    description: 'Description for Task 1',
    deadline: '2023-12-01',
  };

  const { getByText } = render(<Task task={task} />);
  
  expect(getByText('Task 1')).toBeInTheDocument();
  expect(getByText('Description for Task 1')).toBeInTheDocument();
  expect(getByText('Deadline: 2023-12-01')).toBeInTheDocument();
});
