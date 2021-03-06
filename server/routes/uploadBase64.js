const { uploadFile } = require('../helperFunctions/uploadFile');

const uploadBase64 = async (req, res) => {
  console.log(req);
  // const siteUrl = req.query['url'];

  // const key = await uploadFile(fileContent, '');
  // if (key) {
  //   res.json({ key });
  // }
};

exports.uploadBase64 = uploadBase64;
