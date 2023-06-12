import {Link} from 'react-router-dom';

function Sobre() {
  return (
    <div>
      <div>Um pouco Sobre nós...</div><br/>

      <Link to="/">Home</Link><br/>
      <Link to="/contato">Contato</Link>
    </div>
  )
}

export default Sobre;