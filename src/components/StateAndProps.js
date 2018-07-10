/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React from 'react';

const stateAndProps = (props) => {
  return (
    <pre className='stateAndProps'>{JSON.stringify(props.stateAndProps, undefined, 2)}</pre>
  )
}

export default stateAndProps;