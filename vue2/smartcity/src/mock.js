const Mock = require('mockjs')

// let getUserInfo = function () {
//     let data = {
//         code: '200',
//         message: 'success',
//         result: true,
//         data: {
//             accountname: 'user1',
//             role: [
//                 {
//                     "title": "平台统计",
//                     "path": "audit-management",
//                     "type": "menu",
//                 },
//                 {
//                     "title": "审核管理",
//                     "path": "audit-management",
//                     "type": "menu",
//                     "children": [
//                         { "title": "居住人审核", "key": "review_resident", "path": "review_resident" },
//                         { "title": "访客审核", "key": "review_visitor", "path": "review_visitor" },
//                         { "title": "物业人员审核", "key": "review_property", "path": "review_property" },
//                         { "title": "其他人员审核", "key": "review_others", "path": "review_others" }]
//                 },
//                 {
//                     "title": "用户管理",
//                     "path": "user-management",
//                     "type": "menu",
//                     "children": [
//                         { "title": "移动端用户", "key": "mobile_user", "path": "mobile_user" },
//                         { "title": "web端用户管理", "key": "system_user", "path": "system_user" },
//                         { "title": "移动端实名认证", "key": "mobile_auth", "path": "mobile_auth" }]
//                 },
//                 {
//                     "title": "人员管理",

//                     "path": "personnel-management",
//                     "type": "menu",
//                     "children": [
//                         { "title": "居住人管理", "key": "person_resident", "path": "person_residen" },
//                         { "title": "访客人员管理", "key": "person_visitor", "path": "person_visitor" },
//                         { "title": "物业人员管理", "key": "person_property", "path": "person_property" },
//                         { "title": "公安人员管理", "key": "person_police", "path": "person_police" },
//                         { "title": "社区人员管理", "key": "person_community", "path": "person_community" }]
//                 }
//             ]

//         }
//     }
//     return data;
// }

const getUserInfo = function() {
    const data = {
        code: '200',
        message: 'success',
        result: true,
        data: {
            userName: 'admin',
            role: [
                // {
                //     "title": "平台统计",
                //     "path": "PlatformStats/PlatformStats",
                //     "type": "menu",
                // },
                {
                    title: "机构应用",
                    path: 'AgencyApplication',
                    type: "menu",
                    children: [
                        { title: "机构和账户", key: "review_resident", path: "/AgencyApplication/AgencyAccount" },
                        { title: "应用管理", key: "review_visitor", path: "/AgencyApplication/ApplicationManagement" },
                        { title: "应用通知公告", key: "review_property", path: "/AgencyApplication/ApplicationAnnouncements" },
                        { title: "三方应用信息", key: "review_others", path: "/AgencyApplication/ApplicationMessage" }]
                },
                {
                    title: "信息管理",
                    path: 'InfoManage',
                    type: "menu",
                    children: [
                        { title: "新闻资讯", key: "AgencyAccount", path: "/InfoManage/NewsInformation" },
                        { title: "通知公告", key: "Announcements", path: "/InfoManage/Announcements" },
                        { title: "意见反馈", key: "Feedback", path: "/InfoManage/Feedback" },
                        { title: "短信推送", key: "SMSPush", path: "/InfoManage/SMSPush" },
                        { title: "消息推送", key: "MessagePush", path: "/InfoManage/MessagePush" },
                        { title: "移动端BANNER", key: "MobileBanner", path: "/InfoManage/MobileBanner" },
                        { title: "移动端广告页", key: "MobileAdvertising", path: "/InfoManage/MobileAdvertising" },
                        { title: "关于我们", key: "AboutUs", path: "/InfoManage/AboutUs" }]
                },
                {
                    title: "用户管理",
                    path: 'UserManagement',
                    type: "menu",
                    children: [
                        { title: "移动端用户管理", key: "MobileUser", path: "/UserManagement/MobileUser" },
                        { title: "移动端实名认证", key: "MobileCertify", path: "/UserManagement/MobileCertify" },
                        { title: "WEB端用户管理", key: "WebUser", path: "/UserManagement/WebUser" }
                    ]
                },
                {
                    title: "API管理",
                    path: 'ApiManagement',
                    type: "menu",
                    children: [
                        { title: "开放API管理", key: "OpenApi", path: "/ApiManagement/OpenApi" },
                        { title: "API调用记录", key: "ApiCallRecords", path: "/ApiManagement/ApiCallRecords" }

                    ]
                },
                {
                    title: "APP更新",
                    path: 'AppUpdate',
                    type: "menu",
                    children: [
                        { title: "APP更新", key: "OpenApi", path: "/AppUpdate/AppUpdate" }
                    ]
                },
                {
                    title: "系统管理",
                    path: 'SystemManagement',
                    type: "menu",
                    children: [
                        { title: "码表管理", key: "CodeTable", path: "/SystemManagement/CodeTable" },
                        { title: "角色管理", key: "Role", path: "/SystemManagement/Role" },
                        { title: "权限管理", key: "Permission", path: "/SystemManagement/Permission" },
                        { title: "敏感词库", key: "SensitiveWord", path: "/SystemManagement/SensitiveWord" },
                        { title: "行为日志", key: "ActionLog", path: "/SystemManagement/ActionLog" },
                        { title: "个人中心", key: "PersonalCenter", path: "/SystemManagement/PersonalCenter" }
                    ]
                }
            ]

        }
    }
    return data;
};
const login = function() {
    const data = {
        code: '200',
        message: 'success',
        result: true,
        data: {
            token: 'qwertyuiopasdfghjklzxcvbnm'
        }
    }
    return data;
};
//角色管理
const roleList = function() {
    const data = {
        code: '200',
        message: 'success',
        result: true,
        data: {
            list: [{
                roleName: "超级管理员",
                roleId: '1',
                ownPermission: "权限一，权限二",
                remark: "超级管理员超级管理员",
                status: '1'
            }, {
                roleName: "超级管理员",
                roleId: '2',
                ownPermission: "权限一，权限二",
                remark: "超级管理员超级管理员",
                status: '1'
            }, {
                roleName: "超级管理员",
                roleId: '3',
                ownPermission: "权限一，权限二",
                remark: "超级管理员超级管理员",
                status: '1'
            }, {
                roleName: "超级管理员",
                roleId: '4',
                ownPermission: "权限一，权限二",
                remark: "超级管理员超级管理员",
                status: '1'
            }],
            total: 100
        }
    }
    return data;
};

