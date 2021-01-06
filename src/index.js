import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { useLocalStore } from "mobx-react";

export const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    global: null,
    countries: [],
    country: null,
  }));

  return (
    <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
  );
};

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
