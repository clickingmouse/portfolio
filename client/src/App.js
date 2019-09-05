import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import List from "./components/List";
function App() {
  return (
    <div className="App">
      <AppNavBar />
      <h1>Hello</h1>
      <List />
    </div>
  );
}

export default App;
