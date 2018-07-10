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
    return (
      <div className="mainDiv">
        <div className="rowCols">
          <ChartWindow 
            treeType='Components:' 
            treeData={this.props.treeData} 
            onMouseOver={this.onMouseOver} 
            dropDownHandleClick={this.dropDownHandleClickL} 
            displayType={this.state.displayTreeL} 
            stateAndProps={this.props.stateAndProps}
            handleClick={this.props.handleClick}/>
          <ChartWindow 
            treeType='Store:' 
            storeData={this.props.storeData} 
            onMouseOverStore={this.onMouseOverStore} 
            dropDownHandleClick={this.dropDownHandleClickR} 
            displayType={this.state.displayTreeR} 
            stateAndPropsStore={this.props.stateAndPropsStore}/>
        </div>
        {/* <button className="button" onClick={()=>this.props.handleClick('dom')}>DOMs</button>
        <span> </span>
        <button className="button" onClick={()=>this.props.handleClick('component')}>Components</button> */}
        <span> </span>
        <div className="rowCols">
          <InfoWindow allStateAndPropsData={this.state.datailInfo}/>
          <LogWindow memory={this.props.memory} handleClickLog={this.props.handleClickLog} />
        </div>
      </div>
    );
  }
}

export default MainDisplay;