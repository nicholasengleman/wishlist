import store from '../redux/store';
import GET_USER from '../queries/getUser';
import UPDATE_USER from '../queries/updateUser';
import client from '../apollo';

export default function updateUser(newData) {
  const { user } = store.getState();

  client
    .mutate({
      mutation: UPDATE_USER,
      variables: {
        user_id: user.uid,
        data: {
          ...newData,
        },
      },
      refetchQueries: [{ query: GET_USER, variables: { user_id: user.uid } }],
    })
    .then(`Data updated`)
    .catch((err) => {
      console.error(err);
    });
}
