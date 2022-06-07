import {
  Swipe,
  SwipeItem,
  Divider,
  Skeleton,
  Lazyload,
  Loading,
  Icon
} from 'vant'

export default {
  install(app) {
    app.use(Swipe)
    app.use(SwipeItem)
    app.use(Divider)
    app.use(Skeleton)
    app.use(Lazyload, {
      lazyComponent: true
    })
    app.use(Loading)
    app.use(Icon)
  }
}
