/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-09-09 20:45:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\SystemAdmin\MenuAdmin\MenuUpdate\MenuUpdate.js
 */
import {getMenuUpdate} from '@/api/api.js'
export default {
  data() {
    return {
      loading:false,
      dialogVisible: true,   //dia的显示
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
      status:"0",       //菜单状态、
      hidden:"0",       //菜单状态
      component:"",        //菜单授权码
      remark:"",        //备注
      keepAlive:'0',        //缓存
      redirect:'',          //重定向路径
      title:'',             //导航栏名称
      button:'',            //按钮标识符
      MenuType:'',         //上及菜单的类型   控制菜单类型(1 表示一级菜单   2 表示二级菜单   3表示按钮)
      row:'',
      dialogVisible1:false,
      fileList:[],
      disabled: false,
      imgBase64:'',
      dialogImageUrl :[],
      fileImg:[],
      show: 0 ,
    }
  },
  props:["DataUpdate"],
  methods: {
    UpdateDate(){
      let that = this;
      let param={};
      console.log(this.row)
      console.log(this.row.auth)
      if(this.row.menuName == ''){
        this.$message.error(`请输入${this.radio==3?'按钮':'菜单'}名称`);
        return 
      }else if(this.row.auth==''){
        this.$message.error(`请输入授权码`);
        return 
      }
      if(this.radio==1){
        if(this.row.icon == ''){
          this.$message.error('请上传图标');
          return 
        }else if(this.row.redirect == ''){
          this.$message.error('请输入重定向路径');
          return 
        }
      }else if(this.radio==1 || this.radio==2){
        if(this.row.title == ''){
          this.$message.error('请输入导航栏名称');
          return 
        }else if(this.row.auth == ''){
          this.$message.error('请输入授权码');
          return 
        }else if(this.row.path == ''){
          this.$message.error('请输入请求地址');
          return 
        }else if(this.row.permissions == ''){
          this.$message.error('请输入权限标识符');
          return 
        }else if(this.row.component == ''){
          this.$message.error('请输入组件标识符');
          return 
        }

      }else{
        if(this.row.auth == ''){
          this.$message.error('请输入授权码');
          return 
        }else if(this.row.component == ''){
          this.$message.error('请输入按钮标识符');
          return 
        }else if(this.row.permissions == ''){
          this.$message.error('请输入权限标识符');
          return 
        }
      }
      this.loading = true;
      if(this.radio == 3){
        param.auth = this.row.auth;
        param.sysMenu = {};
        param.sysMenu.menuId = this.row.menuId;
        param.sysMenu.menuName = this.row.menuName;
        param.sysMenu.permissions = this.row.permissions;
        param.sysMenu.component = this.row.component;
        param.sysMenu.menuStatus = parseInt(this.row.menuStatus);
        param.sysMenu.remark = this.row.remark;
        param.sysMenu.version = this.row.version;
      }else if(this.radio == 1){
        param.auth = this.row.auth;
        param.sysMenu = {};
        param.sysMenu.menuId = this.row.menuId;
        param.sysMenu.path = '/'+this.row.path;
        param.sysMenu.menuName = this.row.menuName;
        param.sysMenu.icon = this.row.icon;
        param.sysMenu.component = this.row.component;
        param.sysMenu.redirect = '/'+this.row.redirect;
        param.sysMenu.title = this.row.title;
        param.sysMenu.menuStatus = parseInt(this.row.menuStatus);
        param.sysMenu.remark = this.row.remark;
        param.sysMenu.keepAlive = parseInt(this.row.keepAlive);
        param.sysMenu.permissions = this.row.permissions;
        param.sysMenu.version = this.row.version;
        param.sysMenu.hidden = parseInt(this.row.hidden);
      }else{
        param.auth = this.row.auth;
        param.sysMenu = {};
        param.sysMenu.menuId = this.row.menuId;
        param.sysMenu.menuName = this.row.menuName;
        param.sysMenu.path = this.row.path;
        param.sysMenu.component = this.row.component;
        param.sysMenu.title = this.row.title;
        param.sysMenu.menuStatus = parseInt(this.row.menuStatus);
        param.sysMenu.remark = this.row.remark;
        param.sysMenu.keepAlive = parseInt(this.row.keepAlive);
        param.sysMenu.permissions = this.row.permissions;
        param.sysMenu.version = this.row.version;
        param.sysMenu.hidden = parseInt(this.row.hidden);
      }

      getMenuUpdate(param).then(res => {
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
          this.loading = false;
        }
      })
      .catch(() => {this.loading = false;})
    },
    AddData(){      //添加修改数据
       this.menuType = this.DataUpdate.menuType
       this.radio = this.DataUpdate.menuType===0?'1':(this.DataUpdate.menuType===1?'2':'3')
       if(this.DataUpdate.menuType!=2){
         if(this.DataUpdate.menuType==0){
           this.DataUpdate.redirect = this.DataUpdate.redirect.slice(1,this.DataUpdate.redirect.length)
           this.DataUpdate.path = this.DataUpdate.path.slice(1,this.DataUpdate.path.length)
           this.fileList = [{url:this.DataUpdate.icon}]
         }
       }
       
       this.DataUpdate.menuStatus = this.DataUpdate.menuStatus.toString();
       if(this.DataUpdate.keepAlive != undefined){
        this.DataUpdate.keepAlive = this.DataUpdate.keepAlive.toString();
       }

       if(this.DataUpdate.hidden != undefined){
        this.DataUpdate.hidden = this.DataUpdate.hidden.toString();
       }
       
      //  this.DataUpdate.auth = '';
       this.row = this.DataUpdate;
    },
    setIndex(index) {   //dia的关闭和确定
      this.$emit('getIndex', 0)
    },
    setIndex2(){      //dia X的关闭
      this.$emit('getIndex', 1)
    },

    handleRemove(file) {
      let that = this;
      this.icon = '';
      this.dialogImageUrl = '';
      this.row.icon = '';
      this.fileList = [];
    },
    
    handlePictureCardPreview(file) {
      this.dialogImageUrl = [file.url];
      this.dialogVisible1 = true;
    },

    handlePreview(file,fileList) {
      let that = this;
      this.fileList = fileList;
      this.$base64Img(this.fileList[0].raw).then((res)=>{		//调用全局方法
        that.row.icon = res;					//控制台打印出图片base64值
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
    this.AddData()
    console.log(this.DataUpdate)
  }
}
