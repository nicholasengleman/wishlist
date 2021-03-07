const fs = require('fs');
const Jimp = require('jimp');
const { uploadImage } = require('../helperFunctions/uploadImage');

const uploadBase64 = async (req, res) => {
  const data = req.body.data;

  const fileType = data.slice(data.indexOf('/') + 1, data.indexOf(';'));
  const base64 = data.slice(data.indexOf(',') + 1);

  const buffer = Buffer.from(base64, 'base64');

  Jimp.read(buffer, (err, res) => {
    if (err) throw new Error(err);
    res.quality(5).write(`image.${fileType}`);
  });

  const fileContent = fs.readFileSync(`image.${fileType}`);

  const upLoadedFileData = await uploadImage(fileContent, fileType);
  res.json({ location: upLoadedFileData.Location });
};

exports.uploadBase64 = uploadBase64;
