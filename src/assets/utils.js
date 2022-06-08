// 檢查是不是純物件
const hasOwn = Object.prototype.hasOwnProperty
export const isPlainObject = function isPlainObject(obj) {
  let proto, Ctro
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return false
  }
  proto = Object.getPrototypeOf(obj)
  if (!proto) {
    return true
  }
  Ctro = hasOwn.call(proto, 'constructor') && proto.constructor
  return typeof Ctro === 'function' && Ctro === Object
}

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

// 日期格式化
export const formatTime = (time, template) => {
  if (typeof time !== 'string') {
    time = new Date().toLocaleString('zh-TW', { hour12: false })
  }
  if (typeof template !== 'string') {
    template = '{0}年{1}月{2}日 {3}:{4}:{5}'
  }

  // 解析年月日等資訊
  let arr = []

  if (/^\d{8}$/.test(time)) {
    const [, $1, $2, $3] = /^(\d{4})(\d{2})(\d{2})$/.exec(time)
    arr.push($1, $2, $3)
  } else {
    arr = time.match(/\d+/g)
  }

  // 把獲取的資料替換成模板
  return template.replace(/\{(\d+)\}/g, (_, $1) => {
    let item = arr[$1] || '00'
    if (item.length < 2) item = '0' + item
    return item
  })
}
