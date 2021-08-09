import axios from 'axios';
import updateUser from './updateUser';
import toBase64 from './toBase64';

async function imageUpload(userId, image, oldImage, hasuraColumnName) {
  if (!userId || !image || !oldImage || !hasuraColumnName) {
    console.error(
      'Please provide all required arguments for the image upload function',
    );
    return null;
  }

  toBase64(image)
    .then((data) => {
      if (data) {
        // Upload Image to Cloudinary
        axios
          .post('/api/image-upload', {
            data,
          })
          .then(async (result) => {
            const publicId = result?.data.public_id;
            console.log(`Image ${publicId} uploaded to Cloudinary.`);
            if (publicId) {
              // Upload Image Id to Hasura
              const result = await updateUser(userId, {
                [hasuraColumnName]: publicId,
              });
              if (result.status === 'success') {
                console.log('Successfully uploaded new image id to Hasura.');
                // Delete old image from Cloudinary
                axios
                  .post('/api/image-delete', {
                    data: oldImage,
                  })
                  .then((result) => {
                    if (result.result === 'ok') {
                      console.log('Old image deleted from cloudinary.');
                    }
                  });
              }
            }
          });
      }
    })
    .catch((err) => console.error(err));
}

export default imageUpload;
