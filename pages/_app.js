import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { CartContextProvider } from "@/components/CartContext";

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eeee;
    padding: 0;
    margin: 0;
    font-family: "Poppins", sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Helmet>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Indie+Flower&family=Shadows+Into+Light&family=Space+Grotesk:wght@300..700&display=swap');`}
        </style>
      </Helmet>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
