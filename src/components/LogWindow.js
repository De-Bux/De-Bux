/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React from 'react';
import Logs from './Logs';

const LogWindow = (props) => {
  const { memory, handleClickLog } = props;
  return (
    <div className="logWindow">
      Logs:
      <div className='infoWindowDisplay'>
        <Logs memory={memory} handleClickLog={handleClickLog}/>
      </div>
    </div>
  );
};

export default LogWindow;