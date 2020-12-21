const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

//const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET } = require('./config');

const s3 = new AWS.S3({
  accessKeyId: 'AKIAIPQDJAJ5BJSLRWAQ',
  secretAccessKey: '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',
});

const download_image = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => resolve())
          .on('error', (e) => reject(e));
      }),
  );

const uploadFile = async (req, res) => {
  const siteUrl = req.query['url'];
  const fileType = siteUrl.slice(siteUrl.lastIndexOf('.'));

  await download_image(siteUrl, `image${fileType}`);

  const fileContent = fs.readFileSync(`image${fileType}`);
  const key = `${uuidv4()}${fileType}`;

  // Setting up S3 upload parameters
  const params = {
    Bucket: 'wishlistengleman',
    Key: key, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    res.json({ key });
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

exports.uploadFile = uploadFile;
