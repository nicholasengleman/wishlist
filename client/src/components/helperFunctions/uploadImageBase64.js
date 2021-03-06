import axios from 'axios';

export default function upload(image) {
  return axios
    .post(`http://localhost:3001/storage/uploadBase64`, image)
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
