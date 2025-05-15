import './App.css';
import Angklung from './components/Angklung';
import Footer from './components/Footer';
import Header from './components/Header';
import AngklungApp from './components/tone/Tonev2';


function App() {
  return (
    <div className="App bg-amber-300">
      <Header />
      {/* <Angklung /> */}
      <AngklungApp />
      <Footer />
    </div>
  );
}

export default App;
