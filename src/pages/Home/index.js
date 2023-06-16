import {useEffect, useState} from 'react';
import api from '../../services/api';

// URL da API: /movie/550?api_key=4fb839c6ef39db9d421b671118ce07fe

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(()=> {
    async function loadFilmes() {
      const response = await api.get("movie/550", {
        params: {
          api_key: "4fb839c6ef39db9d421b671118ce07fe",
          language: "pt-BR",
          page: 1,
        }
      })
      console.log(response)
    }
  }, []);

  return (
    <div>
      <h1>Bem-vindo a Prime Flix</h1>
    </div>
  )
}

export default Home;