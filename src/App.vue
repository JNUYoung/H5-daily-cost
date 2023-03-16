<template>
  <router-view />
  <NavBar v-if="show" />
</template>

<script>
import NavBar from './components/NavBar.vue';
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
export default {
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const state = reactive({
      menu: ['/user', '/home', '/data', '/components-demo'],
      show: false
    })
    const router = useRouter()
    router.afterEach(() => {
      // '/home','/data', '/user', '/components-demo'路由下，渲染NavBar组件
      state.show = state.menu.includes(router.currentRoute.value.path)
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
