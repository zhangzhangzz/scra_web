/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-09-09 20:44:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\SystemAdmin\MenuAdmin\MenuAdd\MenuAdd.js
 */
// 数据接口
import {getMenuList,getMenuAdd} from '@/api/api.js'
import { param } from '@/utils';
export default {
  data() {
    return {
      input1:"主目录",    //上级菜单
      radio: '1',         //菜单类型
      auth:'',            //授权码
      id:'',              //父级id
      type:'',            //类型 0  主目录  1菜单  2按钮
      name:"",        //菜单名称
      path:"",       //请求地址
      region:"",          //菜单打开方式
      ButtonRoot:"",      //按钮标识
      perm:"",        //菜单权限标识
      icon:"",        //菜单图标
      status:"0",       //菜单状态
      component:"",        //菜单授权码
      remark:"",        //备注
      keepAlive:'0',        //缓存
      hidden:'0',           //是否在菜单栏中显示
      redirect:'',          //重定向路径
      title:'',             //导航栏名称
      button:'',            //按钮标识符

      dialogVisible: true,   //dia的显示
      Tree:"",            //树的选择
      HD:0,               //菜单选择dia的显隐
      MenuType:4,         //上及菜单的类型   控制菜单类型(1 表示一级菜单   2 表示二级菜单   3表示三级菜单  4表示主目录)

      data: [],           //  菜单列表
      data1: [],           //  菜单列表1
      defaultProps: {
        children: 'children',
        label: 'menuName',
        menuType:"menuType"
      },
      loading:false,
      backMenuType:[],
      dialogImageUrl :[],
      fileImg:[],
      show: 0 ,
      dialogVisible1:false,
      fileList:[],
      disabled: false,
      imgBase64:'',
    }
  },
  props:["dialogAdd"],
  methods: {
    add(){  //添加按钮菜单的提交
      let that = this;
      let param={};
      if(this.name == ''){
        this.$message.error(`请输入${this.radio==3?'按钮':'菜单'}名称`);
        return 
      }
      if(this.radio==1 || this.radio==2){
        if(this.title == ''){
          this.$message.error('请输入导航栏名称');
          return 
        }else if(this.auth == ''){
          this.$message.error('请输入授权码');
          return 
        }else if(this.path == ''){
          this.$message.error('请输入请求地址');
          return 
        }else if(this.perm == ''){
          this.$message.error('请输入权限标识符');
          return 
        }else if(this.icon == '' && this.radio==1){
          this.$message.error('请上传图标');
          return 
        }else if(this.component == ''){
          this.$message.error('请输入组件标识符');
          return 
        }else if(this.redirect == '' && this.radio==1){
          this.$message.error('请输入重定向路径');
          return 
        }

      }else{
        if(this.auth == ''){
          this.$message.error('请输入授权码');
          return 
        }else if(this.button == ''){
          this.$message.error('请输入按钮标识符');
          return 
        }else if(this.perm == ''){
          this.$message.error('请输入权限标识符');
          return 
        }
      }

      if(this.radio == 3){
        //按钮
        let type = this.queryType('按钮');
        param.auth = this.auth;
        param.sysMenu = {
          parentId : this.Tree.menuId,
          menuType : type,
          menuName : this.name,
          permissions : this.perm,
          component : this.button,
          menuStatus : parseInt(this.status),
          remark : this.remark
        }
        
      }else if(this.radio == 1){
        //目录
        let type = this.queryType('主目录');
        param.auth = this.auth;
        param.sysMenu = {
          parentId : '0',
          menuType : type,
          path : '/'+this.path,
          menuName : this.name,
          icon : this.icon,
          component : this.component,
          redirect : '/'+this.redirect,
          title : this.title,
          menuStatus : parseInt(this.status),
          remark : this.remark,
          keepAlive : parseInt(this.keepAlive),
          permissions : this.perm,
          hidden : parseInt(this.hidden)
        }
      }else{
        //菜单
        let type = this.queryType('菜单');
        param.auth = this.auth;
        param.sysMenu = {
          parentId : this.Tree.menuId,
          menuType : type,
          menuName : this.name,
          path : this.path,
          component : this.component,
          title : this.title,
          menuStatus : parseInt(this.status),
          remark : this.remark,
          keepAlive : parseInt(this.keepAlive),
          permissions : this.perm,
          hidden : parseInt(this.hidden)
        }
      }
     this.loading = true;
      getMenuAdd(param).then(res => {
        that.loading = false;
        if(res.code == 200){
          this.$alert(res.message, '提示', {
            confirmButtonText: '确定',
            showClose:false,
            closeOnClickModal:false,
            closeOnPressEscape:false,
            closeOnHashChange:false,
            callback: action => {
              that.setIndex2();
            }
          });
        }else{
          this.$message.error(res.message);
          that.loading = false;
        }
      })
      .catch(() => {that.loading = false;})
      
    },
    queding(index){       //选择菜单的确定按钮
      if(index){
        this.MenuType=4;
        this.input1="主目录";
        this.radio='1';
      }else{
        this.MenuType = this.Tree.menuType==1?'按钮':'菜单'
        this.input1=this.Tree.menuName
        if(this.Tree.menuType == 1){
          this.radio = '3'
        }else{
          this.radio = '2'
        }
      }
      this.HD=0    //选择菜单的显隐
    },

    queryType(type){
      let that = this;
      var item1 = null;
      try {
        that.backMenuType.forEach(function(item,index,arr){
          console.log(type)
          if(type === item.dicValue){
            item1 = item.dicKey
            throw Error();
          }
        })
      } catch (e) {
      }
      return item1;
    },

    HDChange(Inde){    //控制选择菜单的显隐
      this.HD=Inde
    },
    handleNodeClick(data) {  //上级菜单的选择
      this.Tree=data
    },
    setIndex() {   //dia的关闭和确定
      this.$emit('getIndex', 0)
    },
    setIndex2(){      //dia X的关闭
      this.$emit('getIndex', 1)
    },
    showOne(){
      let that = this;
      let params = {};
      getMenuList(params).then(res => {
        if(res.code == 200){
          let array = [];
          res.data.menuList.forEach(function(item,index,arr){
            if(item.children!=null){
              item.children.forEach(function(item1,index1,arr1){
                delete item1.children
              })
            }
            array.push(item)
          })
          that.data = array;
          that.data1=res.data.menuList
          that.backMenuType = res.data.menuType
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {})
    },

    handleRemove(file) {
      let that = this;
      this.icon = '';
      this.dialogImageUrl = '';
      this.fileList = [];
    },
    
    handlePictureCardPreview(file) {
      this.dialogImageUrl = [file.url];
      this.dialogVisible1 = true;
    },

    handlePreview(file,fileList) {
      let that = this;
      this.fileList = fileList;
      console.log(fileList)
      this.$base64Img(this.fileList[0].raw).then((res)=>{		//调用全局方法
        that.icon = res;					//控制台打印出图片base64值
      })
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      
    },
  },
  mounted(){
    this.showOne()
  }
}
