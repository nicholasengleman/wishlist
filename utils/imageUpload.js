import axios from 'axios';
import updateUser from './updateUser';
import toBase64 from './toBase64';

async function imageUpload(userId, image, hasuraColumnName) {
  if (!userId || !image || !hasuraColumnName) {
    console.error(
      'Please provide required arguments for the image upload function',
    );
    return null;
  }

  const imageDataUrl = await toBase64(image);

  // Upload image to Cloudinary
  const cloudinaryResult =
    imageDataUrl &&
    (await axios.post('/api/image-upload', {
      data: imageDataUrl,
    }));

  console.log(cloudinaryResult);
  const publicId = cloudinaryResult?.data.public_id;

  // Upload image id to Hasura
  const hasuraResult =
    publicId &&
    (await updateUser(userId, {
      [hasuraColumnName]: publicId,
    }));

  //     if (result.status === 'success') {
  //       console.log('Successfully uploaded new image id to Hasura.');
  //       //   // Delete old image from cloudinary
  //       //   axios.post('/api/image-delete', {
  //       //     data: oldAvatarId,
  //       //   });
  //       //   dispatch(toggleEditAvatarModal());
  //     } else {
  //       console.log('There was a problem uploading the new image id to hasura.');
  //     }
  //   } else {
  //     console.log('There was a problem uploading the new image to cloudinary.');
  //   }
}

export default imageUpload;
