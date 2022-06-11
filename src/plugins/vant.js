import {
  Swipe,
  SwipeItem,
  Divider,
  Skeleton,
  Lazyload,
  Loading,
  Icon,
  NavBar,
  Form,
  Field,
  CellGroup,
  Button,
  Cell,
  Uploader,
  SwipeCell,
  Empty
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
    app.use(NavBar)
    app.use(Form)
    app.use(Field)
    app.use(CellGroup)
    app.use(Button)
    app.use(Cell)
    app.use(Uploader)
    app.use(SwipeCell)
    app.use(Empty)
  }
}
