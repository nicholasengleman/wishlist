const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageUpload = async (req, res) => {
  try {
    const file = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(file);
    res.json({ public_id: uploadResponse.public_id });
    console.log('Image uploaded to Cloudinary!');
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

exports.imageUpload = imageUpload;
