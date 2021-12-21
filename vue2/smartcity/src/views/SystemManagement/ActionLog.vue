<template>
  <div class="behavior">
    <!-- 搜索功能区 -->
    <div class="head">
      <div class="head-left">
        <a-button
          type="primary"
          v-auth="['ActionLog_list']"
          class="primary"
          @click="handleRefresh()"
        >
          <a-icon type="sync" />刷新数据
        </a-button>
      </div>
      <div class="head-right" v-auth="['ActionLog_list']">
        <!-- 开始日期 -->
        <a-date-picker
          dropdownClassName="filterNameAuthData"
          style="width:140px;"
          v-model="fetchData.startTime"
          :disabled-date="disabledStartDate"
          :showToday="false"
          allowClear
          format="YYYY-MM-DD"
          placeholder="开始日期"
        >
          <svg-icon
            slot="suffixIcon"
            icon-class="riqi"
            :scale="0.8"
            style="margin-right:-1px"
          />
        </a-date-picker>
        <span style="margin:0 15px;">至</span>
        <!-- 结束日期 -->
        <a-date-picker
          dropdownClassName="filterNameAuthData"
          style="width:140px;"
          v-model="fetchData.endTime"
          :disabled-date="disabledEndDate"
          :showToday="false"
          allowClear
          format="YYYY-MM-DD"
          placeholder="结束日期"
        >
          <svg-icon
            slot="suffixIcon"
            icon-class="riqi"
            :scale="0.8"
            style="margin-right:-1px"
          />
        </a-date-picker>
        <!-- 所属平台 -->
        <a-select
          v-model="fetchData.platform"
          style="width: 120px;margin:0 14px;"
          allowClear
          placeholder="所属平台"
        >
          <a-select-option
            v-for="item of codeTableListPT"
            :value="item.codeTableValue"
            :key="item.codeTableKey"
            >{{ item.codeTableKey }}</a-select-option
          >
        </a-select>
        <!-- 日志类型 -->
        <a-select
          v-model="fetchData.logType"
          style="width: 120px"
          allowClear
          placeholder="日志类型"
        >
          <a-select-option
            v-for="item of codeTableListLogTpye"
            :value="item.codeTableValue"
            :key="item.codeTableKey"
            >{{ item.codeTableKey }}</a-select-option
          >;
        </a-select>
        <!-- 搜索关键字 -->
        <a-input
          class="input"
          ref="userNameInput"
          v-model.trim="fetchData.keyword"
          style="width:180px;margin:0 14px;"
          placeholder="请输入搜索内容"
          @keyup.enter="query()"
          :allowClear="true"
        >
          <svg-icon slot="prefix" icon-class="sousuo" :scale="0.9" />
        </a-input>
        <a-button type="primary" class="primary" @click="query()"
          >搜索</a-button
        >
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <a-table
        v-if="permit('ActionLog_list')"
        bordered
        :loading="loading"
        :pagination="pagination"
        :columns="columns"
        :data-source="data"
        :rowKey="row => row.logId"
        @change="tableChange"
      >
        <span slot="logPerson" slot-scope="text">{{ text || "--" }}</span>
        <span slot="logType" slot-scope="text">{{
          calcSelection(text) || "--"
        }}</span>
        <span slot="action" slot-scope="text, record">
          <a
            class="a-btn"
            v-if="permit('ActionLog_info')"
            @click="showDetailModal(record)"
          >
            <svg-icon
              slot="suffixIcon"
              icon-class="chakan"
              :scale="0.8"
              style="margin-right:2px;"
            />详情
          </a>
          <span v-else>--</span>
        </span>
      </a-table>
      <a-table
        class="no-promission"
        v-else
        bordered
        :columns="columns"
        :data-source="[]"
        :locale="{ emptyText: '无权限，请联系管理员' }"
      />
      <!-- 查看详情弹框 -->
      <a-modal
        v-model="visible"
        title="日志详细信息"
        :footer="null"
        class="action-log-modal"
      >
        <ul class="ul-list">
          <li>
            <div>
              日志名称：
              <span>{{ record.logName || "--" }}</span>
            </div>
          </li>
          <li>
            <div>
              调用行为人：
              <span>{{ record.logPerson || "--" }}</span>
            </div>
          </li>
          <li>
            <div>
              日志类型：
              <span>{{ calcSelection(record.logType) || "--" }}</span>
            </div>
          </li>
          <li>
            <div>
              IP地址：
              <span>{{ record.logIpAddress || "--" }}</span>
            </div>
          </li>
          <li>
            <div>
              日志消息：
              <span>{{ record.logMessage || "--" }}</span>
            </div>
          </li>
          <li>
            <div>
              记录时间：
              <span>{{ record.writeTime || "--" }}</span>
            </div>
          </li>
          <li>
            <div>
              应用编码：
              <span>{{ record.appCode || "--" }}</span>
            </div>
          </li>
          <!--  -->
          <li>
            <div>
              调用主机：
              <span>{{ record.useHost || "--" }}</span>
            </div>
          </li>
          <li>
            <div>
              调用时间：
              <span>{{ record.useTime || "--" }}</span>
            </div>
          </li>
          <li>
            <div>
              状态编码：
              <span>{{ record.statusCode || "--" }}</span>
            </div>
          </li>
          <li>
            <div>
              状态信息：
              <span>{{ record.statusMessage || "--" }}</span>
            </div>
          </li>
        </ul>
        <div class="btn">
          <a-button type="primary" class="primary" @click="handleOk()"
            >确定</a-button
          >
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
/*
 * @Page: 行为日志页面 
 * @Author: mikey.WuQiao
 * @Date: 2020-07-31 14:34:55
 * @Last Modified by: mikey.WuQiao
 * @Last Modified time: 2020-11-02 17:24:58
 */
