import RoutesApp from './routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
      {/* assim chamamos o toasstify e passamos a velocidade em que se vai fechar */}
      <ToastContainer autoClose={3000}/>
      <RoutesApp />
    </div>
  )
}

export default App;