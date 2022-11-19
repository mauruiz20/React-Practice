import Table from './components/Table';
import { StyleProvider } from './context/StyleContext';

function App() {
  return (
    <>
      <StyleProvider>
        <Table />
      </StyleProvider>
    </>
  );
}

export default App;