import { permit } from "../../directives/authIf.js";
import moment from "moment";

export default {
  data() {
    const columns = [
      {
        title: "日志名称",
        dataIndex: "logName",
        align: "center"
      },
      {
        title: "调用行为人",
        dataIndex: "logPerson",
        align: "center",
        scopedSlots: { customRender: "logPerson" }
      },
      {
        title: "日志类型",
        dataIndex: "logType",
        align: "center",
        scopedSlots: { customRender: "logType" }
      },
      {
        title: "IP地址",
        dataIndex: "logIpAddress",
        align: "center"
      },
      {
        title: "日志消息",
        dataIndex: "logMessage",
        align: "center",
        width: "400px",
        ellipsis: true
      },
      {
        title: "记录时间",
        dataIndex: "writeTime",
        align: "center",
        sortOrder: "descend",
        sorter: true
        // sorter: (a, b) => moment(a.writeTime) - moment(b.writeTime)
      },
      {
        title: "操作",
        dataIndex: "action",
        align: "center",
        width: "100px",
        scopedSlots: { customRender: "action" }
      }
    ];
    return {
      data: [],
      columns,
      dateFormat: "YYYY/MM/DD",
      monthFormat: "YYYY/MM",
      userName: "",
      visible: false,
      loading: false,
      codeTableListPT: [],
      codeTableListLogTpye: [],
      paginationPageSize: "",
      fetchData: {
        startTime: "",
        endTime: "",
        platform: undefined, // 所属平台
        logType: undefined, // 日志类型
        keyword: "",
        pageIndex: 1,
        pageSize: 10,
        sort: 1 // 0 :升序  1：倒序
      },
      record: {},
      pagination: {
        current: 1,
        showQuickJumper: true, //是否可以快速跳转至某页
        showTotal: (total, range) =>
          `当前显示${range[0]}至${range[1]}条，共${total}条`, // 显示总数
        // onChange: this.onPageChange.bind(this), //点击页码事件
        total: 0, //总条数
        size: "middle",
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ["10", "25", "50"] // 每页数量选项
        // onShowSizeChange: this.onShowSizeChangeMethod.bind(this) // 改变每页数量时更新显示
      } // table的分页器
    };
  },
  mounted() {
    //将时间选择默认选择最近一周
    this.fetchData.startTime = moment().subtract("weeks", 1);
    this.fetchData.endTime = moment();
    this.fetchBehaviorLogList();
    this.fetchCodeTable();
  },
  methods: {
    permit,
    //过滤下拉框的键值
    calcSelection(text) {
      let selectName;
      for (let i = 0; i < this.codeTableListLogTpye.length; i++) {
        if (text === this.codeTableListLogTpye[i].codeTableValue) {
          selectName = this.codeTableListLogTpye[i].codeTableKey;
        }
      }
      return selectName;
    },
    // 翻页、排序事件
    tableChange(pagination, filters, sorter) {
      // 记录当前选中的每页展示条数
      this.paginationPageSize = pagination.pageSize;
      //翻页
      if (pagination.pageSize !== this.fetchData.pageSize) {
        this.pagination.current = 1;
        this.fetchData.pageIndex = 1;
        this.fetchData.pageSize = pagination.pageSize;
        this.fetchBehaviorLogList();
      } else if (pagination.current !== this.fetchData.pageIndex) {
        const { current } = pagination;
        this.pagination.current = current;
        this.fetchData.pageIndex = current;
        this.fetchBehaviorLogList();
      } else if (
        pagination.pageSize === this.fetchData.pageSize &&
        pagination.current === this.fetchData.pageIndex
      ) {
        const { sortOrder } = this.columns[5];
        if (sortOrder === "ascend") {
          this.columns[5].sortOrder = "descend";
          this.fetchData.sort = 1;
          this.fetchBehaviorLogList();
        } else {
          this.columns[5].sortOrder = "ascend";
          this.fetchData.sort = 0;
          this.fetchBehaviorLogList();
        }
      }
    },
    //获取下拉框数据
    fetchCodeTable() {
      this.$store.dispatch("queryCodeTable", "LOG_PLATFORM").then(res => {
        this.codeTableListPT = res;
      });
      this.$store.dispatch("queryCodeTable", "LOG_TYPE").then(res => {
        this.codeTableListLogTpye = res;
      });
    },
    //禁选开始日期
    disabledStartDate(startValue) {
      const endValue = this.fetchData.endTime;
      if (!startValue || !endValue) {
        return startValue >= moment();
      }
      return startValue.valueOf() > endValue.valueOf();
    },

    //禁选结束日期
    disabledEndDate(endValue) {
      const startValue = this.fetchData.startTime;
      if (!endValue || !startValue) {
        return endValue >= moment();
      }
      return (
        startValue.valueOf() >= endValue.valueOf() ||
        endValue.valueOf() >= moment()
      );
    },
    //刷新数据
    handleRefresh() {
      // 刷新数据之前先将请求数据设为初始值
      this.fetchData = {
        startTime: moment()
          .subtract("weeks", 1)
          .format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD"),
        platform: undefined, // 所属平台
        logType: undefined, // 日志类型
        keyword: "",
        pageIndex: 1,
        sort: 1,
        pageSize: this.paginationPageSize || 10
      };
      this.pagination.current = 1;
      this.fetchBehaviorLogList();
    },
    // 关闭模态框
    handleOk() {
      this.visible = false;
    },
    // 显示详情模态框
    showDetailModal(record) {
      this.record = record;
      this.visible = true;
    },
    // 表格页面改变事件
    onPageChange(page) {
      this.pagination.current = page;
      this.fetchData.pageIndex = page;
      this.fetchBehaviorLogList();
    },
    // 改变每页数量时更新显示
    onShowSizeChangeMethod(i, pageSize) {
      this.fetchData.pageSize = pageSize;
      this.pagination.current = 1;
      this.fetchData.pageIndex = 1;
      this.fetchBehaviorLogList();
    },
    // query and search
    query() {
      this.pagination.current = 1;
      this.fetchData.pageIndex = 1;
      this.fetchBehaviorLogList();
    },
    // 获取行为日志列表
    async fetchBehaviorLogList() {
      let timer;
      clearTimeout(timer);

      let filterData = { ...this.fetchData };
      let { startTime, endTime } = filterData;
      /*
       * 将选择的时间转化为时间 格式 2019-09-04 14:09:25 2020-9-4
       */
      // if (startTime) startTime = startTime.valueOf();
      if (startTime) startTime = moment(startTime).format("YYYY-MM-DD");
      if (endTime) endTime = moment(endTime).format("YYYY-MM-DD");

      filterData = Object.assign(filterData, { startTime, endTime });
      /*
       * select只有设置了undefined的时候才会显示placeholder
       * 但是设置了undefined的时候发请求字段不存在
       * 所以过滤一下
       */
      if (filterData.platform === undefined) filterData.platform = "";
      if (filterData.logType === undefined) filterData.logType = "";
      this.loading = true;
      try {
        const res = await this.$api.SystemManagement.getBehaviorLogList(
          filterData
        );
        if (res.code === "200" && res.result) {
          timer = setTimeout(() => {
            this.loading = false;
          }, 200);
          this.data = res.data;
          this.pagination.total = res.total;
        } else {
          timer = setTimeout(() => {
            this.loading = false;
            this.$message.error("请求失败！" + res.message);
          }, 500);
        }
      } catch (error) {
        timer = setTimeout(() => {
          this.loading = false;
          this.$message.error("请求失败！" + error);
        }, 2000);
      }
    }
  }
};
</script>

<style lang="less">
.behavior {
  padding: 15px;
  width: 100%;
  background: white;
  .head {
    width: 100%;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head-right {
      /deep/ .ant-calendar-picker {
        width: 140px;
      }
      // /deep/ .ant-calendar-picker-input{
      //     width: 130px;;
      // }
      /deep/ .ant-calendar-picker {
        min-width: 140px !important;
      }
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      .input {
        width: 120px;
      }
    }
  }
  .content {
    .ant-table-row:hover a {
      color: #0080ff;
    }
    .a-btn {
      color: #b0b0b0;
    }
  }
}
.action-log-modal {
  .ant-modal-header {
    background-color: #f4f4f4;
    text-align: center;
  }
  .ant-modal-body {
    padding: 24px 48px;
  }
  .ant-col-offset-4 {
    margin-left: 35%;
  }
  .ul-list {
    font-size: 14px;
    list-style: none;
    width: 420px;
    text-align: left;
    li {
      min-height: 36px;
      line-height: 36px;
      div {
        color: #000;
        span {
          color: #ff7070;
        }
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    .primary {
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
