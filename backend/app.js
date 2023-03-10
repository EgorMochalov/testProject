const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const cors = require('cors')

const db = require('./db.js')
db.authenticate()
  .catch(error => console.error(error))

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

routes(app);

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});


