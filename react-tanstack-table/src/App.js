import { Paper } from '@mui/material';
import React from 'react';
import Table from './components/Table';
import { StyleProvider } from './context/StyleContext';

const App = () => {
  return (
    <div>
      <StyleProvider>
        <Paper>
          <Table />
        </Paper>
      </StyleProvider>
    </div>
  );
};

export default App;
