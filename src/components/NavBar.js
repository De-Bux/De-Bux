/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React, { Component } from 'react';
import Logo from '../img/DebuxLogo48.png'
import Tree from 'react-d3-tree';
// const NavBar = (props) => {
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = 'navBar'>
        <span>De-Bux</span>
        <img className = 'logo' src={Logo} />
        <div class="options">
          <div onclick="options()" class="optionbtn">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div id="showoption" class="options-content">
            <a onClick={()=>this.props.toggleTreeOrientation('vertical')}>Set Orientation Vertical</a>
            <a onClick={()=>this.props.toggleTreeOrientation('horizontal')}>Set Orientation Horizontal</a>
            <a onClick=''>Display Components Only</a>
            <a onClick=''>Display Store Only</a>
          </div>
        </div>
      </div>
    );
  };
}

export default NavBar;

