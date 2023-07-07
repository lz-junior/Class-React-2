import {useState, useEffect} from 'react';

import './home.css';

import { Link } from 'react-router-dom';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  function handleLogin(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      alert("teste")
    } else {
      alert ("Preencha todos os campos")
    }
  }



  return (
    <div className="home-container">
      <h1>ToDo List</h1>
      <span>Your <strong>ToDo</strong> list wherever and whenever you need it.</span>
      
      <form className="form" onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>

      <Link className="button-link" to="/register">Não possui uma conta? Cadastre-se</Link>
    </div>
  )
}