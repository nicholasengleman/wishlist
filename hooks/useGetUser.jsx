import GET_USER from '../queries/getUser';
import { useQuery } from '@apollo/client';

export default function useGetUser(id, field) {
  const { data } = useQuery(GET_USER, {
    variables: { id: id || '' },
  });

  if (data?.users_by_pk) {
    if (field) {
      return data.users_by_pk[field];
    }
    return data.users_by_pk;
  }

  return '';
}
