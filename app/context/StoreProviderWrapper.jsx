'use client';

import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/global-theme";
import { StoreProvider } from './StoreContext';
import AppbarGlobal from "../components/appbar";
import FooterGlobal from "../components/footer";
import CssBaseline from "@mui/material/CssBaseline";

export default function StoreProviderWrapper({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <CssBaseline />
        <AppbarGlobal />
        {children}
        <FooterGlobal />
      </StoreProvider>
    </ThemeProvider>
  );
}