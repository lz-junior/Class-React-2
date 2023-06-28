import { useState } from 'react';

import { db } from './firebaseConnection';
import { doc, setDoc } from 'firebase/firestore';

import './app.css';


function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');


  async function handleApp() {
    await setDoc(doc(db, "posts", "12345"), {
      titulo: titulo,
      autor: autor,
    })
    .then(()=> {
      console.log("DADOS REGISTRADOS COM SUCESSO")
    })
    .catch((error)=> {console.log("GEROU ERRO" + error)
    })
  }


  return (
    <div>
      <h1>ReactJS + Firebase</h1>

      <div className='container'>
        <label>Título:</label>
        <textarea 
          type="text" 
          placeholder="Digite o título" 
          value={titulo}
          onChange={(e)=> setTitulo(e.target.value)}/>
        
        <label>Autor:</label>
        <input 
          type="text" 
          placeholder="Autor do post"
          value={autor}
          onChange={(e)=> setAutor(e.target.value)}/>

        <button onClick={handleApp}>Cadastrar</button>
      </div>

    </div>
  );
}

export default App;