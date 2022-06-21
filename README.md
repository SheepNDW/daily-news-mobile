# 知乎日報手機板仿作
使用 Vue3 + Vant 搭建一個手機端新聞日報網頁

![](./public/demo/news-demo1.gif)
![](./public/demo/news-demo2.gif)

## 使用技術

* Vue3
* Vite
* Pinia
* Vant3
* axios

## 簡介

### 路由設計

| path | 元件 (功能) | 級別 |
| -------- | -------- | -------- |
| / | 首頁 | 1級 |
| /detail | 詳情 | 1級 |
| /login | 登入 | 1級 |
| /person | 個人資訊 | 1級 |
| /store | 收藏 | 1級 |
| /update | 修改個人資訊 | 1級 |

### 筆記

使用 Object.freeze 阻止響應式優化性能
> newsList 和 bannerList 的狀態在請求回來後都只需要進行讀取即可，不需要再將底下的層級進行響應式監聽。

`index.vue`
```javascript
getNewsLatest().then((data) => {
  const { date, stories, top_stories } = data
  today.value = date
  newsList.value.push(
    Object.freeze({
      date,
      stories
    })
  )
  bannerList.value = Object.freeze(top_stories)
})
```
