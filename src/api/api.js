/*
 * @Author: your name
 * @Date: 2021-06-11 14:08:49
 * @LastEditTime: 2021-12-27 14:41:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\api\api.js
 */

import request from '@/utils/request'

//菜单列表
export function getMenuList(params) {
  return request({
    url: '/sys/menu/list',
    method: 'post',
    data:params
  })
}

//菜单添加
export function getMenuAdd(params) {
    return request({
        url: '/sys/menu/add',
        method: 'post',
        data:params
    })
}

//菜单修改
export function getMenuUpdate(params) {
    return request({
        url: '/sys/menu/update',
        method: 'post',
        data:params
    })
}

//菜单删除
export function getMenuDel(params) {
    return request({
        url: '/sys/menu/delete',
        method: 'post',
        data:params
    })
}

//用户新增
export function userAdd(params) {
    return request({
        url: '/sys/user/add',
        method: 'post',
        data:params
    })
}

//用户类型枚举
export function userTypeList(params) {
    return request({
        url: '/sys/dictionaries/get_user_type_dic',
        method: 'get',
        data:params
    })
}


//用户修改
export function userUpdate(params) {
    return request({
        url: '/sys/user/update',
        method: 'post',
        data:params
    })
}

//用户修改状态
export function userUpdateStatus(params) {
    return request({
        url: '/sys/user/update_status',
        method: 'post',
        data:params
    })
}


//用户密码修改
export function userUpdatePwd(params) {
    return request({
        url: '/sys/user/updatePwd',
        method: 'post',
        data:params
    })
}

//用户手机号修改
export function userUpdatePhone(params) {
    return request({
        url: '/sys/user/update_phone',
        method: 'post',
        data:params
    })
}

//用户邮箱修改
export function userUpdateMail(params) {
    return request({
        url: '/sys/user/update_email',
        method: 'post',
        data:params
    })
}

//用户邮箱发送验证码
export function userSendEmailCode(params) {
    return request({
        url: '/sys/user/verify_email',
        method: 'post',
        params
    })
}

//用户手机发送验证码
export function userSendPhoneCode(params) {
    return request({
        url: '/sys/user/verify_phone',
        method: 'get',
        params
    })
}


//用户删除
export function userDel(params) {
    return request({
        url: '/sys/user/delete',
        method: 'get',
        params
    })
}

//用户重置密码
export function userPwdReset(params) {
    return request({
        url: '/sys/user/reset_password',
        method: 'post',
        data:params
    })
}


//用户查询
export function userList(params) {
    return request({
        url: `/sys/user/list`,
        method: 'get', 
        params
    })
}

//获取新的用户名
export function getNewUserName(params) {
    return request({
        url: '/sys/user/get_new_username',
        method: 'get',
        data:params
    })
}


//角色查询
export function roleList(params) {
    return request({
        url: '/sys/role/getRoleList',
        method: 'post',
        data:params
    })
}

//角色编辑
export function roleUpdate(params) {
    return request({
        url: '/sys/role/updateRole',
        method: 'post',
        data:params
    })
}

//角色新增
export function roleAdd(params) {
    return request({
        url: '/sys/role/addRole',
        method: 'post',
        data:params
    })
}

//角色删除
export function roleDel(params) {
    return request({
        url: '/sys/role/deleteRole',
        method: 'post',
        data:params
    })
}

//设置角色状态
export function roleSetStatus(params) {
    return request({
        url: '/sys/role/setState',
        method: 'post',
        data:params
    })
}

//项目列表查询
export function projectList(params) {
    return request({
        url: '/pro/projectList',
        method: 'post',
        data:params
    })
}

//项目新增
export function projectAdd(params) {
    return request({
        url: '/pro/addProject',
        method: 'post',
        data:params
    })
}

//项目修改
export function projectUpdate(params) {
    return request({
        url: '/pro/updateProject',
        method: 'post',
        data:params
    })
}

//项目删除
export function projectDel(params) {
    return request({
        url: '/pro/deleteProject',
        method: 'post',
        data:params
    })
}

