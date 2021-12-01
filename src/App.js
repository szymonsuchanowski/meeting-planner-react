import ReactDOM from 'react-dom';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.querySelector('#root'));
