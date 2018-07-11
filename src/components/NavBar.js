/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React, { Component } from 'react';
import Logo from '../img/DebuxLogo48.png'

const NavBar = (props) => {
  const { treeOrientationToggle, clickDisplay } = props;
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
          <a onClick={() => treeOrientationToggle('vertical')}>Set Orientation vertical</a>
          <a onClick={() => treeOrientationToggle('horizontal')}>Set Orientation horizontal</a>
          <a onClick={() => clickDisplay('component')}>Display Components Only</a>
          <a onClick={() => clickDisplay('store')}>Display Store Only</a>
          <a onClick={() => clickDisplay('all')}>Display All</a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

