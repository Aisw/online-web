<template>
 <div class="employee-container">
   <el-table
       ref="multipleTable"
       :data="employee"
       tooltip-effect="dark"
       style="width: 100%"
       height="400px"
       max-height="400px"
       stripe
       @cell-click="cellClick"
       @selection-change="handleSelectionChange">
<!--     <el-table-column-->
<!--         type="selection"-->
<!--         width="55">-->
<!--     </el-table-column>-->
     <el-table-column
         label="序号"
         type="index"
         width="50">
     </el-table-column>
<!--     <el-table-column-->
<!--         prop="id"-->
<!--         label="ID"-->
<!--         width="50">-->
<!--     </el-table-column>-->
     <el-table-column
         prop="name"
         label="姓名"
         width="120">
     </el-table-column>
     <el-table-column
         prop="sex"
       label="性别"
       width="120">
     </el-table-column>
     <el-table-column
         prop="birthday"
         label="生日"
         type="date"
         width="180">
     </el-table-column>
<!--     <el-table-column-->
<!--         label="生日"-->
<!--         width="120">-->
<!--&lt;!&ndash;       prop="birthday"&ndash;&gt;-->
<!--       <template slot-scope="scope">{{ scope.row.date }}</template>-->
<!--     </el-table-column>-->
     <el-table-column
         prop="unit"
         label="所属单位"
         width="120">
     </el-table-column>
     <el-table-column
         prop="station"
         label="岗位"
         width="120">
     </el-table-column>
     <el-table-column
         prop="firstDegree"
         label="第一学历"
         width="120">
     </el-table-column>
     <el-table-column
         prop="secondDegree"
         label="第二学历"
         width="120">
     </el-table-column>
     <el-table-column
         prop="phone"
         label="手机号"
         width="120">
     </el-table-column>
     <el-table-column
         prop="isAdministrator"
         label="是否管理员"
         width="120">
     </el-table-column>

     <el-table-column label="操作" width="240">
       <template slot-scope="scope">
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
   <employee-detail :employee="employeeDetail" :dialog-form-visible="isAdd"/>
   <modify-employee :employee="employeeDetail" :dialog-form-visible="isModify"/>
 </div>
</template>

<script>
import EmployeeDetail from "@/views/user/EmployeeDetail";
import ModifyEmployee from "@/views/user/ModifyEmployee";
import {deleteEmployee} from "@/network/Employee";

export default {
  name: "EmployeeForm",
  components: {ModifyEmployee, EmployeeDetail},
  props:{
    employee: Array,
  },
  data() {
    return {
      employeeDetail:Object,
      isAdd: {
        type:false,
        show: true
      },
      isModify: {
        type: false
      },
      modifyEmployee: Object
    }
  },
  methods: {

    handleSelectionChange(val) {
      this.modifyEmployee = val[0];
      console.log(this.modifyEmployee)
    },

    cellClick(row, column,cell,event){
      if (column.label == '姓名'){
        this.employeeDetail = row
        this.isAdd.type=true
      }
    },

    handleEdit(index,row){
      this.employeeDetail = row
      this.isModify.type = true
      console.log(index,row)
    },
    handleDelete(index,row){
      this.deleteEmployee(row.id)
      console.log(index,row.id)
    },

    deleteEmployee(id){
      deleteEmployee(id).then(res => {
        if (res.code == 200){
          this.$bu.$emit("deleteEmployee")
          this.deleteSuccess(res.data)
        }else{
          this.deleteFailed("删除失败")
        }
      })
    },
    deleteSuccess(success){
      this.$notify({
        title: '成功',
        message: success,
        type: 'success'
      });
    },
    deleteFailed(fail){
      this.$notify.error({
        title: '错误',
        message: fail
      });
    },
  }
}
</script>

<style scoped>
.employee-container el-table{
  width: 70%;
}
</style>