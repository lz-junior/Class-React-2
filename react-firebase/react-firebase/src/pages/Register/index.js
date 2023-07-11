import {useState, useEffect} from 'react';

import { Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  function handleRegister(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      alert("teste")
    } else {
      alert ("Preencha todos os campos")
    }
  }



  return (
    <div className="home-container">
      <h1>Sign in</h1>
      <span>Create your <strong>ToDo</strong> List.</span>
      
      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Digite seu e-mail..."
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="******"
          autoComplete={false}
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>

      <Link className="button-link" to="/">Do you have an account? Login</Link>
    </div>
  )
}