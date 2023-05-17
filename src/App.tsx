import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Toaster } from "react-hot-toast";

const theme = extendTheme({
  colors: {
    primaryColor: "#DD6B20",
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
    <Toaster />
  </ChakraProvider>
);