//授权列表
export function assigningList(params) {
    return request({
        url: '/sys/role/assigningList ',
        method: 'post',
        data:params
    })
}

//授权列表
export function setUser(params) {
    return request({
        url: '/sys/role/assigningUsers',
        method: 'post',
        data:params
    })
}

//角色菜单列表
export function menuRoleList(params) {
    return request({
        url: '/sys/role/roleAuthMenuList',
        method: 'post',
        data:params
    })
}

//分配角色菜单
export function addMenuRole(params) {
    return request({
        url: '/sys/role/roleAuthMenu',
        method: 'post',
        data:params
    })
}

//用户分配项目列表
export function userAssPro(params) {
    return request({
        url: '/sys/user/get_project_by_user',
        method: 'get',
        params
    })
}

//用户分配项目事件
export function userAssProCommit(params) {
    return request({
        url: '/sys/user/assign_project',
        method: 'post',
        data:params
    })
}


//角色分配用户列表
export function roleUserList(params) {
    return request({
        url: '/sys/role/assUserList',
        method: 'post',
        data:params
    })
}

//角色分配用户事件
export function bindRoleUser(params) {
    return request({
        url: '/sys/role/assUser',
        method: 'post',
        data:params
    })
}


//分配项目列表
export function assignItems(params) {
    return request({
        url: '/pro/addUserToProjectList',
        method: 'post',
        data:params
    })
}

//分配项目批量授权
export function giveRoleAssign(params) {
    return request({
        url: '/pro/UserToProjectBinding',
        method: 'post',
        data:params
    })
}

//分配项目批量授权
export function removeRoleAssign(params) {
    return request({
        url: '/pro/UserToProjectUnBinding',
        method: 'post',
        data:params
    })
}

//添加项目返回的参数
export function addProjectList(params) {
    return request({
        url: '/pro/addProjectList',
        method: 'post',
        data:params
    })
}

//全局模糊查询
export function fuzzyQuery(params) {
    return request({
        url: '/pro/globalProjectList',
        method: 'post',
        data:params
    })
}

//扬尘设备列表
export function smzDeviceList(params) {
    return request({
        url: '/pro/ycDeviceList',
        method: 'post',
        data:params
    })
}

//扬尘设备对接列表
export function ycDeviceButtList(params) {
    return request({
        url: '/pro/deviceButtList',
        method: 'post',
        data:params
    })
}

//扬尘设备对接添加
export function ycDeviceButtAdd(params) {
    return request({
        url: '/pro/addDeviceButt',
        method: 'post',
        data:params
    })
}

//扬尘设备对接编辑
export function ycDeviceButtEdit(params) {
    return request({
        url: '/pro/updateDeviceButt',
        method: 'post',
        data:params
    })
}


//采集设备展示列表
export function cjDeviceList(params) {
    return request({
        url: '/pro/cjDeviceList',
        method: 'post',
        data:params
    })
}

//设备添加
export function addDevice(params) {
    return request({
        url: '/pro/addDevice',
        method: 'post',
        data:params
    })
}

//删除设备
export function deleteDevice(params) {
    return request({
        url: '/pro/deleteDevice',
        method: 'get',
        params
    })
}

//扬尘数据历史监测列表
export function hjjc(params) {
    return request({
        url: '/pro/dust_monitor_info/datas',
        method: 'get',
        params
    })
}

//获取项目的扬尘设备信息
export function ycInfo(params) {
    return request({
        url: '/pro/dust_monitor_info/devices',
        method: 'get',
        params
    })
}

//获取扬尘设备相关数据
export function ycDeviceInfo(params) {
    return request({
        url: '/pro/dust_monitor_info/device_dust_monitor',
        method: 'get',
        params
    })
}

//修改设备继电器配置信息
export function ycEditInfo(params) {
    return request({
        url: '/pro/dust_monitor_info/update_dust_device_relay_config',
        method: 'post',
        data:params
    })
}


//获取扬尘监测数据实时数据（超级管理员）
export function realTimeData(params) {
    return request({
        url: '/pro/dust_monitor_info/real_time_datas',
        method: 'get',
        params
    })
}

