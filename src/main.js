import { createApp } from 'vue'
import App from './App.vue'
import dayjs from 'dayjs'
import 'lib-flexible/flexible'  // 移动端适配
import router from './router'
import { Button, Tabbar, TabbarItem, Form, Field, Icon, NavBar, Cell, CellGroup, Popup, List, PullRefresh, DatetimePicker, NumberKeyboard, Dialog, Progress, Rate, Divider, Calendar, Overlay } from 'vant';
import 'vant/lib/index.css'; // 引入vant的组件样式
import './index.css'

const app = createApp(App)

// 全局过滤器
app.config.globalProperties.$filters = {
  transTime(date) {
    return dayjs(Number(date)).format('HH:mm')
  },
  transDay(value) {
    return dayjs(value).format('MM-DD')
  },
  transYDM(value) {
    return dayjs(value).format('YYYY-MM-DD HH:mm')
  }
}

app.use(router)
app.use(Tabbar);
app.use(TabbarItem);
app.use(Form)
app.use(Field)
app.use(Button) // 注册组件
app.use(Icon)
app.use(NavBar)
app.use(CellGroup)
app.use(Cell)
app.use(Popup)
app.use(List)
app.use(PullRefresh)
app.use(DatetimePicker)
app.use(NumberKeyboard)
app.use(Dialog)
app.use(Progress)
app.use(Rate)
app.use(Divider)
app.use(Calendar)
app.use(Overlay)

// 国际化
import { Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US';
Locale.use('en-US', enUS)

app.mount('#app')

// dayjs
// console.log(dayjs(new Date()).format('HH:mm'))
// console.log(dayjs(new Date()).format('MM-DD'))
// console.log(dayjs(new Date()).format('YYYY-MM-DD HH:mm'))