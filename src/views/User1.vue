<template>
  <div class="user">
    <!-- 头部用户头像、用户名、个性签名 -->
    <div class="head">
      <img class="avatar" src="../assets/user02.jpg" />
      <div class="info">
        <span class="name">{{ user.username || "" }}</span>
        <span class="slogan">个性签名：{{ user.signature || "" }}</span>
      </div>
    </div>
    <!-- 选项卡内容区域 -->
    <div class="content">
      <!-- 
        icon: 图标
        title: 标题
        is-link: 展示箭头
        to：路由跳转
       -->
      <van-cell
        icon="edit"
        @click="visibleSig = true"
        title="个性签名"
        is-link
      />
      <van-cell icon="setting-o" to="/account" title="账户设置" is-link />
      <van-cell
        icon="good-job-o"
        @click="visibleRate = true"
        title="应用评分"
        is-link
      />
      <van-cell icon="smile-o" to="/about" title="关于我们" is-link />
    </div>
    <!-- 点击“个性签名”后的弹出框，修改个性签名的内容 -->
    <van-dialog
      v-model:show="visibleSig"
      @confirm="confirmSig"
      title="个性签名"
      show-cancel-button
    >
      <van-field
        v-model="signature"
        rows="2"
        autosize
        type="textarea"
        maxlength="20"
        placeholder="请输入个性签名"
        show-word-limit
      />
    </van-dialog>
    <!-- 点击“应用评分”后的弹出框 -->
    <van-dialog
      class="rate"
      v-model:show="visibleRate"
      title="软件评分"
      show-cancel-button
    >
      <van-rate
        class="rate"
        v-model="rate"
        allow-half
        void-icon="star"
        void-color="#eee"
      />
    </van-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "../utils/axios";

// 组件状态
const user = ref({})
const signature = ref('')
const visibleSig = ref(false)
const visibleRate = ref(false)
const rate = ref(5)

// 组件方法
// 获取用户信息
const getUserInfo = async () => {
    const { data } = await axios.get('/user/get_userinfo')
    user.value = data
    signature.value = data.signature
}
// 设置个性签名
const confirmSig = async () => {
    const { data } = await axios.post('/user/edit_signature', {
        signature: signature.value
    })
    user.value = data
    signature.value = data.signature
}

// 组件挂载时获取用户信息
onMounted(() => getUserInfo())

</script>

<style lang="less" scoped>
@import url("../config/custom.less");
.user {
  min-height: 100%;
  background-color: #f5f5f5;
  padding: 12px;
  .head {
    display: flex;
    background: linear-gradient(315deg, #7fcea4 0%, #39be77 100%);
    border-radius: 4px;
    margin-bottom: 12px;
    padding: 12px;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #fff;
      margin-right: 10px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: #fff;
      .name {
        font-size: 16px;
        font-weight: bold;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      }
      .slogan {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 3px 5px;
      }
    }
  }
}
</style>

<style lang="less">
.rate {
      .van-dialog__content {
        text-align: center;
        padding: 20px 0;
      }
    }
</style>