import GET_USER from '../queries/getUser';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

export default function useGetUser(field) {
  const userUid = useSelector((state) => state.user?.uid);

  const { data } = useQuery(GET_USER, {
    variables: { user_id: userUid },
  });

  if (data) {
    if (field) {
      if (field === 'wishData') {
        return JSON.parse(data.users_by_pk[field]);
      }
      return data.users_by_pk[field];
    }
    return data.users_by_pk;
  }
  return null;
}
