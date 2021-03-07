<template>
  <div>
    <el-dialog title="新增" :visible.sync="programShow.show">
      <el-form label-position="left" :model="programItem">
        <el-form-item label="培训基本信息"/>

        <el-form-item>
          <el-col :span="1">
            <el-tag>培训标题</el-tag>
          </el-col>
          <el-col :span="10">
            <el-input v-model="programItem.title"style="width: 50%;" placeholder="请输入培训标题"></el-input>
          </el-col>
          <el-col :span="1">
            <el-tag>培训范围</el-tag>
          </el-col>
          <el-col :span="10">
            <el-select  placeholder="请选择" v-model="programItem.scope" style="width: 50%">
              <el-option label="全员可见" value="shanghai"></el-option>
              <el-option label="部分可见" value="beijing"></el-option>
              <el-option label="仅管理员可见" value="beijing"></el-option>
              <el-option label="不可见" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="1">
            <el-tag>培训类型</el-tag>
          </el-col>
          <el-col :span="10">
            <el-input v-model="programItem.type" style="width: 50%;" placeholder="请输入培训类型"></el-input>
          </el-col>
          <el-col :span="1">
            <el-tag>培训图片</el-tag>
          </el-col>
          <el-col :span="10">
            <el-upload
                ref="upload"
                action="http://127.0.0.1:8888/pros/loadPhoto"
                :data={id:this.id}
                :auto-upload="false">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="1">
            <el-tag>起止时间</el-tag>
          </el-col>
          <el-col :span="14">
            <el-date-picker
                v-model="programItem.time"
                type="daterange"
                style="width: 64%"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-col>

        </el-form-item>

        <el-form-item>
          <el-col :span="1">
            <el-tag>可见范围</el-tag>
          </el-col>
          <el-col :span="10">
            <el-select v-model="programItem.visible" placeholder="全员可见" style="width: 50%">
              <el-option label="全员可见" value="shanghai"></el-option>
              <el-option label="部分可见" value="beijing"></el-option>
              <el-option label="仅管理员可见" value="beijing"></el-option>
              <el-option label="不可见" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-link type="primary">选择组织树</el-link>
          </el-col>
        </el-form-item>
      </el-form>

      <el-divider></el-divider>

      <el-form label-position="left">
        <el-form-item label="培训资料信息"/>
        <el-form-item>
          <el-button @click="add">新增</el-button>
        </el-form-item>

        <el-table
            ref="multipleTable"
            :data="data"
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
              width="120">
            <template slot-scope="scope">
              <el-input placeholder="资料名称" v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column
              label="资料类型"
              width="160">
            <template slot-scope="scope">
              <el-select placeholder="文件" v-model="scope.row.type" style="width: 80%">
  <!--              v-model="employee.sex"-->
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
              label="资料封面"
              width="120">
            <template slot-scope="scope">
              <el-upload
                  ref="uploadRes"
                  action="http://127.0.0.1:8888/pros/uploadResPhoto"
                  :data="{id:resId}"
                  :auto-upload="true">
                <el-button size="small" type="primary"  @click="uploadClick(scope.$index, scope.row)">点击上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column
              label="资料文件"
              width="120">
            <template slot-scope="scope">
              <el-button @click="bingFiles">绑定文件</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <el-divider></el-divider>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
  <!--      @click="shutdown"-->
        <el-button type="success" @click="publish">发布</el-button>
        <el-button type="danger" @click="deleteId">取消</el-button>
  <!--      @click="affirm" v-show="addDoc.show"-->
      </div>

    </el-dialog>
    <bind-file :bing-file="bingFile" :docs="doc" :res-id="resId"/>
  </div>
</template>

<script>
import BindFile from "@/components/BindFile";
import{deleteProgram,addProgram,getResId,deleteResId,addResources,publish,deleteResIds} from "@/network/Train";
import { Message } from 'element-ui';

export default {
name: "AddProgram",
  components: {BindFile},
  props:{
    id: '',
    programShow:{
      show: false,
    }
  },
  data(){
    return{
      data:[],
      item:{
        id:'',
        title: '',
        scope: '',
        type: '',
        startTime:'',
        endTime: '',
        time: '',
        visible: ''
      },
      programItem:{
        id:'',
        title: '',
        scope: '',
        type: '',
        startTime:'',
        endTime: '',
        time: '',
        visible: ''
      },
      bingFile:{
        show:false
      },
      //上传资源封面的资源id
      resId: 0,
      //绑定文件
      doc:{
        list: [],
      },
      resIds: [],
    }
  },
  methods:{
    add(){
      let resource = {
            id: '',
            name: '',
            type:'',
          }
      getResId().then(res => {
        this.resId =res.data.id
        resource.id = res.data.id
        this.data.push(resource)
      })

      // console.log(resource,"绑定文件")

    },
    handleDelete(index,row){
      deleteResId(row.id).then(res => {
        Message.success(res.data)
      })
      this.data.splice(index,1)
    },
    bingFiles(){
      this.bingFile.show = true
    },

    save(){
      // 1.培训图片上传
      this.$refs.upload.submit();
      // 2.培训基本信息上传
      this.programItem.id = this.id
      this.programItem.startTime = this.programItem.time[0]
      this.programItem.endTime = this.programItem.time[1]
      addProgram(this.programItem).then(res => {
        console.log(res.data)
      })
      // 3.添加培训资料信息
      let maps = {"proId":this.id,"res":this.data}
      addResources(maps).then(res => {
      })
      this.data = null;
      this.data = new Array()
      // 4.关闭添加培训界面
      this.programShow.show = false
      //5.培训基本信息清空
      this.programItem = this.item
    },
    //发布
    publish(){
      this.save()
      publish(this.id).then(res => {
        console.log(res.data,'发布')
      })
    },
    deleteId(){
      deleteProgram(this.id).then(res => {
      })

      this.resIds = this.data.map((dat) => {
        return dat.id
      })
      console.log(JSON.stringify(this.resIds))
      deleteResIds(this.resIds).then(res => {
        console.log(res.data,"删除培训资料信息")
      })
      this.programShow.show = false
    },

    uploadClick(index,row){
      this.resId = this.data[index].id
      console.log(this.resId,'resId')
    },

  }
}
</script>

<style scoped>

</style>