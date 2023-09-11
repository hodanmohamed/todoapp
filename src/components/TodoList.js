import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [count, setCount] = useState(0);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo, ...todos];

        setCount(count + 1);
        setTodos(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id);
        const removeCount = Math.max(count - 1, 0);

        let checkCompleted = todos.map(todo => {
            if (todo.id === id) {
                if (!todo.isComplete) {
                    setCount(removeCount);
                }
            }
        });
        setTodos(removeArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;

                const removeCount = Math.max(count - 1, 0);

                if (todo.isComplete) {
                    setCount(removeCount);;
                } else {
                    setCount(count + 1);
                }
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1>Daily Tasks</h1>
            <TodoForm onSubmit={addTodo} />
            <p>{count ? count + ' Pending Todos' : 'List of Todos'}</p>
            <div className='listing-todos'>
                <Todo
                    todos={todos}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo} />
            </div>
        </div>
    )
}

export default TodoList