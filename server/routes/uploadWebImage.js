const fs = require('fs');
const { downloadImage } = require('../helperFunctions/downloadImage');
const { uploadFile } = require('../helperFunctions/uploadFile');

const uploadWebImage = async (req, res) => {
  const siteUrl = req.query['url'];
  const fileType = siteUrl.slice(siteUrl.lastIndexOf('.'));

  await downloadImage(siteUrl, `image${fileType}`);
  const fileContent = fs.readFileSync(`image${fileType}`);

  const key = await uploadFile(fileContent, fileType);
  if (key) {
    res.json({ key });
  }
};

exports.uploadWebImage = uploadWebImage;
