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
    if(this.props.displayType === 'Tree') {
      if(this.props.treeData) {
        displayTree.push(<D3Tree 
                          key={'compTree'} 
                          treeData = {this.props.treeData} 
                          onMouseOver={this.props.onMouseOver} 
                          treeOrientation={this.props.treeOrientation}/>);
      }
        if(this.props.storeData && this.props.storeData.length) {
          displayTree.push(
            <D3Tree 
              key={'storeTree'} 
              storeTreeData = {this.props.storeData} 
              onMouseOverStore={this.props.onMouseOverStore} 
              onMouseOutStore={this.props.onMouseOutStore}
              treeOrientation={this.props.treeOrientation}/>);
        }
    } else {
      if(this.props.stateAndProps) {
        stateAndPropsList = this.props.stateAndProps.map((propObj, index)=>{
          return <StateAndProps stateAndProps={propObj} key={index} />
        });
      }
      if(this.props.stateAndPropsStore){
        stateAndPropsList = this.props.stateAndPropsStore.map((propObj, index)=>{
          return <StateAndProps stateAndProps={propObj} key={index} />
        });
      }
    }

    return (
      <div className="chartWindow" style={{width:this.state.width}} >
        <Toggle 
        treeType={this.props.treeType} 
        treeData={this.props.treeData} 
        dropDownHandleClick={this.props.dropDownHandleClick}
        handleClick={this.props.handleClick}/>
        <div className="chartWindowDisplay">
          {displayTree}
          {stateAndPropsList}
        </div>
      </div>
    );
  }
};

export default ChartWindow;