const express = require('express');
const app = express();

const apiRouts = require('./routes/apiRouts');
const htmlRouts = require('./routes/htmlRouts');

// const PORT = 3000;

const PORT = process.env.PORT || 5500;

app.use(express.json());

app.use(express.static('public'));

app.use('/api', apiRouts);
app.use('/', htmlRouts);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
