import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import api from '../../services/api';

function Filme() {
  const { id } = useParams();
  
  useEffect(()=> {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "4fb839c6ef39db9d421b671118ce07fe",
          language: "pt-BR",
        }
      })
      .then((response)=> {
        console.log(response.data);
      })
      .catch(()=> {
        console.log("filme não encontrado")
      })
    }
    loadFilme();
  }, []);

  return (
    <div>
      <h2>{id}</h2>
    </div>
  )
};

export default Filme;