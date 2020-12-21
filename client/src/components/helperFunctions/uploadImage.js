import axios from 'axios';

export default function upload(url) {
  if (!url) {
    throw new Error('Must provide image url to uploadImage.js');
  }

  return axios
    .get(`http://localhost:3001/storage/upload?url=${url}`)
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
