<template>
  <div class="calendar-wrap">
    <van-cell title="选择单个日期" :value="date" @click="show = true" />
    <van-calendar v-model:show="show" @confirm="onConfirm" />
    <div class="date-show">您选择的日期：{{ date }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const date = ref("");
const show = ref(false);

const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (value) => {
  show.value = false;
  date.value = formatDate(value);
};
</script>

<style lang="less" scoped>
.date-show {
    margin-top: 10px;
    text-align: center;
}
</style>