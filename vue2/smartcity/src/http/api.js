/* 
 * 接口统一集成模块
 */
import * as init from './modules/init'

/* 
 * 平台统计
 */
import * as PlatformStats from './modules/PlatformStats/PlatformStats'

/* 
* 机构应用
*/
//机构和账户
import * as AgencyAccount from './modules/AgencyApplication/AgencyAccount'
//应用管理
import * as ApplicationManagement from './modules/AgencyApplication/ApplicationManagement'
//应用通知公告
import * as ApplicationAnnouncements from './modules/AgencyApplication/ApplicationAnnouncements'
//三方应用消息
import * as ApplicationMessage from './modules/AgencyApplication/ApplicationMessage'

/* 
 * 信息管理
 */
//新闻资讯
import * as NewsInformation from './modules/InfoManage/NewsInformation'

//通知公告
import * as Announcements from './modules/InfoManage/Announcements'

//意见反馈
import * as Feedback from './modules/InfoManage/Feedback'

//短信推送
import * as SMSPush from './modules/InfoManage/SMSPush'

//消息推送
import * as MessagePush from './modules/InfoManage/MessagePush'

//移动端Banner
import * as MobileBanner from './modules/InfoManage/MobileBanner'

//移动端广告
import * as MobileAdvertising from './modules/InfoManage/MobileAdvertising'

//关于我们
import * as AboutUs from './modules/InfoManage/AboutUs'

/* 
 * 用户管理
 */
//移动端用户管理
import * as MobileUser from './modules/UserManagement/MobileUser'

//移动端实名认证
import * as MobileCertify from './modules/UserManagement/MobileCertify'

//web端用户管理
import * as WebUser from './modules/UserManagement/WebUser'

/* 
 * API管理
 */
import * as ApiManagement from './modules/ApiManagement/ApiManagement'

/* 
* APP更新
*/
import * as AppUpdate from './modules/AppUpdate/AppUpdate'

/* 
* 系统管理
*/
import * as SystemManagement from './modules/SystemManagement/SystemManagement'

import * as user from './modules/user/user'
// 默认全部导出
export default {
    init,

    // 平台统计
    PlatformStats,

    // 机构应用
    AgencyAccount,
    ApplicationManagement,
    ApplicationAnnouncements,
    ApplicationMessage,

    // 信息管理
    NewsInformation,
    Announcements,
    Feedback,
    SMSPush,
    MessagePush,
    MobileBanner,
    MobileAdvertising,
    AboutUs,

    // 用户管理
    MobileCertify,
    MobileUser,
    WebUser,

    // API管理
    ApiManagement,

    // APP更新
    AppUpdate,

    // 系统管理
    SystemManagement,
    user
}