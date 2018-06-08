import React from 'react';
import VisibilityFilters from '../actions/VisibilityFilters';

const TodoFooter = ({ count, visibilityFilter }) => {  
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> items left
      </span>
      <ul className="filters">
        <li>
          <a 
            href="#/"
            className={visibilityFilter === VisibilityFilters.SHOW_ALL ? 'selected': ''}>
              All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={visibilityFilter === VisibilityFilters.SHOW_ACTIVE ? 'selected': ''}>
              Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={visibilityFilter === VisibilityFilters.SHOW_COMPLETED ? 'selected': ''}>
              Completed
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default TodoFooter;