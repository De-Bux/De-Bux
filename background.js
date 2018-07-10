/*  ************************************************************************
 * Created by Wontae Han, Alejandro Romero, Shafayat Alam and Jeff Schrock.
 * Copyright © 2018 De-Bux. All rights reserved.
 **************************************************************************/

const connections = {};

chrome.extension.onConnect.addListener((devToolsConnection) => {
  console.log('connected to devToolsConnections');
  var devToolsListener = (message, sender, sendResponse) => {
    chrome.tabs.executeScript(message.tabId, { file: 'content-script.js' });
  };
  devToolsConnection.onMessage.addListener(devToolsListener);
  devToolsConnection.onDisconnect.addListener(() => {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});

chrome.extension.onConnect.addListener(function (port) {
  let extensionListener = (message, sender, res) => {
    if (message.name == 'connect' && message.tabId) {
      chrome.tabs.sendMessage(message.tabId, message);
      connections[message.tabId] = port;
      return;
    }
  };
  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(extensionListener);
    let tabs = Object.keys(connections);
    for (let i = 0; i < tabs.length; i += 1) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]];
        break;
      }
    }
  });
});

chrome.extension.onMessage.addListener(function (req, sender, res) {
  if (sender.tab) {
    let tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(req);
    }
  }
  return true;
});
