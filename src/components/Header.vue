<template>
<!-- 
  header组件，仅在某些页面需要
 -->
  <div class="block"></div>
  <van-nav-bar
    class="header"
    @click-left="back"
    :title="title"
    left-text="返回"
    left-arrow
    right-text="更多"
    @click-right="onClickRight"
  >
    <!-- <template #right>
      <i class="iconfont more" />
    </template> -->
  </van-nav-bar>
</template>

<script>
import { useRouter } from "vue-router";
import { Dialog } from "vant";

export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  setup() {
    const router = useRouter();

    // 返回方法
    const back = () => {
      router.back();
    };

    const onClickRight = () => {
      Dialog.alert({
        title: "more",
        message: "人生而自由，却无往不在枷锁之中",
      });
    };

    return {
      back,
      onClickRight,
    };
  },
};
</script>

<style lang='less' scoped>
.block {
  width: 100%;
  height: 46px;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .more {
    font-size: 20px;
  }
}
</style>