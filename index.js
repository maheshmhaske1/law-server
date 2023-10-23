const app = require('./app.js');
const { config } = require('./config');

app.listen(4000, () => {
  console.log(`Server listening on http://localhost:4000`);
});
