/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React from 'react';

const DropDown = (props) => {
  const { dropDownHandleClick } = props;
  return (
    <div className="dropdown">
      <span><i className="arrowDown"></i></span>
      <div className="dropdown-content">
        <p onClick={()=>dropDownHandleClick('Tree')}>Tree Chart</p>
        <p onClick={()=>dropDownHandleClick('Raw')}>Raw Data</p>
      </div>
    </div>
  );
};

export default DropDown;