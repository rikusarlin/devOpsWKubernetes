import React from 'react'

const Todo = ({ todo}) => {

  return (
    <div className="todo" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      <span className="todoText">
        <li>{todo.text}</li>
      </span>
    </div>
  )
}

export default Todo
