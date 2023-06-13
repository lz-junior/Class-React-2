import {useParams} from 'react-router-dom';

function Produto() {

const {id} = useParams();

  return (
    <div>
        <h2>Produto da Empresa</h2>
        <h4>melhor produto de todos</h4>
        <span>O código do produto é {id}</span>
    </div>
  )
}

export default Produto;