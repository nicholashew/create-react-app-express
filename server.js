const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const uuidv4 = require('uuid/v4');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, '../client/build'), { maxAge: 31557600000 }));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/ping', function (req, res) {
  return res.send('pong');
});

/**
 * Mock API examples routes.
 */
let todos = [{
  "id": "f5834b7d-32c3-4829-8e27-971e1bf697c6",
  "text": "foo",
  "isCompleted": false,
  "createdDate": "2018-05-28T08:46:54.441Z"
},
{
  "id": "392c8b11-0ccc-4919-a2a3-1e1635be41fe",
  "text": "bar",
  "isCompleted": false,
  "createdDate": "2018-05-28T08:46:54.441Z"
},
{
  "id": "e91721d2-ab06-474f-8806-f5fea9bde738",
  "text": "foobar",
  "isCompleted": true,
  "createdDate": "2018-05-28T08:46:54.441Z"
}];

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({
    "error": message
  });
}

app.get('/api/hello', (req, res) => {
  res.send({
    express: 'Hello From Express'
  });
});

app.get('/api/todos', (req, res) => {
  res.status(200).json(todos);
});

app.post('/api/todos', (req, res) => {
  if (!req.body.text) {
    handleError(res, "Invalid user input", "Must provide a text.", 400);
  }

  const todo = {
    id: uuidv4(),
    text: req.body.text,
    isCompleted: false,
    createdDate: new Date()
  };

  todos.push(todo);
  res.status(200).json(todo);
});

app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === req.params.id);
  if (!todo) {
    handleError(res, 'item not found', "Failed to get todo.");
  } else {
    res.status(200).json(todo);
  }
});

app.put('/api/todos/:id/toggle', (req, res) => {
  const index = todos.findIndex(todo => todo.id === req.params.id);
  if (index === -1) {
    handleError(res, 'item not found', "Failed to toggle todo.");
  } else {
    todos[index].isCompleted = !todos[index].isCompleted;
    res.status(200).json(todos[index]);
  }
});

app.put('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(todo => todo.id === req.params.id);
  if (index === -1) {
    handleError(res, 'item not found', "Failed to update todo.");
  } else {
    todos[index].text = req.params.text;
    res.status(200).json(todos[index]);
  }
});

app.delete('/api/todos/:id', (req, res) => { 
  const index = todos.findIndex(todo => todo.id === req.params.id);
  if (index === -1) {
    handleError(res, 'item not found', "Failed to update todo.");
  } else {
    const todo = todos[index];
    todos.splice(index, 1);
    res.status(200).json(todo.id);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));