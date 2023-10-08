import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react'




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId="72db9cca8ad98218e0112beaa945a1a2"
      activeChain="mumbai"
    >
      <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;