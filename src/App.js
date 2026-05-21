import './App.css';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import LovePage from './components/LovePage';

function App() {
  return <div className="bg-purple-900">
    <ThemeProvider theme={createTheme()}>
      <LovePage></LovePage>
    </ThemeProvider>
  </div>
}

export default App;