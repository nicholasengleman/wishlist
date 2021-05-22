import fetch from 'isomorphic-unfetch';

import { getAccessToken, getSession } from '@auth0/nextjs-auth0';

export default async function session(req, res) {
  if (getSession(req, res)) {
    try {
      const { accessToken } = await getAccessToken(req, res);
      res.status(200).json({ accessToken });
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).json({
        code: error.code,
        error: error.message,
      });
    }
  } else {
    res.status(200).json({ accessToken: null });
  }
}
