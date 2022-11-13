import React from 'react';
import { Todo } from '../todo.model';

interface TodoListProps {
	items: Todo[];
}

const TodoList: React.FC<TodoListProps> = (props) => {
	return (
		<ul>
			{props.items.map((todo) => (
				<li key={todo.id}>{todo.text}</li>
			))}
		</ul>
	);
};

export default TodoList;