//扬尘监测历史数据导出当前页
export function monitorInfoExport(params) {
    return request({
        url: '/pro/dust_monitor_info/export_current',
        method: 'get',
        params,
        responseType: 'blob'
    })
}

//扬尘监测历史数据导出所有查询结果
export function monitorInfoExportAll(params) {
    return request({
        url: '/pro/dust_monitor_info/export_all',
        method: 'get',
        params,
        responseType: 'blob'
    })
}



//国控数据展示列表
export function PCSDataList(params) {
    return request({
        url: '/pro/PCSDataList',
        method: 'post',
        data:params
    })
}

//国控数据修改
export function PCSDataEdit(params) {
    return request({
        url: '/pro/setPCSData',
        method: 'post',
        data:params
    })
}

//扬尘监测数字类型枚举
export function ycTypeList(params) {
    return request({
        url: '/sys/dictionaries/get_dust_monitor_type_dic',
        method: 'get',
        data:params
    })
}

//获取扬尘监测数据数据管理页面数据
export function ycDataManage(params) {
    return request({
        url: '/pro/dust_monitor_info/minute_datas',
        method: 'get',
        params
    })
}

//获取扬尘设备权重配置信息
export function ycDataManageConfig(params) {
    return request({
        url: '/pro/dust_monitor_info/get_dust_device_weights_config',
        method: 'get',
        params
    })
}

//获取扬尘设备权重配置数据类型字典表
export function configType(params) {
    return request({
        url: '/sys/dictionaries/get_dust_device_weights_config_type_dic',
        method: 'get',
        params
    })
}

//扬尘设备权重配置信息修改
export function configEdit(params) {
    return request({
        url: '/pro/dust_monitor_info/update_dust_device_weights_config_basic_information',
        method: 'post',
        data:params
    })
}

//扬尘设备权重配置是否启用状态修改
export function configEditStatus(params) {
    return request({
        url: '/pro/dust_monitor_info/update_dust_device_weights_config_enable_control',
        method: 'post',
        data:params
    })
}

//获取用户管理的项目的扬尘展示信息（监测一览界面）
export function ycSjData(params) {
    return request({
        url: '/pro/dust_monitor_info/get_project_dust_info',
        method: 'get',
        params
    })
}

//获取扬尘信息最新实时值（监测一览界面）
export function ycSjDataDevice(params) {
    return request({
        url: '/pro/dust_monitor_info/get_newest_minute_dust_info',
        method: 'get',
        params
    })
}

//获取扬尘信息最新实时值（监测一览界面）
export function oneHourData(params) {
    return request({
        url: '/pro/dust_monitor_info/get_one_hour_minute_dust_info',
        method: 'get',
        params
    })
}

//获取最近一天扬尘数据小时值（监测一览界面）
export function oneDayData(params) {
    return request({
        url: '/pro/dust_monitor_info/get_one_day_hour_dust_info',
        method: 'get',
        params
    })
}

//设备展示界面按钮- 配置 （配置设备参数）
export function setDevice(params) {
    return request({
        url: '/pro/setDevice',
        method: 'post',
        data:params
    })
}

//获取人员列表展示搜索的班组、工种字典、同步状态字典数据
export function getTeamWorkMoreData(params) {
    return request({
        url: '/pro/per/getTeamWorkMoreData',
        method: 'post',
        data:params
    })
}

//人员花名册列表展示
export function perList(params) {
    return request({
        url: '/pro/per/perList',
        method: 'post',
        data:params
    })
}

//获取考勤分页数据
export function attendList(params) {
    return request({
        url: '/pro/attend/list',
        method: 'get',
        params
    })
}

//获取考勤数据查询条件
export function attendListMj(params) {
    return request({
        url: '/pro/attend/query_conditions',
        method: 'get',
        params
    })
}

//获取班组管理数据
export function bzList(params) {
    return request({
        url: '/pro/team/getTeamManagementData',
        method: 'post',
        data:params
    })
}

//编辑班组
export function bzEdit(params) {
    return request({
        url: '/pro/team/updateTeam',
        method: 'post',
        data:params
    })
}

//删除班组
export function bzDel(params) {
    return request({
        url: '/pro/team/deleteTeam',
        method: 'post',
        data:params
    })
}

