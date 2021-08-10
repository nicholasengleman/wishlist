import cloudinary from 'cloudinary/lib/cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageInfo = async (req, res) => {
  const id = req?.body?.data;

  if (id) {
    try {
      const response = await cloudinary.api.resource(id);
      res.status(200).json({ result: response });
      console.log(`Image ${id} info returned from Cloudinary.`);
    } catch (error) {
      console.log(`There was an error using image-info.js : ${error}`);
    }
  }
};

export default imageInfo;
