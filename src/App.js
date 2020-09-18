
import React from 'react';
import './App.scss';
import { useQuery, gql, useMutation } from '@apollo/client';
import AddForm from './component/AddForm';

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
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(REMOVE_USER);

  if(loading) return <p className="data-state">Cargando data...</p>;
  if(error) return <p className="data-state">ERROR</p>;
  if(!data) return <p className="data-state">La data no se encuentra</p>;

  return(
    <div className="container">
      <h1>Lista de usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Compañia</th>
            <th>Eliminar Usuario</th>
          </tr>
        </thead>
        <tbody>
          {data.users.data.map((user) =>
            <tr className="table-user" key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td><button className="delete-button" onClick={() => {
                deleteUser({ variables: { id: user.id }});
                window.location.reload();
              }}>X</button></td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Agregar un nuevo usuario</h3>
      <AddForm
        disabled={loading}
        onSubmit={input => {
          createUser({
            variables: {
              input
            },
            update: (cache, {data: { createUser } }) => {
              const data = cache.readQuery({ query: READ_USERS });
              data.items = [...data.items, createUser];
              cache.writeQuery({ query: READ_USERS }, data);
            }
          })
        }}
      />
    </div>
  );
}

export default App;