<template>
  <div class="organization-container">
    <div style="margin: 30px;"></div>
    <el-tag type="info" >用户管理</el-tag>
    <div style="margin: 30px;"></div>
<!--搜索栏-->
    <el-form  label-position="right" :inline="true" :model="formInline" class="demo-form-inline">
<!--       -->
      <el-form-item label="姓名" >
        <el-input v-model="formInline.name" style="width: 80px"></el-input>
      </el-form-item>

      <el-form-item label="性别" >
        <el-select v-model="formInline.sex" placeholder="男" style="width: 80px">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否管理员" style="width: 190px">
      <el-select v-model="formInline.isAdministrator" placeholder="是" style="width: 100px">
        <el-option label="是" value="是"></el-option>
        <el-option label="否" value="否"></el-option>
      </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="empty">清空</el-button>
      </el-form-item>

      <el-form-item style="margin-left: 180px">
<!--        style="margin-left: 80px"-->
        <el-button type="primary" @click="addEmployee">新增</el-button>
<!--        <el-button type="primary">修改</el-button>-->
<!--        <el-button type="primary">删除</el-button>-->
      </el-form-item>


    </el-form>


    <el-row class="tac">

      <el-col :span="4">
        <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            @node-click="nodeClick"
            :draggable="false"
            :highlight-current="true">
        </el-tree>
      </el-col>

      <el-col :span="18">
        <el-main>
          <employee-form :employee="employees"/>
        </el-main>
      </el-col>
    </el-row>
    <add-employee :dialogFormVisible="isAdd"/>
  </div>
</template>

<script>
import OrgContent from "@/components/OrgContent";
import {getDepart} from "@/network/Department";
import {getEmloyees,getEmploys} from "@/network/Employee";
import EmployeeForm from "@/views/user/EmployeeForm";
import AddEmployee from "@/views/user/AddEmployee";

export default {
name: "User",
  components: {
    AddEmployee,
    EmployeeForm,
    OrgContent,
  },
  data() {
    return {
      data: [],
      employees:[],
      formInline: {
        name: '',
        sex: '男',
        isAdministrator: '是'
     },
      isAdd: {
        type:false,
        show: true
      }
    };
  },
  created(){
    this.getDeparts()
//3.监听item中图片加载完成
    this.$bu.$on('dialogShut',() => {
      this.isAdd.type =false
      console.log("关闭dialog："+this.isAdd)
    })
    this.$bu.$on("deleteEmployee",() => {
      console.log("今天打了")
      this.getEmploys(this.formInline)
    })
  },
  methods: {
    getDeparts(){
      getDepart().then(res =>{
        this.data = res.data
      })
    },
    nodeClick(dropNode,ev){
      // console.log("move",ev.key)
      // this.getDepartDetail(ev.key)
      this.getEmployees(ev.key)
    },
    getEmployees(index){
      getEmloyees(index).then(res => {
        console.log(index,res.data)
        this.employees = res.data
      })
    },

    getEmploys(formLine){
      getEmploys(formLine).then(res => {
        this.employees = res.data
      })
    },
    query(){
      this.getEmploys(this.formInline)
    },

    empty(){
      this.formInline.name = ''
      this.formInline.sex = ''
      this.formInline.isAdministrator = ''
    },

    addEmployee(){
      this.isAdd.type = true
      this.isAdd.show = true
      // this.GLOBAL.dialogFormVisible = true;
    },
  }
}
</script>

<style scoped>
.organization-container{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

</style>