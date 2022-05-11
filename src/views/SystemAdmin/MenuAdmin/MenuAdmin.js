/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-09-22 16:01:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\SystemAdmin\MenuAdmin\MenuAdmin.js
 */
import {getMenuList,getMenuDel} from '@/api/api.js'
import Sortable from 'sortablejs'
import MenuAdd from './MenuAdd/MenuAdd.vue'
import MenuUpdate from './MenuUpdate/MenuUpdate.vue'
export default {
  data() {
    return {
      buttonList:[],
      options:[{
        value: 0,
        label: '否'
      }, {
        value: 1,
        label: '是'
      }],  //下拉框
      option:"",      //下拉框 选择值

      time:"",          //点击重新加载子组件(菜单新增子菜单)
      timeOne:"",          //点击重新加载子组件(修改菜单子菜单)
      Inde: 0,         //控制子组件蒙层的显隐

      DataUpdate:"",      //向修改菜单传递当行的数据
      menuStatus:'',
      menuName:'',
      expands:[],
      tableData:[],
      BFTable:[],
      loading:true
    }
  },
  components: {
    MenuAdd,MenuUpdate
  },
  methods: {
    delMenu(id){  //删除菜单/按钮
      var that = this;
      this.$prompt('请输入授权码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
              }).then(({ value }) => {
                that.delLine(id,value);
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                });
              });
    },
    OpenAll(){   //一键展开
      let OpenData=[]
      if(this.expands.length==0){
        for(let i=0;i<this.tableData.length;i++){
          OpenData.push(this.tableData[i].menuId)
          if(this.tableData[i].children){
            for(let q=0;q<this.tableData[i].children.length;q++){
              OpenData.push(this.tableData[i].children[q].menuId)
              if(this.tableData[i].children[q].children){
                for(let s=0;s<this.tableData[i].children[q].children.length;s++){
                  OpenData.push(this.tableData[i].children[q].children[s].menuId)
                }
              }
            }
          }
        }
        this.expands=OpenData.map(String);
      }else{
        this.expands=[]
      }
      console.log(this.expands)
    },


    getDialog(index){    //点击显示蒙层 传递参数  并重新加载子菜单
      this.Inde = index;
      this.time=Math.random();
      this.timeOne=Math.random();
    },

    getDialogOne(row,index){    //点击显示蒙层 传递参数  并重新加载子菜单
      this.DataUpdate=row
      this.Inde = index;
      this.timeOne=Math.random();
    },
    getIndex(index) {   //子组件传过来的方法
      this.Inde = 0;
      if(index!=0){
        this.$router.go(0);
      }else{
        this.showF();
      }
    },
    showF(){
      let that = this;
      let params = {
        menuName : that.menuName,
        menuStatus : that.menuStatus
      };
      getMenuList(params).then(res => {
        if(res.code == 200){
          res.data.menuList.forEach(function(item,index,arr){
            if(item.children.length!=0){
              item.children.forEach(function(item1,index1,arr1){
                item1.parentName = item.menuName
                if(item1.children.length!=0){
                  item1.children.forEach(function(item2,index2,arr2){
                    item2.parentName = item1.menuName
                  })
                }
              })
            }
          })
          that.tableData = res.data.menuList;
          that.BFTable = res.data.menuList;
          that.loading = false;
        }else{
          this.$message.error(res.message);
          that.loading = false;
        }
      })
      .catch(() => {that.loading = false;})
    },
    delLine(id,auth){
      let that = this;
      let params = {
        menuId:id,
        auth:auth
      };
      getMenuDel(params).then(res => {
         that.loading = false
        if(res.code == 200){
          this.$alert(res.message, '提示', {
            confirmButtonText: '确定',
            showClose:false,
            closeOnClickModal:false,
            closeOnPressEscape:false,
            closeOnHashChange:false,
            callback: action => {
              that.showF();
              that.loading = false
            }
          });
          
        }else{
          this.$message.error(res.message);
          that.loading = false
        }
      })
      .catch(() => {that.loading = false})
    },

    //行拖拽
    rowDrop() {
      const table = document.querySelector('.el-table__body-wrapper tbody')
      const self = this
      Sortable.create(table, {
        onEnd({ newIndex, oldIndex }) {
          console.log(newIndex, oldIndex)
        }
      })

    },
  },
  mounted() {
    this.showF();
    this.buttonList =  this.$store.getters.button
    //使每次都可以拖拽
    this.$nextTick(()=>{
      setTimeout(()=>{
        this.rowDrop();
      },100)     
    })
    console.log(this.buttonList)
  }
}
