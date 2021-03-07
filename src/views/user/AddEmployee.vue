<template>
  <el-dialog title="新建用户" :visible.sync="dialogFormVisible.type">
    <el-form :model="employee" :label-position="left" >
      <el-form-item >
        <el-col :span="1">
          <el-tag>姓名</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.name" style="width: 50%;"></el-input>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="1">
          <el-tag>性别</el-tag>
        </el-col>
        <el-col :span="10">
          <el-select v-model="employee.sex" placeholder="请选择性别" style="width: 50%">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="1">
          <el-tag>身份证号</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.idNumber" style="width: 50%;"></el-input>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="1">
          <el-tag>通行证编码</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.passNumber" style="width: 50%;"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="1">
          <el-tag>身份证照片</el-tag>
        </el-col>
        <el-col :span="24" >
<!--          <up-load/>-->
           <el-upload
               ref="upload"
               action="http://127.0.0.1:8888/uploadEmployee"
               :data={idNumber:this.employee.idNumber}
               list-type="picture-card"
               :auto-upload="false">
             <i class="el-icon-plus"></i>
           </el-upload>
<!---->
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="1">
          <el-tag>生日</el-tag>
        </el-col>
        <el-col :span="10">
          <el-date-picker
              v-model="employee.birthday"
              type="date"
              placeholder="选择日期"
              style="width: 50%;">
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="1">
          <el-tag>所属单位</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.unit" style="width: 50%;"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="1">
          <el-tag>岗位</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.station" style="width: 50%;"></el-input>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="1">
          <el-tag>第一学历</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.firstDegree" style="width: 50%;"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="1">
          <el-tag>第二学历</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.secondDegree" style="width: 50%;"></el-input>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="1">
          <el-tag>手机号</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.phone" style="width: 50%;"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="1">
          <el-tag>密码</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.password" style="width: 50%;"></el-input>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="1">
          <el-tag>确认密码</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.password" style="width: 50%;"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="1">
          <el-tag>微信号</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.wechatId" style="width: 50%;"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item >
        <el-col :span="1">
          <el-tag>是否管理员</el-tag>
        </el-col>
        <el-col :span="20">
          <el-radio-group v-model="employee.isAdministrator">
            <el-radio label="否"></el-radio>
            <el-radio label="部门管理员"></el-radio>
            <el-radio label="集团管理员"></el-radio>
          </el-radio-group>
        </el-col>

      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="shutdown">取 消</el-button>
      <el-button type="success"  @click="affirm" v-show="dialogFormVisible.show">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {addEmployee} from "@/network/Employee";

export default {
name: "AddEmployee",
  props:{
    dialogFormVisible: Object
  },
  data(){
    return{
      left: 'left',
      employee:{
        name:"",
        sex: "",
        idNumber: '',
        passNumber: '',
        cardPhoto: '',
        birthday: '',
        unit: '',
        station: '',
        firstDegree: '',
        secondDegree: '',
        phone: '',
        password: '',
        wechatId: '',
        isAdministrator: '',
      },
      newEmployee: this.employee,
    }
  },
  methods:{

    affirm(){
      console.log(this.employee)



      this.dialogFormVisible.show = false
      this.dialogFormVisible.type = false

      this.addEmployee(this.employee)
    },
    shutdown(){
      this.$bu.$emit("dialogShut")
      this.dialogFormVisible.type = false
      // this.GLOBAL.dialogFormVisible = false;
      // this.dialogFormVisible = false
    },

    addEmployee(employee){
      addEmployee(employee).then(res => {
        if (res.code == 200){
          this.addSuccess(res.data)
        }else{
          this.addFailed(res.data)
        }
        // console.log(res.data)
      })
    },
    addSuccess(success){
      this.$notify({
        title: '成功',
        message: success,
        type: 'success'
      });
    },
    addFailed(fail){
      this.$notify.error({
        title: '错误',
        message: fail
      });
    },
  },

}
</script>

<style scoped>

</style>