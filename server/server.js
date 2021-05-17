require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

//const { openGraphIo } = require('./routes/opengraph');
const { imageUpload } = require('./routes/uploadImage');

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

app.use(helmet());
app.use(express.json({ limit: '10mb' }));

//app.use('/opengraph/product', openGraphIo);
app.use('/api/upload', imageUpload);

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log('Example app listening on port 3001!');
});
