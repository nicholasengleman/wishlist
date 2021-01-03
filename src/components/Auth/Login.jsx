/* eslint-disable import/no-cycle */

import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from './react-auth0-spa';

const Login = () => {
  const { loading, loginWithRedirect } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-heading">
          Welcome to the GraphQL tutorial app
        </div>
        <div className="overlay-message">Please login to continue</div>
        <div className="overlay-action">
          <Button
            id="qsLoginBtn"
            variant="primary"
            className="btn-margin loginBtn"
            onClick={() => {
              loginWithRedirect({});
            }}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
