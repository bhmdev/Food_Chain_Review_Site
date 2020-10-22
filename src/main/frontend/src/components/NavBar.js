import React from 'react'
import {Route, Switch, Link} from "react-router-dom"
import FoodChainShow from "./FoodChainShow.js"
import FoodChainForm from "./FoodChainForm.js"
import FoodChainsContainer from "./FoodChainContainer";
import TableContainer from "./TableContainer";
import HomeIcon from '@material-ui/icons/Home';
import TableChartIcon from '@material-ui/icons/TableChart';

const NavBar = (props) => {

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li id="menu-header">
              <Link to="/foodchains">Food Chains</Link>
            </li>
            <li>
              <Link to="/foodchains"><HomeIcon/></Link>
            </li>
            <li>
              <Link to="/foodchains/admin"><TableChartIcon/></Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li>
              <Link to="/foodchains/new">
                <button type="button" className="button" id="add-food-chain-btn">Add a Food Chain</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Switch>
        <Route exact path="/foodchains" component={FoodChainsContainer}/>
        <Route exact path="/foodchains/new" component={FoodChainForm}/>
        <Route exact path="/foodchains/admin" component={TableContainer}/>
        <Route exact path="/foodchains/:id" component={FoodChainShow}/>
      </Switch>
    </>
  )
}

export default NavBar