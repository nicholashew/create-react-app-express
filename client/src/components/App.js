import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import VisibilityFilters from '../actions/VisibilityFilters';

class App extends Component {
  state = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
  };
  
  componentDidMount() {
    const _this = this;

    window.addEventListener("hashchange", function() {
      const hash = window.location.hash;

      if (/^#\/active?($|\/)/.test(hash)) {
        _this.setState({ visibilityFilter: VisibilityFilters.SHOW_ACTIVE })
      } else if (/^#\/completed?($|\/)/.test(hash)) {
        _this.setState({ visibilityFilter: VisibilityFilters.SHOW_COMPLETED })
      } else {
        _this.setState({ visibilityFilter: VisibilityFilters.SHOW_ALL })
      }
    });

    this.fetchTodos()
      .then(res => this.setState({ todos: res }))
      .catch(err => console.log(err));
  }

  fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);    
    return body;
  };

  onSubmit = (text) => {    
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        text: text.trim()     
      })
    })
    .then((response) => {
      return response.json();      
    })
    .then((data) => {
      this.setState(prevState => ({
        todos: [...prevState.todos, data]
      }));
    })
    .catch(err => console.log(err));    
  };

  onToggle = (id) => {
    fetch('/api/todos/' + id + '/toggle', {
      method: 'PUT'
    })
    .then((response) => {
      return response.json();      
    })
    .then((data) => {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo =>{
          if (todo.id === id) { 
            return Object.assign({}, todo, {
              isCompleted: data.isCompleted
            });
          } else {
            return todo;
          }
        })
      }));
    })
    .catch(err => console.log(err));  
  };

  onRemove = (id) => {    
    fetch('/api/todos/' + id, {
      method: 'DELETE'
    })
    .then((response) => {
      return response.json();      
    })
    .then((data) => {   
      this.setState(prevState => ({
        todos: prevState.todos.filter(todo => todo.id !== id)
      }));
    })
    .catch(err => console.log(err));  
  };
  
  render() {
    var filteredTodos = this.state.todos.filter(function (todo) {
      switch (this.state.visibilityFilter) {
        case VisibilityFilters.SHOW_ACTIVE:
          return !todo.isCompleted;
        case VisibilityFilters.SHOW_COMPLETED:
          return todo.isCompleted;
        default:
          return true;
      }
    }, this);

    var activeCount = this.state.todos.reduce(function (accum, todo) {
      return todo.isCompleted ? accum : accum + 1;
    }, 0);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Simple React Todos</h1>
        </header>
        <div className="App-container">
          <div className="todoapp">
            <AddTodo onSubmit={this.onSubmit.bind(this)} />            
            <TodoList 
              todos={filteredTodos} 
              onToggle={this.onToggle.bind(this)}
              onRemove={this.onRemove.bind(this)}
            />
            <TodoFooter count={activeCount} visibilityFilter={this.state.visibilityFilter} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
