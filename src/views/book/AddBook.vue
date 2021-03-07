<template>
  <el-dialog title="添加电子书" :visible.sync="addBook.show">
    <el-form :model="book" :label-position="left" >
      <el-form-item >
        <el-col :span="1">
          <el-tag>资料名称</el-tag>
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
              ref="upload"
              action="http://127.0.0.1:8888/book/upload"
              :data={bookName:this.book.name}
              list-type="picture-card"
              :auto-upload="false">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!---->
        </el-col>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="shutdown">取 消</el-button>
      <el-button type="success"  @click="affirm" v-show="addBook.show">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AddBook",
  props:{
    addBook: Object
  },
  data(){
    return{
      book:{
        name: '',
      },
      left: 'left'
    }
  },
  methods:{
    affirm(){
      this.$refs.upload.submit();
      this.addBook.show = false;

      this.$bu.$emit("refreshBooks")
    },
    shutdown(){
      this.addBook.show = false;
    }
  }
}
</script>

<style scoped>

</style>