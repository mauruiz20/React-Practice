import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6776D6',
    },
    secondary: {
      main: '#b093e1',
    },
    error: {
      main: '#f50057',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
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
      main: '#4B5DC3',
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
