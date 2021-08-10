import GET_USER from 'queries/getUser';
import UPDATE_USER from 'queries/updateUser';
import { initializeApollo } from '/lib/apolloClient';

async function updateUser(userId, newData) {
  if (!userId || !newData) {
    console.log('updateUser function is missing required arguments.');
    return null;
  }

  const client = initializeApollo({});

  return await client
    .mutate({
      mutation: UPDATE_USER,
      variables: {
        id: userId,
        data: {
          ...newData,
        },
      },
      refetchQueries: [{ query: GET_USER, variables: { id: userId } }],
    })
    .catch((err) => {
      console.error(`Error uploading image id to Hasura: ${err}`);
    });
}

export default updateUser;
