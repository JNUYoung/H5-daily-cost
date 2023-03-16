<template>
  <!-- 
  主页中的每个日期的 账单记录卡片 
 -->
  <van-cell-group class="item">
    <!-- 卡片头部 -->
    <div class="header-date">
      <div>{{ bill.date }}</div>
      <div class="money">
        <span><b>支</b>{{ expense.toFixed(2) }}</span>
        <span><b>收</b>{{ income.toFixed(2) }}</span>
      </div>
    </div>
    <!-- 卡片主体 -->
    <!--
      goToDetail方法跳转到对应的账单详情页面，并且将账单的id属性携带在路由的query参数中
      账单详情页的组件向服务器请求对应id的账单数据并渲染到模板中
      @click="goToDetail(item)"
      -->
    <van-cell
      :class="{ expense: item.pay_type == 1, income: item.pay_type == 2 }"
      v-for="item in bill.bills"
      :key="item.id"
      @click="goToDetail(item)"
      :title="item.type_name"
      :value="`${item.pay_type == 1 ? '-' : '+'}${item.amount}`"
      :label="`${$filters.transTime(item.date)}${
        item.remark ? ' | ' + item.remark : ''
      }`"
    />
  </van-cell-group>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  bill: {
    type: Object,
    default: {}
  }
})

const income = ref(0)
const expense = ref(0)
const router = useRouter()

// 根据每条账单数据的pay_type属性判断是支出还是收入
income.value = props.bill.bills.filter((item) => item.pay_type === 2).reduce((prev, cur) => prev + parseFloat(cur.amount), 0)
expense.value = props.bill.bills.filter((item) => item.pay_type === 1).reduce((prev, cur) => prev + parseFloat(cur.amount), 0)

// 将点击的账单条目的id作为路由的query参数
const goToDetail = (item) => {
  router.push({
    path: '/detail',
    query: {
      id: item.id
    }
  })
}
</script>

<style lang='less' scoped>
@import url("../config/custom.less");
.item {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  .header-date {
    height: 60px;
    display: flex;
    background-color: #f9f9f9;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    div {
      color: @color-text-base;
    }
    .money {
      span {
        margin-left: 20px;
        b {
          color: @color-text-caption;
          font-weight: normal;
          background-color: #f5f5f5;
          padding: 3px;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
<style lang='less'>
@import url("../config/custom.less");
.expense {
  .van-cell__value {
    color: @color-text-base!important;
  }
}
.income {
  .van-cell__value {
    color: @text-warning!important;
  }
}
</style>