//获取敏感词列表
const SensitiveWord = function() {
    const data = {
        code: '200',
        message: 'success',
        result: true,
        data: {
            list: [{
                sensitiveId: '1',
                sensitiveWord: "敏感词1",
                belongToLexicon: '低俗色情',
                sensitiveLevel: "警告词（中等）",
                status: '1',
                hitCounts: '101',
                updateTime: "2020-8-10 14:00"
            }, {
                sensitiveId: '2',
                sensitiveWord: "敏感词1",
                belongToLexicon: '低俗色情',
                sensitiveLevel: "警告词（中等）",
                status: '1',
                hitCounts: '101',
                updateTime: "2020-8-10 14:00"
            }, {
                sensitiveId: '3',
                sensitiveWord: "敏感词1",
                belongToLexicon: '低俗色情',
                sensitiveLevel: "警告词（中等）",
                status: '1',
                hitCounts: '101',
                updateTime: "2020-8-10 14:00"
            }, {
                sensitiveId: '4',
                sensitiveWord: "敏感词1",
                belongToLexicon: '低俗色情',
                sensitiveLevel: "警告词（中等）",
                status: '1',
                hitCounts: '101',
                updateTime: "2020-8-10 14:00"
            }, {
                sensitiveId: '5',
                sensitiveWord: "敏感词1",
                belongToLexicon: '低俗色情',
                sensitiveLevel: "警告词（中等）",
                status: '1',
                hitCounts: '101',
                updateTime: "2020-8-10 14:00"
            }],
            total: 100
        }
    }
    return data;
};
//获取敏感词批量状态
const getbatchStatus = function() {
    const data = {
        code: '200',
        message: 'success',
        result: true,
        data: {
            list: [{
                lexicon: '低俗色情',
                lexiconId: '1',
                sensitiveWordLevel: '1',
                switch: true
            }, {
                lexicon: '低俗色情',
                lexiconId: '2',
                sensitiveWordLevel: '2',
                switch: false
            }, {
                lexicon: '低俗色情',
                lexiconId: '3',
                sensitiveWordLevel: '3',
                switch: false
            },
            {
                lexicon: '政治非法',
                lexiconId: '4',
                sensitiveWordLevel: '1',
                switch: true
            },
            {
                lexicon: '政治非法',
                lexiconId: '5',
                sensitiveWordLevel: '2',
                switch: false
            },
            {
                lexicon: '政治非法',
                lexiconId: '6',
                sensitiveWordLevel: '3',
                switch: true
            },
            {
                lexicon: '网络媒体',
                lexiconId: '7',
                sensitiveWordLevel: '1',
                switch: false
            },
            {
                lexicon: '网络媒体',
                lexiconId: '8',
                sensitiveWordLevel: '2',
                switch: false
            }, {
                lexicon: '网络媒体',
                lexiconId: '9',
                sensitiveWordLevel: '3',
                switch: false
            },
            {
                lexicon: '网络媒体',
                lexiconId: '7',
                sensitiveWordLevel: '1',
                switch: false
            },
            {
                lexicon: '网络媒体',
                lexiconId: '8',
                sensitiveWordLevel: '2',
                switch: false
            }, {
                lexicon: '网络媒体',
                lexiconId: '9',
                sensitiveWordLevel: '3',
                switch: false
            }
        ],
            total: 100
        }
    }
    return data;
};

const getClassifyPermissionList = function() {
    const data = {
        code: '200',
        message: 'success',
        result: true,
        data: [
            {
                permisssionType: "权限组0",
                permissionLIst: [
                    {
                        roleId: '',
                        roleName: '权限一',
                        isChecked: true
                    },
                    {
                        roleId: '',
                        roleName: '权限二',
                        isChecked: false
                    }
                ]
            },
            {
                permisssionType: "权限组1",
                permissionLIst: [
                    {
                        roleId: '',
                        roleName: '权限一',
                        isChecked: true
                    },
                    {
                        roleId: '',
                        roleName: '权限二',
                        isChecked: false
                    }
                ]
            },
            {
                permisssionType: "权限组2",
                permissionLIst: [
                    {
                        roleId: '',
                        roleName: '权限一',
                        isChecked: true
                    },
                    {
                        roleId: '',
                        roleName: '权限二',
                        isChecked: false
                    }
                ]
            }
        ]
    }
    return data;
}

Mock.mock('/user/info', 'post', getUserInfo)
Mock.mock('/login', 'post', login)
Mock.mock('/role/list', 'post', roleList)
Mock.mock('/role/getClassifyPermissionList', 'post', getClassifyPermissionList)
Mock.mock('/sensitiveWord/list', 'post', SensitiveWord)
Mock.mock('/sensitiveWord/getbatchStatus', 'post', getbatchStatus)

