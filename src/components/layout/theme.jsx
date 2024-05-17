// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF8C00', // Mandarina
    },
    secondary: {
      main: '#C0C0C0', // Plata
    },
    background: {
      default: '#FFFFFF', // Blanco
      paper: '#FFFFFF', // Blanco
    },
    text: {
      primary: '#000000', // Negro
      secondary: '#C0C0C0', // Plata
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000', // Negro
        },
      },
    },
  },
});

export default theme;
