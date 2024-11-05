import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import localFont from "next/font/local";
import { theme } from "./styles/global-theme";
import AppbarGlobal from "./components/appbar";
import FooterGlobal from "./components/footer";
import { ReviewProvider } from "./contexts/ReviewContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/SessionContext";
import { CategoryProvider } from "./contexts/category-context";
import { OrderProvider } from "./contexts/OrderContext";
import { ProductProvider } from "./contexts/ProductContext";

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
  title: "Atemporal",
  description: "Clothing for the future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@100..900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <ProductProvider>
              <CategoryProvider>
                <ReviewProvider>
                  <OrderProvider>
                    <CartProvider>
                      <CssBaseline />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          minHeight: "100vh",
                        }}
                      >
                        <AppbarGlobal />
                        {children}
                        <FooterGlobal />
                      </Box>
                    </CartProvider>
                  </OrderProvider>
                </ReviewProvider>
              </CategoryProvider>
            </ProductProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
