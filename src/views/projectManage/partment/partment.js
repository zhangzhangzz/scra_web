/*
 * @Author: your name
 * @Date: 2021-06-10 16:25:21
 * @LastEditTime: 2021-06-10 21:14:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\projectManage\partment\partment.js
 */
import minus from '../../../assets/images/permanage/minus.svg'
import add from '../../../assets/images/permanage/add.svg'
export default {
  data() {
    return {
      data: [{
        label: '一级 1',
        open:true,
        children: [{
          label: '二级 1-1',
          open:true,
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        open:true,
        children: [{
          label: '二级 2-1',
          open:true,
          children: [{
            label: '三级 2-1-2121211'
          },{
            label: '三级 2-1-2121211'
          }]
        }, {
          label: '二级 2-2',
          open:true,
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        open:true,
        children: [{
          label: '二级 3-1',
          open:true,
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          open:true,
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      data1: [{
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
      radio: '一级 1',
      dialogFormVisible:false,
      dialogFormVisible1:false,
      form: {
        name: '',
        cdname:''
      },
      formLabelWidth: '80px',
      bossName:''
    }
  },
  methods: {
    //一级菜单收起
    closeFirst(index){
      this.data[index].open = !this.data[index].open;
      this.radio = this.data[index].label
    },

    //一级菜单名称点击
    hickFirst(label,type){
        this.leftTitle = label;
        this.type = type
    },

    //一级菜单名称点击
    hickFirst1(label){
        this.bossName = label;
    },

    //二级菜单收起
    closeSecond(index,index1){
      this.data[index].children[index1].open = !this.data[index].children[index1].open;
      this.radio = this.data[index].children[index1].label
    },

    //一级菜单收起
    closeFirst1(index){
        this.data1[index].open = !this.data1[index].open;
        this.data1[index].icon = this.data1[index].open?minus:add
    },
  
    //二级菜单收起
    closeSecond1(index,index1){
        this.data1[index].children[index1].open = !this.data1[index].children[index1].open;
        this.data1[index].children[index1].icon = this.data1[index].children[index1].open?minus:add
    },
  

    handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
            done();
        })
        .catch(_ => {});
    },

    menuSure(){
        this.form.name = this.bossName;
        this.dialogFormVisible1 = false;
    }

    
  },
  mounted() {
    this.form.name = this.data[0].label
  }
}
