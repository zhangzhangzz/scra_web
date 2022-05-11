/*
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-20 21:01:37
 * @LastEditTime: 2021-10-28 15:39:48
 */
import {attendSummaryList,attendListMj,exportCurrentSummaryList,exportCurrentAllSummaryList} from '@/api/api.js'
import { getToken,getProjectId } from '@/utils/auth'
export default {
    data() {
        return {
            tableData: [],
            ruleForm: {
                xmmc:'',
                rylx:'',
                ryzt:'',
                kqsj:'',
                xm:'',
                bz:''
            },
            currentPage4: 1,
            month:31,
            pageSize:10,
            formLabelWidth: '80px',
            loading :false,
            page:1,
            total:0,
            dataValue:'',
            id:'',
            name:'',
            attendName:'',
            team:'',
            attendWork:'',
            attendStatus:'',
            startAttendTimeStr:'',
            endAttendTimeStr:'',
            persType:'',
            date:'',
            queryData:'',
            projectId:'',
            user:JSON.parse(localStorage.getItem('user')),
        }
    },
    mounted() {
        this.queryTj();
        this.showList();
        // this.buttonList =  this.$store.getters.button
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
			this.showList();
        },

        handleCurrentChange(val) {
            this.page = val;
            this.showList()
        },

        //展示角色
        showList(){
          let that = this;
          let params = {
            pageNumber:that.page,
            limit:that.pageSize,
            attendName:that.attendName,
            team:that.team,
            attendWork: that.attendWork,
            startAttendTimeStr:that.date!=''&& that.date!==null ? that.date[0]:'',
            endAttendTimeStr:that.date!=''&& that.date!==null ? that.date[1]:'',
            projectId:that.projectId
        };
            this.loading = true;
            attendSummaryList(params).then(res => {
                if(res.code == 200){
                  that.tableData = res.data.items;
                  that.loading = false;
                    that.total = res.data.total;
                }else{
                    this.loading = false;
                  this.$message.error(res.message);
                }
              })
              .catch(() => {this.loading = false;})
        },

        //查询签到日期
        querySign(date,i){
            if(date.length==0) return
            let str = '';
            date.forEach(function(item,index,arr){
                if(item == i){
                    str =   `√`
                }
                return
              })
            return str
        },

        query(){
            this.page =1;
            this.showList();
        },

        queryTj(){
        let that = this;
        attendListMj().then(res => {
            this.loading = false;
            if(res.code == 200){
              that.queryData= res.data;
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {})
        },

        exportData(tag){
            let that = this;
            let url = process.env.VUE_APP_BASE_API;
            // console.log(url)
            // return
            that.loading = true;
           	let params = {
                attendName:that.attendName,
                team:that.team,
                attendWork: that.attendWork,
                startAttendTimeStr:that.date!=''&& that.date!==null ? that.date[0]:'',
                endAttendTimeStr:that.date!=''&& that.date!==null ? that.date[1]:'',
                projectId:that.projectId
            };
            this.loading = true;
            if(tag){
              params.pageNumber = that.page;
              params.limit = that.pageSize;
              this.axios.get(url+"/pro/attend/export_current_summary_list", { params, headers: { token: getToken(), projectId: getProjectId() },timeout: 1800000,responseType:'blob' },
              ).then((res) => {
                that.loading = false;
                const aLink = document.createElement("a");
                let blob =new Blob([res.data], {type:"application/vnd.ms-excel"})
                aLink.href = URL.createObjectURL(blob)
                aLink.setAttribute('download','考勤汇总导出当前页数据' +'.csv')// 设置下载文件名称
                aLink.click();
                window.URL.revokeObjectURL(aLink.href);
              });
            }else{
        //         exportCurrentAllSummaryList(params).then(res => {
        //             that.loading = false;
        //             const aLink = document.createElement("a");
        //             let blob =new Blob([res], {type:"application/vnd.ms-excel"})
        //             aLink.href = URL.createObjectURL(blob)
        //             aLink.setAttribute('download','考勤汇总导出全部数据' +'.csv')// 设置下载文件名称
        //             aLink.click()
        //             this.$refs.loadElement.appendChild(aLink)
        //       	})
        //       	.catch(() => {})
                this.axios.get(url+"/pro/attend/export_all_summary_list", { params, headers: { token: getToken(), projectId: getProjectId() },timeout: 1800000,responseType:'blob' },
                ).then((res) => {
                that.loading = false;
                const aLink = document.createElement("a");
                let blob =new Blob([res.data], {type:"application/vnd.ms-excel"})
                aLink.href = URL.createObjectURL(blob)
                aLink.setAttribute('download','考勤汇总导出全部数据' +'.csv')// 设置下载文件名称
                aLink.click();
                window.URL.revokeObjectURL(aLink.href);
                });
            }
        },
    }
}