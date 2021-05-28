import GET_USER from 'queries/getUser';
import UPDATE_USER from 'queries/updateUser';
import { initializeApollo } from '/lib/apolloClient';

export default function updateUser(id, newData) {
  const client = initializeApollo({});

  client
    .mutate({
      mutation: UPDATE_USER,
      variables: {
        id: id || '',
        data: {
          ...newData,
        },
      },
      refetchQueries: [{ query: GET_USER, variables: { id } }],
    })
    .then((data) => {
      console.log('data updated');
    })
    .catch((err) => {
      console.error(err);
    });
}
