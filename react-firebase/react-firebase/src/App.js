import { useState } from 'react';

import { db } from './firebaseConnection';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

import './app.css';


function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

  const [posts, setPosts] = useState([]);

  async function handleApp() {
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

    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(()=> {
    //   console.log("DADOS REGISTRADOS COM SUCESSO")
    // })
    // .catch((error)=> {console.log("GEROU ERRO" + error)
    // })
  }

  async function buscarPost() {
    const postsRef = collection(db, "posts");
    await getDocs(postsRef)
    .then((snapshot)=> {
      let lista = [];
      snapshot.forEach((doc)=> {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })
      setPosts(lista);
    })


    // const postRef = doc(db, "posts", "12345");
    // await getDoc(postRef)
    //   .then((snapshot)=> {
    //     setAutor(snapshot.data().autor)
    //     setTitulo(snapshot.data().titulo)
    //   })
    //   .catch(()=> {"ERRO AO BUSCAR"})
  }

  async function editarPost() {
    const docRef = doc(db, "posts", idPost);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
    .then(()=> {
      console.log("POST ATUALIZADO")
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch(()=> {
      console.log("ERRO AO ATUALIZAR O POST")
    })
  }


  return (
    <div>
      <h1>ReactJS + Firebase</h1>

      <div className='container'>

        <label>ID do Post:</label>
        <input 
          placeholder="Digite o ID do post"
          value={idPost}
          onChange={ (e)=> setIdPost(e.target.value) }/> <br/>

        <label>Título:</label>
        <textarea 
          type="text" 
          placeholder="Digite o título" 
          value={titulo}
          onChange={ (e)=> setTitulo(e.target.value) }/>
        
        <label>Autor:</label>
        <input 
          type="text" 
          placeholder="Autor do post"
          value={autor}
          onChange={(e)=> setAutor(e.target.value)}/>

        <button onClick={handleApp}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar post</button>
        <br/>
        <button onClick={editarPost}>Atualizar Post</button>

        <ul>
          {posts.map((post)=> {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br/>
                <span>Título: {post.titulo} </span> <br/>
                <span>Autor: {post.autor} </span> <br/><br/>
              </li>
            )
          })}
        </ul>
      </div>

    </div>
  );
}

export default App;