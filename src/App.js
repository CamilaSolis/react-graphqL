
import React from 'react';
import './App.scss';
import { useQuery, gql, useMutation } from '@apollo/client';

const READ_USERS = gql`
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
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      company{
        name
      }
    }
  }
`;

const REMOVE_USER = gql`
    mutation (
      $id: ID!
    ) {
      deleteUser(id: $id)
      }
`;


function App() {
  const { data, loading, error } = useQuery(READ_USERS);

  let input;
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(REMOVE_USER);

  if(loading) return <p>Cargando data...</p>;
  if(error) return <p>ERROR</p>;
  if(!data) return <p>La data no se encuentra</p>;

  return(
    <div>
      <h3>Crear nuevo usuario</h3>
      <form onSubmit={e => {
        e.preventDefault();
        createUser({ variables: {name: input.value, email:input.value} });
        input.value = '';
        window.location.reload();
      }}>
        <input type="text" placeholder="Ingrese nuevo usuario" ref={node => { input = node }}></input>
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {data.users.data.map((user) =>
          <li key={user.id}>
            <span>{user.name}</span>
            <button onClick={() => {
              deleteUser({ variables: { id: user.id }});
              window.location.reload();
            }}>X</button>
          </li>
        )

        }
      </ul>
    </div>
  );
}

export default App;