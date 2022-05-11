/*
 * @Author: your name
 * @Date: 2021-07-26 12:21:58
 * @LastEditTime: 2021-09-17 11:18:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\deviceManage\ycMonitor\ycMonitor.js
 */
import {ycInfo,ycDeviceInfo,ycEditInfo} from '@/api/api.js'
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
export default{
    components:{
        globalProject
    },
	data(){
		return{
			radio:1,
            btnSwitch:true,
            data:'',
            deviceList:[],
            deviceId:'',
            loading:false,
            globalProjectId:'',
            user:JSON.parse(localStorage.getItem('user')),
		}
	},
	methods:{
		showList(){
	      	let that = this;
			that.loading = true;
			ycInfo().then(res => {
	        if(res.code == 200){
				that.loading = false;
				that.deviceList = res.data
                if(res.data.length>0){
                    that.deviceId = res.data[0].deviceId
                    that.showList1(that.deviceId);
                }else{
                    that.data = '';
                }
                
	        }else{
	          this.$message.error(res.message);
            this.loading = false;
	        }
	      })
	      .catch(() => {this.loading = false;})
	    },

        queryProId(id){
            this.globalProjectId = id;
        },

        showList1(id){
          	let that = this;
            that.loading = true;
            ycDeviceInfo({deviceId:id}).then(res => {
            if(res.code == 200){
                that.loading = false;
                that.data = res.data.voDustDevice
            }else{
              this.$message.error(res.message);
                this.loading = false;
            }
          })
          .catch(() => {this.loading = false;})
        },

        plChange(e){
            this.data.proDustDeviceRelayConfig.oneAutomatic = e;
            if(e==0){
                this.editDeviceInfo();
            }
        },

        wpChange(e){
            this.data.proDustDeviceRelayConfig.twoAutomatic = e;
            if(e==0){
                this.editDeviceInfo();
            }
        },

        editDeviceInfo(){
            let that = this;
            that.loading = true;
            let params = {
                deviceId: that.deviceId,
                oneState:that.data.proDustDeviceRelayConfig.oneState?1:0,
                oneAutomatic:that.data.proDustDeviceRelayConfig.oneAutomatic,
                twoState:that.data.proDustDeviceRelayConfig.twoState?1:0,
                twoAutomatic:that.data.proDustDeviceRelayConfig.twoAutomatic,
                oneThreshold: parseInt(that.data.proDustDeviceRelayConfig.oneThreshold),
                twoThreshold:parseInt(that.data.proDustDeviceRelayConfig.twoThreshold)
              };
            ycEditInfo(params).then(res => {
            if(res.code == 200){
                this.$alert(res.message, '提示', {
                    confirmButtonText: '确定',
                    showClose:false,
                    closeOnClickModal:false,
                    closeOnPressEscape:false,
                    closeOnHashChange:false,
                    callback: action => {
                        that.loading = false;
                        that.showList();
                    }
                });
               
            }else{
              this.$message.error(res.message);
            this.loading = false;
            }
          })
          .catch(() => {this.loading = false;})
        },

        changeSwitch(e){
            this.data.proDustDeviceRelayConfig.oneState = e;
            this.editDeviceInfo();
        },

        changeSwitch1(e){
            this.data.proDustDeviceRelayConfig.twoState = e;
            this.editDeviceInfo();
        },
	},
	mounted(){
        if(this.user.userType==1){
            this.showList();
        }
		
	},
    destroyed() {
        if(this.user.userType!=1){
            localStorage.removeItem("allProjectId");
        }
        
    },
}