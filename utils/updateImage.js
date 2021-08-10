import axios from 'axios';
import updateUser from './updateUser';
import toBase64 from './toBase64';

export default async function updateImage(
  userId,
  image,
  hasuraColumnName,
  oldImage,
) {
  if (!userId || !image || !hasuraColumnName) {
    console.error(
      'Please provide all required arguments for the image upload function',
    );
    return null;
  }

  const publicId = await uploadImageToCloudinary(image);

  const hasuraResponse = await uploadImageIDToHasura(
    publicId,
    hasuraColumnName,
    userId,
  );

  if (hasuraResponse) {
    deleteOldImageFromCloudinary(oldImage);
  }
}

async function uploadImageToCloudinary(image) {
  const base64response = await toBase64(image).catch((err) =>
    console.error(`Error converting to base 64: ${err}`),
  );

  if (base64response) {
    return await axios
      .post('/api/image-upload', { data: base64response })
      .then((response) => {
        console.log(`Image ${response.data.public_id} uploaded to cloudinary.`);
        return response.data.public_id;
      })
      .catch((err) => console.error(`Error uploading to Cloudinary: ${err}`));
  } else {
    return null;
  }
}

async function uploadImageIDToHasura(publicId, hasuraColumnName, userId) {
  if (!publicId || typeof publicId !== 'string') {
    return null;
  }

  if (!hasuraColumnName || !userId) {
    return null;
  }

  return await updateUser(userId, {
    [hasuraColumnName]: publicId,
  }).then(() => {
    console.log(`Image Id ${publicId} uploaded to hasura.`);
    return true;
  });
}

async function deleteOldImageFromCloudinary(oldImage) {
  if (!oldImage) {
    return null;
  }

  return await axios
    .post('/api/image-delete', {
      data: oldImage,
    })
    .then(() => console.log(`Image ${oldImage} deleted from Cloudinary.`))
    .catch((err) =>
      console.error(`Error deleted old image from Cloudinary: ${err}`),
    );
}
