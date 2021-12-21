<!-- 应用管理 -->
<template>
  <div id="applyMessage1">
    <div class="top">
      <div class="topLift">
        <a-button
          v-auth="['ApplicationManagement_add']"
          type="primary"
          @click="addApp()"
          class="add"
        >
          <svg-icon icon-class="add" :scale="0.8" style="margin-right:5px"></svg-icon>添加应用
        </a-button>
      </div>
      <div class="topRight" v-auth="['ApplicationManagement_search']">
        <a-select
          placeholder="首页是否显示"
          style="width: 140px;margin-right:15px"
          @change="homehandleChange"
          allowClear
        >
          <a-select-option value=''>全部</a-select-option>
          <a-select-option value="1">首页显示</a-select-option>
          <a-select-option value="0">首页不显示</a-select-option>
        </a-select>

        <a-select placeholder="类型" style="width: 120px" allowClear @change="handleChangeType">
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="item in fetchappCodeTableList"
            :key="item.index"
            :value="item.codeTableValue"
          >{{item.codeTableKey}}</a-select-option>
        </a-select>
        <!-- 搜索 -->
        <a-input
          v-model="search.keyWord"
          placeholder="请输入搜索内容"
          style="width:180px;margin-left:14px;margin-right:14px;"
        >
          <svg-icon  slot="prefix" icon-class="sousuo" :scale="0.8"></svg-icon>
        </a-input>

        <a-button type="primary" @click="searchList">搜索</a-button>
      </div>
    </div>

    <div class="list">
      <a-table
      v-if="permit('ApplicationManagement_list')"
        :columns="columns"
        :data-source="dataList"
        :rowKey="row=>row.appId"
        bordered
        :pagination="pagination"
         @change="sortChange"
      >
        <span slot="appLogoUrl" slot-scope="text,row">
          <img v-if="row.appLogoUrl" style="width:60px;height:60px" :src="baseUrl+ row.appLogoUrl" alt />
        </span>
        <a-switch
          :key="row.appId"
          slot="appState"
          slot-scope="text,row"
          :defaultChecked="filter(text)"
          @change="(checked)=>changeShowState(checked,row.appId)"
        />

        <template slot="listRank" slot-scope="text, record">
          <editable-cell
            :text="text"
            :record="record"
            isname="listRank"
             :max='100'
            @change="onCellChange(record, 'listRank', $event)"
          />
        </template>

        <template slot="homeRank" slot-scope="text, record">
          <editable-cell
            :text="text"
            :record="record"
            isname="homeRank"
            :max='14'
            @change="onCellChange(record, 'homeRank', $event)"
          />
        </template>
          <span slot="createTime" slot-scope="text" >{{text?text:"--"}}</span>
        <span slot="operation" slot-scope="text,record" class="handle-button">
          <a-button type="link" v-auth="['ApplicationManagement_edit']" @click="changeApp(record)">
            <svg-icon icon-class="bianji" :scale="0.8" style="margin-right:5px"></svg-icon>编辑
          </a-button>
          <a-button type="link" v-auth="['ApplicationManagement_key']" @click="showdateModal(record)">
            <svg-icon icon-class="miyao" :scale="0.8" style="margin-right:5px"></svg-icon>秘钥
          </a-button>
          <a-button type="link" v-auth="['ApplicationManagement_setting']" @click="showproAppModal(record)">
            <svg-icon icon-class="shezhi" :scale="0.8" style="margin-right:5px"></svg-icon>设置
          </a-button>
          <a-button type="link" v-auth="['ApplicationManagement_delete']" @click="DeleteConfirm(record)">
            <svg-icon icon-class="shanchu" :scale="0.8" style="margin-right:5px"></svg-icon>删除
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
        :locale="{emptyText: '无权限，请联系管理员'}"
      />
      <!-- </a-spin> -->
    </div>
    <!-- 添加应用 -->
    <a-modal
      class="application"
      v-model="addAppModal"
      :title="appTitle"
      wrapClassName="add-appuser-add-modal1ment"
      :maskClosable="false"
      :destroyOnClose='true'
      :footer="null"
      width="700px"
    >
      <!-- 表单 -->
      <div>
        <a-form-model layout="inline" :model="form" :rules="rules" ref="form">
          <!-- 机构选择 -->
          <a-form-model-item ref="orgCode" label="机构选择" prop="orgCode">
            <a-select
              v-model="orgName"
              show-search
              :defaultActiveFirstOption="false"
              placeholder="请输入机构名称进行匹配~"
              option-filter-prop="children"
              style="width: 500px"
              @search="getgetOrgList"
              @change="showOrgName"
              :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode || document.body;
              }"
            >
              <a-select-option
                v-for="item in  getOrgList"
                :key="item.index"
                :value="item.orgId"
              >{{item.orgName}}</a-select-option>
            </a-select>
          </a-form-model-item>

          <!-- 应用类型 -->
          <a-form-model-item ref="appType" label="应用类型" prop="appType">
            <a-select 
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode || document.body;
              }"
            v-model="form.appType" style="width: 500px" placeholder="请选择应用类型">
              <a-select-option
                v-for="item in  fetchappCodeTableList"
                :key="item.index"
                :value="item.codeTableValue"
              >{{item.codeTableKey}}</a-select-option>
            </a-select>
          </a-form-model-item>
          <!-- 应用名称 -->
          <a-form-model-item ref="appName" label="应用名称" prop="appName">
            <a-input placeholder="请输入应用名称" v-model="form.appName" style="width:500px" />
          </a-form-model-item>
          <!-- logo -->
          <a-form-model-item
            ref="appLogoUrl"
            label="LOGO"
            prop="appLogoUrl"
            style="width:100%;dispaly:flex;"
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
                v-if="form.appLogoUrl"
                :src="baseUrl+ form.appLogoUrl"
                alt="avatar"
              />
              <div v-else>
                <a-icon :type="isAvatarLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">点击上传</div>
              </div>
            </a-upload>
          </a-form-model-item>
          <!-- 应用描述 -->
          <a-form-model-item ref="appDescription" label="应用描述" prop="appDescription">
            <a-input
              :maxLength="25"
              placeholder="请输入应用描述，25个汉字以内~"
              v-model="form.appDescription"
              style="width:500px"
            />
          </a-form-model-item>
          <!-- 接入功能那个 -->
          <a-form-model-item ref="appFunId" label="需接入功能" prop="appFunId">
            <a-checkbox-group
              class="funList"
              style="width:500px;margin-top: 10px;"
              v-if="funOption.length>0"
              v-model="form.appFunId"
            >
              <a-checkbox
                v-for="item in funOption"
                :key="item.index"
                :value="item.funId"
              >{{item.funName}}</a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          <!-- 应用主机IP/域名 -->
          <a-form-model-item ref="appIp" :labelCol="ipLabelCol" label="主机IP/域名" prop="appIp">
            <a-input placeholder="请输入应用主机IP/域名" v-model="form.appIp" style="width:500px" />
          </a-form-model-item>
          <!-- 应用主机IP/域名 -->
          <a-form-model-item ref="isApplet" :labelCol="ipLabelCol" label="是否是小程序"  prop="isApplet">
            <a-radio-group  v-model="form.isApplet">
              <a-radio :value="1">
                是
              </a-radio>
              <a-radio :value="0">
                否
              </a-radio>
            </a-radio-group>
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
              <a-button type="primary" @click="addAppForm()" style="margin-right:30px">{{changebtn}}</a-button>
              <a-button @click="resetForm()" style="margin-top:10px">取消</a-button>
            </a-form-model-item>
          </div>
        </a-form-model>
      </div>
    </a-modal>
    <!-- 接入秘钥 -->
    <a-modal
      class="application"
      v-model="dateModal"
      title="接入秘钥"
      wrapClassName="add-appuser-add-modal1ment"
      :maskClosable="false"
      :footer="null"
      width="700px"
    >
      <div>
        <a-form-model layout="inline" :model="appKey">
          <a-form-model-item label="应用编码">
            <a-input v-model="appKey.appCode" disabled style="width:500px" />
          </a-form-model-item>
          <a-form-model-item label="ClientID">
            <a-input v-model="appKey.clientID" disabled style="width:500px" />
          </a-form-model-item>
          <a-form-model-item label="ClientSecret">
            <a-input v-model="appKey.clientSecret" disabled style="width:500px" />
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
            <a-date-picker
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              v-model="appKey.expirationTime"
              style="width:300px"
            />
          </a-form-model-item>
          <div class="modal-button-box">
            <a-form-model-item ref="authState" prop="authState">
              <a-button type="primary" @click="okAppKey()" style="margin-right:30px">确认</a-button>
              <a-button   v-clipboard:copy="copyUrl()" 
            v-clipboard:success="onCopy" 
            v-clipboard:error="onCopyError" style="margin-top:10px">复制</a-button>
            </a-form-model-item>
          </div>
        </a-form-model>
      </div>
    </a-modal>
    <!-- 回调配置 -->
    <a-modal
      class="application"
      v-model="proAppModal"
      title="回调配置"
      wrapClassName="add-appuser-add-modal1ment"
      :maskClosable="false"
      :footer="null"
      width="700px"
    >
      <div>
        <a-form-model layout="inline" :model="appKey">
          <a-form-model-item label="登录授权">
            <a-input v-model="appKey.msso" style="width:500px" />
          </a-form-model-item>
          <a-form-model-item label="付款成功">
            <a-input v-model="appKey.successPay" style="width:500px" />
          </a-form-model-item>
          <div class="modal-button-box">
            <a-form-model-item ref="authState" prop="authState">
              <a-button type="primary" @click="okAppPro()" style="margin-right:30px">确认</a-button>
              <a-button @click="deAppKey()" style="margin-top:10px">取消</a-button>
            </a-form-model-item>
          </div>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Vue from "vue";
