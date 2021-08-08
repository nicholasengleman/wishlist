import GET_USER from '../queries/getUser';
import { useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';

function useGetUser(field) {
  const { user } = useUser();
  const { data } = useQuery(GET_USER, {
    variables: { id: user?.sub || '' },
  });

  if (data?.users_by_pk) {
    if (field) {
      return data.users_by_pk[field];
    }
    return data.users_by_pk;
  }

  return '';
}

export default useGetUser;
