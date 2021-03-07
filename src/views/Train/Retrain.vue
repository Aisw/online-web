<template>
  <div>
    <el-dialog title="复训" :visible.sync="proDetailShow.show">
      <el-form label-position="left" :model="programDetail.program">
        <el-form-item label="培训基本信息"/>

        <el-form-item>
          <el-col :span="1">
            <el-tag>培训标题</el-tag>
          </el-col>
          <el-col :span="10">
            <el-input v-model="programDetail.program.title" :disabled="true" style="width: 50%;"></el-input>
          </el-col>
          <el-col :span="1">
            <el-tag>培训范围</el-tag>
          </el-col>
          <el-col :span="10">
            <el-input v-model="programDetail.program.scope" :disabled="true" style="width: 50%"/>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="1">
            <el-tag>培训类型</el-tag>
          </el-col>
          <el-col :span="10">
            <el-input v-model="programDetail.program.type" style="width: 50%;" :disabled="true"></el-input>
          </el-col>
          <el-col :span="1">
            <el-tag>培训图片</el-tag>
          </el-col>
          <el-col :span="10">
            <el-input v-model="programDetail.program.path" style="width: 50%;" :disabled="true"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="1">
            <el-tag>起止时间</el-tag>
          </el-col>
          <el-col :span="14">
            <el-date-picker
                v-model="time"
                type="daterange"
                style="width: 64%"
                range-separator="至"/>
          </el-col>

        </el-form-item>

        <el-form-item>
          <el-col :span="1">
            <el-tag>可见范围</el-tag>
          </el-col>
          <el-col :span="10">
            <el-select v-model="programDetail.program.visible" placeholder="全员可见" style="width: 50%">
              <el-option label="全员可见" value="shanghai"></el-option>
              <el-option label="部分可见" value="beijing"></el-option>
              <el-option label="仅管理员可见" value="beijing"></el-option>
              <el-option label="不可见" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>

      <el-divider></el-divider>

      <el-form label-position="left">
        <el-form-item label="培训资料信息"/>

        <el-table
            ref="multipleTable"
            :data="programDetail.resourceDetails"
            tooltip-effect="dark"
            style="width: 100%">
          <el-table-column
              label="序号"
              fixed
              type="index"
              width="60">
          </el-table-column>

          <el-table-column
              label="资料名称"
              prop="resource.name"
              width="120">
          </el-table-column>
          <el-table-column
              label="资料类型"
              prop="resource.type"
              width="100">
          </el-table-column>
          <el-table-column
              label="资料封面"
              width="240">
            <template slot-scope="scope">
              <el-link type="primary"  :underline="false">{{scope.row.resource.path}}</el-link>
            </template>
          </el-table-column>
          <el-table-column
              label="文件资料"
              width="120">
            <template slot-scope="scope">
              <el-link type="primary"  :underline="false" @click="clickResource(scope.$index, scope.row)">{{ scope.row.docNames.join(' | ') }}</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <el-divider></el-divider>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="success" @click="publish">发布</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </div>

    </el-dialog>
    <files-show :res-id="resId" :file-show="fileShow"/>
  </div>
</template>

<script>
import FilesShow from "@/views/Train/FilesShow";
import {getDocsByResId,publish,addProgram} from "@/network/Train";
import { Message } from 'element-ui';

export default {
  name: "Retrain",
  components: {FilesShow},
  props:{
    //界面显示
    proDetailShow: {
      show:false
    },
    //界面详细数据
    programDetail:{
      program: {
        id:'',
        title: '',
        scope: '',
        type: '',
        startTime:'',
        endTime: '',
        visible: ''
      },
      resourceDetails:[]
    }
  },
  data(){
    return{
      resId: '',
      fileShow: {
        show: false,
        docs: []
      },
      time:[]
    }
  },
  methods:{
    save(){
      if (this.time[0] != undefined){
        this.programDetail.program.startTime = this.time[0]
        console.log(this.time[0])
      }

      if (this.time[1] != undefined){
        this.programDetail.program.endTime = this.time[1]
        console.log(this.time[1])
      }
      addProgram(this.programDetail.program).then(res => {
        Message.success(res.data)
      })
      this.proDetailShow.show = false
    },

    publish(){
      addProgram(this.programDetail.program).then(res => {
        Message.success(res.data)
      })
      publish(this.programDetail.program.id).then(res => {
        Message.success(res.data)
      })
      this.proDetailShow.show = false
    },

    cancel(){
      this.proDetailShow.show = false
    },

    clickResource(index,row){
      this.resId = row.resource.id
      getDocsByResId(this.resId).then(res => {
        this.fileShow.docs = res.data
      })
      this.fileShow.show = true
    }
  }
}
</script>

<style scoped>

</style>