import ReactDOM from 'react-dom';
import Calendar from './components/Calendar';

function App() {
  return (
    <>
      <Calendar />
    </>
  );
};

export default App;

ReactDOM.render(<App />, document.querySelector('#root'));
