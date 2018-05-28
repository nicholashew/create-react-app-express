import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';

class App extends Component {
  input = undefined;

  state = {
    items: []
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.fetchTodos()
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }

  fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);    
    return body;
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (!this.input.value.trim()) {
      return;
    }
    
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        text: this.input.value.trim()     
      })
    })
    .then((response) => {
      return response.json();      
    })
    .then((data) => {
      this.input.value = '';
      this.setState(prevState => ({
        items: [...prevState.items, data]
      }));
    })
    .catch(err => console.log(err));    
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Simple React Todo List</h1>
        </header>
        <div className="App-intro">
          <form onSubmit={this.onSubmit.bind(this)}>
            <input ref={node => this.input = node} placeholder="enter todo item" />
            <button type="submit">Add Todo</button>
          </form>
          <TodoList items={this.state.items} />
        </div>
      </div>
    );
  }
}

export default App;
