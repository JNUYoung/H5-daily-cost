<template>
  <Header :title="type == 'login' ? '登录' : '注册'" />
  <div class="auth">
    <!-- 中部的logo -->
    <img class="logo" src="//s.yezgea02.com/1606836859539/onpeice.png" alt="" />

    <!-- 登录表单 -->
    <van-form class="form-wrap" @submit="onSubmit" v-if="type == 'login'">
      <div class="form">
        <van-field
          clearable
          v-model="username"
          name="username"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账户' }]"
        />
        <van-field
          clearable
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div>
      <div style="margin: 16px 0">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
        <p @click="chanegType('register')" class="change-btn">
          没有账号，前往<span class="register-text">注册</span>
        </p>
      </div>
    </van-form>

    <!-- 注册表单 -->
    <van-form class="form-wrap" @submit="onSubmit" v-if="type == 'register'">
      <div class="form">
        <van-field
          clearable
          v-model="username"
          name="username"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          clearable
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          center
          clearable
          label="验证码"
          placeholder="输入验证码"
          v-model="verify"
        >
          <template #button>
            <VueImgVerify ref="verifyRef" />
          </template>
        </van-field>
      </div>
      <div style="margin: 16px 0">
        <van-button
          round
          block
          :loading="loading"
          type="primary"
          native-type="submit"
        >
          注册
        </van-button>
        <p @click="chanegType('login')" class="change-btn">
          <span class="register-text">登录</span>已有账号
        </p>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import VueImgVerify from "../components/VueImageVerify.vue";
import Header from "../components/Header.vue";
import axios from "../utils/axios";
import { Toast } from "vant";
import router from "../router";

const type = ref("login");
const verifyRef = ref(null);
const username = ref("");
const password = ref("");
const verify = ref(""); // 验证码输入框输入的内容
const imgCode = ref(""); // 图片验证码组件生成的验证码字符串
const loading = ref(false);

// 登录表单 或 注册表单提交时
const onSubmit = async (values) => {
  try {
    // 登录的逻辑
    if (type.value == "login") {
      const { data } = await axios.post("/user/login", {
        username: username.value,
        password: password.value,
      });
      localStorage.setItem("token", data.token);    // 存储token信息
      window.location.href = "/";
    } else {
      // 注册的逻辑
      imgCode.value = verifyRef.value.imgCode || "";
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

// 切换登录和注册两种模式
const chanegType = (inputType) => {
  type.value = inputType;
};
</script>


<style lang="less" scoped>
@import url("../config/custom.less");
.auth {
  height: calc(~"(100% - 46px)");
  padding: 30px 20px 0 20px;
  background-color: @primary-bg;
  .logo {
    width: 150px;
    display: block;
    margin: 0 auto;
    margin-bottom: 37.5px;
  }
  .form-wrap {
    .form {
      border-radius: 10px;
      overflow: hidden;
      .van-cell:first-child {
        padding-top: 20px;
      }
      .van-cell:last-child {
        padding-bottom: 20px;
      }
    }
    .change-btn {
      text-align: center;
      margin-top: 20px;
      font-size: 16px;
      .register-text {
        color: @link-color;
        text-decoration: underline;
        padding: 0 3px;
      }
    }
  }
}
</style>