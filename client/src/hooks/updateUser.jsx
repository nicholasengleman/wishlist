import store from '../redux/store';
import GET_USER from '../queries/getUser';
import UPDATE_USER from '../queries/updateUser';
import client from '../apollo';

export default function updateUser(dataName, dataValue) {
  const { user } = store.getState();

  client
    .mutate({
      mutation: UPDATE_USER,
      variables: {
        user_id: user.uid,
        data: {
          [dataName]: dataValue,
        },
      },
      refetchQueries: [{ query: GET_USER, variables: { user_id: user.uid } }],
    })
    .then(`User ${user.username} ${dataName} updated to ${dataValue}`)
    .catch((err) => {
      console.error(err);
    });
}
