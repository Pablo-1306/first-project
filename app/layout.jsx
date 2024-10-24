import { CssBaseline, ThemeProvider } from "@mui/material";
import localFont from "next/font/local";
import { theme } from "./styles/global-theme";
import AppbarGlobal from "./components/appbar";
import FooterGlobal from "./components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "EduTrack",
  description: "Edu Track App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppbarGlobal />
          {children}
          <FooterGlobal />
        </ThemeProvider>
      </body>
    </html>
  );
}