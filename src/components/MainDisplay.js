/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React, { Component } from 'react';
import ChartWindow from './ChartWindow';
import InfoWindow from './InfoWindow';
import LogWindow from './LogWindow';

class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datailInfo: [],
      displayTreeL: 'Tree', // Default
      displayTreeR: 'Tree', // Dafault
    };
  }

  onMouseOver = (nodeId, evt) => {
    const propObjs = {
      Component: nodeId.name,
      State: nodeId.state,
      Props: nodeId.props,
    }
    this.setState({
      datailInfo: [propObjs]
    });
  }

  onMouseOverStore = (nodeId, evt) => {
    const propObjs = {};
    const detailInfo = nodeId.detail;
    if(detailInfo) {
      for(let key in detailInfo) {
        propObjs[key] = detailInfo[key];
      }
    } else {
      propObjs.name = nodeId.name;
    }
    this.setState({
      datailInfo: [propObjs]
    });
  }

  dropDownHandleClickL = (type) => {
    this.setState({
      displayTreeL: type,
    });
  }
  dropDownHandleClickR = (type) => {
    this.setState({
      displayTreeR: type,
    });
  }

  render() {
    const { onMouseOver, onMouseOverStore, dropDownHandleClickL, dropDownHandleClickR } = this;
    const { datailInfo, displayTreeL, displayTreeR } = this.state;
    const { treeData, stateAndProps, handleClick, displayWindow, treeOrientation, storeData, stateAndPropsStore, memory, handleClickLog } = this.props;
    const componentChartWindow = <ChartWindow 
                                    treeType='Components:' 
                                    treeData={treeData} 
                                    onMouseOver={onMouseOver} 
                                    dropDownHandleClick={dropDownHandleClickL} 
                                    displayType={displayTreeL} 
                                    stateAndProps={stateAndProps}
                                    handleClick={handleClick}
                                    displayWindow={displayWindow}
                                    treeOrientation={treeOrientation}/>;
    const storeChartWindow = <ChartWindow 
                                treeType='Store:' 
                                storeData={storeData} 
                                onMouseOverStore={onMouseOverStore} 
                                dropDownHandleClick={dropDownHandleClickR} 
                                displayType={displayTreeR} 
                                stateAndPropsStore={stateAndPropsStore}
                                displayWindow={displayWindow}
                                treeOrientation={treeOrientation}/>;

    return (
      <div className="mainDiv">
        <div className="rowCols">
          {displayWindow === 'all' && componentChartWindow}
          {displayWindow === 'all' && storeChartWindow}
          {displayWindow === 'component' && componentChartWindow}
          {displayWindow === 'store' && storeChartWindow}
        </div>
        <span> </span>
        <div className="rowCols">
          <InfoWindow allStateAndPropsData={datailInfo}/>
          <LogWindow memory={memory} handleClickLog={handleClickLog} />
        </div> 
      </div>
    );
  }
}

export default MainDisplay;