import cloudinary from 'cloudinary/lib/cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageDelete = async (req, res) => {
  try {
    const file = req?.body?.data;
    if (file) {
      const data = await cloudinary.uploader.destroy(file);
      res.json({ result: data });
      if (data.result === 'ok') {
        console.log(`Image ${file} deleted from Cloudinary.`);
      }
    } else {
      throw new Error(
        'Do not import this function. Use axios and call it at the api endpoint /api/image-delete.',
      );
    }
  } catch (err) {
    console.error(err);
    res?.status(500).json({ err: 'Something went wrong' });
  }
};

export default imageDelete;
