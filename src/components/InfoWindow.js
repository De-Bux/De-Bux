/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React from 'react';
import StateAndProps from './StateAndProps';

const InfoWindow = (props) => {
  let stateAndPropsList = null;

  if (props.allStateAndPropsData.length) {
    stateAndPropsList = props.allStateAndPropsData.map((propObj, index) => {
      return <StateAndProps stateAndProps={propObj} key={index}/>
    });
  }
  
  return (
    <div className='infoWindow'> 
      Detailed Info:
      <div className='infoWindowDisplay'>
        {stateAndPropsList}
      </div>
    </div>
  )
};

export default InfoWindow;