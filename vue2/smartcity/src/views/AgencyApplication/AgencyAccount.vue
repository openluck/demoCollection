 <!-- 机构和账户 -->
<template>
  <div id="AgencyAccount">
    <div class="top">
      <div class="topLift">
        <!-- style="background-color:#efb95c;border-color:#efb95c;" -->
        <a-button
          type="primary"
          class="add"
          v-auth="['agencyAccount_add']"
          @click="showModal"
        >
          <svg-icon
            icon-class="add"
            :scale="0.8"
            style="margin-right:5px;"
          ></svg-icon
          >添加机构
        </a-button>
      </div>
      <div class="topRight" v-auth="['agencyAccount_search']">
        <!-- 类型 -->
        <a-select
          style="width: 120px;margin-left:14px;"
          allowClear
          placeholder="类型"
          v-model="getObj.orgType"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="item in codeTableList"
            :value="item.codeTableValue"
            :key="item.index"
            >{{ item.codeTableKey }}</a-select-option
          >
        </a-select>
        <!-- 搜索 -->
        <a-input
          v-model="getObj.keyWord"
          placeholder="请输入搜索内容"
          style="width:180px;margin-left:14px;margin-right:14px;"
        >
          <svg-icon slot="prefix" icon-class="sousuo" :scale="0.8"></svg-icon>
        </a-input>

        <a-button @click="changeSource" type="primary">搜索</a-button>
      </div>
    </div>

    <div class="list">
      <a-table
        v-if="permit('agencyAccount_list')"
        :columns="columns"
        :data-source="orgList"
        :rowKey="row => row.orgId"
        bordered
        :pagination="pagination"
        @change="sortChange"
      >
        <a
          slot="ttyApp"
          style="text-decoration:underline"
          slot-scope="text, record"
          @click="trrapp(record)"
          >{{ record.ttyApp }}</a
        >
        <span slot="orgType" slot-scope="text, record">{{
          filterOrgType(record.orgType)
        }}</span>
        <span slot="createTime" slot-scope="text">{{
          text ? text :"--"
        }}</span>
        <span slot="operation" slot-scope="text, record" class="handle-button">
          <a-button
            type="link"
            @click="showModal1(record)"
            v-auth="['agencyAccount_edit']"
          >
            <svg-icon
              icon-class="bianji"
              :scale="0.8"
              style="margin-right:5px"
            ></svg-icon
            >编辑
          </a-button>
          <a-button
            type="link"
            @click="showDeleteConfirm(record)"
            v-auth="['agencyAccount_delete']"
          >
            <svg-icon
              icon-class="shanchu"
              :scale="0.8"
              style="margin-right:5px"
            ></svg-icon
            >删除
          </a-button>
        </span>
      </a-table>

      <!-- <a-spin tip="无权限"> -->
      <a-table
        class="no-promission"
        v-else
        bordered
        :columns="columns"
        :data-source="[]"
        :locale="{ emptyText: '无权限，请联系管理员' }"
      />
      <!-- </a-spin> -->
    </div>

    <!-- 添加/编辑modal -->
    <a-modal
      class="newsModal1"
      v-model="visible"
      :title="modelTitle"
      :destroyOnClose='true'
      wrapClassName="add-appuser-add-modal1AgencyAccount"
      :maskClosable="false"
      :footer="null"
      width="700px"
    >
      <div
        class="title"
        style=" width: 100%;
      height: 45px;
      border-bottom: 1px solid #eaeaea;
      font-size: 16px;
      display: flex;
      align-items: center;
      color: #777777;
      margin-bottom:10px;
      margin-top:-20px"
      >
        机构信息
      </div>
      <a-form-model layout="inline" :model="form" :rules="rules" ref="form">
        <!-- 机构类型 -->
        <a-form-model-item ref="orgType" label="机构类型" prop="orgType">
          <a-select
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode || document.body;
              }
            "
            v-model="form.orgType"
            style="width:500px"
          >
            <a-select-option
              v-for="item in codeTableList"
              :getPopupContainer="
                triggerNode => {
                  return triggerNode.parentNode || document.body;
                }
              "
              :value="item.codeTableValue"
              :key="item.index"
              >{{ item.codeTableKey }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
        <!-- 机构名称 -->
        <a-form-model-item ref="orgName" label="机构名称" prop="orgName">
          <a-input v-model="form.orgName" style="width:500px" />
        </a-form-model-item>
        <!-- 机构代码 -->
        <a-form-model-item ref="orgCode" label="机构代码" prop="orgCode">
          <a-input v-model="form.orgCode" style="width:500px" />
        </a-form-model-item>
        <!-- 机构证件照 -->
        <a-form-model-item
          ref="orgPicUrl"
          label="机构证件照"
          prop="orgPicUrl"
          style="width:100%"
        >
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img
              style="width:100px;height:100px"
              v-if="form.orgPicUrl"
              :src="baseUrl + form.orgPicUrl"
              alt="avatar"
            />
            <div v-else>
              <a-icon :type="isAvatarLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
        </a-form-model-item>
        <!-- 座机 -->
        <a-form-model-item ref="tel" label="座机" prop="tel">
          <a-input v-model="form.tel" style="width:200px" />
        </a-form-model-item>
        <!-- 邮箱 -->
        <a-form-model-item
          ref="email"
          label="邮箱"
          style="margin-left: -26px;"
          prop="email"
        >
          <a-input v-model="form.email" style="width:200px" />
        </a-form-model-item>
        <!-- 地址 -->
        <a-form-model-item ref="provinceCA" label="地址" prop="provinceCA">
          <a-cascader
            placeholder="请选择~"
            :options="this.treeData"
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode || document.body;
              }
            "
            :fieldNames="fieldNames"
            v-model="form.provinceCA"
            @change="onAderessChange"
            style="width:500px"
          />
        </a-form-model-item>
        <!-- 详细地址 -->
        <a-form-model-item
          ref="detailedAddress"
          label="详细地址"
          prop="detailedAddress"
        >
          <a-input v-model="form.detailedAddress" style="width:500px" />
        </a-form-model-item>
        <!-- 联系人 -->
        <a-form-model-item ref="userName" label="联系人" prop="userName">
          <a-input v-model="form.userName" style="width:200px" />
        </a-form-model-item>
        <!-- 电话 -->
        <a-form-model-item
          ref="phone"
          label="电话"
          style="margin-left: -26px;"
          prop="phone"
        >
          <a-input v-model="form.phone" style="width:200px" />
        </a-form-model-item>
        <div
          class="title"
          style=" width: 100%;
            height: 45px;
            border-bottom: 1px solid #eaeaea;
            font-size: 16px;
            display: flex;
            align-items: center;
            color: #777777;
            margin-bottom:10px"
        >
          账户信息
        </div>
        <!-- 账号 -->
        <a-form-model-item ref="account" label="账号" prop="account">
          <a-input v-model="form.account" style="width:500px" />
        </a-form-model-item>
        <!-- 密码 -->
        <a-form-model-item ref="password" label="密码" prop="password">
          <a-input-password v-model="form.password" style="width:500px" />
        </a-form-model-item>
        <!-- 确认密码 -->
        <a-form-model-item ref="rePassword" label="确认密码" prop="rePassword">
          <a-input-password v-model="form.rePassword" style="width:500px" />
        </a-form-model-item>
        <!-- 备注 -->
        <a-form-model-item label="备注">
          <a-textarea
            v-model="form.remark"
            style="width:500px"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-model-item>

        <div class="modal-button-box">
          <a-form-model-item ref="authState" prop="authState">
            <a-button
              type="primary"
              @click="addOrg()"
              style="margin-right:30px"
              >{{ changebtn }}</a-button
            >
            <a-button @click="resetForm()" style="margin-top:10px"
              >取消</a-button
            >
          </a-form-model-item>
        </div>
      </a-form-model>
    </a-modal>
    <!-- 接入应用弹框 -->
    <a-modal
      class="newsModal1"
      v-model="visibleApp"
      title="接入应用列表"
      wrapClassName="add-appuser-add-modal1AgencyAccount"
      :maskClosable="false"
      :footer="null"
      width="700px"
    >
      <!-- 表格 -->
      <a-table
        :columns="columnsApp"
        :data-source="appListData"
        :rowKey="row => row.appId"
        :pagination="false"
        bordered
      >
        <span slot="appType" slot-scope="text, record">{{
          filterAppType(record.appType)
        }}</span>
        <span
          slot="operation"
          style="display: flex;justify-content: space-around;"
          slot-scope="text, record"
        >
          <a @click="showAppInfo(record)">
            <svg-icon
              icon-class="chakan"
              :scale="0.8"
              style="margin-right:5px"
            ></svg-icon
            >查看
          </a>
        </span>
      </a-table>
    </a-modal>
    <!-- 详细应用信息弹窗 -->
    <a-modal
      class="newsModal1"
      v-model="visibleAppInfo"
      title="应用详细"
      wrapClassName="add-appuser-add-modal1AgencyAccount"
      :maskClosable="false"
      :footer="null"
      width="700px"
    >
      <a-tabs type="card" style="margin-bottom:50px">
        <a-tab-pane key="1" tab="基本信息">
          <!-- 表单 -->
          <div>
            <a-form-model layout="inline" :model="formApp" ref="formApp">
              <!-- 应用类型 -->
              <a-form-model-item label="应用类型">
                <a-input
                  disabled
                  :value="filterAppType(formApp.appType)"
                  style="width:500px"
                />
                <!-- filterAppType -->
              </a-form-model-item>
              <!-- 应用名称 -->
              <a-form-model-item label="应用名称">
                <a-input
                  disabled
                  v-model="formApp.appName"
                  style="width:500px"
                />
              </a-form-model-item>
              <!-- logo -->
              <a-form-model-item label="LOGO" style="width:100%;dispaly:flex;">
                <img
                  style="width:100px;height:100px"
                  :src="baseUrl + formApp.appLogoUrl"
                />
              </a-form-model-item>
              <!-- 应用描述 -->
              <a-form-model-item label="应用描述">
                <a-input
                  disabled
                  :maxLength="25"
                  v-model="formApp.appDescription"
                  style="width:500px"
                />
              </a-form-model-item>
              <!-- 接入功能那个 -->
              <a-form-model-item
                ref="appFunId"
                label="接入功能"
                prop="appFunId"
              >
                <a-checkbox-group
                  disabled
                  class="funList"
                  style="width:500px;margin-top: 10px;"
                  v-if="funOption.length > 0"
                  v-model="formApp.appFunId"
                >
                  <a-checkbox
                    style
                    disabled
                    v-for="item in funOption"
                    :key="item.index"
                    :value="item.funId"
                    >{{ item.funName }}</a-checkbox
                  >
                </a-checkbox-group>
              </a-form-model-item>
              <!-- 应用主机IP/域名 -->
              <a-form-model-item ref="appIp" label="主机IP/域名" prop="appIp">
                <a-input disabled v-model="formApp.appIp" style="width:500px" />
              </a-form-model-item>
              <!-- 备注 -->
              <a-form-model-item label="备注">
                <a-textarea
                  disabled
                  v-model="formApp.remark"
                  style="width:500px"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
              </a-form-model-item>
            </a-form-model>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="密钥认证">
          <div>
            <a-form-model layout="inline" :model="appKey">
              <a-form-model-item label="应用编码">
                <a-input
                  v-model="appKey.appCode"
                  disabled
                  style="width:500px"
                />
              </a-form-model-item>
              <a-form-model-item label="ClientID">
                <a-input
                  v-model="appKey.clientID"
                  disabled
                  style="width:500px"
                />
              </a-form-model-item>
              <a-form-model-item label="ClientSecret">
                <a-input
                  v-model="appKey.clientSecret"
                  disabled
                  style="width:500px"
                />
              </a-form-model-item>
              <a-form-model-item label="RSA公钥">
                <a-textarea
                  disabled
                  v-model="appKey.rsakey"
                  style="width:500px"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
              </a-form-model-item>
              <a-form-model-item label="过期日期">
                <a-input
                  v-model="appKey.expirationTime"
                  disabled
                  style="width:500px"
                />
              </a-form-model-item>
            </a-form-model>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="配置管理">
          <div>
            <a-form-model layout="inline" :model="appKey">
              <a-form-model-item label="登录授权">
                <a-input disabled v-model="appKey.msso" style="width:500px" />
              </a-form-model-item>
              <a-form-model-item label="付款成功">
                <a-input
                  disabled
                  v-model="appKey.successPay"
                  style="width:500px"
                />
              </a-form-model-item>
            </a-form-model>
          </div>
        </a-tab-pane>
      </a-tabs>
      <div
        style="display: flex;
        align-items: center;
        justify-content: center;"
      >
        <a-button type="primary" @click="closeVisibleAppInfo">确认</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { filterArray } from "@/Utils/util.js";
