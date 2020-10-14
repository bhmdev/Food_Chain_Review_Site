import React from "react"
import { Route, BrowserRouter } from "react-router-dom"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import NavBar from "./NavBar"

const App = props => {
  return (
    <BrowserRouter>
      <Route path="/foodchains" component={NavBar} />
      <Route exact path="/" component={NavBar}>
        <Redirect to="/foodchains" />
      </Route>
    </BrowserRouter>
  )
}

export default App
