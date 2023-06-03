import React, { Component } from 'react'
import './style.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      numero: 0,
      botao: "INICIAR"
    };
    this.timer = null;
    this.iniciar = this.iniciar.bind(this);
    this.parar = this.parar.bind(this);
  }

  iniciar() {

    let state = this.state

    if(this.timer !== null){
      clearInterval(this.timer);
      this.timer = null;
      state.botao = 'INICIAR'
    }else{ 
      this.timer = setInterval(()=> {
        let state = this.state;
        state.numero += 0.1;
        this.setState(state);
      },100);
      state.botao = 'PAUSAR';
    }
    this.setState(state);
  }

  parar() {
    if(this.timer !== null){
      clearInterval(this.timer);
      this.timer = null;
    }
    let state = this.state;
    state.numero = 0;
    state.botao = 'INICIAR';
    this.setState(state);
  }

  render() {
    return (
      <div className="container">
        <img src={require('./assets/cronometro.png')} className="img" />
        <a className="timer">{this.state.numero.toFixed(1)}</a>
        <div className='areaBtn'>
          <a className='botao' onClick={this.iniciar}>{this.state.botao}</a>
          <a className='botao' onClick={this.parar}>PARAR</a>
        </div>
      </div>
    )
  }
}

export default App