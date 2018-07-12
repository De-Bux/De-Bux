/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React from 'react';
import StateAndProps from './StateAndProps';

const InfoWindow = (props) => {
  const { allStateAndPropsData } = props;
  const stateAndPropsList = allStateAndPropsData.map((propObj, index) => {
    return <StateAndProps stateAndProps={propObj} key={'stateAndProps'+index}/>
  });
  
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