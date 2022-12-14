import { useMediaQuery } from '@mui/material';
import { createContext, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../components/Themes';

const StyleContext = createContext();

const StyleProvider = ({ children }) => {
  /* Media Querys states */
  const mediaQ1024 = useMediaQuery('(min-width: 1025px)');
  const mediaQ768 = useMediaQuery('(min-width: 769px)');
  const mediaQ560 = useMediaQuery('(min-width: 561px)');
  const [darkMode, setDarkMode] = useState(false);

  if (darkMode) {
    document.querySelector('body').classList.remove('light-theme');
    document.querySelector('body').classList.add('dark-theme');
  } else {
    document.querySelector('body').classList.add('light-theme');
    document.querySelector('body').classList.remove('dark-theme');
  }

  const data = {
    mediaQ1024,
    mediaQ768,
    mediaQ560,
    darkMode,
    setDarkMode,
  };

  return (
    <StyleContext.Provider value={data}>
      <ThemeProvider theme={true ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </StyleContext.Provider>
  );
};

export { StyleProvider };
export default StyleContext;
