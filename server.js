const PORT = 3000;

const compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();

app.use(compression());
app.use(express.static('build'));

app.get('*', (req, res) => {
  const buildDir = path.join(__dirname, '/build');
  res.sendFile(`${buildDir}/index.html`);
});

app.listen(PORT, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Express is listening on http://localhost:${PORT}`);
  }
});
