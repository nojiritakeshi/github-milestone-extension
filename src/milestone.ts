const getSubmitNewIssueButton = () => {
  const btnElement = document.querySelector('.form-actions button[data-view-component].btn-primary.btn')
  return btnElement
}

const getMilestoneTitle = () => {
  const inputElement: HTMLInputElement | null = document.querySelector(
    'input.form-control.input-lg.input-block.js-quick-submit',
  )
  if (!inputElement) {
    console.log('No input element found')
    return ''
  }
  return inputElement.value || ''
}

const getMilestoneDueDate = () => {
  // input type="date"の要素を取得
  const inputElement: HTMLInputElement | null = document.querySelector('input.form-control#milestone_due_on')
  if (!inputElement) {
    console.log('No input element found')
    return ''
  }
  return inputElement.value || ''
}

export const registerMilestone = () => {
  console.log('move!!!!')
  const btnElement = getSubmitNewIssueButton()
  if (!btnElement) {
    console.log('No submit button found')
    return
  }
  // btnElementがクリックされたとき
  btnElement.addEventListener('click', () => {
    console.log('clicked!!!!')
    const title = getMilestoneTitle()
    const dueDate = getMilestoneDueDate()
    if (!title) return
    // titleがキー、dueDateが値のオブジェクトを作成
    const milestone = { [title]: dueDate }
    const mileStoneExtension = localStorage.getItem('milestone-extension')
    if (mileStoneExtension) {
      // すでにmilestone-extensionが存在する場合
      const registeredMilestoneExtension: Record<string, string> = JSON.parse(mileStoneExtension) as Record<
        string,
        string
      >
      // milestoneを追加
      const newMilestoneExtension = { ...registeredMilestoneExtension, ...milestone }
      localStorage.setItem('milestone-extension', JSON.stringify(newMilestoneExtension))
      return
    }
    localStorage.setItem('milestone-extension', JSON.stringify(milestone))
  })
}
