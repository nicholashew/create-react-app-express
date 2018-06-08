import React from 'react';

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <li key={todo.id}
      className={ todo.isCompleted ? 'completed' : '' }
    >
      <div>
        <input type="checkbox"
          className="toggle"
          onClick={() => {onToggle(todo.id)}}
          defaultChecked={todo.isCompleted}
        />
        <label>{todo.text}</label>
        <a tabIndex="0" className="destroy" onClick={() => {onRemove(todo.id)}}>×</a>
      </div>
    </li>
  );
};

export default TodoItem;