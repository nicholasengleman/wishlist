require('dotenv').config();

const { cloudinary } = require('./utils/cloudinary');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

//const { openGraphIo } = require('./routes/opengraph');

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

app.post('/api/upload', async (req, res) => {
  try {
    const file = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(file);
    res.json({ public_id: uploadResponse.public_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

//app.use('/opengraph/product', openGraphIo);

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log('Example app listening on port 3001!');
});
