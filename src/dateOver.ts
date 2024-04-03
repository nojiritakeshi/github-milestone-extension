const getMilestoneFixedDate = () => {
  // ローカルストレージから取得
  const date = localStorage.getItem('milestone-extension')
  if (!date) {
    console.log('No date found')
    return {}
  }
  return JSON.parse(date) as Record<string, string>
}

// issueのタイトルをカスタムする関数
const editIssueTitle = (parentParentElement: HTMLElement | null | undefined, color: string) => {
  if (!parentParentElement) {
    console.log('No parent parent element found')
    return
  }
  const issueTitleElement: HTMLElement | null = parentParentElement.querySelector(
    '[data-turbo-frame="repo-content-turbo-frame"]',
  )
  if (issueTitleElement) {
    // Link--primaryクラスを外す
    issueTitleElement.classList.remove('Link--primary')
    issueTitleElement.style.color = color
  }
}

export const issueObserver = async () => {
  const date = getMilestoneFixedDate()
  console.log(date)
  // dateの数だけ繰り返す
  // 0.5秒のディレイ
  await new Promise((resolve) => setTimeout(resolve, 500))
  const issueMilestome: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
    '[data-turbo-frame=repo-content-turbo-frame] .css-truncate-target',
  )
  if (!issueMilestome || issueMilestome.length === 0) {
    console.log('No issue milestome found')
    return
  }
  for (const [title, dueDate] of Object.entries(date)) {
    // input type="date"の要素を取得
    issueMilestome.forEach((element) => {
      if (element.textContent?.trim() === title) {
        const parentElement = element.parentElement
        if (!parentElement) {
          console.log('No parent element found')
          return
        }
        const dueDateElement = document.createElement('span')
        // parentElementの子要素にid=milestone_due_on_onlyの要素が存在するかどうか
        if (!parentElement.querySelector('#milestone_due_on_only')) {
          dueDateElement.id = 'milestone_due_on_only'
          dueDateElement.textContent = dueDate
          dueDateElement.style.fontWeight = 'bold'
          parentElement.appendChild(dueDateElement)
        }

        // parentElementのさらに親要素
        const parentParentElement = parentElement.parentElement?.parentElement?.parentElement

        // dueDate = YYYY-MM-DD形式なので日付に変換 -> マイルストーンの期日
        const milestoneFixedDate = new Date(dueDate)
        // 今日の日付
        const today = new Date()
        // 期日が過ぎている場合
        if (milestoneFixedDate < today) {
          // 赤色に変更
          dueDateElement.style.color = 'red'
          element.style.color = 'red'
          editIssueTitle(parentParentElement, 'red')
        } else if (milestoneFixedDate.getDate() === today.getDate()) {
          // 期日が今日の場合
          // 黄色に変更
          dueDateElement.style.color = '#b37500'
          element.style.color = '#b37500'
          editIssueTitle(parentParentElement, '#b37500')
        }
      }
    })
  }
}
