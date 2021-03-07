<template>
  <el-dialog :visible.sync="showBook.show" :modal-append-to-body="false">
      <el-table
          ref="multipleTable"
          :data="data"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">

        <el-table-column
            type="selection"
            width="120">
        </el-table-column>

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
      </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="success"  @click="affirm">保存</el-button>
      <el-button @click="shutdown">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {getBooks} from "@/network/Book";

export default {
name: "BookList",
  data(){
    return{
      data:[],
    }
  },
  props:{
    doc:{
      books:[],
    },
    showBook:{
      show: false,
    }
  },
  created() {
  this.getBooks()
  },
  methods:{
    shutdown(){
      this.doc.books = []
      this.showBook.show = false
    },
    affirm(){
      this.showBook.show = false
    },
    handleSelectionChange(val) {
      this.doc.books = val;
      this.doc.books = this.doc.books.map((book) => {
        return book.id
      })
      console.log(this.doc.books);
    },
    getBooks(){
      getBooks().then(res => {
        this.data = res.data
      })
    },
  }
}
</script>

<style scoped>

</style>