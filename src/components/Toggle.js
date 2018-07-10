/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React from 'react';
import DropDown from './DropDown';


const Toggle = (props) => {
  return (
    <div className='toggle'>
      <span>{props.treeType}</span>
      <DropDown dropDownHandleClick={props.dropDownHandleClick}/>
      <div className="buttonDiv">
        {props.treeType === 'Components:' && <button className="button" onClick={()=>props.handleClick('dom')}>DOMs</button>}
        {props.treeType === 'Components:' && <button className="button" onClick={()=>props.handleClick('component')}>Components</button>} 
      </div>
    </div>
);
};

export default Toggle;