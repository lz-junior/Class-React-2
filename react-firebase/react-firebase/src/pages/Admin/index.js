import { useState } from 'react';
import './admin.css';

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('');


  function handleRegister(e) {
    e.preventDefault();
    alert("Clicou");
  }


  return (
    <div className="admin-container">
      <h1>Minhas tarefas</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea 
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e)=> setTarefaInput(e.target.value)}
        />
        <button type="submit">Registrar tarefa</button>
      </form>

    </div>
  )
}