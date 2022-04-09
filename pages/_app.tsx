import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/theme";
import AuthProvider from "../lib/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <div className="font-sans">
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
