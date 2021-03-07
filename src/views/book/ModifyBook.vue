<template>
  <el-dialog :title="book.name" :visible.sync="bookDetail.show">
    <el-form :model="book" :label-position="left">
      <el-form-item>
        <el-col :span="1">
          <el-tag>姓名</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="book.name" style="width: 50%;"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="1">
          <el-tag>附件</el-tag>
        </el-col>
        <el-col :span="24" >
          <!--          <up-load/>-->
          <el-upload
              ref="update"
              action="http://127.0.0.1:8888/book/update"
              :data={id:this.book.id,name:this.book.name}
              list-type="picture-card"
              :auto-upload="false">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!---->
        </el-col>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="shutdown" >取 消</el-button>
      <el-button type="primary" @click="affirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "ModifyBook",
  props:{
    book:{
      id: '',
      name: '',
      time: '',
      path: ''
    },
    bookDetail: Object
  },
  data(){
    return{
      left: 'left'
    }
  },
  methods:{
    affirm(){
      this.$refs.update.submit();
      this.bookDetail.show = false
    },
    shutdown(){
      this.bookDetail.show = false
    }
  }
}
</script>

<style scoped>

</style>