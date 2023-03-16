module.exports = {
  "plugins": {
    "postcss-pxtorem": {
      rootValue: 37.5, // Vant 官方根字体大小是 37.5，根元素字体大小
      propList: ['*'],  // 可以从px更改到rem的属性
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    }
  }
}