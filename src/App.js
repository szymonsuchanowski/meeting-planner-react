import ReactDOM from 'react-dom';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  return (
    <>
      <Calendar />
    </>
  );
};

export default App;

ReactDOM.render(<App />, document.querySelector('#root'));
