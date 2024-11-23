import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Component/Redux/store.jsx";

const GOOGLE_CLIENT_ID = "499388976091-kjmi523asf6feetdn8b3mht864lnsjum.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);