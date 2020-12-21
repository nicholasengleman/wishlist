require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { openGraphIo } = require('./routes/opengraph');
const { uploadFile } = require('./routes/upload');

const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

app.use(morgan('tiny'));
app.disable('x-powered-by');

app.use('/storage/upload', uploadFile);
app.use('/opengraph/product', openGraphIo);

app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message);
    console.error(err.stack);
    return res.status(err.outout.statusCode || 500).json(err.output.payload);
  }
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
