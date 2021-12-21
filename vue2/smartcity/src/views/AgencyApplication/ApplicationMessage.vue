<!-- 三方应用消息 -->
<template>
  <div id="applyMessage">
    <div class="top">
      <div class="topLift">
        <a-button
          type="danger"
          class="danger"
          v-auth="['ApplicationMessage_delete']"
          @click="showDeleteConfirmBatch()"
        >
          <svg-icon icon-class="shanchu" :scale="0.8" style="margin-right:5px;"></svg-icon>批量删除
        </a-button>
      </div>
      <!-- 搜索功能 -->
      <div class="topRight" v-auth="['ApplicationMessage_list']">
        <!-- 开始日期 -->
        <a-date-picker
          style="width:140px"
          dropdownClassName="authData"
          v-model="search.startDate"
          :disabled-date="disabledStartDate"
          :showToday="false"
          format="YYYY-MM-DD"
          placeholder="开始日期"
        >
          <svgIcon slot="suffixIcon" icon-class="riqi" :scale="(0.8)" style="margin-right:-1px" />
        </a-date-picker>
        <span style="margin:0 14px;">至</span>
        <!-- 结束日期 -->
        <a-date-picker
          style="width:140px"
          dropdownClassName="authData"
          v-model="search.endDate"
          :disabled-date="disabledEndDate"
          :showToday="false"
          format="YYYY-MM-DD"
          placeholder="结束日期"
        >
          <svgIcon slot="suffixIcon" icon-class="riqi" :scale="(0.8)" style="margin-right:-1px" />
        </a-date-picker>
        <!-- 搜索 -->
        <a-input
          v-model="search.keyword"
          placeholder="请输入搜索内容"
          style="width:180px;margin-left:14px;margin-right:14px;"
        >
          <svg-icon slot="prefix" icon-class="sousuo" :scale="0.8"></svg-icon>
        </a-input>

        <a-button type="primary" @click="searchList">搜索</a-button>
      </div>
    </div>
    <div class="list">
      <a-table
        v-if="permit('ApplicationMessage_list')"
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="dataList"
        :rowKey="row=>row.messageId"
        bordered
        :pagination="pagination"
        :loading="loading"
        @change="sortChange"
      >
        <span slot="receiveTime" slot-scope="text">{{ text ? text : "--" }}</span>
        <span slot="createTime" slot-scope="text">{{ text ? text : "--" }}</span>
        <span slot="operation" slot-scope="text,record" class="handle-button">
          <a-button
            type="link"
            v-if="permit('ApplicationMessage_delete')"
            @click="showDeleteConfirm(record)"
          >
            <svg-icon icon-class="shanchu" :scale="0.8"></svg-icon>删除
          </a-button>
          <span v-else>--</span>
        </span>
      </a-table>
      <!-- <a-spin v-else tip="无权限..."> -->
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
  </div>
</template>

<script>
import moment from "moment";
import { permit } from "../../directives/authIf.js";


