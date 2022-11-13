import React, { useState } from 'react';

import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import { Todo } from './todo.model';

const App: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const todoAddHandler = (todoText: string) => {
		setTodos((prevTodos) => [
			...prevTodos,
			{ id: Math.random().toString(), text: todoText },
		]);
	};

	const todoDeleteHandler = (todoId: string) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
	};

	return (
		<div className="App">
			<NewTodo onAddTodo={todoAddHandler} />
			<TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
		</div>
	);
};

export default App;
