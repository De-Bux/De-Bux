/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/

let reduxStore;
export const parseFuncName = (func) => {
  const funcStr = `${func}`;
  const match = funcStr.match(/function/);
  if (match == null) return 'func()';
  const firstIndex = match[0] ? funcStr.indexOf(match[0]) + match[0].length + 1 : null;
  if (firstIndex == null) return 'func()';
  const lastIndex = funcStr.indexOf('(');
  const funcName = funcStr.slice(firstIndex, lastIndex);
  if (!funcName.length) return 'func()';
  return `${funcName}()`;
};

export const props16 = (node) => {
  try {
    let result = {};
    const props = node.memoizedProps;
    if(typeof props === 'object') {
      for(let prop in props) {
        const val = props[prop];
        if(typeof val === 'function') { 
          result[prop] = parseFuncName(val);
        } else if(typeof val === 'object') {
          result[prop] = JSON.stringify(val);
        } else {
          result[prop] = val;
        }
      }
    } else {
      result = props;
    }
    return result;
  } catch (e) {
    return {};
  }
};

export const rec16 = (node, arr) => {
  const newObj = {
    name: '',
    children: [],
    state: null,
    props: null,
    id: null,
    isDOM: null,
  };

  if (node.memoizedState) newObj.state = node.memoizedState;
  if (node.memoizedProps) newObj.props = props16(node);
  if (node._debugID) newObj.id = node._debugID;
  if (node.type) {
    if (node.type.name) {
      newObj.name = node.type.name;
      newObj.isDOM = false;
    }
    else {
      newObj.name = node.type;
      newObj.isDOM = true;
    }
  }
  if (node.type && node.type.propTypes && node.type.propTypes.store) reduxStore = node.stateNode.store.getState();

  arr.push(newObj);

  if (node.child != null) rec16(node.child, newObj.children);
  if (node.sibling != null) rec16(node.sibling, arr);
};

export const traverse16 = (virtualDOM) => {
  if (typeof virtualDOM === 'undefined') return;
  const components = [];
  rec16(virtualDOM.current.stateNode.current, components);
  const DebuxData = { data: components, store: reduxStore};
  const clone = JSON.parse(JSON.stringify(DebuxData));
  window.postMessage(clone, '*');
};