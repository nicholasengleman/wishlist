import axios from 'axios';

export default function upload(url) {
  if (!url) {
    throw new Error('Must provide image url to uploadImage.js');
  }

  return axios
    .post(`http://localhost:3001/storage/uploadBase64`, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.data) {
        return response.data.key;
      }
      return null;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