import {
  Button,
  DatePicker,
  Input,
  Table,
  Pagination,
  Icon,
  Modal,
  Select,
  FormModel,
  Radio,
  Upload,
  // message,
  Cascader,
  Tabs,
  Checkbox
} from "ant-design-vue";
// Vue.prototype.$message = message;
import { permit } from "../../directives/authIf.js";
Vue.use(Button)
  .use(Cascader)
  .use(Checkbox)
  .use(Tabs)
  .use(DatePicker)
  .use(Input)
  .use(Table)
  .use(Pagination)
  .use(Icon)
  .use(Modal)
  .use(Select)
  .use(FormModel)
  .use(Radio)
  .use(Upload);
Vue.prototype.$confirm = Modal.confirm;

const columns = [
  {
    title: "账号",
    dataIndex: "account",
    key: "account",
    align: "center",
    width: "10%"
  },
  {
    title: "机构名称",
    dataIndex: "orgName",
    key: "orgName",
    align: "center",
    width: "15%"
  },
  {
    title: "联系人",
    dataIndex: "userName",
    key: "userName",
    align: "center",
    width: "10%"
  },
  {
    title: "电话号码",
    dataIndex: "phone",
    key: "phone",
    align: "center",
    width: "10%"
  },
  {
    title: "接入应用",
    dataIndex: "ttyApp",
    key: "ttyApp",
    align: "center",
    width: "10%",
    scopedSlots: { customRender: "ttyApp" }
  },
  {
    title: "机构类型",
    dataIndex: "orgType",
    key: "orgType",
    align: "center",
    width: "15%",
    scopedSlots: { customRender: "orgType" }
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    align: "center",
    width: "15%",
    sorter: true,
    sortOrder: 'descend',
    scopedSlots: { customRender: "createTime" }

  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    align: "center",
    width: "15%",
    scopedSlots: { customRender: "operation" }
  }
];
const columnsApp = [
  {
    title: "应用编号",
    dataIndex: "appNumber",
    key: "appNumber",
    align: "center",
    width: "20%"
  },
  {
    title: "应用名称",
    dataIndex: "appName",
    key: "appName",
    align: "center",
    width: "20%"
  },
  {
    title: "应用类型",
    dataIndex: "appType",
    key: "appType",
    align: "center",
    width: "20%",
    scopedSlots: { customRender: "appType" }
  },
  {
    title: "接入时间",
    dataIndex: "joinTime",
    key: "joinTime",
    align: "center",
    width: "20%"
  },

  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    align: "center",
    width: "20%",
    scopedSlots: { customRender: "operation" }
  }
];
async function getBase64(file) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  data() {
    //表单验证---密码
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空！"));
      } else {
        if (this.form.rePassword !== "") {
          this.$refs.form.validateField("rePassword");
        }
        callback();
      }
    };
    //表单验证---确认密码
    const validateRePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请确认密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback();
      }
    };
    /* 电话正则匹配 */
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入电话号码"));
      }
       checkPending = setTimeout(() => {
        const pwdRegex = /^1[3|4|5|6|7|8|9]\d{9}$/;
        if (!pwdRegex.test(value)) {
          callback(new Error("电话号码输入格式有误"));
        }
        callback();
      }, 300);
    };
    /* 邮箱正则匹配 */
    const validateEmile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      }
      checkPending = setTimeout(() => {
        const pwdRegex = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
        if (!pwdRegex.test(value)) {
          callback(new Error("邮箱输入格式有误"));
        }
        callback();
      }, 300);
    };
    return {
      baseUrl: "",
      changebtn: "", //立即创建
      modelTitle: "",
      visibleApp: false, //接入应用列表
      visibleAppInfo: false, //应用详细信息
      isAvatarLoading: false, //   表单验证规则
      visible: false, //modal状态
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
              children: [
                {
                  value: "xihu",
                  label: "West Lake"
                }
              ]
            }
          ]
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing",
              children: [
                {
                  value: "zhonghuamen",
                  label: "Zhong Hua Men"
                }
              ]
            }
          ]
        }
      ],
      fieldNames: {
        label: "adressname",
        value: "orgcode",
        children: "children"
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      //表单
      form: {
        // gender: 1,
        orgType: "", // 机构类型
        orgName: "", // 机构名称
        orgCode: "", // 机构代码
        orgPicUrl: "", // 机构图片地址
        tel: "", // 座机号码
        email: "", // 邮箱
        provinceCA: [], // 省市区
        detailedAddress: "", // 详细地址
        userName: "", // 联系人
        phone: "", // 电话号码
        account: "", // 账号（账户信息）
        password: "", // 密码（账户信息）
        rePassword: "",
        remark: "", // 备注（账户信息）
        orgId: ""
      },

      rules: {
        orgType: [
          {
            required: true,
            message: "请选择机构类型！",
            trigger: "blur"
          }
        ],
        orgName: [
          {
            required: true,
            message: "请填写机构名称！",
            trigger: "blur"
          }
        ],
        orgPicUrl: [
          {
            required: true,
            message: "请上传机构证件照！"
            // trigger: 'blur'
          }
        ],
        orgCode: [
          {
            required: true,
            message: "请填写机构代码！",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "请填写座机号！",
            trigger: "blur"
          }
        ],
        email: [
          {
            validator: validateEmile,
            required: true,
            // message: "请填写邮箱！",
            trigger: "change"
          }
        ],
        provinceCA: [
          {
            required: true,
            message: "请选择省市区！",
            trigger: "blur"
          }
        ],
        detailedAddress: [
          {
            required: true,
            message: "请填写详细地址！",
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            message: "请填写联系人！",
            trigger: "blur"
          }
        ],
        phone: [
          {
            validator: validatePhone,
            required: true,
            // message: "请填写手机号！",
            trigger: "change"
          }
        ],
        account: [
          {
            required: true,
            message: "请填写账号！",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码！",
            trigger: "blur"
          },
          { validator: validatePassword, trigger: "change" }
        ],
        rePassword: [
          {
            required: true,
            message: "请确认密码！",
            trigger: "blur"
          },
          { validator: validateRePassword, trigger: "blur" }
        ]
      },
      // 应用详细
      formApp: {
        orgCode: "",
        appType: undefined,
        appName: "",
        appLogoUrl: "",
        appDescription: "",
        appFunId: [],
        appIp: "",
        remark: "",
        homeRank: "0",
        listRank: "0",
        homeIsShow: "0"
      },
      appKey: {
        //回调配置、秘钥存放对象
        appCode: "",
        clientID: "",
        clientSecret: "",
        rsakey: "",
        expirationTime: null,
        successPay: "",
        msso: ""
      },

      //图片上传
      loading: false,
      imageUrl: "",
      id: [], //被删除id数组(单个删除)
      ids: [], //被删除id数组(批量删除)
      columns,
      columnsApp,

      pagination: {
        current: 1,
        showQuickJumper: true, //是否可以快速跳转至某页
        showTotal: (total, range) =>
          `当前显示${range[0]}至${range[1]}条，共${total}条`, // 显示总数
        // onChange: this.onPageChange.bind(this), //点击页码事件
        total: 0, //总条数
        size: "middle",
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ["10", "25", "50"], // 每页数量选项
        buildOptionText: pageSizeOptions => `${pageSizeOptions.value}条/页`
        // onShowSizeChange: this.onShowSizeChangeMethod.bind(this) // 改变每页数量时更新显示
      }, // table的分页器

      //查询参数
      getObj: {
        pageIndex: "1", //当前页
        pageSize: "10", //每页条数
        orgType: undefined, //机构类型id
        keyWord: "", //关键字
        sort: 1 //排序
      },
      orgList: [],
      delateId: {
        orgId: ""
      },
      treeData: [],
      adressItem: "",
      appListData: [],
      codeTableList: [], //机构类型
      fetchappCodeTableList: [], //应用类型
      funOption: [] //接入功能列表
    };
  },
  created() {
    this.baseUrl = this.$store.state.app.picBaseUrl;
    this.fetchCodeTable();
    this.getgetOrgList(this.getObj);
    this.fetchappCodeTable();
  },
  methods: {
    permit,
    moment,
    filterArray,
    //接入应用
    trrapp(item) {
      // console.log(item);
      const data = {
        orgId: item.orgId
      };
      this.getgetAppList(data);
      this.showAppModal();
    },
    //接入应用modal
    showAppModal() {
      this.visibleApp = true;
    },
    //应用信息
    showAppInfo(item) {
      this.visibleAppInfo = true;
      this.getFunList();
      this.getAppKey(item.appId);
      this.getAppInfo(item.appId);
      // console.log(item);
    },
    //来源方式选择/关键词
    changeSource() {
      this.pagination.current = 1;
      this.getObj.pageIndex = 1;
      this.getgetOrgList(this.getObj);
    },
    //点击删除
    showDeleteConfirm(item) {
      var _this = this;
      this.$confirm({
        title: "你确定要删除这条数据吗？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          const data = {
            orgId: item.orgId
          };
          _this.getdelateOrg(data);
        },
        onCancel() {}
      });
    },
    //关闭应用详细
    closeVisibleAppInfo() {
      this.visibleAppInfo = false;
      this.formApp = {
        orgCode: "",
        appType: undefined,
        appName: "",
        appLogoUrl: "",
        appDescription: "",
        appFunId: [],
        appIp: "",
        remark: "",
        homeRank: "0",
        listRank: "0",
        homeIsShow: "0"
      };
      this.appKey = {
        //回调配置、秘钥存放对象
        appCode: "",
        clientID: "",
        clientSecret: "",
        rsakey: "",
        expirationTime: null,
        successPay: "",
        msso: ""
      };
    },
    // modal
    showModal() {
      this.adressItem = "";
      this.modelTitle = "添加机构";
      this.changebtn = "立即创建";
      this.form = {
        // gender: 1,
        orgType: "", // 机构类型
        orgName: "", // 机构名称
        orgCode: "", // 机构代码
        orgPicUrl: "", // 机构图片地址
        tel: "", // 座机号码
        email: "", // 邮箱
        provinceCA: [], // 省市区
        detailedAddress: "", // 详细地址
        userName: "", // 联系人
        phone: "", // 电话号码
        account: "", // 账号（账户信息）
        password: "", // 密码（账户信息）
        rePassword: "",
        remark: "", // 备注（账户信息）
        orgId: ""
      };
      this.visible = true;
      this.getprovince();
    },
    // modal
    showModal1(item1) {
      this.adressItem = "";
      const item = JSON.parse(JSON.stringify(item1));
      if (item.provinceCA) {
        let aa = item.provinceCA;
        aa = aa.split(",");
        item.provinceCA = aa;
      }

      this.form = item;
      this.form.rePassword = item.password;
      this.modelTitle = "编辑机构";
      this.changebtn = "确认编辑";
      this.visible = true;
      this.getprovince();
    },
    onAderessChange(value, label) {
      this.adressItem = value.join();
      // console.log(typeof(this.adressItem) );
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert('submit!');
          console.log(valid);
          this.visible = false;
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.visible = false;
      this.form = {
        // gender: 1,
        orgType: "", // 机构类型
        orgName: "", // 机构名称
        orgCode: "", // 机构代码
        orgPicUrl: "", // 机构图片地址
        tel: "", // 座机号码
        email: "", // 邮箱
        provinceCA: [], // 省市区
        detailedAddress: "", // 详细地址
        userName: "", // 联系人
        phone: "", // 电话号码
        account: "", // 账号（账户信息）
        password: "", // 密码（账户信息）
        rePassword: "",
        remark: "", // 备注（账户信息）
        orgId: ""
      };
    },
    // 表格页面改变事件
    onPageChange(page) {
      this.pagination.current = page;
      this.getObj.pageIndex = page;
      this.getgetOrgList(this.getObj);
    },
    // 改变每页数量时更新显示
    onShowSizeChangeMethod(i, pageSize) {
      this.getObj.pageSize = pageSize;
      this.pagination.current = 1;
      this.getObj.pageIndex = 1;
      this.getgetOrgList(this.getObj);
    },
    //图片上传
    handleChange(info) {
      // console.log(info);
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
      }
    },
    async beforeUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/bmp";
      if (!isJPG) {
        this.$message.error("请上传图片");
        return new Promise((resolve, reject) => {
          return reject(new Error());
        });
      }
      const imgBase64 = await getBase64(file);
      this.getuploadimg(imgBase64);
      return new Promise((resolve, reject) => {
        return reject(new Error());
      });
    },
    addOrg() {
      // console.log(this.form.orgPicUrl);
      // if (this.form.orgPicUrl === "") {
      //   this.$message.error({
      //     content: "请上传图片~"
      //   });
      //   return;
      // }
      this.$refs.form.validate(valid => {
        if (valid) {
          //  this.$delete(this.form,'rePassword')
          const form1 = JSON.parse(JSON.stringify(this.form));
          //后台锅**provinceCA这个字段不管是存和拿都需要转一遍**
          if (this.adressItem) {
            form1.provinceCA = this.adressItem;
          } else {
            form1.provinceCA = form1.provinceCA.join(",");
          }

          //  console.log(form1);
          this.getaddOrg(form1);
        } else {
          return false;
        }
      });
    },
    //过滤应用类型
    filterAppType(id) {
      for (let index = 0; index < this.fetchappCodeTableList.length; index++) {
        const element = this.fetchappCodeTableList[index];
        if (element.codeTableValue === id) {
          return element.codeTableKey;
        }
      }
    },
    //过滤机构类型
    filterOrgType(id) {
      for (let index = 0; index < this.codeTableList.length; index++) {
        const element = this.codeTableList[index];
        if (element.codeTableValue === id) {
          return element.codeTableKey;
        }
      }
    },
    sortChange(pagination, filters, sorter) {
      if (pagination.pageSize !== this.getObj.pageSize) {
        this.pagination.current = 1;
        this.getObj.pageIndex = 1;
        this.getObj.pageSize = pagination.pageSize;
         this.getgetOrgList(this.getObj);
      } else if (pagination.current !== this.getObj.pageIndex) {
        const { current } = pagination;
        this.pagination.current = current;
        this.getObj.pageIndex = current;
         this.getgetOrgList(this.getObj);
      } else if (
        pagination.pageSize === this.getObj.pageSize &&
        pagination.current === this.getObj.pageIndex
      ) {
        const { sortOrder } = this.columns[6];
        if (sortOrder === "ascend") {
          this.columns[6].sortOrder = "descend";
          this.getObj.sort = 1;
           this.getgetOrgList(this.getObj);
        } else {
          this.columns[6].sortOrder = "ascend";
          this.getObj.sort = 0;
           this.getgetOrgList(this.getObj);
        }
      }
    },
    //请求
    //查询
    getgetOrgList(data) {
      this.$api.AgencyAccount.getOrgList(data).then(res => {
        // console.log(res);
        if (res.result) {
          this.orgList = res.data;
          this.pagination.total = res.total;
        } else {
        }
      });
    },
    //新增编辑
    getaddOrg(data) {
      // console.log(data);
      this.$api.AgencyAccount.addOrg(data).then(res => {
        // console.log(res);
        if (res.result) {
          this.$message.success({
            content: "操作成功！"
          });
          this.getgetOrgList(this.getObj);
          this.visible = false;
        } else {
          this.$message.error({
            content: res.msg
          });
        }
      });
    },
    getuploadimg(data) {
      this.$api.init.uploadPic(data).then(res => {
        if (res.result) {
          this.form.orgPicUrl = res.data.path;
          this.$nextTick(() => {
            this.$refs.form.validateField("orgPicUrl");
          });
          this.$message.success({
            content: res.data.msg
          });
        } else {
          this.$message.error({
            content: res.message
          });
        }
      });
    },
    //删除
    getdelateOrg(data) {
      this.$api.AgencyAccount.delateOrg(data).then(res => {
        if (res.result) {
          this.$message.success({
            content: "操作成功"
          });
          this.getgetOrgList(this.getObj);
        } else {
          this.$message.error({
            content: res.message
          });
        }
      });
    },
    //获取省市区
    getprovince() {
      this.$api.init.province().then(res => {
        if (res.result) {
          this.treeData = filterArray(res.data, 0);
          console.log(this.treeData);
        } else {
        }
      });
    },
    //接入应用列表
    getgetAppList(data) {
      this.$api.AgencyAccount.getAppList(data).then(res => {
        // console.log(res);
        if (res.result) {
          this.appListData = res.data;
        } else {
          this.$message.error({
            content: res.message
          });
        }
      });
    },
    //获取机构类型下拉框数据
    fetchCodeTable() {
      this.$store.dispatch("queryCodeTable", "ORGANIZATION_TYPE").then(res => {
        // console.log(res);
        this.codeTableList = res;
      });
    },
    //获取应用类型下拉框数据
    fetchappCodeTable() {
      this.$store.dispatch("queryCodeTable", "APPLICATION_TYPE").then(res => {
        // console.log(res);
        this.fetchappCodeTableList = res;
      });
    },
    //接入功能列表
    getFunList() {
      const data = {
        appId: ""
      };
      this.$api.ApplicationManagement.getFunList(data).then(res => {
        // console.log(res.data);
        if (res.result) {
          this.funOption = res.data;
        } else {
        }
      });
    },
    //获取秘钥和回调配置
    getAppKey(id) {
      const data = {
        appId: id
      };
      this.$api.ApplicationManagement.getAppKey(data).then(res => {
        // console.log(res);
        if (res.result) {
          this.appKey = res.data;
        } else {
        }
      });
    },
    //获取应用的基本信息
    getAppInfo(id) {
      const data = {
        appId: id
      };
      this.$api.AgencyAccount.appInfo(data).then(res => {
        // console.log(res);
        if (res.result) {
          this.formApp = res.data;
        } else {
        }
      });
    }
  },
  computed: {}
};
</script>

