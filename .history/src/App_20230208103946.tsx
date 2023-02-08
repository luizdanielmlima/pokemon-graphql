import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Test from './components/Test/Test';
import RootPage from './pages/Root/Root';

function App() {
  return (
    <BrowserRouter>
      <RootPage />
    </BrowserRouter>
  );
}

export default App;
