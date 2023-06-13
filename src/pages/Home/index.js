import {Link} from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bem-vindo a página Home</h1>
      <span>Curso de React</span><br/>

      <Link to="/contato">Contato</Link><br/>
      <Link to="/sobre">Sobre</Link>
      <hr/>
      <Link to="/produto/123">Acessar produto 123</Link>
    </div>
  )
};

export default Home;