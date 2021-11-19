import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos }) => {
  return (
    <span>
      {todos.map(todo => {
        return (
          <Todo key={todo.id} todo={todo} />
        )
      })}
    </span>
  )
}

export default TodoList
