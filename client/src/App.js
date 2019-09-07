import React, { Component, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import List from "./components/List";
import { Provider } from "react-redux";
import store from "./store";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    console.log("aaa");
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <h1>Hello</h1>

            <ItemModal />
            <List />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
