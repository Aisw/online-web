<template>
<div class="doc-container">
    <div style="margin: 30px;"></div>
    <el-tag type="info" >文件管理</el-tag>
    <div style="margin: 30px;"></div>
    <!--搜索栏-->
    <el-form  label-position="right" :inline="true" :model="document" class="demo-form-inline">
      <!--       -->
      <el-form-item label="资料名称" >
        <el-input v-model="document.name" style="width: 80px"></el-input>
      </el-form-item>

      <el-form-item label="上传时间" >
        <el-date-picker
            v-model="document.time"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="empty">清空</el-button>
      </el-form-item>

      <el-form-item style="margin-left: 180px">
        <!--        style="margin-left: 80px"-->
        <el-button type="primary" @click="uploadDoc">上传</el-button>
      </el-form-item>
    </el-form>
    <div>
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
    </div>
  <add-document :add-doc="addDoc" />
  <modify-document :doc="doc" :doc-detail="addDoc"/>
</div>
</template>

<script>
import {getDocs,queryDocs,deleteDoc} from "@/network/Document";
import AddDocument from "@/views/document/AddDocument";
import ModifyDocument from "@/views/document/ModifyDocument";

export default {
name: "Document",
  components: {ModifyDocument, AddDocument},
  data() {
    return {
      document: {
        name: '',
        time: ''
      },
      value: '',
      data: [],
      addDoc:{
        show: false,
        update: false
      },
      doc:Object
    };
  },
  created() {
    this.getDocs()
  },
  methods: {
    handleLoad(index,row){
      console.log(row)
      if (row.permit == true){
        window.open("http://127.0.0.1:8888/doc/load?id="+row.id)
      }else{
        this.$message.error('错了哦，不允许下载');
      }

    },
    handleEdit(index, row) {
      this.doc = row
      this.addDoc.update = true
    },
    handleDelete(index, row) {
      this.deleteDoc(row.id,row.path)
      this.getDocs()
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getDocs(){
      getDocs().then(res => {
        this.data = res.data
      })
    },

    uploadDoc(){
      this.addDoc.show = true
    },

    query(){
      queryDocs(this.document).then( res =>{
        this.data = res.data
      })
    },
    empty(){
      this.document.name = ''
      this.document.time = ''
    },

    deleteDoc(id,path){
      deleteDoc(id,path).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>

</style>