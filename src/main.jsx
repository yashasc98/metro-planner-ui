import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { Provider } from 'react-redux';
import { store } from "./redux/store.js";
import "./index.css";
import { gradients } from "./themeUtils";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        backgroundImage:
          props.colorMode === "dark" ? gradients.dark : gradients.light,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
      },
    }),
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
