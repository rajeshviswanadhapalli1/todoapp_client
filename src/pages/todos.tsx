import React, { useState, useEffect } from 'react';
import axios from 'axios';
interface Todo {
    _id: string;
    text: string;
    completed: boolean;
  }
  
const Todos: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    useEffect(() => {
        fetchTodos();
      }, []);
    const fetchTodos = async () => {
        try {
          const response = await axios.get('http://localhost:8000/todos/'); // Change the URL to your backend API
          setTodos(response.data);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      };
      const addTodo = async () => {
        if (newTodo) {
          try {
            const response = await axios.post('http://localhost:8000/todos/', { text: newTodo }); // Change the URL to your backend API
            setTodos([...todos, response.data]);
            setNewTodo('');
          } catch (error) {
            console.error('Error adding todo:', error);
          }
        }
      };
      const deleteTodo = async (id: string) => {
        try {
          await axios.delete(`http://localhost:8000/todos/${id}`); // Change the URL to your backend API
          const updatedTodos = todos.filter(todo => todo._id !== id);
          setTodos(updatedTodos);
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      };
      const updateTodo = async (id: string, newText: string) => {
        try {
          await axios.put(`http://localhost:8000/todos/${id}`, { text: newText }); // Change the URL to your backend API
          const updatedTodos = todos.map(todo =>
            todo._id === id ? { ...todo, text: newText } : todo
          );
          setTodos(updatedTodos);
        } catch (error) {
          console.error('Error updating todo:', error);
        }
      };
return(
    <div className="app-container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a todo"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <input
              type="text"
              value={todo.text}
              onChange={e => updateTodo(todo._id, e.target.value)}
            />
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
)  
}


export default Todos