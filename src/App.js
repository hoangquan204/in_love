import './App.css';
import Router from './routers'
import { ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { getThemeSelector } from './redux/selector';
import { createTheme } from '@mui/material';
import LovePage from './components/LovePage';

function App() {
  const theme = useSelector(getThemeSelector)
  return <div className={`bg-[${theme.palette.containerColor.main}]`}>
    <ThemeProvider theme={createTheme(theme)}>
      <LovePage></LovePage>
    </ThemeProvider>
  </div>
}

export default App;