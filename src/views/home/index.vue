<template>
    <div>
      <template v-for="(item, index) in list">
        <div :key="index" >
          <router-link :to="item.path">{{item.path}}</router-link>
        </div>
      </template>
    </div>
</template>

<script>
import { constantRoutes } from "@/router"
export default {
    name: 'home',
    data() {
        return {
            list: constantRoutes
        }
    }
}
</script>