const axios = require('axios');
const { customAlphabet } = require('nanoid');
const { nolookalikesSafe } = require('nanoid-dictionary');

function test(event) {
  const nanoid = customAlphabet(nolookalikesSafe, 16);

  const userId = event.user.user_id;
  const username = nanoid();

  const admin_secret = event.secrets.hasura_admin_secret;
  const url = 'https://enhanced-boa-89.hasura.app/v1/graphql';
  const query = `mutation upsertUser($id: String!, $username: String!) {
                    insert_users_one(object: {id: $id, username: $username },
                      on_conflict: {constraint: users_pkey, update_columns: last_seen}) {
                        id
                        username
                        last_seen
                      }
                  }`;

  const variables = { id: userId, username: username };

  axios
    .post(
      url,
      { query, variables },
      {
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': admin_secret,
        },
      },
    )
    .then(function (response) {
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

test();
