<template>
<div class="organization-container">
  <div style="margin: 30px;"></div>
  <el-tag type="info" >组织机构管理</el-tag>
  <div style="margin: 30px;"></div>

  <el-row class="tac">

    <el-col :span="5">
      <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          @node-click="nodeClick"
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          :draggable="true"
          :highlight-current="true">

        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            {{ node.label }}
            <i class="small-operation-btn el-icon-delete" @click="deleteItem"/>
          </span>
        </span>


      </el-tree>
    </el-col>

    <el-col :span="12">
      <el-main>
        <org-content :depart="details"/>
      </el-main>
    </el-col>
  </el-row>
</div>
</template>

<script>
import OrgContent from "@/components/OrgContent";
import {getDepart,getDepartDetail,postId,deleteDepart} from "@/network/Department";

export default {
  name: "Organization",
  components: {OrgContent, },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      details:Object,
      node: {
        parent: '',
        son: ''
      },
      deleteId: '',
    };
  },
  created(){
    this.getDeparts()

    this.$bu.$on('changeDepartName',() => {
      this.getDeparts()
    })
  },
  methods: {
    handleDragStart(node) {
      this.node.son = node.key
      // console.log('drag start', node.key);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      // console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      // console.log('tree drag end: ', dropNode && dropNode.label, dropType,dropNode.id);
      // console.log(dropNode.key)
      this.node.parent = dropNode.key
      // console.log('tree drag details: ',this.data)
      // console.log(this.node)
      // this.postContent(this.data)
      this.postId(this.node)
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // console.log('tree drop: 最后一次', dropNode.label, dropType);

      // this.postContent(this.details)

    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    },

    getDeparts(){
      getDepart().then(res =>{
        this.data = res.data
      })
    },
    nodeClick(dropNode,ev){
      // console.log("move",ev.key)
      this.deleteId = dropNode.id
      console.log(this.deleteId)
      this.getDepartDetail(ev.key)
    },
    getDepartDetail(id){
      getDepartDetail(id).then(res=>{
        this.details = res.data
      })
    },
    postId(node){
      postId(node.parent,node.son).then(res => {
        // let a = JSON.parse(res);//将json字符串转换成json对象
        if (res.code == 200){
          this.moveSuccess(res.data)
        }else{
          this.moveFailed(res.data)
        }
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
    deleteItem(){
      this.$confirm('此操作将永久删除组织, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteDepart(this.deleteId)
        this.$message({
          type: 'success',
          message: '删除成功!'+this.deleteId
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    deleteDepart(id){
      deleteDepart(id).then( res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>
.organization-container{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>