import React from 'react'
import {Route, Switch, Link} from "react-router-dom"
import FoodChainShow from "./FoodChainShow.js"
import FoodChainForm from "./FoodChainForm.js"
import FoodChainsContainer from "./FoodChainContainer";
import ReviewTable from "./ReviewTable";
import FoodChainTable from "./FoodChainTable";

const NavBar = (props) => {

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="dropdown menu" data-dropdown-menu>
            <li className="menu-text">Food Chains</li>
            <li>
              <Link to="/foodchains">Home</Link>
            </li>
            <li>
              <Link to="/foodchains/new">Food Review Form</Link>
            </li>
            <li>
              <Link to="/foodchains/admin_reviews">Reviews Table</Link>
            </li>
            <li>
              <Link to="/foodchains/admin">Admin</Link>
            </li>
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
        <Route exact path="/foodchains/new" component={FoodChainForm} />
        <Route exact path="/foodchains/admin_reviews" component={ReviewTable} />
        <Route exact path="/foodchains/admin" component={FoodChainTable} />
        <Route exact path="/foodchains/:id" component={FoodChainShow} />
      </Switch>
    </>
  )
}

export default NavBar