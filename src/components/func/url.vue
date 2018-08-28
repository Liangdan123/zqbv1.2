<template>
  <div>
   <el-table class="table" style="width: 100%" :data="urlArr">
      <el-table-column prop="type" label="属性" width="173"></el-table-column>
      <el-table-column prop="url" label="注册链接"></el-table-column>
      <el-table-column width="130" label="操作">
        <span class="u-btn" slot-scope="scope" v-clipboard:success="onCopy" v-clipboard:error="onError" v-clipboard:copy="scope.row
        .url">复制链接</span>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: ["urlArr"],
    methods: {
      onError() {
        this.$message.error("复制失败")
      },
      onCopy: function (e) {
        this.$message.success("已经复制到粘贴板")
      },
    }
  }
</script>
