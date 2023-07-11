import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';



export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  async function handleRegister(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      await createUserWithEmailAndPassword(auth, email, password)
      .then(()=> {
        navigate('/admin', {replace:true})
      })
      .catch(()=> {
        console.log("erro ao fazer o cadastro")
      })
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
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>

      <Link className="button-link" to="/">Do you have an account? Login</Link>
    </div>
  )
}