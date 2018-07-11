/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import D3Tree from '../components/D3Tree';
import InfoWindow from '../components/InfoWindow';
import LogWindow from '../components/LogWindow';
import '../styles/App.css';
import NavBar from '../components/NavBar';
import ChartWindow from '../components/ChartWindow';
import MainDisplay from '../components/MainDisplay';
import Tree from 'react-d3-tree';
import { throttle } from 'lodash';

let curData;
let logMode = false;
//styles
document.body.style = 'background: #242d3d;';

// Create React App Component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: null, 
      storeHistory: [],
      stateAndProps: [],
      stateAndPropsStore: [],
      memory: [],
      displayWindow: 'all',
      treeOrientation: 'vertical',
    };
    chrome.devtools.panels.create(
      'debux',
      null, // icon
      'devtools.html',
      () => {
        const port = chrome.extension.connect({ name: 'debux' });
        port.postMessage({
          name: 'connect',
          tabId: chrome.devtools.inspectedWindow.tabId,
        });
        port.onMessage.addListener((msg) => {
          if (!msg.data) return; // abort if data not present, or if not of type object
          if (typeof msg !== 'object') return;
          if(JSON.stringify(curData) !== JSON.stringify(msg)) {
            curData = msg;
            logMode = false;
            clearInterval(this.update);
            this.update = 0;    
            this.update = setInterval( () => this.updateTree(), 100);
          }
        });
      }
    );
  }
  
  makePropsData = (data, arr) => {
    if (data.name === undefined) return;
    const propObjs = {
      Component: data.name,
      State: data.state,
      Props: data.props,
    }
    if (data.isDOM) {
      data.children.forEach(child => {
        this.makePropsData(child, arr);
      });
    } else {
      arr.push(propObjs);
      data.children.forEach(child => {
        this.makePropsData(child, arr);
      });
    }
  }
  
  makeTreeData = (data, arr) => {
    if (data.name === undefined) return;
    const newObj = {
      name: data.name,
      children: [],
      id: data.id,
      isDOM: data.isDOM,
      state: data.state,
      props: data.props,
    };
    arr.push(newObj);
    data.children.forEach((child) => {
      this.makeTreeData(child, newObj.children);
    });
  }

  filterDOM = (data, arr) => {
    if (data.name === undefined) return;
    const newObj = {
      name: data.name,
      children: [],
      id: data.id,
      isDOM: data.isDOM,
      state: data.state,
      props: data.props,
    };

    if (data.isDOM) {
      data.children.forEach((child) => {
        this.filterDOM(child, arr);
      });
    } else {
      arr.push(newObj);
      data.children.forEach((child) => {
        this.filterDOM(child, newObj.children);
      });
    }
  }
  // Using react global hook store prop
  storeDataToTree = (data, arr) => {
    let storeStart = {
      name : 'Store',
      children : []
    };
    if(typeof data === 'object' && !Array.isArray(data)){
      for(let prop in data) {
        let newObj = {
          name: prop,
          children: []
        }
        this.recStore(data[prop], newObj.children);
        storeStart.children.push(newObj);
      }
      arr.push(storeStart);
    } else {
      console.log('Redux store does not exist.');
    }
  }

  recStore = (obj, child) => {
    if(!obj) return;
    if(Array.isArray(obj)) {
      // 
    }
    else if(typeof obj === 'object') {
      for(let key in obj) {
        if(Array.isArray(obj[key])) {
          let newObj = {
            name: '',
            children: []
          };
          obj[key].forEach((el)=>{
            let newObj2 = {
              name: key,
              children: [],
              detail: el,
            }
            if(typeof el === 'object') this.recStore(el, newObj2.children);
            newObj.children.push(newObj2);
          });
          child.push(newObj);
        } else if(typeof obj[key] === 'object') {
          let newObj = {
            name: key,
            children: [],
            detail: {},
          };
          newObj.detail[key] = obj[key];
          for(let prop in obj[key]) {
            let newObj2 = {
              name: prop,
              children: [],
              detail: obj[key][prop],
            };
            if(typeof obj[key][prop] === 'object') this.recStore(obj[key][prop], newObj2.children);
            newObj.children.push(newObj2);
          }
          child.push(newObj);
        } else {
          let newObj = {
            name: key,
            children: [],
            detail: {},
          };
          newObj.detail[key] = obj[key]; 
          child.push(newObj);
        }
      }
    } else {
      
    }
  }

  handleClick = (str) => {
    clearInterval(this.update);
    this.update = 0;
    this.update = setInterval( () => this.updateTree(str), 100);
  }

  handleClickLog = (stateData) => {
    clearInterval(this.update);
    this.update = 0;
    logMode = true;
    this.setState({
      treeData: stateData.treeData, 
      storeHistory: stateData.storeHistory,
      stateAndProps: stateData.stateAndProps,
      stateAndPropsStore: stateData.stateAndPropsStore,
    });
  }

  treeOrientation = (orientation) => {
    this.setState({
      treeOrientation: orientation,
    });
  }

  clickDisplay = (str) => {
    this.setState({
      displayWindow: str
    });
  }

  updateTree = throttle((str) => {
    if(curData) {
      if(curData.data) {
        let updateData = curData.data[0];
        let treeData = [];
        let propsData = [];
        if(str === 'dom') this.makeTreeData(updateData, treeData);
        else if(str === 'component') this.filterDOM(updateData, treeData);
        else {
          this.filterDOM(updateData, treeData);
          this.makePropsData(updateData, propsData);
        }
        if(treeData.length) {
          this.setState({
            treeData: treeData,
          });
        }
        if(propsData.length) {
          this.setState({
            stateAndProps: propsData,
          });
        }
      }
      if(curData.store){
        let storeData = [];
        this.storeDataToTree(curData.store, storeData);
        if(storeData.length) {
          this.setState({
            storeHistory: storeData,
            stateAndPropsStore: [curData.store],
          });
        }
      }
    }
  }, 100);

  componentWillUnmount() {
    clearInterval(this.update);
    this.update = 0;
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if(JSON.stringify(this.state.storeHistory) !== JSON.stringify(nextState.storeHistory)) {
      let updateMemory = this.state.memory.slice();
      let memoryObj = {};
      memoryObj.state = Object.assign({}, nextState);
      memoryObj.count = updateMemory.length +1;
      updateMemory.push(memoryObj);
      if(!logMode) {
        this.setState({
          memory: updateMemory
        });
      }
      clearInterval(this.update);
      this.update = 0;
    }    
    return JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  render() {
    return (
      <div className='appWindow'>
        <NavBar clickDisplay={this.clickDisplay} treeOrientation={this.treeOrientation}/>
        <MainDisplay 
          treeData={this.state.treeData} 
          storeData={this.state.storeHistory} 
          memory={this.state.memory} 
          stateAndProps={this.state.stateAndProps} 
          stateAndPropsStore={this.state.stateAndPropsStore}
          handleClickLog={this.handleClickLog}
          handleClick={this.handleClick}
          displayWindow={this.state.displayWindow}
          treeOrientation={this.state.treeOrientation}/>
        <br />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;