import {createContext, useContext, useState} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import {darkTheme, lightTheme} from '../components/Themes';

const StyleContext = createContext();

const StyleProvider = ({children}) => {
    /* Estados que controlan las Medias Queries */
    const mediaQ1200 = useMediaQuery('(min-width: 1201px)');
    const mediaQ900 = useMediaQuery('(min-width: 901px)');
    const mediaQ600 = useMediaQuery('(min-width: 601px)');

    /* Modo oscuro (Cacheo en localStorage)*/
    let initialDarkMode = true;
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'light');
    }
    if (localStorage.getItem('theme') === 'light') {
        initialDarkMode = false;
    }

    const [darkMode, setDarkMode] = useState(initialDarkMode);

    if (darkMode) {
        document.querySelector('body').classList.remove('light-theme');
        document.querySelector('body').classList.add('dark-theme');
    } else {
        document.querySelector('body').classList.add('light-theme');
        document.querySelector('body').classList.remove('dark-theme');
    }

    const data = {
        mediaQ1200,
        mediaQ900,
        mediaQ600,
        darkMode,
        setDarkMode,
    };

    return (
        <StyleContext.Provider value={data}>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>
        </StyleContext.Provider>
    );
};

function useStyle() {
    const context = useContext(StyleContext);
    if (context === undefined) {
        throw new Error('useStyle debe usarse dentro de StyleProvider');
    }

    return context;
}

export {StyleProvider, useStyle};
