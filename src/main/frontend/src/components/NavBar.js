import React, {useState, useEffect} from 'react'
import {Route, Switch, BrowserRouter, Link} from "react-router-dom"
import FoodChainShow from "./FoodChainShow.js"

const NavBar = (props) => {
  let FoodChainForm = null
  let FoodChainsContainer = null

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="dropdown menu" data-dropdown-menu>
            <li className="menu-text">Food Chains</li>
            <li>
              <Link to="/foodchains">Home</Link>
            </li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li><input type="search" placeholder="Search"/></li>
            <li>
              <button type="button" className="button">Search</button>
            </li>
          </ul>
        </div>
      </div>

      <Switch>
        <Route exact path="/foodchains" component={FoodChainsContainer} />
        <Route exact path="/foodchains/:id" component={FoodChainShow} />
        <Route exact path="/foodchains/new" component={FoodChainForm} />
      </Switch>
    </>
  )
}

export default NavBar