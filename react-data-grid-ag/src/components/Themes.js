import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6776D6',
    },
    secondary: {
      main: '#b093e1',
      contrastText: '#fff',
    },
    tertiary: {
      main: '#f50057',
    },
    error: {
      main: '#f44336',
    },
    success: {
      main: '#4caf50',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      contrastText: '#fff',
    },
    info: {
      main: '#0091ea',
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
      paper: '#fff',
    },
    table: {
      main: '#fff',
      rowEven: '#fcfcfc',
      rowOdd: '#fff',
      rowHover: 'rgba(33, 150, 243, 0.1)',
      border: '#dde2eb',
    },
    input: {
      main: '#fcfcfc',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6776D6',
    },
    secondary: {
      main: '#b093e1',
      contrastText: '#fff',
    },
    tertiary: {
      main: '#f50057',
    },
    error: {
      main: '#f44336',
    },
    success: {
      main: '#4caf50',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      contrastText: '#fff',
    },
    info: {
      main: '#0091ea',
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
      paper: '#34343c',
    },
    table: {
      main: '#34343c',
      rowEven: '#222628',
      rowOdd: '#34343c',
      rowHover: 'rgba(33, 150, 243, 0.1)',
      border: 'rgba(88, 86, 82, 0.5)',
    },
    input: {
      main: '#34343c',
    },
  },
});
