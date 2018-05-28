const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(express.static(path.join(__dirname, '../client/build'), { maxAge: 31557600000 }));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/api/hello', (req, res) => {
  res.send({
    express: 'Hello From Express'
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));