export default {
  data() {
    return {
      loading: true,
      search: {
        //搜索
        startDate: "", //开始日期
        endDate: "", //结束日期
        keyword: "", //输入框内容
        pageIndex: 1, //当前页
        pageSize: 10, //每页条数
        sortField: "create_time",
        sort: 1
      },

      id: [], //被删除id数组(单个删除)
      ids: [], //被删除id数组(批量删除)
      columns: [
        {
          title: "应用名称",
          dataIndex: "name",
          key: "name",
          align: "center",
          width: "12%",
          ellipsis: true
        },
        {
          title: "标题",
          dataIndex: "title",
          key: "title",
          align: "center",
          width: "18%",
          ellipsis: true
        },
        {
          title: "内容",
          dataIndex: "content",
          key: "content",
          align: "center",
          width: "25%",
          ellipsis: true
        },
        {
          title: "备注",
          dataIndex: "remark",
          key: "remark",
          align: "center",
          width: "15%",
          ellipsis: true
        },
        {
          title: "接收时间",
          dataIndex: "receiveTime",
          key: "receiveTime",
          align: "center",
          width: "10%",
          scopedSlots: { customRender: "receiveTime" },
          sorter: true
          // sorter: (a, b) => moment(a.receiveTime) - moment(b.receiveTime)
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          key: "createTime",
          align: "center",
          width: "10%",
          scopedSlots: { customRender: "createTime" },
          sortOrder: "descend",
          sorter: true
        },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          align: "center",
          width: "10%",
          scopedSlots: { customRender: "operation" }
        }
      ], //列表结构
      dataList: [], //列表数据

      hasDeleteArr: [], //被删除数据的id

      pagination: {
        size: "middle",
        current: 1,
        showQuickJumper: true,
        total: 0,
        showSizeChanger: true,
        defaultPageSize: 10,
        pageSizeOptions: ["10", "25", "50"],
        showTotal: (total, range) =>
          `当前显示${range[0]}至${range[1]}条，共${total}条` 
      }
    };
  },

  created() {
    this.search.startDate = moment().subtract("weeks", 1);
    this.search.endDate = moment();
    this.getList();
  },

  computed: {
    //选择框
    rowSelection() {
      return {
        selectedRowKeys: this.ids,
        onChange: (selectedRowKeys, selectedRows) => {
          this.ids = [
            ...new Set(
              [...selectedRowKeys].filter(
                item => this.hasDeleteArr.indexOf(item) === -1
              )
            )
          ];
        }
      };
    }
  },

  methods: {
    permit,
    moment,

    //翻页，排序事件
    sortChange(pagination, filters, sorter) {
      if (pagination.pageSize !== this.search.pageSize) {
        //改变每页显示条数
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
        //排序功能
        //按照 receiveTime 排序
        if (sorter.field === "receiveTime") {
          this.search.sortField = "generate_time";
          const { sortOrder } = this.columns[4];
          delete this.columns[5].sortOrder;
          if (sortOrder === "descend") {
            this.columns[4].sortOrder = "ascend";
            this.search.sort = 0;
            this.getList();
          } else {
            this.columns[4].sortOrder = "descend";
            this.search.sort = 1;
            this.getList();
          }
        } else if (sorter.field === "createTime") {
          //按照 createTime 排序
          this.search.sortField = "create_time";
          const { sortOrder } = this.columns[5];
          delete this.columns[4].sortOrder;
          if (sortOrder === "descend") {
            this.columns[5].sortOrder = "ascend";
            this.search.sort = 0;
            this.getList();
          } else {
            this.columns[5].sortOrder = "descend";
            this.search.sort = 1;
            this.getList();
          }
        }
      }
    },

    //选择日期
    //禁选开始日期
    disabledStartDate(startValue) {
      const endValue = this.search.endDate;
      if (!startValue || !endValue) {
        return startValue >= moment();
      }
      return startValue.valueOf() > endValue.valueOf();
    },

    //禁选结束日期
    disabledEndDate(endValue) {
      const startValue = this.search.startDate;
      if (!endValue || !startValue) {
        return endValue >= moment();
      }
      return (
        startValue.valueOf() >= endValue.valueOf() ||
        endValue.valueOf() >= moment()
      );
    },

    //点击单个删除
    showDeleteConfirm(e) {
      this.id.push(e.messageId); //添加到被删除数组

      this.$confirm({
        title: "你确定要删除这条数据吗？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk: async() => {
          try {
            const res = await this.$api.ApplicationMessage.deleteApplyMessage({
              ids: this.id
            });
            this.$message.loading({
              content: "正在删除中...",
              key: "updatable"
            });
            if (res.code === "200") {
              setTimeout(() => {
                this.$message.success({
                  content: "删除成功！",
                  key: "updatable",
                  duration: 2
                });
              }, 500);

              this.hasDeleteArr = this.hasDeleteArr.concat(this.id);

              if (
                this.dataList.length === this.id.length &&
                this.search.pageIndex > 1
              ) {
                this.search.pageIndex--;
                this.pagination.current--;
              }
              this.getList();
              //勾选后 但单个删除导致的勾选项个数问题解决
              this.ids = [
                ...new Set(
                  [...this.ids].filter(
                    item => this.id.indexOf(item) === -1
                  )
                )
              ];
              this.id = []; //清空id数组
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
            this.$message.error("请求失败！" + error);
          }
        },
        onCancel: () => {
          this.id = []; //清空id数组
        }
      });
    },

    //点击批量删除
    showDeleteConfirmBatch() {
      const { ids } = this;
      if (!this.ids.length) {
        this.$message.warning("请选择要删除的项！");
      } else {
        this.$confirm({
          title: `确认删除选中的${ids.length}条数据吗?`,
          content: "",
          okText: "确定",
          okType: "danger",
          cancelText: "取消",
          onOk: async() => {
            try {
              const res = await this.$api.ApplicationMessage.deleteApplyMessage({
                ids: this.ids
              });
              this.$message.loading({
                content: "正在删除中...",
                key: "updatable"
              });
              if (res.code === "200") {
                setTimeout(() => {
                  this.$message.success({
                    content: "删除成功！",
                    key: "updatable",
                    duration: 2
                  });
                }, 500);

                this.hasDeleteArr = this.hasDeleteArr.concat(this.ids);

                const { total } = this.pagination;
                const { pageSize, pageIndex } = this.search;
                let currentTotal = total - this.ids.length;
                let currentTotalPage = Math.ceil(currentTotal / pageSize);
                if (currentTotalPage <= pageIndex) {
                  this.pagination.current = currentTotalPage;
                  this.search.pageIndex = currentTotalPage;
                }
                this.ids = []
                this.getList();
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
              this.$message.error("请求失败！" + error);
            }
          }
        });
      }
    },

    //获取列表
    async getList() {
      this.loading = true;
      let { startDate, endDate } = this.search;
      if (startDate) startDate = moment(startDate).format("YYYY-MM-DD");
      if (endDate) endDate = moment(endDate).format("YYYY-MM-DD");
      try {
        const res = await this.$api.ApplicationMessage.getApplyMessageList({
          ...this.search,
          startDate,
          endDate
        });
        if (res.code === "200") {
          this.dataList = res.data;
          this.pagination.total = res.total;
          this.loading = false;
        } else {
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        }
      } catch (error) {
        this.$message.error("请求失败！" + error);
        this.loading = false;
      }
    },

    //指定条件搜索搜索
    searchList() {
      this.search.pageIndex = 1
      this.pagination.current = 1
      if (this.search.startDate && !this.search.endDate) {
        this.$message.warning("请选择结束日期！");
      } else if (!this.search.startDate && this.search.endDate) {
        this.$message.warning("请选择开始日期！");
      } else {
        this.getList();
      }
    }
  }
};
</script>

<style lang="less">
#applyMessage {
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
      padding: 0;
      span {
        padding-left: 5px;
      }
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

//日期弹出框的宽度
.authData {
  .ant-calendar {
    width: 250px;
  }
}
</style>