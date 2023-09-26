import './App.css';
import StockList from './components/StockList.jsx'
function App() {
  return (
    <div className="App">
      <h2 style={{ color: 'beige' }}>Stock App</h2>
      <StockList></StockList>
      <div style={{ marginTop: '50px' }}>
        Portfolio : <a href="https://kalangeatharva2610.web.app/">Resume/Portfolio</a>
      </div>
    </div>
  );
}

export default App;