import { permit } from "../../directives/authIf.js";
//复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'

import moment from "moment";
import EditableCell from "./components/ApplicationAnnouncements";
import {
  Select,
  Modal,
  Switch,
  Popover,
  InputNumber,
  Checkbox
} from "ant-design-vue";
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
const columns = [
  {
    title: "LOGO",
    dataIndex: "appLogoUrl",
    key: "appLogoUrl",
    align: "center",
    width: "10%",
    scopedSlots: { customRender: "appLogoUrl" }
  },
  {
    title: "应用名称",
    dataIndex: "appName",
    key: "appName",
    align: "center",
    width: "10%"
  },
  {
    title: "所属机构",
    dataIndex: "orgName",
    key: "orgName",
    align: "center",
    width: "15%"
  },

  {
    title: "首页排序",
    dataIndex: "homeRank",
    key: "homeRank",
    align: "center",
    width: "10%",
    scopedSlots: { customRender: "homeRank" }
  },
  {
    title: "列表排序",
    dataIndex: "listRank",
    key: "listRank",
    align: "center",
    width: "10%",
    scopedSlots: { customRender: "listRank" }
  },
  {
    title: "当前状态",
    dataIndex: "appState",
    key: "appState",
    align: "center",
    width: "10%",
    scopedSlots: { customRender: "appState" }
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    align: "center",
    width: "10%",
    sorter: true,
    sortOrder: 'descend',
    scopedSlots: { customRender: "createTime" }

  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    align: "center",
    width: "25%",
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
Vue.use(Select)
  .use(Modal)
  .use(Switch)
  .use(Popover)
  .use(Checkbox)
  .use(InputNumber);

export default {
  components: {
    EditableCell
  },
  data() {
    return {
      changebtn: '', //立即创建
      baseUrl: '',
      orgName: undefined,
      appTitle: "",
      addAppModal: false,
      dateModal: false,
      proAppModal: false,
      isAvatarLoading: false, //   表单验证规则
      ipLabelCol: {},
      search: {
        //搜索
        homeIsShow: "", //首页是否显示
        appType: "", //应用类型
        keyWord: "", //关键字
        pageIndex: 1,
        pageSize: 10,
        sort: 1
      },
      inputListRank: 1,
      funOption: [], //接入功能列表
      getOrgList: [], //模糊查询机构
      itemAppIdKey: "", //秘钥存放的appid
      itemAppIdPro: "", //回调配置appid

      //表单
      form: {
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
        homeIsShow: "0",
        isApplet: ''
      },
      rules: {
        appType: [
          {
            required: true,
            message: "请选择应用类型~",
            trigger: "blur"
          }
        ],
        isApplet: [
          {
            required: true,
            message: "请选择是否为小程序~",
            trigger: "blur"
          }
        ],
        orgCode: [
          {
            required: true,
            message: "请输入关键字进行机构选择~",
            trigger: "blur"
          }
        ],
        appName: [
          {
            required: true,
            message: "请填写应用名称~",
            trigger: "blur"
          }
        ],
        appLogoUrl: [
          {
            required: true,
            message: "请上传应用LOGO~",
            trigger: "blur"
          }
        ],
        appDescription: [
          {
            required: true,
            message: "请填写应用描述~",
            trigger: "blur"
          }
        ],
        appFunId: [
          {
            type: "array",
            required: true,
            message: "请选择需接入的功能~",
            trigger: "change"
          }
        ],
        appIp: [
          {
            required: true,
            message: "请填写主机IP/域名~",
            trigger: "blur"
          }
        ]
      },
      id: [], //被删除id数组(单个删除)
      ids: [], //被删除id数组(批量删除)
      columns,
      dataList: [],
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
      pagination: {
        size: "middle",
        current: 1,
        showQuickJumper: true,
        total: 10,
        showSizeChanger: true,
        defaultPageSize: 10,
        pageSizeOptions: ["10", "25", "50"],
        showTotal: (total, range) =>
          `当前显示${range[0]}至${range[1]}条，共${total}条` // 显示总数
        // onChange: (pageIndex, pageSize) => {
        //   console.log(pageIndex, pageSize);
        //   this.pagination.current = pageIndex;
        //   this.search.pageIndex = pageIndex;
        //   this.getList();
        // },
        // onShowSizeChange: (pageIndex, pageSize) => {
        //   console.log(pageIndex, pageSize);
        //   this.pagination.current = 1;
        //   this.search.pageIndex = 1;
        //   this.search.pageSize = pageSize;
        //   this.getList();
        // }
      },
      fetchappCodeTableList: []
    };
  },

  created() {
    this.baseUrl = this.$store.state.app.picBaseUrl
    this.getList();
    this.fetchappCodeTable();
  },

  methods: {
    permit,
    moment,
    //点击单个删除
    showDeleteConfirm(e) {
      this.id.push(e.applyId); //添加到被删除数组
      console.log(this.id);

      this.$confirm({
        title: "你确定要删除这条数据吗？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk: async() => {
          try {
            let res = await this.$api.ApplicationMessage.deleteApplyMessage({
              ids: this.id
            });
            this.$message.loading({
              content: "正在删除中...",
              key: "updatable"
            });
            if (res.code === 200) {
              setTimeout(() => {
                this.$message.success({
                  content: "删除成功！",
                  key: "updatable",
                  duration: 2
                });
              }, 2000);
              this.id = []; //清空id数组
            } else {
              setTimeout(() => {
                this.$message.error({
                  content: "删除失败！",
                  key: "updatable",
                  duration: 2
                });
              }, 2000);
            }
          } catch (error) {
            this.$message.error("请求失败");
          }
        },
        onCancel() {
          this.id = []; //清空id数组
        }
      });
    },
    //添加应用
    addApp() {
      this.appTitle = "添加应用";
      this.changebtn = "立即创建";

      this.orgName = "";
      this.form = {
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
      }
      this.addAppModal = true;
      this.getFunList();
    },
    //编辑应用
    changeApp(item) {
      // console.log(item);
      let infoitem = JSON.parse(JSON.stringify(item));
      this.appTitle = "编辑应用";
      this.changebtn = "确认编辑";
      this.getFunList();
      this.orgName = infoitem.orgName;
      this.form = infoitem;
      this.addAppModal = true;
    },
    //机构显示事件
    showOrgName(value, lable) {
      this.form.orgCode = value;
    },
    addAppForm() {
      // if (this.form.orgPicUrl == "") {
      //   this.$message.error({
      //     content: "请上传图片~"
      //   });
      //   return;
      // }
      this.$refs.form.validate(valid => {
        if (valid) {
          let form1 = JSON.parse(JSON.stringify(this.form));
          // console.log(form1);
          this.getaddAPP(form1);
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.form = {
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
      }
      this.$refs.form.resetFields();
      this.addAppModal = false;
    },
    homehandleChange(value) {
      this.search.homeIsShow = value;
    },
    handleChangeType(value) {
      this.search.appType = value;
    },
    //更改表格开关
    changeShowState(sta, id) {
      // console.log(sta);
      if (sta) {
        let data = {
          appId: id,
          status: 0
        };
        this.getdelateApp(data);
      } else {
        let data = {
          appId: id,
          status: 1
        };
        this.getdelateApp(data);
      }
    },
    //过滤开关状态
    filter(text) {
      // console.log(text);
      if (text === '0') {
        return true;
      } else {
        return false;
      }
    },
    //首页排序
    onCellChange(key, dataIndex, value) {
      // console.log("in");
    },
    //删除应用
    DeleteConfirm(item) {
      let data = {
        appId: item.appId,
        status: "-1"
      };
      this.$confirm({
        title: "你确定要删除这条数据吗？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk: async() => {
          try {
            let res = await this.$api.ApplicationManagement.delateApp(data);
            this.$message.loading({
              content: "正在删除中...",
              key: "updatable"
            });
            if (res.result) {
              this.getList();
              setTimeout(() => {
                this.$message.success({
                  content: "删除成功！",
                  key: "updatable",
                  duration: 2
                });
              }, 1000);
            } else {
              setTimeout(() => {
                this.$message.error({
                  content: "删除失败！",
                  key: "updatable",
                  duration: 2
                });
              }, 1000);
            }
          } catch (error) {
            this.$message.error("请求失败");
          }
        },
        onCancel() {
          
        }
      });
    },
    //接入秘钥
    showdateModal(item) {
      this.itemAppIdKey = item.appId;
      this.getAppKey(item.appId);
      this.dateModal = true;
    },
    //回调配置
    showproAppModal(item) {
      this.itemAppIdPro = item.appId;
      this.getAppKey(item.appId);
      this.proAppModal = true;
    },
    //接入秘钥确定
    okAppKey() {
      if (!this.appKey.expirationTime) {
        this.$message.error("请先选择过期日期~");
        return;
      }
      let data = {
        expirationTime: moment(this.appKey.expirationTime).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        appId: this.itemAppIdKey
      };
      // console.log(data);
      this.getchangeKey(data);
    },
    //接入秘钥取消
    deAppKey() {
      this.dateModal = false;
      this.proAppModal = false;
      this.appKey = {
        //回调配置、秘钥存放对象
        appCode: "",
        clientID: "",
        clientSecret: "",
        rsakey: "",
        expirationTime: "",
        successPay: "",
        msso: ""
      };
    },
    copyUrl() {
      let data = `应用编码 : ${this.appKey.appCode}\n` +
                `ClientID : ${this.appKey.clientID} \n` +
                `ClientSecret : ${this.appKey.clientSecret}\n` +
                `RSA公钥 : ${this.appKey.rsakey}\n`
      return data
    },
     onCopy(e) {
         this.$message.success('复制成功~')
      },
      onCopyError(e) {
          this.$message.error('复制失败~')
      },
   
    //回调配置确定
    okAppPro() {
      if (!this.appKey.msso) {
        this.$message.error("请填写登录授权~");
        return;
      }
      if (!this.appKey.successPay) {
        this.$message.error("请填写付款成功~");
        return;
      }
      let data = {
        successPay: this.appKey.successPay,
        msso: this.appKey.msso,
        appId: this.itemAppIdPro
      };
      this.getchangeCallBack(data);
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
    sortChange(pagination, filters, sorter) {
      if (pagination.pageSize !== this.search.pageSize) {
        this.pagination.current = 1;
        this.search.pageIndex = 1;
        this.search.pageSize = pagination.pageSize;
         this.getList();
      } else if (pagination.current !== this.search.pageIndex) {
        const { current } = pagination;
        this.pagination.current = current;
        this.search.pageIndex = current;
         this.getList();
      } else if (
        pagination.pageSize === this.search.pageSize &&
        pagination.current === this.search.pageIndex
      ) {
        const { sortOrder } = this.columns[6];
        if (sortOrder === "ascend") {
          this.columns[6].sortOrder = "descend";
          this.search.sort = 1;
           this.getList();
        } else {
          this.columns[6].sortOrder = "ascend";
          this.search.sort = 0;
           this.getList();
        }
      }
    },


    //获取列表
    async getList() {
      try {
        const res = await this.$api.ApplicationManagement.getAppList({
          ...this.search
        });
        // console.log(res);
        this.dataList = res.data;
        this.pagination.total = res.total;
      } catch (error) {
        // console.log(error);
        this.$message.error("请求失败");
      }
    },
    //指定条件搜索
    searchList() {
      // console.log(this.search);
      this.pagination.current = 1;
      this.search.pageIndex = 1;
      this.getList();
    },
    // 删除应用和更改应用状态
    getdelateApp(data) {
      this.$api.ApplicationManagement.delateApp(data).then(res => {
        // console.log(res);
        if (res.result) {
           this.getList();
          this.$message.success({
            content: "操作成功~"
          });
        } else {
          this.$message.error({
            content: "操作失败~"
          });
        }
      });
    },
    //接入功能列表
    getFunList() {
      let data = {
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
    //模糊查询机构
    getgetOrgList(value) {
      // console.log(value);
      if (value === "") {
        this.getOrgList = [];
        return;
      }
      let data = {
        keyWord: value
      };
      this.$api.AgencyAccount.getOrgList(data).then(res => {
        // console.log(res);
        if (res.result) {
          this.getOrgList = res.data;
        } else {
          
        }
      });
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
    getuploadimg(data) {
      this.$api.init.uploadPic(data).then(res => {
        if (res.result) {
          this.form.appLogoUrl = res.data.path;
          this.$nextTick(() => {
            this.$refs.form.validateField("appLogoUrl");
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
    //新增编辑
    getaddAPP(data) {
      // console.log(data);
      this.$api.ApplicationManagement.addApp(data).then(res => {
        // console.log(res);
        if (res.result) {
          this.$message.success({
            content: "操作成功！"
          });
          this.getList();
          this.addAppModal = false;
        } else {
          this.$message.error({
            content: res.msg
          });
        }
      });
    },
    //获取秘钥和回调配置
    getAppKey(id) {
      let data = {
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
    //接入秘钥
    getchangeKey(data) {
      this.$api.ApplicationManagement.changeKey(data).then(res => {
        // console.log(res);
        if (res.result) {
          this.dateModal = false;
          this.$message.success("操作成功~");
          this.appKey = {
            //回调配置、秘钥存放对象
            appCode: "",
            clientID: "",
            clientSecret: "",
            rsakey: "",
            expirationTime: "",
            successPay: "",
            msso: ""
          };
        } else {
          this.$message.success("操作失败~");
        }
      });
    },
    //回调配置
    getchangeCallBack(data) {
      this.$api.ApplicationManagement.changeCallBack(data).then(res => {
        // console.log(res);
        if (res.result) {
          this.proAppModal = false;
          this.$message.success("操作成功~");
          this.appKey = {
            //回调配置、秘钥存放对象
            appCode: "",
            clientID: "",
            clientSecret: "",
            rsakey: "",
            expirationTime: "",
            successPay: "",
            msso: ""
          };
        } else {
          this.$message.success("操作失败~");
        }
      });
    },
    //获取应用类型下拉框数据
    fetchappCodeTable() {
      this.$store.dispatch("queryCodeTable", "APPLICATION_TYPE").then(res => {
        // console.log(res);
        this.fetchappCodeTableList = res;
      });
    }
  },
  computed: {}
};
</script>

<style lang="less">
#applyMessage1 {
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
    .handle-button .ant-btn-link {
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
}
//新增编辑对话框
.add-appuser-add-modal1ment {
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