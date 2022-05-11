/*
 * @Author: your name
 * @Date: 2021-07-26 12:07:05
 * @LastEditTime: 2021-08-26 20:32:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\deviceManage\realTime\realTime.js
 */
import {realTimeData} from '@/api/api.js'
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
				value: 1,
				label: '项目名称'
			}, {
				value: 2,
				label: '设备ID'
			}],
			value: 1,
			input1:'',
			input2:'',
			currentPage4: 4,
			dialogTableVisible: false,
			user:JSON.parse(localStorage.getItem('user')),
			projectName:'',				//项目名称
			deviceId:'',				//设备ID
			regionId:'',				//区域ID
		}
	},
	methods:{

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

        selectChange(){
            this.projectName = '';
        },

		showList(){
	      	let that = this;
			that.loading = true;
	     	let params = {
				pageNumber : that.page,
				limit : that.pageSize
			};
			if(that.user.userType == 6){
				if(that.value==1){
					params.projectName = that.projectName;
				}else{
					params.deviceId = that.projectName;
				}
			}
			this.loading = true;
			realTimeData(params).then(res => {
	        if(res.code == 200){
				that.loading = false;
				that.tableData = res.data.items
				that.total = res.data.total
	        }else{
	          this.$message.error(res.message);
	 			this.loading = false;
	        }
	      })
	      .catch(() => {this.loading = false;})
	    },
	},
	mounted(){
		this.showList();
	},
}