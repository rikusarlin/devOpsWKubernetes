import React, { useEffect, useState } from 'react'
import axios from '../util/apiClient'

import TodoList from './TodoList'
import Form from './Form'

const TodoView = () => {
  const [todos, setTodos] = useState([])

  const backgroundImageUrl = window.location.href + 'background'

  const refreshTodos = async () => {
    const { data } = await axios.get('/todos')
    setTodos(data)
  }

  useEffect(() => {
    refreshTodos();
  }, [])

  const createTodo = async (todo) => {
    const { data } = await axios.post('/todos', todo)
    setTodos([...todos, data])
  }

  return (
    <>
      <h1>Todos</h1>
      <img src={backgroundImageUrl}  alt="Nice picture" />
      <Form createTodo={createTodo} />
      <TodoList todos={todos} />
    </>
  )
}

export default TodoView
