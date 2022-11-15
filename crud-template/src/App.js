import { SnackbarProvider } from 'notistack';
import BasicAppBar from './components/BasicAppBar';
import Crud from './components/Crud';
import { CrudProvider } from './context/CrudContext';
import { StyleProvider } from './context/StyleContext';

function App() {
  return (
    <div>
      <StyleProvider>
        <BasicAppBar />
        <SnackbarProvider maxSnack={3}>
          <CrudProvider>
            <Crud />
          </CrudProvider>
        </SnackbarProvider>
      </StyleProvider>
    </div>
  );
}

export default App;