//获取设置班组长需要的人员数据
export function bzPersonList(params) {
    return request({
        url: '/pro/team/getSetTeamLeaderData',
        method: 'post',
        data:params
    })
}

//获取考勤汇总数据
export function attendSummaryList(params) {
    return request({
        url: '/pro/attend/summary_list',
        method: 'get',
        params
    })
}

//获取班组管理数据
export function teamList(params) {
    return request({
        url: '/pro/team/getTeamManagementData',
        method: 'post',
        data:params
    })
}

//编辑班组
export function teamEdit(params) {
    return request({
        url: '/pro/team/updateTeam',
        method: 'post',
        data:params
    })
}

//删除班组
export function teamDel(params) {
    return request({
        url: '/pro/team/deleteTeam',
        method: 'post',
        data:params
    })
}

//获取设置班组长需要的人员数据
export function teamMonitorLsit(params) {
    return request({
        url: '/pro/team/getAllPersByTeamId',
        method: 'post',
        data:params
    })
}

//设置班组长
export function setTeamMonitor(params) {
    return request({
        url: '/pro/team/setTeamLeader',
        method: 'post',
        data:params
    })
}

//获取增加班组需要的项目数据
export function getAddTeamData(params) {
    return request({
        url: '/pro/team/getAddTeamData',
        method: 'post',
        data:params
    })
}

//增加班组
export function addTeam(params) {
    return request({
        url: '/pro/team/addTeam',
        method: 'post',
        data:params
    })
}

//取消班组长
export function cancelTeamLeader(params) {
    return request({
        url: '/pro/team/cancelTeamLeader',
        method: 'post',
        data:params
    })
}

//获取转移班组需要的班组数据
export function getTransferTeamData(params) {
    return request({
        url: '/pro/team/getTransferTeamData',
        method: 'post',
        data:params
    })
}

//转移班组
export function transferTeam(params) {
    return request({
        url: '/pro/team/transferTeam',
        method: 'post',
        data:params
    })
}

//人员详情展示
export function perDetails(params) {
    return request({
        url: '/pro/per/perDetails',
        method: 'post',
        data:params
    })
}

//备案人员
export function perListByRecord(params) {
    return request({
        url: '/pro/per/perListByRecord',
        method: 'post',
        data:params
    })
}

//管理人员
export function perListByManager(params) {
    return request({
        url: '/pro/per/perListByManager',
        method: 'post',
        data:params
    })
}

//临时人员
export function perListByTemp(params) {
    return request({
        url: '/pro/per/perListByTemp',
        method: 'post',
        data:params
    })
}

//获取人员上传异常搜索需要的数据
export function getPersUploadFailSearchData(params) {
    return request({
        url: '/pro/per/getPersUploadFailSearchData',
        method: 'post',
        data:params
    })
}

//人员上传异常展示
export function persUploadFail(params) {
    return request({
        url: '/pro/per/persUploadFail',
        method: 'post',
        data:params
    })
}

//获取人员设备授权状态
export function personStatus(params) {
    return request({
        url: '/pro/per/device_authorization_status',
        method: 'get',
        params
    })
}

//修改人员设备授权状态
export function editAuthorization(params) {
    return request({
        url: '/pro/per/update_device_authorization_status',
        method: 'post',
        data:params
    })
}

//获取当前用户管理的考勤设备
export function getPersonDevice(params) {
    return request({
        url: '/pro/per/clock_device',
        method: 'get',
        params
    })
}

//批量修改设备人员授权状态
export function batchEditAuthorization(params) {
    return request({
        url: '/pro/per/batch_update_device_authorization_status',
        method: 'post',
        data:params
    })
}

//人员删除（批量删除）
export function persDelete(params) {
    return request({
        url: '/pro/per/persDelete',
        method: 'post',
        data:params
    })
}

//
export function getTeamAndDictionariesData(params) {
    return request({
        url: '/pro/team/getTeamAndDictionariesData',
        method: 'post',
        data:params
    })
}


