import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes/index';

export default function App() {
  return (
    <BrowserRouter>
      <RoutesApp/>
    </BrowserRouter>
  )
}