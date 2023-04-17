const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
