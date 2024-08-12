import './App.css';
import Angklung from './components/Angklung';
import Footer from './components/Footer';
import Header from './components/Header';


function App() {
  return (
    <div className="App bg-amber-300">
      <Header />
      <Angklung />
      <Footer />
    </div>
  );
}

export default App;
