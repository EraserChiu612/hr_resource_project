<template>
  <div class="container">
    <div class="app-container">
      <!-- tree model -->
      <el-tree :data="depts" :props="defaultProps" default-expand-all></el-tree>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Department',
  data() {
    return {
      depts: [
        {
          name: '不只教育',
          children: [
            {
              name: '總經理辦公室',
            },
            {
              name: '行政部門',
            },
            {
              name: '人事部門',
              children: [
                {
                  name: '薪資管理部',
                },
                {
                  name: '稅務管理部',
                },
                {
                  name: '人事管理部',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children', //讀取子節點字段名
        label: 'name', //顯示的字段文字
      },
    }
  },
}
</script>

<style scoped lang="scss">
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
