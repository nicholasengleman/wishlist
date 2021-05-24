import fetch from 'isomorphic-unfetch';

let accessToken;

export const requestAccessToken = async () => {
  if (accessToken) {
    return true;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_HOST}/api/auth/session`,
  );

  if (res.ok) {
    const json = await res.json();
    accessToken = json.accessToken;
  } else {
    accessToken = null;
  }

  if (accessToken) {
    return {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
  } else {
    return {
      headers: {},
    };
  }
};