//人员退场（批量退场）
export function persForbidden(params) {
    return request({
        url: '/pro/per/persForbidden',
        method: 'post',
        data:params
    })
}

//导出考勤记录当前页数据
export function exportCurrentList(params) {
    return request({
        url: '/pro/attend/export_current_list',
        method: 'get',
        params,
        responseType: 'blob'
    })
}

//导出考勤记录所有查询数据
export function exportCurrentAllList(params) {
    return request({
        url: '/pro/attend/export_all_list',
        method: 'get',
        params,
        responseType: 'blob'
    })
}

//导出考勤汇总当前页数据
export function exportCurrentSummaryList(params) {
    return request({
        url: '/pro/attend/export_current_summary_list',
        method: 'get',
        params,
        responseType: 'blob'
    })
}

//导出考勤汇总所有查询数据
export function exportCurrentAllSummaryList(params) {
    return request({
        url: '/pro/attend/export_all_summary_list',
        method: 'get',
        params,
        responseType: 'blob'
    })
}

//退场人员列表
export function perListByForbidden(params) {
    return request({
        url: '/pro/per/perListByForbidden',
        method: 'post',
        data:params
    })
}

//人员花名册页面的人员授权（批量授权）
export function persAuthorized(params) {
    return request({
        url: '/pro/per/persAuthorized',
        method: 'post',
        data:params
    })
}



//人员花名册列表导出
export function perListExport(params) {
    return request({
        url: '/pro/per/perListExport',
        method: 'get',
        params,
        responseType: 'blob'
    })
}

//删除对接信息
export function deleteDeviceButt(params) {
    return request({
        url: '/pro/deleteDeviceButt',
        method: 'post',
        data:params
    })
}

//考勤详情
export function attendDetail(params) {
    return request({
        url: '/pro/attend/details',
        method: 'get',
        params
    })
}

//上传第三方平台
export function attendUpload(params) {
    return request({
        url: '/pro/attend/upload',
        method: 'post',
        data:params
    })
}

//上传建委
export function manualUploadPersToJW(params) {
    return request({
        url: '/pro/per/manualUploadPersToJW',
        method: 'post',
        data:params
    })
}

//获取考勤上传异常数据
export function attendErrorList(params) {
    return request({
        url: '/pro/attend/attend_upload_error_list',
        method: 'get',
        params
    })
}

//获取考勤上传对接平台（十一、12的查询条件）
export function getAttendUpTj(params) {
    return request({
        url: '/pro/attend/attend_upload_app_list',
        method: 'get',
        params
    })
}


//获取首页数据
export function homeData(params) {
    return request({
        url: '/pro/home/get_data',
        method: 'get',
        params
    })
}

//获取近15天考勤统计
export function fifteenData(params) {
    return request({
        url: '/pro/home/get_number_of_attend_pers_in_fifteen_days',
        method: 'get',
        params
    })
}

//获取人员进场选择界面数据
export function getPersCancelForbiddenData(params) {
    return request({
        url: '/pro/per/getPersCancelForbiddenData',
        method: 'post',
        data:params
    })
}

//人员进场
export function persCancelForbidden(params) {
    return request({
        url: '/pro/per/persCancelForbidden',
        method: 'post',
        data:params
    })
}

//调用接口通知设备厂商重发当天此设备考勤
export function pullAttendByDevice(params) {
    return request({
        url: '/pro/pullAttendByDevice',
        method: 'get',
        params
    })
}

//LED列表
export function ledDeviceList(params) {
    return request({
        url: '/pro/ledDeviceList',
        method: 'post',
        data:params
    })
}

//LED编辑
export function ledUpdateDevice(params) {
    return request({
        url: '/pro/updateDevice',
        method: 'post',
        data:params
    })
}

//编辑LED屏幕内容
export function setLedSwitchOrContent(params) {
    return request({
        url: '/pro/setLedSwitchOrContent',
        method: 'post',
        data:params
    })
}

//查询Led内容
export function ledDeviceInfo(params) {
    return request({
        url: '/pro/ledDeviceInfo',
        method: 'get',
        params
    })
}

//主板管理-展示页面数据
export function panelList(params) {
    return request({
        url: '/pro/mainBoardManagement',
        method: 'post',
        data:params
    })
}

