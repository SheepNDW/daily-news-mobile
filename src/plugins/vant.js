import { Button, Swipe, SwipeItem } from 'vant'

export default {
  install(app) {
    app.use(Button)
    app.use(Swipe)
    app.use(SwipeItem)
  }
}
