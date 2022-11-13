import { SnackbarProvider } from 'notistack';
import Crud from './components/Crud';
import { CrudProvider } from './context/CrudContext';

function App() {
  return (
    <div>
      <SnackbarProvider maxSnack={3}>
        <CrudProvider>
          <Crud />
        </CrudProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
