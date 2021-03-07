<template>
  <el-dialog :title="employee.name" :visible.sync="dialogFormVisible.type">
    <el-form :model="employee" :label-position="left">
      <el-form-item>
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
        <el-col :span="10">
          <el-input  v-model="employee.cardPhoto" style="width: 50%;"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="1">
          <el-tag>生日</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="employee.birthday" style="width: 50%;"></el-input>
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
            <el-radio label="是"></el-radio>
<!--            <el-radio label="集团管理员"></el-radio>-->
          </el-radio-group>
        </el-col>

      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="shutdown">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "EmployeeDetail",
  props:{
    dialogFormVisible: Object,
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
  },
  data(){
    return{
      left: 'left',

    }

  },
  methods:{

    shutdown(){
      this.$bu.$emit("dialogShut")
      this.dialogFormVisible.type = false
    },
  },
}
</script>

<style scoped>

</style>