<style lang="less">
#AgencyAccount {
  background-color: #fff;
  .top {
    padding: 18px 14px;
    display: flex;
    justify-content: space-between;
    .topRight {
      display: flex;
      align-items: center;
    }
  }
  .list {
    padding: 0px 14px 14px 14px;
    .handle-button {
      // display: flex;
    }
    .ant-btn-link {
      color: #b2b2b2;
    }
    .ant-table-row {
      &:hover {
        .ant-btn-link {
          color: #489ff8;
        }
      }
    }
  }
  .newsModal1 {
    .ant-modal-header {
      background-color: #f4f4f4;
      text-align: center;
    }
    .ant-modal-body {
      padding-top: 0;
    }
  }
}
//新增编辑对话框
.add-appuser-add-modal1AgencyAccount {
  .ant-form {
    // padding-left: 20px;
  }
  .ant-form-item {
    // width: 50%;
    padding: 5px;
    .ant-form-item-label {
      width: 100px;
    }
  }
  //红字样式
  .ant-form-item-with-help {
    margin-bottom: 0;
  }
  //上传图片样式
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .modal-button-box {
    text-align: center;
    padding: 20px;
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px;
    // margin-right: 10px;
  }
  .ant-checkbox-wrapper {
    margin-right: 10px;
  }
  .funList {
    width: 500px;
    max-height: 150px;
    overflow-y: auto;
    /* 滚动条 */
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: #eff3f5;
    }
    /*定义滚动条轨道 内阴影+圆角*/
    &::-webkit-scrollbar-track {
      border-radius: 3px;
      background-color: #eff3f5;
    }
    /*定义滑块 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: #36b4f3;
    }
  }
}
</style>