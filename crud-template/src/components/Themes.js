import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff893f',
      dark: '#ea3f11',
      contrastText: '#fff',
    },
    blue: {
      light: '#00b0ff',
      main: '#0091ea',
      dark: '#33a7ee',
      contrastText: '#fff',
    },
    neutral: {
      light: '#64748B50',
      main: '#64748B',
      dark: '#75859C',
      contrastText: '#fff',
    },
    background: {
      main: '#f5f5f5',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f16944',
      dark: '#ea3f11',
      contrastText: '#fff',
    },
    blue: {
      main: '#00b0ff',
      dark: '#33a7ee',
      contrastText: '#fff',
    },
    neutral: {
      light: '#64748B50',
      main: '#64748B',
      dark: '#75859C',
      contrastText: '#fff',
    },
    background: {
      main: '#121212',
    },
  },
});
