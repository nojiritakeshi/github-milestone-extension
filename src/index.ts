import { issueObserver } from './dateOver'
import { registerMilestone } from './milestone'

// data-turbo-bodyのDOMが変更されたとき発火
const targetElement: Element = document.querySelector('body') || new Element()
const observer = new MutationObserver(() => {
  registerMilestone()
  void issueObserver()
})
observer.observe(targetElement, { childList: true, subtree: false })
