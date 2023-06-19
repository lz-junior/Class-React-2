import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';


function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);


// ===============>  CICLOS  <===============
  useEffect(()=> {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "4fb839c6ef39db9d421b671118ce07fe",
          language: "pt-BR",
        }
      })
      .then((response)=> {
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=> {
        console.log("filme não encontrado");
        navigate("/", {replace: true});
        return;
      })
    };
    loadFilme();

    return ()=> {
      console.log("Componente foi desmontado");
    };
  }, [navigate, id]);



// ===============>  LOADING PAGE  <===============
  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  };



// ===============>  RETURN  <===============
  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button>Salvar</button>
        <button>
          <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
};

export default Filme;