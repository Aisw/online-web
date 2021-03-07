<template>
  <el-dialog title="新增文件" :visible.sync="addDoc.show">
    <el-form :model="doc" :label-position="left" >
      <el-form-item >
        <el-col :span="3">
          <el-tag>阅读时长</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="doc.time" style="width: 50%;"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item >
        <el-col :span="3">
          <el-tag>文件名称</el-tag>
        </el-col>
        <el-col :span="10">
          <el-input  v-model="doc.name" style="width: 50%;"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item >
        <el-col :span="3">
          <el-tag>文件类型</el-tag>
        </el-col>
        <el-col :span="10">
          <el-select v-model="doc.type" placeholder="" style="width: 50%">
            <el-option label="文件" value="doc"></el-option>
            <el-option label="音频" value="voice"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item >
        <el-col :span="3">
          <el-tag>是否允许下载</el-tag>
        </el-col>
        <el-col :span="10">
          <el-radio-group v-model="doc.isLoad">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item >
        <el-col :span="3">
          <el-tag>是否关联电子书</el-tag>
        </el-col>
        <el-col :span="10">
          <el-radio-group v-model="doc.permit">
            <el-radio label="是" value="true" @change="showBookList"></el-radio>
            <el-radio label="否" value="false"></el-radio>
          </el-radio-group>
        </el-col>
        <book-list :doc="doc" :show-book="showBooks"/>

      </el-form-item>

      <el-form-item>
        <el-col :span="3">
          <el-tag>音频资料</el-tag>
        </el-col>
        <el-col :span="12" >
          <!--          <up-load/>-->
          <el-upload
              ref="upload"
              action="http://127.0.0.1:8888/doc/upload"
              :data={name:this.doc.name,type:this.doc.type,permit:this.doc.permit,books:JSON.stringify(this.doc.books)}
              :file-list="doc.fileList"
              :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
          <!---->
        </el-col>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="shutdown">取 消</el-button>
      <el-button type="success"  @click="affirm" v-show="addDoc.show">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import BookList from "@/components/BookList";
export default {
name: "AddDocument",
  components: {BookList},
  props:{
    addDoc: Object
  },
  data(){
    return{
      emptyDoc:{
        time:"",
        name: '',
        type: '',
        isLoad: '',
        permit: '',
        books: [],
      },
      doc:{
        time:"",
        name: '',
        type: '',
        isLoad: '',
        permit: '',
        books: [],
      },
      showBooks:{
        show: false
      },
      left: 'left',
      fileList:[],
    }
  },
  methods:{
    affirm(){
      this.$refs.upload.submit();
      this.doc = this.emptyDoc
      this.shutdown()
    },
    shutdown(){
      this.addDoc.show = false;
    },
    showBookList(){
      this.showBooks.show = true
    },
  }
}
</script>

<style scoped>

</style>