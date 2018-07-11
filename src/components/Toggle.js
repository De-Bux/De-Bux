/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React from 'react';
import DropDown from './DropDown';

const Toggle = (props) => {
  const { treeType, dropDownHandleClick, handleClick } = props;
  return (
    <div className='toggle'>
      <span>{ treeType }</span>
      <DropDown dropDownHandleClick = { dropDownHandleClick }/>
      <div className="buttonDiv">
        {treeType === 'Components:' && 
          <button className="button" onClick={()=>handleClick('dom')}>DOMs</button>}
        {treeType === 'Components:' && 
          <button className="button" onClick={()=>handleClick('component')}>Components</button>} 
      </div>
    </div>
  );
};

export default Toggle;