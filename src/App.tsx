import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RootPage from './pages/Root/Root';

function App() {
  return (
    <BrowserRouter>
      <RootPage />
    </BrowserRouter>
  );
}

export default App;
