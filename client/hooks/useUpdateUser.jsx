import GET_USER from 'queries/getUser';
import UPDATE_USER from 'queries/updateUser';
import { useApollo } from '/lib/apolloClient';

export default function updateUser(id, newData) {
  // useApollo
  //   .mutate({
  //     mutation: UPDATE_USER,
  //     variables: {
  //       id: (user && user.sub) || '',
  //       data: {
  //         ...newData,
  //       },
  //     },
  //     refetchQueries: [
  //       { query: GET_USER, variables: { id: (user && user.sub) || '' } },
  //     ],
  //   })
  //   .then((data) => {
  //     console.log('data updated');
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
}
