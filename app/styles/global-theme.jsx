"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
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
        main: "#D3D3D3"
    },
    text: {
      dark: "#000000",
      light: "#FFFFFF"
    },
  },
  typography: {
    fontFamily: "Space Mono, monospace",
  },
});
