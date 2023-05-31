import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      senha: '',
      sexo: ''
    };
    this.trocaEmail = this.trocaEmail.bind(this);
    this.trocaSexo = this.trocaSexo.bind(this);
  }
  trocaEmail(e) {
    let valorDigitado = e.target.value;
    this.setState({email: valorDigitado});
  }
  trocaSexo(e) {
    this.setState({sexo: e.target.value})
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        E-mail: 
        <input 
          type="email" 
          name="email" 
          value={this.state.email} 
          onChange={this.trocaEmail}/><br/>
        Senha: 
        <input 
          type="password" 
          name="senha" 
          value={this.state.senha}
          onChange={(e)=> this.setState({senha: e.target.value})}/><br/>
        Sexo:
        <select name="sexo" value={this.state.sexo} onChange={this.trocaSexo}>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </div>  
    )
  }
}
export default App