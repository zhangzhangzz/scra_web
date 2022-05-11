/*
 * @Author: your name
 * @Date: 2021-07-01 16:31:11
 * @LastEditTime: 2021-10-30 11:13:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\deviceManage\History1\History1.js
 */
import {hjjc,ycTypeList,monitorInfoExport,monitorInfoExportAll} from '@/api/api.js'
import { getToken,getProjectId } from '@/utils/auth'
export default{
	data(){
		return{
			tableData:[],
			actived:0,
			data:'',
			typeList:[],		//类型枚举
			loading:true,
			total:0,             //人员总个数
			page:1,               //点击显示多少页
			Indent:0,             //点击页面的标识   用在点击页面的下面
			pageSize:10,
			options: [{
				value: '1',
				label: '项目名称'
			}, {
				value: '2',
				label: '设备ID'
			}],
			value: '1',
			input1:'',
			input2:'',
			currentPage4: 4,
			dialogTableVisible: false,
			date:'',
			user:JSON.parse(localStorage.getItem('user')),
			monType:'',					//类型选择
			projectName:'',				//项目名称
			deviceId:'',				//设备ID
			regionId:'',				//区域ID
		}
	},
	methods:{
		//点击扬尘类型
		hick(index,type){
			this.actived = index;
			this.monType = type.dicKey;
			this.showList();
		},

		makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

		handleSizeChange(val) {
			this.pageSize = val;
			this.showList();
		},

		handleCurrentChange(val) {
			this.page = val;
			this.showList()
		},

		ycTypeList(tag){
			let that = this;
			ycTypeList().then(res => {
	        if(res.code == 200){
				that.typeList = res.data;
				that.monType = res.data[0].dicKey;
				if(tag){
					that.showList();
				}
	        }else{
	          this.$message.error(res.message);
	        }
	      })
	      .catch(() => {})
			
		},

		exportData(tag){
			let that = this;
			
  let url = process.env.VUE_APP_BASE_API;
			that.loading = true;
	     	let params = {
				monType : that.monType,
				pageNumber : that.page,
				startTimeStr : that.date!=''&& that.date!==null ? that.date[0]:'',
				endTimeStr : that.date!=''&& that.date!==null ? that.date[1]:'',
				limit : that.pageSize
			};
			if(that.user.userType != 1){
				if(that.value==1){
					params.projectName = that.projectName;
				}else{
					params.deviceId = that.projectName;
				}
			}
			this.loading = true;
			if(tag){
		// 		monitorInfoExport(params).then(res => {
		// 	        that.loading = false;
		// 			const aLink = document.createElement("a");
		// 			let blob =new Blob([res], {type:"application/vnd.ms-excel"})
		// 			aLink.href = URL.createObjectURL(blob)
		// 			aLink.setAttribute('download','扬尘监测当页历史数据' +'.csv')// 设置下载文件名称
		// 			aLink.click()
		// 			this.$refs.loadElement.appendChild(aLink)
		//       	})
		//       	.catch(() => {})
		this.axios.get(url+"/pro/dust_monitor_info/export_current", { params, headers: { token: getToken(), projectId: getProjectId() },timeout: 1800000,responseType:'blob' },
		).then((res) => {
		that.loading = false;
		const aLink = document.createElement("a");
		let blob =new Blob([res.data], {type:"application/vnd.ms-excel"})
		aLink.href = URL.createObjectURL(blob)
		aLink.setAttribute('download','扬尘监测当页历史数据' +'.csv')// 设置下载文件名称
		aLink.click();
		window.URL.revokeObjectURL(aLink.href);
		});
			}else{
		// 		monitorInfoExportAll(params).then(res => {
		// 	        that.loading = false;
		// 			const aLink = document.createElement("a");
		// 			let blob =new Blob([res], {type:"application/vnd.ms-excel"})
		// 			aLink.href = URL.createObjectURL(blob)
		// 			aLink.setAttribute('download','扬尘监测全部历史数据' +'.csv')// 设置下载文件名称
		// 			aLink.click()
		// 			this.$refs.loadElement.appendChild(aLink)
		//       	})
		//       	.catch(() => {})
		this.axios.get(url+"/pro/dust_monitor_info/export_all", { params, headers: { token: getToken(), projectId: getProjectId() },timeout: 1800000,responseType:'blob' },
		).then((res) => {
		that.loading = false;
		const aLink = document.createElement("a");
		let blob =new Blob([res.data], {type:"application/vnd.ms-excel"})
		aLink.href = URL.createObjectURL(blob)
		aLink.setAttribute('download','扬尘监测全部历史数据' +'.csv')// 设置下载文件名称
		aLink.click();
		window.URL.revokeObjectURL(aLink.href);
		});
			}
		},

		showList(){
	      	let that = this;
			that.loading = true;
	     	let params = {
				monType : that.monType,
				pageNumber : that.page,
				startTimeStr : that.date!=''&& that.date!==null ? that.date[0]:'',
				endTimeStr : that.date!=''&& that.date!==null ? that.date[1]:'',
				limit : that.pageSize
			};
			if(that.user.userType != 1){
				if(that.value==1){
					params.projectName = that.projectName;
				}else{
					params.deviceId = that.projectName;
				}
			}
			this.loading = true;
			hjjc(params).then(res => {
	        if(res.code == 200){
				that.loading = false;
				that.tableData = res.data.items
				that.total = res.data.total
				console.log(that.tableData)
	        }else{
	          this.$message.error(res.message);
			this.loading = false;
	        }
	      })
	      .catch(() => {this.loading = false;})
	    },
	},
	mounted(){
		this.ycTypeList(1);
	},
}