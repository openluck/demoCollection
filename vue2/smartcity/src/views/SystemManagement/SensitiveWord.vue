<template>
  <div class="sensitive-word-management">
    <!-- 搜索功能区 -->
    <div class="head">
      <div class="head-left">
        <a-button
          type="primary"
          class="add"
          v-auth="['SensitiveWord_add']"
          @click="showAddModal('add')"
        >
          <!-- <a-button type="primary" class="add"  @click="showAddModal('add')"> -->
          <!-- <svg-icon icon-class="add" class="icon-add"></svg-icon> -->
          <svg-icon icon-class="add" :scale="0.8" style="margin-right:5px;"></svg-icon>
          添加词库
        </a-button>
        <!-- <a-button
          type="primary"
          class="add-batch"
          v-auth="['SensitiveWord_batchAdd']"
          @click="showModalBatch"
        >
          <svg-icon icon-class="add" class-name="icon-add"></svg-icon>批量添加
        </a-button>-->
        <a-button
          type="primary"
          class="primary refresh"
          v-auth="['SensitiveWord_statusUpdate']"
          @click="showModalModifyStatus"
        >
          <svg-icon icon-class="bianji" :scale="0.8" style="margin-right:5px;" class-name="icon-edit"></svg-icon>批量状态
        </a-button>
      </div>
      <div class="head-right">
        <div class="components-input-demo-presuffix" v-auth="['SensitiveWord_list']">
          <a-input style="width:180px;margin-right:14px;" ref="userNameInput" v-model="keyword" placeholder="请输入搜索内容">
            <!-- <a-icon slot="prefix" type="search" /> -->
            <svg-icon icon-class="sousuo" slot="prefix" class="icon-search"></svg-icon>
          </a-input>
        </div>
        <a-button type="primary" class="primary" @click="getRoleList('key')">搜索</a-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <a-table
        bordered
        ref="tab"
        :pagination="pagination"
        :columns="columns"
        :rowKey="row=>row.sensitiveId"
        :data-source="roleList"
        :scroll="{ y: 630}"
      >
        <span slot="action" slot-scope="text, record">
          <a class="a-btn" v-auth="['SensitiveWord_toggle']" @click="changeStatus(record)">
            <svg-icon
              :icon-class="record.status=='1'? 'zanting' :'kaishi' "
              slot="prefix"
              style="cursor: pointer; vertical-align: middle; margin-top: -4px; transform: scale(0.8) "
            ></svg-icon>
            <span
              slot="status"
              style="cursor: pointer;margin:0 10px"
            >{{ record.status==="0"?"暂停" :"开始" }}</span>
          </a>
          <a class="a-btn" v-auth="['SensitiveWord_update']" @click="showAddModal('edit',record)">
            <svg-icon icon-class="bianji" style="margin-right:4px;transform: scale(0.8);"></svg-icon>编辑
          </a>
          <a-divider type="vertical" v-auth="['SensitiveWord_delete']" />
          <a class="a-btn" @click="showDeleteConfirm(record)">
            <svg-icon icon-class="shanchu" style="margin-right:4px;transform: scale(0.8);"></svg-icon>删除
          </a>
        </span>
        <span slot="status" slot-scope="text" :style="filterColor(text)">{{filterStatus(text)}}</span>
        <span slot="sensitiveLevel" slot-scope="text" :style="filterLevelColor(text)">{{text}}</span>
      </a-table>
      <AddAndUpdateSensitiveWord
        ref="AddAndUpdateSensitiveWord"
        :belongToLexiconList="belongToLexiconList"
        @getRoleList="getRoleList"
      />
      <BatchAddSensiteiveWord ref="BatchAddSensiteiveWord" />
      <BatchEditStatus ref="BatchEditStatus" />
    </div>
  </div>
</template>

