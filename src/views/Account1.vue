<template>
  <div class="account">
    <Header title="账户设置" />
    <van-cell-group inset>
        <!-- 点击密码修改时，修改visible属性，弹出密码修改框 -->
        <van-cell title="密码修改" @click="visible = true" is-link icon="setting" label="点击修改您的密码" />
    </van-cell-group>
    
    <van-button class="logout" type="primary" round size="large" @click="logout"
      >退出登录</van-button
    >
    <!-- 修改密码弹出框 -->
    <van-dialog
      class="modal-pass"
      v-model:show="visible"
      @confirm="handleOk"
      title="修改密码"
      show-cancel-button
    >
      <van-cell-group>
        <van-field
          v-model="oldPass"
          label="原密码"
          clearable
          placeholder="请输入原密码"
        />
        <van-field
          v-model="newPass"
          label="新密码"
          clearable
          placeholder="请输入新密码"
        />
        <van-field
          v-model="newPass2"
          label="确认密码"
          clearable
          placeholder="再次输入确认"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import Header from "../components/Header.vue";
import axios from "../utils/axios";

const visible = ref(false)  // 是否展示修改密码的弹出框
const oldPass = ref("")  // 旧密码
const newPass = ref("")  // 新密码
const newPass2 = ref("")  // 确认密码

const router = useRouter()

// 退出登录的逻辑
const logout = () => {
    localStorage.removeItem('token')
    router.push({ path: '/login' })
}

// 确认修改密码的逻辑
const handleOk = async () => {
    // 确认旧密码是否正确

    // 确认新密码是否跟旧密码一致
    if (newPass.value === oldPass.value) {
        Toast.fail('新密码跟原密码相同，请换个新的密码噢')
        return
    }
    // 确认两次输入密码是否一致
    if (newPass.value !== newPass2.value) {
        Toast.fail('两次输入的密码不一样噢')
        return
    }
    const { data } = axios.post('/user/modify_pass', {
        old_pass: oldPass.value,
        new_pass: newPass.value,
        new_pass2: newPass2.value
    })
    Toast.success('修改成功')
}
</script>

<style lang="less">
@import url("../config/custom.less");
.account {
    min-height: 100%;
    background-color: #f5f5f5;
    .van-cell-group {
        margin-top: 30px;
    }
    .logout {
        width: 90%;
        display: block;
        background-color: @primary;
        border-color: @primary;
        margin: 30px auto;
    }
}
</style>