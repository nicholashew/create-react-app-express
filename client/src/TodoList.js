import React from 'react';

const TodoList = ({ items }) => (
  <ul>
    {
      items.map((item, index) => {
        return (
          <li key={item.id}
            style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }}
          >
            {item.text}
          </li>
        )        
      })
    }
  </ul>
);

export default TodoList;