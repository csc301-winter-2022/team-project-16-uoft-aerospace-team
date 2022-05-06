const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const app = express();

app.use(cors());
// app.use(express.static('build'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})