//主板管理-点击配置按钮后的展示数据
export function mainBoardAddress(params) {
    return request({
        url: '/pro/mainBoardAddress',
        method: 'post',
        data:params
    })
}

//获取主板管理数据类型字典表
export function getDictionaries(params) {
    return request({
        url: '/sys/dictionaries/get_dictionaries_data',
        method: 'get',
        params
    })
}

//添加主板的ping配置
export function addMainBoardAddress(params) {
    return request({
        url: '/pro/addMainBoardAddress',
        method: 'post',
        data:params
    })
}

//编辑主板的ping配置 （开关的打开和关闭也在这个接口暂不另写）
export function updateMainBoardAddress(params) {
    return request({
        url: '/pro/updateMainBoardAddress',
        method: 'post',
        data:params
    })
}


//删除主板的ping配置
export function deleteMainBoardAddress(params) {
    return request({
        url: '/pro/deleteMainBoardAddress',
        method: 'post',
        data:params
    })
}

//ping测试 功能
export function pingTest(params) {
    return request({
        url: '/ws/pingTest',
        method: 'post',
        data:params
    })
}

//获取项目附加功能
export function getProjectFeatures(params) {
    return request({
        url: '/pro/project_additional_features/get',
        method: 'get',
        params
    })
}

//更新项目附加功能
export function projectFeaturesUpdate(params) {
    return request({
        url: '/pro/project_additional_features/update',
        method: 'post',
        data:params
    })
}

//超龄人员展示
export function perListByOverage(params) {
    return request({
        url: '/pro/per/perListByOverage',
        method: 'post',
        data:params
    })
}

//人员批量入场
export function batchAdmission(params) {
    return request({
        url: '/pro/per/batch_admission',
        method: 'post',
        data:params
    })
}

//获取迁移数据
export function migrationButton(params) {
    return request({
        url: '/pro/per/migrationButton',
        method: 'get',
        params
    })
}

//获取迁移数据
export function migrationTemporaryPer(params) {
    return request({
        url: '/pro/per/migrationTemporaryPer',
        method: 'post',
        data:params
    })
}

//获取今日进场人数
export function getNumberOfCome(params) {
    return request({
        url: '/pro/home/get_number_of_visitors_today',
        method: 'get',
        params
    })
}

//获取今日退场人数
export function getNumberOfExitMan(params) {
    return request({
        url: '/pro/home/get_number_of_exits_today',
        method: 'get',
        params
    })
}

//获取今日录入人数
export function getNumberOfInsert(params) {
    return request({
        url: '/pro/home/get_number_of_people_entered_today',
        method: 'get',
        params
    })
}

//获取现在现场人数
export function getNumberOfPerople(params) {
    return request({
        url: '/pro/home/get_number_of_people_on_site_today',
        method: 'get',
        params
    })
}

//获取项目总人数
export function getNumberOfTotal(params) {
    return request({
        url: '/pro/home/get_number_of_people_in_project',
        method: 'get',
        params
    })
}

//获取项目需上传建委人数
export function getNumberOfJw(params) {
    return request({
        url: '/pro/home/get_number_of_people_in_construction_committees',
        method: 'get',
        params
    })
}

//获取近15天考勤人数情况查询所需班组名称组
export function getFifthGroup(params) {
    return request({
        url: '/pro/home/get_team_name_list_of_attend_pers_in_fifteen_days',
        method: 'get',
        params
    })
}

//获取近15天考勤人数情况查询所需工种名称组
export function getFifthWork(params) {
    return request({
        url: '/pro/home/get_work_name_list_of_attend_pers_in_fifteen_days',
        method: 'get',
        params
    })
}

//获取不同类型设备数量（在线、离线）
export function getDevice(params) {
    return request({
        url: '/pro/home/get_number_of_device',
        method: 'get',
        params
    })
}

//获取各班组人员数量
export function getGroupNum(params) {
    return request({
        url: '/pro/home/get_number_of_team_personnel',
        method: 'get',
        params
    })
}

