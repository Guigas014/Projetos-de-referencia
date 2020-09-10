import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import Loading from './components/Loading';
import Axios from 'axios';

// Nesse projeto é usado o plugin JSON-SERVER para simular a API.

const URI = 'http://localhost:5000'

function App() {
  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState([
    // { id: 1, title: 'Wash my car', done: false },
    // { id: 2, title: 'Buy some milk', done: true },
  ])

  useEffect(getTodos, [])

  function getTodos() {
    return Axios
    .get(`${URI}/todos`)
    .then(res => setTodos(res.data))
    .catch(window.alert)
  }

  // marca a tarefa feita no checkbox
  // o método PUT altera todos os campos. O PATCH atualiza apenas um campo (done nesse caso)
  const toggleTodo = (selectedTodo) => {
    return Axios
      .patch(`${URI}/todos/${selectedTodo.id}`, {
        done: !selectedTodo.done
      })
      .then(getTodos)
      .catch(window.alert)

    // setTodos(todos.map(todo => {
    //   if (todo.id === selectedTodo.id) {
    //     return {
    //       ...todo,
    //       done: !selectedTodo.done
    //     }
    //   }
    //   return todo
    // }))
  }

  // adiciona uma tarefa na lista
  const addTodo = (newTodo) => {
    return Axios
      .post(`${URI}/todos`, {
        title: newTodo,
        done: false
      })
      .then(getTodos)
      .catch(window.alert)

    // setTodos([...todos, {
    //   id: todos.length + 1,
    //   title: newTodo,
    //   done: false
    // }])
  }

  // marca uma tarefa e espera o loading
  const handleToggle = async (selectedTodo) => {
    setLoading(true)
    await toggleTodo(selectedTodo)
    setLoading(false)
  }

  // adicona uma tarefa e espera o loading
  const handleAdd = async (newTodo) => {
    setLoading(true)
    await addTodo(newTodo)
    setLoading(false)
  }


  return (
    <div className="App">
      <Loading  status={loading} />
      <List
        items={todos}
        title="Todo list"
        onToggle={handleToggle}
        onAdd={handleAdd}
      />
    </div>
  );
}

export default App;
