// 處理最大寬度
export const handleMaxWidth = () => {
  const HTML = document.documentElement
  const size = parseFloat(HTML.style.fontSize)
  const app = document.querySelector('#app')

  if (size > 75) {
    HTML.style.fontSize = '75px'
    app.style.width = '750px'
    return
  }
  app.style.width = '100%'
}
