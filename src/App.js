import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {

  // =====> useState <=====
  const [tarefas, setTarefas] = useState([
    'Pagar a conta de luz',
    'Estudar React Hooks'
  ]);
  const [input, setInput] = useState('');


  // =====> useEffect <=====
  useEffect(()=> {
    const tarefasStorage = localStorage.getItem('tarefas');
    if(tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage))
    }
  }, []);

  useEffect(()=> {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);


  // =====> useMemo <=====
  const totalTarefas = useMemo(()=> tarefas.length, [tarefas]);

  
  // =====> useCallback <=====
  const handleAdd = useCallback(()=> {
    setTarefas([...tarefas, input]);
    setInput('');
  }, [input, tarefas]);


  return (
    <div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
      <br/>
      <strong>Você tem {totalTarefas} tarefas!</strong><br/>
      <input 
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default App