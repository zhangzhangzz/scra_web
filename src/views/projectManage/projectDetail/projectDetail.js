/*
 * @Author: your name
 * @Date: 2021-06-10 13:41:13
 * @LastEditTime: 2021-06-25 16:03:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\projectManage\projectDetail\projectDetail.js
 */

import minus from '../../../assets/images/permanage/minus.svg'
import add from '../../../assets/images/permanage/add.svg'
export default {
  data() {
    return {
      data: [{
        label: '一级 1',
        icon:minus,
        open:true,
        children: [{
          label: '二级 1-1',
          icon:minus,
          open:true,
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        icon:minus,
        open:true,
        children: [{
          label: '二级 2-1',
          icon:minus,
          open:true,
          children: [{
            label: '三级 2-1-2121211'
          },{
            label: '三级 2-1-2121211'
          }]
        }, {
          label: '二级 2-2',
          icon:minus,
          open:true,
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        icon:minus,
        open:true,
        children: [{
          label: '二级 3-1',
          icon:minus,
          open:true,
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          icon:minus,
          open:true,
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      leftTitle:'',
      type:1,
      video:[{

      },{

      },{

      },{
          
      }],
      dialogVisible:false,
      dialogVisible1:false,
      ruleForm:{
        region:'',
        qymc:''
      },
      rules: {
      } ,
      tag:0,
      fileList:[],
    }
  },
  methods: {
    //一级菜单收起
    closeFirst(index){
      this.data[index].open = !this.data[index].open;
      this.data[index].icon = this.data[index].open?minus:add
    },

    handleClose(){
        this.dialogVisible = false;
        this.dialogVisible1 = false;
    },

    //一级菜单名称点击
    hickFirst(label,type){
        this.leftTitle = label;
        this.type = type
    },

    //二级菜单收起
    closeSecond(index,index1){
      this.data[index].children[index1].open = !this.data[index].children[index1].open;
      this.data[index].children[index1].icon = this.data[index].children[index1].open?minus:add
    },

    //删除视频
    remove(index){
        console.log(index)
        this.video.splice(index,1);
    },

    handleClick(e) {
      if(e == 1){
        this.tag = 0; 
        this.dialogVisible = true
      }
    },

    addQy(){
      this.dialogVisible = true;
      this.tag = 1;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  mounted() {
    this.leftTitle = this.data[0].label;
  }
}
