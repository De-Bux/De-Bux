/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/

import { traverse16 } from './traverse';

var runDebux = false;
if(!runDebux) {
  const reactGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if(reactGlobalHook) {
    const reactInstances = reactGlobalHook._renderers;
    const instance = reactInstances[Object.keys(reactInstances)[0]];
    let virtualDOM;
    (function setHook() {
      // React fiber (16+)
      if(instance && instance.version) {
        reactGlobalHook.onCommitFiberRoot = (function (onCommitFiberRoot) {
          return function (...args) {
            virtualDOM = args[1];
            traverse16(virtualDOM);
            return onCommitFiberRoot(...args);
          };
        })(reactGlobalHook.onCommitFiberRoot);

      // React 15 or below
      } else if(instance && instance.Reconciler) {
        console.warn('React version(16+) is required to use De-Bux Devtool');
      } else {
        console.warn('React not found, React is required to use De-Bux Devtool');
      }
    })();

    window.addEventListener('debux', () => {
      traverse16(virtualDOM);
    });
  } else {
    console.warn('React devtool is required to use De-Bux Devtool')
  }
 
  runDebux = true;
}
