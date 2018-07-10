/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React from 'react';
const Logs = (props) => {
  const actions = props.memory;
  const dispatchedActions = actions.map((action) =>
    <li className='logs' onClick={()=> props.handleClickLog(action.state)}>Action [{action.count}]</li>
    );
  return (
    <ul>{dispatchedActions}</ul>
  )
}

export default Logs;