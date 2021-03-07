<template>
  <el-dialog title="绑定文件" :visible.sync="BingFile.show">
    <el-table
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
      <el-table-column
          type="selection"
          width="80">
      </el-table-column>

      <el-table-column
          label="序号"
          type="index"
          width="80">
      </el-table-column>

      <el-table-column
          label="文件名称"
          prop="name"
          width="120">
      </el-table-column>
      <el-table-column
          label="文件类型"
          prop="type"
          width="120">
      </el-table-column>

      <el-table-column
          label="上传时间"
          prop="time"
          width="120">
      </el-table-column>

      <el-table-column
          label="阅读时长"
          prop="duration"
          width="120">
      </el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保存</el-button>
      <!--      @click="shutdown"-->
      <el-button type="danger" @click="cancel">取消</el-button>
      <!--      @click="affirm" v-show="addDoc.show"-->
    </div>
  </el-dialog>
</template>

<script>
import {getDocs} from "@/network/Document";
import {addResDocs} from "@/network/Train";

export default {
name: "BindFile",
  props:{
    BingFile:{
      show:false
    },
    docs:{
      list: [],
    },
    resId: '',
  },
  data(){
    return{
      data: []
    }
  },
  created() {
    this.getDocs()
  },
  methods:{
    getDocs(){
      getDocs().then(res =>{
        this.data = res.data
        // console.log(res.data)
      })
    },
    handleSelectionChange(val) {
      this.docs.list = val;
      this.docs.list = this.docs.list.map((doc) => {
        return doc.id
      })
    },

    save(){
      //5.绑定文件列表

      let maps = {"resId":this.resId,"docIds":this.docs.list}

      // console.log(JSON.stringify(obj));
      addResDocs(maps).then(res => {

      })
      this.docs.list = null
      this.docs.list = new Array()
      this.BingFile.show = false
    },
    cancel(){
      this.docs.list = null
      this.docs.list = new Array
      this.BingFile.show = false
    }

  }
}
</script>

<style scoped>

</style>