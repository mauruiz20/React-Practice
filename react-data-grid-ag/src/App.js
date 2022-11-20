import Table from './components/Table';
import { CrudProvider } from './context/CrudContext';
import { StyleProvider } from './context/StyleContext';
import TopBar from './components/TopBar';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <>
      <StyleProvider>
        <TopBar />
        <SnackbarProvider maxSnack={3}>
          <CrudProvider>
            <Table />
          </CrudProvider>
        </SnackbarProvider>
      </StyleProvider>
    </>
  );
}

export default App;
