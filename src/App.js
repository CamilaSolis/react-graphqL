
import React from 'react';
import './App.scss';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

const READ_USER = gql`
  query users{
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
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($text: String!) {
    createUser(text: $text)
  }
`;

const REMOVE_USER = gql`
  mutation RemoveUser($id: String!) {
    removeUser(id: $id)
  }
`;


function App() {
  const { data, loading, error } = useQuery(READ_USER);

  if(loading) return <p>Cargando data...</p>;
  if(error) return <p>ERROR</p>;
  if(!data) return <p>La data no se encuentra</p>;

  return(
    <div>
      <h3>Crear nuevo usuario</h3>
      {/* <form onSubmit={}>
        <input type="text" placeholder="Ingrese nuevo usuario"></input>
        <button type="submit">Enviar</button>
      </form> */}
      <ul>
        {data.users.data.map((user) =>
          <li key={user.id}>
            <p>{user.name}</p>
          </li>
        )

        }
      </ul>
    </div>
  );
}

export default App;