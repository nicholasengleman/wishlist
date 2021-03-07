const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

//const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET } = require('./config');

const s3 = new AWS.S3({
  accessKeyId: 'AKIAIPQDJAJ5BJSLRWAQ',
  secretAccessKey: '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',
});

const uploadImage = async (file, fileType) => {
  if (!file || !fileType) {
    return null;
  }

  const params = {
    Bucket: 'wishlistengleman',
    Key: `${uuidv4()}.${fileType}`,
    Body: file,
  };

  return s3
    .upload(params, function (err, data) {
      if (err) {
        throw err;
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
        return data;
      }
    })
    .promise();
};

exports.uploadImage = uploadImage;
