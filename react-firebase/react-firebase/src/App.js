// ========================================>  IMPORTS  <========================================
import { useState, useEffect } from 'react';

import { db, auth } from './firebaseConnection';
import { 
  doc,
  setDoc, 
  collection,
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import './app.css';



// ========================================>  APP FUNCTION  <========================================
function App() {
  // ==========> useSTATE
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const [posts, setPosts] = useState([]);

  // ==========> useEFFECT
  useEffect(()=> {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot)=> {
        let listaPost = [];
        
        snapshot.forEach((doc)=> {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })
        setPosts(listaPost)
      })
    }
    loadPosts()
  }, [])

  useEffect(()=> {
    async function checkLogin() {
      onAuthStateChanged(auth, (user)=> {
        if (user) {
          // se tem usuario logado ele entra aqui...
          console.log(user);
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email,
          })
        } else {
          setUser(false);
          setUserDetail({});
        }
      })
    }
    checkLogin();
  }, [])

// ========================================>  FUNCTIONS  <========================================
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

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    .then(()=> {
      alert("Post deletado com sucesso")
    })
  }

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(()=> {
      console.log("cadastrado com sucesso");
      setEmail('')
      setSenha('')
    })
    .catch((error)=> {
      if (error.code === 'auth/weak-password') {
        alert("Senha muito fraca")
      }else if (error.code === 'auth/email-already-in-use') {
        alert("E-mail já cadastrado")
      }
    })
  }
  
  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value)=> {
      console.log("Usuário logado com sucesso");
      console.log(value.user);

      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
      })
      setUser(true);

      setEmail('')
      setSenha('')
    })
    .catch(()=> {
      console.log("Erro ao fazer login")
    })
  }

  async function fazerLogout() {
    await signOut(auth)
    setUser(false);
    setUserDetail({});
  }



// ========================================>  RETURN  <========================================
  return (
    <div>
      <h1>ReactJS + Firebase</h1>

      {user && (
        <div>
          <strong>Seja bem-vindo(a) Você está logado!</strong> <br/>
          <span>ID: {userDetail.uid} - E-mail: {userDetail.email}</span> <br/>
          <button onClick={fazerLogout}>Sair</button>
          <br/> <br/>
        </div>
      )}

      <div className="container">
        <h2>Usuários</h2>
        <label>E-mail:</label>
        <input
          value={email}
          placeholder="teste@exemplo.com"
          onChange={(e)=> setEmail(e.target.value)}
          /> <br/>

        <label>Senha:</label>
        <input
          value={senha}
          placeholder="123indiozinhos"
          onChange={(e)=> setSenha(e.target.value)}/>
      </div> <br/>

      <button onClick={novoUsuario}>Cadastrar</button>
      <button onClick={logarUsuario}>Fazer login</button>
      
      <br/><br/><hr/>

      <h2>Posts</h2>
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
                <span>Autor: {post.autor} </span> <br/>
                <button onClick={ ()=> excluirPost(post.id) }>Excluir post</button> <br/><br/>
              </li>
            )
          })}
        </ul>
      </div>

    </div>
  );
}

export default App;