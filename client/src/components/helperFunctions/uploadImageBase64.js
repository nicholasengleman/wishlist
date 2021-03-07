import axios from 'axios';

export default function upload(image) {
  return axios
    .post(`http://localhost:3001/storage/uploadBase64`, { data: image })
    .then((response) => {
      if (response) {
        return response.data.location;
      }
      return null;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