//获取各工种人员数量
export function getWorkNum(params) {
    return request({
        url: '/pro/home/get_number_of_work_personnel',
        method: 'get',
        params
    })
}

//获取各年龄段人员数量
export function getAgeNum(params) {
    return request({
        url: '/pro/home/get_number_of_all_ages_personnel',
        method: 'get',
        params
    })
}

//获取各性别人员数量
export function getSexNum(params) {
    return request({
        url: '/pro/home/get_number_of_sex_personnel',
        method: 'get',
        params
    })
}

//获取近15天通勤情况
export function getFifthDay(params) {
    return request({
        url: '/pro/home/get_number_of_attend_in_fifteen_days',
        method: 'get',
        params
    })
}

//获取各省份人员数量
export function getProvinceData(params) {
    return request({
        url: '/pro/home/get_number_of_province_personnel',
        method: 'get',
        params
    })
}

//1. 添加系统公告
export function sendAnnouncement(params) {
    return request({
        url: '/pro/inMailController/sendAnnouncement',
        method: 'post',
        data:params
    })
}

//2. 获取用户信箱所有信件
export function getUserMailbox(params) {
    return request({
        url: '/pro/inMailController/getUserMailbox',
        method: 'get',
        params
    })
}

//3. 用户点击信件时触发为已读
export function readMessage(params) {
    return request({
        url: '/pro/inMailController/readMessage',
        method: 'get',
        params
    })
}

//1. web页面上传TV端首页图片（单张）
export function uploadTvHomepagePictures(params) {
    return request({
        url: '/pro/uploadTvHomepagePictures',
        method: 'post',
        data:params
    })
}

//2. 获取待审核图片列表
export function checkList(params) {
    return request({
        url: '/pro/imageReview/list',
        method: 'post',
        data:params
    })
}

//3. 提交审核结果
export function checkResultSubmit(params) {
    return request({
        url: '/pro/imageReview/audit',
        method: 'post',
        data:params
    })
}

//5. 删除图片——（删除项目所属的TV端首页图片）
export function deleteTvHomepagePictures(params) {
    return request({
        url: '/pro/deleteTvHomepagePictures',
        method: 'get',
        params
    })
}

//4. 获取当前用户30分钟内未读信息信息中最新的一条
export function getNewMail(params) {
    return request({
        url: '/pro/inMailController/getNewMail',
        method: 'get',
        params
    })
}

//4. 获取当前用户30分钟内未读信息信息中最新的一条
export function editPassword(params) {
    return request({
        url: '/sys/user/update_password',
        method: 'post',
        data:params
    })
}

//人员接口
export function projectTeam(params) {
    return request({
        url: '/pro/per/project_team',
        method: 'get',
        params
    })
}

//
export function getSaleMan(params) {
    return request({
        url: '/sys/pers/get_sale',
        method: 'get',
        params
    })
}

// 修改短信预警开关状态
export function smsSwitch(params) {
    return request({
        url: '/pro/porject/update_sms_reminder_switch',
        method: 'post',
        data:params
    })
}

//项目设备在线数量统计查询
export function getDeviceNum(params) {
    return request({
        url: '/pro/get_project_device_online_count',
        method: 'get',
        params
    })
}

//设备离线次数统计查询
export function getDeviceOutNum(params) {
    return request({
        url: '/pro/get_device_offline_count',
        method: 'get',
        params
    })
}


export function projectRegionData(params) {
    return request({
        url: '/pro/projectRegionData',
        method: 'post',
        data:params
    })
}

export function updateDeviceName(params) {
    return request({
        url: '/pro/updateDevice',
        method: 'post',
        data:params
    })
}

//获取运渣车基本信息及配置
export function truckMsgGet(params) {
    return request({
        url: '/pro/slag_truck_record/get',
        method: 'get',
        params
    })
}

//获取运渣车记录
export function truckRecordGet(params) {
    return request({
        url: '/pro/slag_truck_record/get_list',
        method: 'get',
        params
    })
}

//运渣车主机提醒配置修改
export function truckUpdate(params) {
    return request({
        url: '/pro/slag_truck_reminder/update',
        method: 'post',
        data:params
    })
}