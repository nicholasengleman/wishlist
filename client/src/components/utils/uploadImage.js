import axios from 'axios';

export default function upload(image) {
  return axios
    .post(`http://localhost:3001/api/upload`, { data: image })
    .then(({ data }) => data.public_id)
    .catch((error) => {
      throw new Error(error);
    });
}
