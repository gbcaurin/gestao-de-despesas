import App from "./App.jsx";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' para React 18+
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root")); // Cria o root para renderizar

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
