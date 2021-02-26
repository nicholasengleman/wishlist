import store from '../redux/store';
import GET_USER from '../queries/getUser';

export default function updateUser(update, dataName, dataValue) {
  const { user } = store.getState();

  update({
    variables: {
      user_id: user.uid,
      data: {
        [dataName]: dataValue,
      },
    },
    refetchQueries: [{ query: GET_USER, variables: { user_id: user.uid } }],
  });
}
