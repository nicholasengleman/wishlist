const fs = require('fs');
const Jimp = require('jimp');
const { uploadImage } = require('../helperFunctions/uploadImage');

const uploadBase64 = async (req, res) => {
  const data = req.body.data;

  const fileType = data.slice(data.indexOf('/') + 1, data.indexOf(';'));
  const base64 = data.slice(data.indexOf(',') + 1);

  fs.writeFile(`image.${fileType}`, base64, { encoding: 'base64' }, function() {
    const fileContent = fs.readFile(`image.${fileType}`);

    const upLoadedFileData = await uploadImage(fileContent, fileType);
    res.json({ location: upLoadedFileData.Location });
  });
};

exports.uploadBase64 = uploadBase64;
