import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

import './home.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  async function handleLogin(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      
      await signInWithEmailAndPassword(auth, email, password)
      .then(()=> {
        // navegar para /home
        navigate('/admin', {replace: true})
      })
      .catch(()=> {
        console.log("ERRO AO FAZER O LOGIN catch")
      })

    } else {
      console.log("ERRO AO FAZER O LOGIN")
    }
  }



  return (
    <div className="home-container">
      <h1>ToDo List</h1>
      <span>Your <strong>ToDo</strong> List wherever and whenever you need it.</span>
      
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
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <Link className="button-link" to="/register">Don't you have an account? Sign in</Link>
    </div>
  )
}