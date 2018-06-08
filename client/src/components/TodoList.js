import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({todos, onToggle, onRemove }) => {
  const todoNode = todos.map((todo) => {
    return (
      <TodoItem 
        todo={todo} 
        key={todo.id} 
        onToggle={onToggle} 
        onRemove={onRemove}
      />
    )
  });
  
  return (
    <div className="todoapp-main">
      <ul className="todo-list">{todoNode}</ul>
    </div>
  );
}

export default TodoList;