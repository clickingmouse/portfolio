import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import List from "./components/List";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <h1>Hello</h1>
        <List />
      </div>
    </Provider>
  );
}

export default App;
