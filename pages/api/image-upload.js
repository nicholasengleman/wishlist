import cloudinary from 'cloudinary/lib/cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageUpload = async (req, res) => {
  try {
    const file = req?.body?.data;
    if (file) {
      const uploadResponse = await cloudinary.v2.uploader.upload(file);
      res.json({ public_id: uploadResponse.public_id });
      console.log(`Image ${uploadResponse.public_id} uploaded to Cloudinary!`);
    } else {
      throw new Error(
        'Do not import this function. Use axios and call it at the api endpoint /api/image-upload.',
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

export default imageUpload;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};
