/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/

 function injectScript(file, node) {
  const body = document.getElementsByTagName(node)[0];
  const scriptFile = document.createElement('script');
  scriptFile.setAttribute('type', 'text/javascript');
  scriptFile.setAttribute('src', file);
  body.appendChild(scriptFile);
}

window.addEventListener('message', (e) => {
  if (e.source !== window) return;
  chrome.extension.sendMessage(e.data);
});

chrome.extension.onMessage.addListener(() => {
  const newEvent = new Event('debux');
  window.dispatchEvent(newEvent);
});

injectScript(chrome.extension.getURL('/hook.js'), 'body');
