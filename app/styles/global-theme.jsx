"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0066F5",
    },
    secondary: {
      main: "#2DEB66",
    },
    third: {
        main: '#2DAFEB',
    },
    lighter: {
        main: '#C5DBEB'
    },
    cards:{
        main: '#0E4AFA'
    },
    footer :{
        main: "#000"
    },
    text: {
      light: "#003675",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});
