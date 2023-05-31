import React, { Component } from 'react';
import Feed from './components/Feed/index'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      feed: [
        {id: 1, username: 'Jessica', curtidas: 15, comentarios: 28},
        {id: 2, username: 'Carlos', curtidas: 17, comentarios: 13},
        {id: 3, username: 'Thaiz', curtidas: 29, comentarios: 30},
        {id: 4, username: 'Luiz', curtidas: 1, comentarios: 0}
      ]
    };
  }
  render() {
    return (
      <div>
        {this.state.feed.map((item)=> {
          return(
            <Feed 
              key={item.id}
              username={item.username}
              curtidas={item.curtidas}
              comentarios={item.comentarios}
            />
          );
        })}
      </div>  
    )
  }
}
export default App