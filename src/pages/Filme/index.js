import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';
import {toast} from 'react-toastify';


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
  }, [navigate, id]);



// ===============>  FUNCTIONS  <===============
function salvarFilme() {
  // colocamos dentro da const as coisas que vem dentro dessa chave que esta no localStorage
  const minhaLista = localStorage.getItem("@primeflix");

  // esses itens dentro do localStorage vem como string, entao é preciso transforma-los para json.
  // estamos salvando dentro desse let essa lista
  // e se caso não tiver nada dentro dessa lista ele retorna uma array vazia.
  let filmesSalvos = JSON.parse(minhaLista) || [];

  // verifica se dentro do localStorage já tem id do filme que está salvando 
  const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)

  if (hasFilme) {
    toast.warn("Este filme já está na sua lista");
    return;
  }
  filmesSalvos.push(filme);
  localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
  toast.success("Filme salvo com sucesso")
};



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
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target=" blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
};

export default Filme;