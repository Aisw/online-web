<template>
<div>
  <el-dialog title="wenian " :visible.sync="fileShow.show">
    <el-table
        :data="fileShow.docs"
        style="width: 100%">
      <el-table-column
          prop="name"
          label="文件名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="type"
          label="文件类型">
      </el-table-column>
      <el-table-column
          prop="time"
          label="发布时间">
      </el-table-column>
      <el-table-column
          label="是否允许下载">
        <template slot-scope="scope">
          <div v-if="scope.row.permit == true">是</div>
          <div v-else>否</div>
        </template>
      </el-table-column>
      <el-table-column
          prop="path"
          label="图片">
      </el-table-column>
    </el-table>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "FilesShow",
  props:{
    resId: '',
    fileShow:{
      show: false,
      docs: []
    }
  }
}
</script>

<style scoped>

</style>