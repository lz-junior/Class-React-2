import { useState, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { auth } from '../firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';


export default function Private({ children }) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(()=> {
      async function checkLogin() {
        const unsub = onAuthStateChanged(auth, (user)=> {

          // existe algum usuario logado?
          if (user) {
            // se existe então fará isso: 
            const userData = {
              uid: user.data,
              email: user.email,
            }
            localStorage.setItem("@detailUser", JSON.stringify(userData));

            setLoading(false);
            setSigned(true);

          } else {
            // se não existe, então isso:
            setLoading(false);
            setSigned(false);
          }
        })
      }

      checkLogin();
    }, [])


    // se estiver carregando, não ira aparecer nada em tela.
    if (loading) {
      return (
        <div></div>
      )
    }


    // Se não estiver logado, então será redirecionado para a página Home.
    if (!signed) {
      return <Navigate to="/"/>
    }

  return children;
}