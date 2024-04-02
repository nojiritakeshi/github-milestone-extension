// eslintをすべて無効化する方法は、以下の通りです。
/* eslint-disable */
chrome.tabs.onUpdated.addListener((_, __, tab) => {
  if (tab.url && tab.id && tab.url.indexOf('https://www.netflix.com') > -1) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['./js/index.js'],
    })
  }
})
