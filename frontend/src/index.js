import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
// import { hot } from "react-hot-loader"
import Router from "./Router"
import reducers from "./reducers"

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const WrappedHome = () => (
  <Provider store={store}>
    <Router />
  </Provider>
)

// const HotHome = hot(module)(WrappedHome)

ReactDOM.render(<WrappedHome />, document.getElementById("home"))
