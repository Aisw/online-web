<template>
  <el-dialog :title="doc.name" :visible.sync="docDetail.update">
    <el-form :model="doc" :label-position="left">
      <el-form-item>
        <el-col :span="1">
          <el-tag>姓名</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="doc.name" style="width: 50%;"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="1">
          <el-tag>附件</el-tag>
        </el-col>
        <el-col :span="24" >
          <!--          <up-load/>-->
          <el-upload
              ref="update"
              action="http://127.0.0.1:8888/doc/update"
              :data={id:this.doc.id,name:this.doc.name}
              list-type="picture-card"
              :auto-upload="false">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!---->
        </el-col>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="shutdown" >取 消</el-button>
      <el-button type="primary" @click="affirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
name: "ModifyDocument",
  props:{
    doc:{
      id: '',
      name: '',
      time: '',
      path: ''
    },
    docDetail: Object
  },
  data(){
    return{
      left: 'left'
    }
  },
  methods:{
    affirm(){
      this.$refs.update.submit();
      this.docDetail.update = false
    },
    shutdown(){
      this.docDetail.update = false
    }
  }
}
</script>

<style scoped>

</style>