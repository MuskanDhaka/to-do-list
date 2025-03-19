import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@style/style.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import AppRouter from "./router/index";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />  
    </Provider>
  </StrictMode>
);
