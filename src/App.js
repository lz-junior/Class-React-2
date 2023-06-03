import React, { Component } from 'react';
import './estilo.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textoFrase: ''
    };
    this.quebraBiscoito = this.quebraBiscoito.bind(this);
    this.frases = ['frase 01', 'frase 02', 'frase 03', 'frase 04', 'frase 05', 'frase 06', 'frase 07'];
  }

  quebraBiscoito() {
    let state = this.state;
    let numeroAleatorio = Math.floor(Math.random() * this.frases.length);
    state.textoFrase = '" ' + this.frases[numeroAleatorio] + ' "';
    this.setState(state);
  }

  render() {
    return (
      <div className="container">
        <img src={require('./assets/biscoito.png')} className="img"/>
        <Botao nome="Abrir biscoito" acaoBtn={this.quebraBiscoito}/>
        <h3 className="textoFrase">{this.state.textoFrase}</h3>
      </div>  
    )
  }
}

class Botao extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.acaoBtn}>{this.props.nome}</button>
      </div>
    )
  }
}

export default App