
const PORT = 3000;

const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const buildDir = path.join(__dirname, '/build');

const singlePageApp = () => {
  app.get('*', (req, res) => {
    res.sendFile(`${buildDir}/index.html`);
  });
};
const start = () => {
  app.listen(PORT, error => {
    if (error) {
      console.error(error);
    } else {
      console.info(`Express is listening on http://localhost:${PORT}\n`);
    }
  });
};

app.use(compression());
app.use(express.static('build'));

singlePageApp();
start();
