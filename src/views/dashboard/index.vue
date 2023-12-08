<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- 使用svg--icon組件 -->
    <!-- 設置iconClass屬性="文件名(不包含.svg後綴名)" -->
    <svg-icon icon-class="dashboard" />
    <svg-icon icon-class="example" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
