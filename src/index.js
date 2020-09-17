import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';

import './index.css';

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api'
});

const UsersQuery = () => {
  return <Query query={gql`{
      users{
        data{
          id,
          name,
          email,
          company{
            name
          }
        }
      }
  }`}>
    {({ loading, error, data }) => {
      if(loading)return <p>Loading...</p>
      if(error)return <p>Error!</p>

      return data.users.data.map(user =>{
      return <p key={user.id}>{user.name}</p>
      })
    }}
  </Query>
}

function App() {
  return <div className="App">
    <UsersQuery />
  </div>;
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ApolloProvider client={ client }>
    <App/>
  </ApolloProvider>,
  rootElement
)
