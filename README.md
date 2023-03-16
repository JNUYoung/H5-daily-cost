## 项目介绍

高仿微信记账本 H5 项目

```shell
npm install

npm run serve
```

## 技术栈

Vue3, Vue-Router4, Vant3, Echart, dayjs, Axios, lib-flexible, postcss-pxtorem

## 记录

**1.postcss-pxtorem**

移动端布局方案之一，通过pxtorem实现px单位到rem单位的自动计算。

main.js入口文件引入：

```js
import 'lib-flexible/flexible'
```

项目根目录下创建postcss.config.js文件：

```js
// postcss.config.js
module.exports = {
  "plugins": {
    "postcss-pxtorem": {
      rootValue: 37.5, // 根元素字体大小，即1rem=37.5px ，以375为设计稿宽度
      propList: ['*'],  // 需要进行转换的属性，例如'width', 'height'等
      selectorBlackList: ['.norem'] // className以norem开头的元素不进行rem转换
    }
  }
}
```

如果某一个元素不希望自动转换，可以在其css规则的单位后面添加/no/

```css
height: 100px; /*no*/
```

**2.Vant移动端组件库**

按需引入组件样式，减少代码体积。

**3.路由配置**

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes:[]
})
export default router
```

**4.登录和注册组件的切换**

- 使用v-if结合type判断当前展示登录组件还是注册组件

```html
<van-form class="form-wrap" @submit="onSubmit" v-if="type == 'login'">
    // codes      
</van-form>
<van-form class="form-wrap" @submit="onSubmit" v-else="type == 'register'">
    // codes      
</van-form>
```

- 处理登录和注册的逻辑

```js
const onSubmit = async (values) => {
  try {
    // 登录
    if (type.value == "login") {
      const { data } = await axios.post("/user/login", {
        username: username.value,
        password: password.value,
      });
      localStorage.setItem("token", data.token);    // 本地存储token信息
      window.location.href = "/";    // 跳转到首页
    } else {
      // 注册
      imgCode.value = verifyRef.value.imgCode || "";
      // 判断验证码是否输入正确
      if (verifyRef.value.imgCode.toLowerCase() != verify.value.toLowerCase()) {
        console.log("verifyRef.value.imgCode", verifyRef.value.imgCode);
        Toast.fail("验证码错误");
        return;
      }
      loading.value = true;
      const { data } = await axios.post("/user/register", {
        username: username.value,
        password: password.value,
      });
      Toast.success("注册成功");
      type.value = "login";
      loading.value = false;
    }
  } catch (error) {
    console.log('some thing wrong');
    loading.value = false;
  }
};
```

**5.明细页数据获取**

- getBillList()
- onLoad()
- onRefresh()

**6.统计页数据获取**

```js
const getData = async () => {
  const { data } = await axios.get(`/bill/data?date=${state.currentMonth}`);
  // 总收支
  state.total_expense = data.total_expense;
  state.total_income = data.total_income;
  // 过滤支出和收入
  state.expense_data = data.total_data
    .filter((item) => item.pay_type == 1)
    .sort((a, b) => b.number - a.number); // 过滤出账单类型为支出的项
  state.income_data = data.total_data
    .filter((item) => item.pay_type == 2)
    .sort((a, b) => b.number - a.number); // 过滤出账单类型为收入的项
  setPieChart();
};
```

**7.图片验证码组件**

- VueImageVerify.vue

```js
const choices = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

// 获取canvas元素
const verify = document.getElementById('img-verify-drawing')
// canvas绘制时设置的像素是真实屏幕上的像素点的数目，css设置的像素与dpr有关
// 因此会出现canvas设置像素与画布样式宽高不符的情况
const canvasWidth = verify.width
const canvasHeight = verify.height

// 生成min-max之间的随机整数
const generateRandomNum = (min, max) => {
    return parseInt(min + Math.random() * (max - min))
}

// 生成随机的rgb值
const generateRandomRGB = (min, max) => {
    const red = generateRandomNum(min, max)
    const green = generateRandomNum(min, max)
    const blue = generateRandomNum(min, max)
    return `rgb(${red},${green},${blue})`
}

// draw函数负责在canvas中绘制验证码
const draw = () => {
    // 获取canvas绘制上下文对象
    const ctx = verify.getContext('2d')
    // 1.绘制背景
    ctx.fillStyle = generateRandomRGB(180, 230)
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    let verifyCode = ''
    for (let i = 0; i < 4; i ++) {
        const text = choices[generateRandomNum(0, choices.length - 1)]
        verifyCode += text
        // 字体大小
        const fontSize = generateRandomNum(40, 50)
        // 字体旋转角度
        const deg = generateRandomNum(-30, 30)

        // 绘制文字到画布，展示在不同位置，并且旋转不同角度
        ctx.font = fontSize + 'px Simhei'
        ctx.textBaseline = 'top'
        ctx.fillStyle = generateRandomRGB(80, 150)

        ctx.save()
        ctx.translate(60 * i + canvasWidth / 4, canvasHeight / 2)
        ctx.rotate((deg * Math.PI) / 180)
        ctx.fillText(text, -30 + 15, -30)
        ctx.restore()
    }

    // 随机产生干扰线，通过canvas的路径绘制功能
    for (let i = 0; i < 10; i++) {
        ctx.beginPath()
        ctx.moveTo(generateRandomNum(0, canvasWidth), generateRandomNum(0, canvasHeight))
        ctx.lineTo(generateRandomNum(0, canvasWidth), generateRandomNum(0, canvasHeight))
        ctx.strokeStyle = generateRandomRGB(180, 230)
        ctx.closePath()
        ctx.stroke()
    }

    // 随机绘制干扰点
    for (let i = 0; i < 40; i++) {
        ctx.beginPath()
        ctx.arc(generateRandomNum(0, canvasWidth), generateRandomNum(0, canvasHeight), 1, 0, 2*Math.PI)
        ctx.closePath()
        ctx.fillStyle = generateRandomRGB(150, 200)
        ctx.fill()
    }

    return verifyCode
}

let verifyCode = draw()
```

