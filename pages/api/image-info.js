import cloudinary from 'cloudinary/lib/cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageInfo = async (req, res) => {
  try {
    const id = req?.body?.data;
    if (id) {
      const data = await cloudinary.api.resource(id);
      res.json({ result: data });
      if (data.result === 'ok') {
        console.log(`Image ${file} info returned from Cloudinary.`);
      }
    } else {
      throw new Error(
        'Do not import this function. Use axios and call it at the api endpoint /api/image-info.',
      );
    }
  } catch (err) {
    console.error(err);
    res?.status(500).json({ err: 'Something went wrong' });
  }
};

export default imageInfo;
