<template>
<div class="book-container">
  <div style="margin: 30px;"></div>
  <el-tag type="info" >电子书维护</el-tag>
  <div style="margin: 30px;"></div>
  <!--搜索栏-->
  <el-form  label-position="right" :inline="true" :model="queryLine" class="demo-form-inline">
    <!--       -->
    <el-form-item label="资料名称" >
      <el-input v-model="queryLine.name" style="width: 80px"></el-input>
    </el-form-item>

    <el-form-item label="上传时间" >
      <el-date-picker
          v-model="queryLine.time"
          type="date"
          placeholder="选择日期">
      </el-date-picker>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="query" >查询</el-button>
      <el-button type="primary" @click="empty">清空</el-button>
    </el-form-item>

    <el-form-item style="margin-left: 180px">
      <!--        style="margin-left: 80px"-->
      <el-button type="primary" @click="uploadBook">上传</el-button>
    </el-form-item>
  </el-form>
  <div>
    <el-table
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">

<!--      <el-table-column-->
<!--          type="selection"-->
<!--          width="120">-->
<!--      </el-table-column>-->

      <el-table-column
          label="序号"
          fixed
          type="index"
          width="240">
      </el-table-column>

      <el-table-column
          label="资料名称"
          prop="name"
          width="280">
      </el-table-column>

      <el-table-column
          label="上传时间"
          prop="time"
          width="280">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleLoad(scope.$index, scope.row)">下载</el-button>
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <add-book :add-book="book"/>
    <modify-book :book="boo" :bookDetail="bookDetail"/>
  </div>
</div>
</template>

<script>
import {getBooks,deleteBook,showByNameAndTime,loadBook} from "@/network/Book";
import AddBook from "@/views/book/AddBook";
import ModifyBook from "@/views/book/ModifyBook";

export default {
  name: "Book",
  components: {ModifyBook, AddBook},
  data() {
    return {
      queryLine: {
        name: '',
        time: ''
      },
      value: '',
      data: [],
      book:{
        show:false
      },
      boo: Object,
      bookDetail:{
        show:false
      },
      url:'http://127.0.0.1:8888/book/load?path=',
      loadUrl: 'http://127.0.0.1:8888/book/load?path=',
    };
  },
  created() {
    this.getBooks()

    this.$bu.$on("refreshBooks",() => {
      // console.log("重新加载books")
      this.getBooks()
    })
  },
  methods: {
    handleLoad(index,row){
      if (this.loadUrl != this.url){
        this.loadUrl = this.url
      }
      window.open(this.loadUrl+row.path)
      this.loadUrl = this.loadUrl+row.path
    },
    handleEdit(index, row) {
      this.boo = row
      this.bookDetail.show = true
      // console.log(index, row);
    },
    handleDelete(index, row) {
      this.deleteBook(row.id)
      // console.log(index, row);
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    getBooks(){
      getBooks().then(res => {
        this.data = res.data
      })
    },
    uploadBook(){
      this.book.show = true
    },
    deleteBook(id){
      deleteBook(id).then(res => {
        if (res.code == 200){
          this.bookSuccess(res.data)
        }
        else{
          this.bookFailure(res.data)
        }
      })
    },
    bookSuccess(message){
      this.$notify({
        title: '成功',
        message: message,
        type: 'success'
      });
    },
    bookFailure(message){
      this.$notify.error({
        title: '错误',
        message: res.data
      });
    },

    query(){
      showByNameAndTime(this.queryLine.name,this.queryLine.time).then( res => {

        this.data = res.data
      })
    },
    empty(){
      this.queryLine.name = ''
      this.queryLine.time = ''
    },
  },
}
</script>

<style scoped>

</style>