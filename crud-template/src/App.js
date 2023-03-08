import {SnackbarProvider} from 'notistack';
import TopBar from './components/TopBar';
import Crud from './components/Crud';
import {StyleProvider} from './context/StyleContext';

function App() {
    return (
        <StyleProvider>
            <TopBar />
            <SnackbarProvider maxSnack={3}>
                <Crud />
            </SnackbarProvider>
        </StyleProvider>
    );
}

export default App;
