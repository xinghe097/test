<template>
  <div class="page2">
    <el-descriptions :border="true" :column="1" title="用户信息">
      <template slot="extra">
        <el-button type="primary" size="small">修改</el-button>
      </template>
      <el-descriptions-item label="用户名">1111</el-descriptions-item>
      <el-descriptions-item label="姓名">xxx</el-descriptions-item>
      <el-descriptions-item label="性别">x</el-descriptions-item>
      <el-descriptions-item label="手机号"></el-descriptions-item>
      <el-descriptions-item label="居住地">xxxxx</el-descriptions-item>

      <el-descriptions-item label="联系地址">xxxxxxxxxxx</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.page2 {
  padding: 50px;
  margin: 100px;
}
</style>
