require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { openGraphIo } = require('./routes/opengraph');
const { uploadWebImage } = require('./routes/uploadWebImage');
const { uploadBase64 } = require('./routes/uploadBase64');

const app = express();

//middleware
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

app.use(morgan('tiny'));
app.use(express.json({ limit: '10mb' }));
app.disable('x-powered-by');

app.use('/storage/upload', uploadWebImage);
app.use('/storage/uploadBase64', uploadBase64);
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
