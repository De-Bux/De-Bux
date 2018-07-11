/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React, { Component } from 'react';
import Toggle from './Toggle'
import D3Tree from './D3Tree';
import StateAndProps from './StateAndProps';

// const ChartWindow = (props) => {
class ChartWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '50%',
    };
  }
  componentDidMount() {
    let updateWidth = this.state.width;
    if(this.props.displayWindow === 'all') {
      updateWidth = '50%';
    } else if(this.props.displayWindow === 'component') {
      updateWidth = '100%';
    } else if(this.props.displayWindow === 'store') {
      updateWidth = '100%';
    }
    this.setState({
      width: updateWidth
    });
  }

  render() {
    let displayTree = [];
    let stateAndPropsList = [];
    const { treeData, treeType, storeData, displayType, stateAndProps, stateAndPropsStore, handleClick, dropDownHandleClick, onMouseOver, onMouseOverStore, onMouseOutStore, treeOrientation  } = this.props;
    if(displayType === 'Tree') {
      if(treeData) {
        displayTree.push(<D3Tree 
                          key={'compTree'} 
                          treeData = {treeData} 
                          onMouseOver={onMouseOver} 
                          treeOrientation={treeOrientation}/>);
      }
        if(storeData && storeData.length) {
          displayTree.push(
            <D3Tree 
              key={'storeTree'} 
              storeTreeData = {storeData} 
              onMouseOverStore={onMouseOverStore} 
              onMouseOutStore={onMouseOutStore}
              treeOrientation={treeOrientation}/>);
        }
    } else {
      if(stateAndProps) {
        stateAndPropsList = stateAndProps.map((propObj, index)=>{
          return <StateAndProps stateAndProps={propObj} key={index} />
        });
      }
      if(stateAndPropsStore){
        stateAndPropsList = stateAndPropsStore.map((propObj, index)=>{
          return <StateAndProps stateAndProps={propObj} key={index} />
        });
      }
    }

    return (
      <div className="chartWindow" style={{width:this.state.width}} >
        <Toggle 
        treeType={treeType} 
        treeData={treeData} 
        dropDownHandleClick={dropDownHandleClick}
        handleClick={handleClick}/>
        <div className="chartWindowDisplay">
          {displayTree}
          {stateAndPropsList}
        </div>
      </div>
    );
  }
};

export default ChartWindow;