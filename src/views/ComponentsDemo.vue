<template>
  <div class="components-demo">
    <div class="button-container">
      <van-button type="primary" round>主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <van-button type="success" disabled>禁用按钮</van-button>
      <van-button plain type="primary" to="/home">跳转首页</van-button>
    </div>

    <div class="calendar-container">
      <calendar-select></calendar-select>
    </div>

    <div class="overlay-container">
      <van-button type="primary" text="显示遮罩层" @click="show = true" />
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
          <div class="block">111</div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CalendarSelect from "../components/Common/CalendarSelect.vue";
const show = ref(false);
</script>

<style lang="less" scoped>
@import url("../config/custom.less");
.components-demo {
  min-height: 100%;
  padding: 12px;
  background-color: #f5f5f5;
  .button-container {
    width: 90%;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid @primary;
    border-radius: 3px;
    .van-button {
      margin: 2px 5px;
    }
  }
  .calendar-container {
    margin: 10px auto;
  }
}
</style>