import GET_USER from 'queries/getUser';
import UPDATE_USER from 'queries/updateUser';
import { initializeApollo } from '/lib/apolloClient';

async function updateUser(userId, newData) {
  if (!userId || !newData) {
    console.log('updateUser function is missing required arguments.');
    return null;
  }

  const client = initializeApollo({});

  const result = await client
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
    .then((data) => {
      //console.log('data updated', data);
      return { status: 'success', ...data };
    })
    .catch((err) => {
      console.error(err);
      return { status: 'error' };
    });

  return result;
}

export default updateUser;
