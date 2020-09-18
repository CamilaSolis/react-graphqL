import React, { useState } from 'react';

const AddForm = ({ disabled,onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  return(
    <div className="form">
      <div className="input-form">
        <label htmlFor="name">Nombre</label>
        <input
          name="name"
          type="text"
          disabled={disabled}
          value = {name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="input-form">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          disabled={disabled}
          value = {email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="input-form">
        <label htmlFor="company">Compañia</label>
        <input
          name="company"
          type="text"
          disabled={disabled}
          value = {company}
          onChange={e => setCompany(e.target.value)}
        />
      </div>
      <button className="addButton" onClick={() => {
        onSubmit({ name, email, company, id:20});
      }}>Agregar</button>
    </div>
  )
}

export default AddForm;