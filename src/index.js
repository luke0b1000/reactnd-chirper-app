import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
// import reducers from "./reducers/index"; // does this line work as above???

import middleware from "./middleware";

const store = createStore(reducer, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
