<template>
<div class="train-container">
  <div style="margin: 30px;"></div>
  <div class="title">
    <el-tag type="info" >培训计划</el-tag>
  </div>
  <div style="margin: 30px;"></div>
  <!--搜索栏-->
  <el-form  label-position="left" :inline="true" :model="queryLine" class="demo-form-inline">
    <!--       -->
    <el-form-item label="资料名称" >
      <el-input v-model="queryLine.title" style="width: 120px"></el-input>
    </el-form-item>

    <el-form-item label="培训类型" >
      <el-input v-model="queryLine.type" style="width: 120px"></el-input>
    </el-form-item>

    <el-form-item label="发布时间" >
      <el-date-picker
          v-model="queryLine.time"
          type="date"
          placeholder="选择日期"
          style="width: 50%;">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="状态" >
      <el-input v-model="queryLine.status" style="width: 120px"></el-input>
    </el-form-item>

    <el-form-item style="margin-left: 80px">
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="empty">清空</el-button>
    </el-form-item>

    <el-form-item >
      <el-button type="primary" @click="addProgram">新增</el-button>
    </el-form-item>
  </el-form>

  <div>
    <el-table
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%">

      <el-table-column
          label="序号"
          fixed
          type="index"
          width="50">
      </el-table-column>

      <el-table-column
          label="培训标题"
          prop="title"
          width="120">
      </el-table-column>

      <el-table-column
          label="培训类型"
          prop="type"
          width="120">
      </el-table-column>

      <el-table-column
          label="发布时间"
          prop="publishTime"
          width="120">
      </el-table-column>

      <el-table-column
          label="开始时间"
          prop="startTime"
          width="120">
      </el-table-column>

      <el-table-column
          label="结束时间"
          prop="endTime"
          width="120">
      </el-table-column>

      <el-table-column
          label="状态"
          prop="status"
          width="50">
      </el-table-column>

      <el-table-column
          label="可见范围"
          prop="range"
          width="100">
      </el-table-column>

      <el-table-column label="操作"
          width="420">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="publish(scope.$index, scope.row)">发布</el-button>
          <el-button
              size="mini"
              @click="cancelStatus(scope.$index, scope.row)">取消发布</el-button>
          <el-button
              size="mini"
              @click="retrain(scope.$index, scope.row)">复训</el-button>
          <el-button
              size="mini"
              >修改</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <add-program :program-show="showPro" :id="id"/>
  <retrain :pro-detail-show="proDetailShow" :program-detail="programDetail"/>
</div>
</template>

<script>
import {getPrograms,queryProgram,publish,cancelStatus,deleteProgram,getId,getProgramDetail} from "@/network/Train";
import { Message } from 'element-ui';
import AddProgram from "@/views/Train/AddProgram";
import Retrain from "@/views/Train/Retrain";

export default {
name: "Train",
  components: {Retrain, AddProgram},
  data(){
    return{
      queryLine: {
        title: '',
        type: '',
        time: '',
        status: ''
      },
      data: [],
      showPro:{
        show: false
      },
      id:'',

      //复训界面显示
      proDetailShow: {
        show:false
      },
      //复训界面详细数据
      programDetail:{
        program: Object,
        resourceDetail:[]
      }
    }
  },
  created() {
    this.getPrograms()
  },
  methods:{
    getPrograms(){
      getPrograms().then(res => {
        this.data = res.data
      })
    },
    query(){
      queryProgram(this.queryLine).then(res => {
        this.data = res.data
      })
    },
    empty(){
      this.queryLine.title = '',
      this.queryLine.time = '',
      this.queryLine.type = '',
      this.queryLine.status = ''
    },

    publish(index,row){
      publish(row.id).then(res => {
        console.log(res.data)
        this.getPrograms()
      })
    },
    cancelStatus(index,row){
      cancelStatus(row.id).then(res => {
        Message.success(res.data)
        this.getPrograms()
      })
    },
    handleDelete(index,row){
      deleteProgram(row.id).then(res =>{
        Message.success(res.data)
        this.getPrograms()
      })
    },
    addProgram(){
      getId().then(res => {
        console.log(res.data.id)
        this.id = res.data.id
      })
      this.showPro.show = true
    },
    //复训信息获取
    retrain(index,row){
      getProgramDetail(row.id).then(res => {
        this.proDetailShow.show = true
        this.programDetail = res.data
      })
    },

  }
}
</script>

<style scoped>
.title{
  display: inline;
  position: relative;
}
</style>