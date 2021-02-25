export default function updateUser(updateWish, GET_USER, uid, newData) {
  updateWish({
    variables: {
      user_id: uid,
      wishData: JSON.stringify(newData),
    },
    refetchQueries: [{ query: GET_USER, variables: { user_id: uid } }],
  });
}
