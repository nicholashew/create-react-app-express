import React from 'react';

const AddTodo = ({ onSubmit }) => {
  let input

  return (
    <div className="todoapp-header">
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return;
        }
        onSubmit(input.value);
        input.value = '';
      }}>
        <input ref={node => input = node} 
          className="new-todo" 
          placeholder="What needs to be done?" 
        />
        <button type="submit" 
          className="add">
          +
        </button>
      </form>
    </div>
  );
};

export default AddTodo;

