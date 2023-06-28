import { useState } from 'react';

import { db } from './firebaseConnection';
import { doc, setDoc, collection, addDoc, getDoc } from 'firebase/firestore';

import './app.css';


function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');


  async function handleApp() {
    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(()=> {
    //   console.log("DADOS REGISTRADOS COM SUCESSO")
    // })
    // .catch((error)=> {console.log("GEROU ERRO" + error)
    // })

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
    .then(()=> {
      console.log("CADASTRADO COM SUCESSO")
      setTitulo('');
      setAutor('')
    })
    .catch((error)=> {console.log("ERRO" + error)})
  }

  async function buscarPost() {
    const postRef = doc(db, "posts", "12345");
    await getDoc(postRef)
      .then((snapshot)=> {
        setAutor(snapshot.data().autor)
        setTitulo(snapshot.data().titulo)
      })
      .catch(()=> {"ERRO AO BUSCAR"})
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
        <button onClick={buscarPost}>Buscar post</button>
      </div>

    </div>
  );
}

export default App;