<script>
import AddAndUpdateSensitiveWord from "./SensitiveWordChild/AddAndUpdateSensitiveWord";
import BatchAddSensiteiveWord from "./SensitiveWordChild/BatchAddSensiteiveWord";
import BatchEditStatus from "./SensitiveWordChild/BatchEditStatus";
const columns = [
  {
    title: "敏感词",
    dataIndex: "sensitiveWord",
    align: "center"
  },
  {
    title: "所属词库",
    dataIndex: "belongToLexicon",
    align: "center"
  },
  {
    title: "敏感词等级",
    dataIndex: "sensitiveLevel",
    scopedSlots: { customRender: "sensitiveLevel" },
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "命中次数",
    dataIndex: "hitCounts",
    align: "center"
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  components: {
    AddAndUpdateSensitiveWord,
    BatchAddSensiteiveWord,
    BatchEditStatus
  },
  data() {
    return {
      keyword: "",
      roleList: [],
      columns,
      deleteArr: [],
      currentPage: 1,
      pageSize: 10,
      pagination: {
        current: 1,
        showQuickJumper: true, //是否可以快速跳转至某页
        showTotal: (total, range) =>
          `当前显示${range[0]}至${range[1]}条，共${total}条`, // 显示总数
        onChange: this.onPageChange.bind(this), //点击页码事件
        total: 0, //总条数
        size: "middle",
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ["10", "20", "50"], // 每页数量选项
        buildOptionText: pageSizeOptions => `${pageSizeOptions.value}条/页`,
        onShowSizeChange: this.onShowSizeChangeMethod.bind(this) // 改变每页数量时更新显示
      }, // table的分页器
      belongToLexiconList: [] //所属词库类型列表
    };
  },
  created() {
    this.getRoleList();
    // this.getBelongSensitive()
  },
  mounted() {
    this.getBelongSensitive();
  },
  computed: {
    // 单选与多选
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.deleteArr = selectedRowKeys;
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  },
  methods: {
    getBelongSensitive() {
      this.$store.dispatch("queryCodeTable", "SENSITIVE_WORD").then(res => {
        this.belongToLexiconList = res;
      });
    },
    filterStatus(text) {
      let m = "";
      switch (text) {
        case "0":
          m = "生效";
          break;
        case "1":
          m = "失效";
          break;
      }
      return m;
    },
    filterColor(text) {
      let style = "";
      switch (text) {
        case "0":
          style = "color:#01DF01;";
          break;
        case "1":
          style = "color:#F781F3;";
          break;
      }
      return style;
    },
    filterLevelColor(text) {
      let style = "";
      switch (text) {
        case "红线词(严重)":
          style = "color:#FF4C4C;";
          break;
        case "警告词(中等)":
          style = "color:#FC9033;";
          break;
        case "敏感词(一般)":
          // style = "color:#FFEC4A;";
          style = "color:#FFDB4A;";
          break;
      }
      return style;
    },
    // 列表查询  | 关键字检索
    async getRoleList(key) {
      let keywords = "";
      if (key === "key") {
        keywords = this.keyword;
        this.pagination.current = 1
        this.currentPage = 1
      }
      try {
        let data = {
          startTime: "",
          endTime: "",
          keyword: keywords,
          pageSize: this.pageSize,
          pageIndex: this.currentPage
        };
        const res = await this.$api.SystemManagement.getSensitiveWordList(data);
        if (res.result && res.code === "200") {
          let list = [...res.data];
          list.map(item => {
            item.status = String(item.status);
          });
          this.roleList = res.data;
          this.pagination.total = res.total;
        } else if (res.code === 500) {
          this.$message.error(res.msg);
        }
      } catch (error) {
        this.$message.error("请求错误");
      }
    },
    //添加模态框
    showAddModal(type, record) {
      console.log(record, 'record')
      this.$refs.AddAndUpdateSensitiveWord.showModal(type, record);
    },
    showModalBatch(type) {
      this.$refs.BatchAddSensiteiveWord.showModal(type);
    },
    showModalModifyStatus(type) {
      this.$refs.BatchEditStatus.getBatchStstus1();
      this.$refs.BatchEditStatus.showModal(type);
    },
    //查看调用量详情模态框
    showUseNumDetailModal() {
      this.$refs.useNum.showModal();
    },
    //刷新数据
    handleRefresh() {
      window.location.reload();
    },
    // 表格页面改变事件
    onPageChange(page) {
      this.pagination.current = page;
      this.currentPage = page;
      // this.fetchSearchStudent();
      this.getRoleList();
    },
    // 改变每页数量时更新显示
    onShowSizeChangeMethod(i, pageSize) {
      this.pageSize = pageSize;
      this.pagination.current = 1;
      this.currentPage = 1;
      // this.fetchSearchStudent();
      this.getRoleList();
    },
    //表格启停弹框
    showConfirm() {
      this.$confirm({
        title: "你确定要启用该API吗？",
        okText: "确定",
        cancelText: "取消",
        // content: (h) => {
        //     console.log(h);
        //     return <div style="color:red;"></div>
        // },
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    },
    // 删除敏感词/修改敏感词状态 -接口
    async DeleteItem(data, key) {
      try {
        const res = await this.$api.SystemManagement.deleteAndToggleSensitiveWord(
          data
        );
        if (res.result && res.code === "200") {
          if (data.actionType === "1") {
            this.$message.success({
              content: "删除成功！",
              key,
              duration: 1
            });
            this.currentPage > 1 ? this.currentPage-- : this.currentPage
          } else if (data.actionType === "2") {
            this.$message.success({
              content: "修改成功！",
              key,
              duration: 1
            });
          }
          this.getRoleList();
        }
      } catch (error) {
        this.$message.error("请求错误");
      }
    },
    //表格状态修改
    changeStatus(record) {
      const key = "updatable01"; //当前提示的唯一标志
      const _this = this;
      const delData = {
        sensitiveId: record.sensitiveId,
        actionType: "2",
        newStatus: record.status === "0" ? "1" : "0"
      };
      this.$confirm({
        title: `确定${record.status === '1' ? "启用" : "暂停"}该敏感词吗？`,
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          _this.$message.loading({ content: `正在${record.status === "1" ? "启用" : "暂停"}...`, key });
          _this.DeleteItem(delData, key);
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    //表格删除弹框
    showDeleteConfirm(record) {
      const key = "updatable01"; //当前提示的唯一标志
      const _this = this;
      const delData = {
        sensitiveId: record.sensitiveId,
        actionType: "1",
        newStatus: ""
      };
      this.$confirm({
        title: "你确定要删除这条数据吗？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          _this.$message.loading({ content: "正在删除...", key });
          _this.DeleteItem(delData, key);
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    //表格全选删除弹框
    showDeleteAllConfirm() {
      if (!this.deleteArr.length) {
        this.$message.warning("请选择要删除的项");
        return;
      }
      const key = "updatable"; //当前提示的唯一标志
      const _this = this;
      this.$confirm({
        title: "你确定要删除选中数据吗？",
        content: "此操作可能误删，请你谨慎操作！",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          _this.$message.loading({ content: "正在删除...", key });
          setTimeout(() => {
            _this.$message.success({
              content: "删除成功！",
              key,
              duration: 2
            });
          }, 1500);
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  }
};
</script>

<style lang="less">
.sensitive-word-management {
  padding: 15px;
  width: 100%;
  height: 100%;
  background: white;
  .head {
    width: 100%;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head-left {
      .add,
      .add-batch {
        /* .icon-add {
          font-size: 14px;
          vertical-align: middle;
          margin-right: 10px;
          margin-bottom: 3px;
        } */
      }
      .add-batch {
        margin-left: 14px;
        background-color: #5eb677;
        border-color: #5eb677;
      }
      .refresh {
        margin-left: 14px;
        /* .icon-edit {
          font-size: 14px;
          vertical-align: middle;
          margin-right: 10px;
          margin-bottom: 3px;
        } */
      }
    }
    .head-right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon-search {
        font-size: 14px;
      }
    }
  }
  .content {
    .ant-table-row:hover a {
      color: #0080ff;
    }
    a {
      color: #b0b0b0;
    }
  }
}
</style>