<template>
<div class="content-container">
  <el-form :label-position="labelPosition" label-width="100px" v-model="depart">
    <el-form-item label="上级名称">
      <el-input v-model="depart.type" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="组织机构编码">
      <el-input v-model="depart.code"></el-input>
    </el-form-item>
    <el-form-item label="组织机构类型">
<!--      <el-input v-model="depart.type"></el-input>-->
      <el-select v-model="depart.type" placeholder="typ.get()" style="width: 100%">
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.name">
        </el-option>
      </el-select>

    </el-form-item>
    <el-form-item label="组织机构名称">
      <el-input v-model="depart.name"></el-input>
    </el-form-item>
    <el-form-item label="组织机构描述">
      <el-input v-model="depart.description"></el-input>
    </el-form-item>
    <el-form-item label="组织机构地址">
      <el-input v-model="depart.address"></el-input>
    </el-form-item>
    <el-form-item label="组织机构办公电话">
      <el-input v-model="depart.phone"></el-input>
    </el-form-item>
    <el-form-item label="组织机构传真">
      <el-input v-model="depart.fix"></el-input>
    </el-form-item>
    <el-form-item label="综合人员">
      <el-input v-model="depart.people"></el-input>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {getOrganization,postContent} from "@/network/Department";

export default {
name: "OrgContent",
  props:{
    depart:{
      id:'',
      code: '',
      name: '',
      type: '',
      description :'',
      address:'',
      fix: '',
      phone: '',
      people: ''
    },
  },
  data() {
    return {
      labelPosition: 'right',
      options: [],
    };
  },
  created() {
    this.getOrganization()
  },
  methods:{
    getOrganization(){
      getOrganization().then(res => {
        this.options = res.data
      })
    },
    moveSuccess(success){
      this.$notify({
        title: '成功',
        message: success,
        type: 'success'
      });
    },
    moveFailed(fail){
      this.$notify.error({
        title: '错误',
        message: fail
      });
    },
    postContent(content){
      postContent(content).then(res =>{
        if (res.code == 200){
          if (res.data != 'vacant'){
            this.moveSuccess(res.data)
            this.changeDepartName()
          }
        }else{
          this.moveFailed(res.data)
        }
      })
    },
    changeDepartName(){
      this.$bu.$emit('changeDepartName');
    },
  },
  watch: {
    depart:{
      handler(val){
        this.postContent(val)
      },
      deep:true
    },
  },
}
</script>

<style scoped>
.content-container el-dropdown {
  vertical-align: top;
  background-color: white;
}
.content-container el-dropdown + .content-container el-dropdown {
  margin-left: 15px;
}
.content-container el-icon-arrow-down {
  font-size: 12px;
}

</style>