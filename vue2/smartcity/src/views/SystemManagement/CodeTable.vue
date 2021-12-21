<template>
  <div class="code-table">
    <!-- 搜索功能区 -->
    <div class="head">
      <div class="head-left">
        <a-button
          v-auth="['CodeTable_add']"
          type="primary"
          style="margin-right:10px;"
          class="add"
          @click="showAddModal('add')"
        >
          <svg-icon
            icon-class="add"
            :scale="0.8"
            style="margin-right:3px;"
          />添加码值
        </a-button>
        <a-button
          v-auth="['CodeTable_delete']"
          type="danger"
          class="danger"
          @click="showDeleteAllConfirm()"
          style="margin-right:10px;"
        >
          <svg-icon
            icon-class="shanchu"
            :scale="0.8"
            style="margin-right:3px;"
          />批量删除
        </a-button>
        <a-button
          type="primary"
          v-auth="['CodeTable_list']"
          class="primary"
          @click="handleRefresh()"
        >
          <a-icon type="sync" />刷新数据
        </a-button>
      </div>

      <div class="head-right" v-auth="['CodeTable_list']">
        <div class="components-input-demo-presuffix">
          <a-input
            ref="keyword"
            :allowClear="true"
            v-model.trim="fetchData.keyword"
            @keyup.enter="query()"
            placeholder="请输入搜索内容"
            style="width:180px;"
          >
            <svg-icon
              slot="prefix"
              icon-class="sousuo"
              :scale="0.8"
              style="margin-right:2px;"
              allowClear
            />
          </a-input>
        </div>
        <a-button
          type="primary"
          style="margin-left:14px;"
          class="primary"
          @click="query()"
          >搜索</a-button
        >
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <a-table
        v-if="permit('CodeTable_list')"
        bordered
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :pagination="pagination"
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :rowKey="row => row.codeTId"
        @change="tableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a
            class="a-btn"
            style="margin-right:12px;"
            v-auth="['CodeTable_edit']"
            @click="showAddModal('edit', record)"
          >
            <svg-icon
              icon-class="bianji"
              :scale="0.8"
              style="margin-right:4px;"
            />编辑
          </a>
          <!-- <a-divider type="vertical" /> -->
          <a
            class="a-btn"
            v-auth="['CodeTable_delete']"
            @click="showDeleteConfirm(record.codeTId)"
          >
            <svg-icon
              icon-class="shanchu"
              :scale="0.8"
              style="margin-right:4px;"
            />删除
          </a>
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
      <CreateAndUpdateCodeTable ref="createAndUpdateCodeTable" />
    </div>
  </div>
</template>

<script>
/*
 * @Page: 码表管理页面
 * @Author: mikey.WuQiao
 * @Date: 2020-08-04 09:51:04
 * @Last Modified by: mikey.WuQiao
 * @Last Modified time: 2020-11-02 17:24:12
 */
import CreateAndUpdateCodeTable from "./components/CAUCodeTable";
import { permit } from "../../directives/authIf.js";
export default {
  name: "codeTableList",
  components: { CreateAndUpdateCodeTable },
  data() {
    const columns = [
      {
        title: "码值类型",
        dataIndex: "codeTableType",
        align: "center"
      },
      {
        title: "码值类型描述",
        dataIndex: "codeTableDesc",
        align: "center"
      },
      {
        title: "码值",
        dataIndex: "codeTableValue",
        align: "center"
      },
      {
        title: "码键",
        dataIndex: "codeTableKey",
        align: "center"
      },
      {
        title: "排序",
        dataIndex: "codeTableSort",
        align: "center"
        // sorter: (a, b) => a.codeTableSort - b.codeTableSort
      },
      {
        title: "操作",
        dataIndex: "action",
        align: "center",
        scopedSlots: { customRender: "action" }
      }
    ];
    return {
      fetchData: {
        keyword: "", // 搜索关键字
        pageIndex: 1, 
        pageSize: 10
      },
      data: [], // 存放后台返回的数据
      columns,
      loading: false, // table loading效果
      paginationPageSize: "", //记录当前选中的每页展示条数
      pagination: {
        current: 1,
        showQuickJumper: true, //是否可以快速跳转至某页
        showTotal: (total, range) =>
          `当前显示${range[0]}至${range[1]}条，共${total}条`, // 显示总数
        onChange: this.onPageChange.bind(this), //点击页码事件
        total: 0, //总条数
        size: "middle",
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ["10", "25", "50"], // 每页数量选项
        onShowSizeChange: this.onShowSizeChangeMethod.bind(this) // 改变每页数量时更新显示
      }, // table的分页器
      selectedRowKeys: [], // 选中的列表
      hasDeleteArr: [] // 存放删除成功的数据id
    };
  },
  computed: {},
  mounted() {
    this.fetchCodeTableList();
  },
  methods: {
    permit,
    //点击左侧复选框
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = [
        ...new Set(
          [...selectedRowKeys].filter(
            item => this.hasDeleteArr.indexOf(item) === -1
          )
        )
      ];
    },
    //添加模态框
    showAddModal(type, record) {
      this.$refs.createAndUpdateCodeTable.showModal(type, record);
    },
    //刷新数据
    handleRefresh() {
      // 刷新数据之前，先把请求条件重置。
      this.fetchData = {
        keyword: "",
        pageIndex: 1,
        pageSize: this.paginationPageSize || 10
      };
      this.pagination.current = 1;
      this.fetchCodeTableList();
    },
    //搜索事件
    query() {
      this.pagination.current = 1;
      this.fetchData.pageIndex = 1;
      this.fetchCodeTableList();
    },
    tableChange(pagination, filters, sorter) {
      // 记录当前选中的每页展示条数
      this.paginationPageSize = pagination.pageSize;
    },
    // 表格页面改变事件
    onPageChange(page) {
      this.pagination.current = page;
      this.fetchData.pageIndex = page;
      this.fetchCodeTableList();
    },
    // 改变每页数量时更新显示
    onShowSizeChangeMethod(i, pageSize) {
      this.fetchData.pageSize = pageSize;
      this.pagination.current = 1;
      this.fetchData.pageIndex = 1;
      this.fetchCodeTableList();
    },
    //表格单个删除弹框
    showDeleteConfirm(id) {
      const key = "codetable1"; //当前提示的唯一标志
      let timer;
      clearTimeout(timer);
      this.$confirm({
        title: "你确定要删除这条数据吗？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk: async() => {
          this.$message.loading({ content: "正在删除...", key });
          try {
            const res = await this.deleteCodeTable([id]);
            if (res.code === "200" && res.result) {
              timer = setTimeout(() => {
                this.$message.success({
                  content: "删除成功！",
                  key,
                  duration: 2
                });
                // 把删除成功的数据id存下来
                this.hasDeleteArr = this.hasDeleteArr.concat([id]);
                /*
                 * 如果当前页只有一条数据并且删除了这条数据，就让请求的pageIndex 减 1
                 * 回到上一页
                 */
                if (
                  this.data.length === [id].length &&
                  this.fetchData.pageIndex > 1
                ) {
                  this.fetchData.pageIndex--;
                  this.pagination.current--;
                }
                // 在多选的情况下使用单个删除，保证选中的数组正确
                this.selectedRowKeys = [
                  ...new Set(
                    [...this.selectedRowKeys].filter(
                      item => [id].indexOf(item) === -1
                    )
                  )
                ];
                //  重新请求数据
                this.fetchCodeTableList();
              }, 100);
            } else {
              timer = setTimeout(() => {
                this.$message.error({
                  content: "删除失败！",
                  key,
                  duration: 3
                });
              }, 200);
            }
          } catch (error) {
            timer = setTimeout(() => {
              this.$message.error({
                content: "删除失败！" + error,
                key,
                duration: 3
              });
            }, 200);
          }
        }
      });
    },
    //表格全选删除弹框
    showDeleteAllConfirm() {
      // deleteArr 已经确定要删除的项
      const deleteArr = this.selectedRowKeys;
      if (!deleteArr.length) {
        this.$message.warning("请选择要删除的项！");
        return;
      }
      const key = "codeable123"; //当前提示的唯一标志
      let timer;
      clearTimeout(timer);
      this.$confirm({
        title: `确认删除选中的${deleteArr.length}条数据吗？`,
        content: "此操作可能误删，请谨慎操作！",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk: async() => {
          this.$message.loading({ content: "正在删除...", key });
          try {
            const res = await this.deleteCodeTable(deleteArr);
            if (res.code === "200" && res.result) {
              timer = setTimeout(() => {
                this.$message.success({
                  content: "删除成功！",
                  key,
                  duration: 2
                });
                // 删除之后让pageIndex正常显示
                const { total } = this.pagination; //删除之前的总条数
                const { pageSize, pageIndex } = this.fetchData;
                let currentTotal = total - deleteArr.length; //删除之后的总条数
                let currentTotalPage = Math.ceil(currentTotal / pageSize); //删除之后的总页数
                //假如删除之后的总页数 <= 当前页码，就赋值给当前页码
                if (currentTotalPage <= pageIndex) {
                  this.pagination.current = currentTotalPage;
                  this.fetchData.pageIndex = currentTotalPage;
                }
                // 清空多选数组
                this.selectedRowKeys = [];
                //  重新请求数据
                this.fetchCodeTableList();
              }, 100);
            } else {
              timer = setTimeout(() => {
                this.$message.error({
                  content: "删除失败！" + res.msg,
                  key,
                  duration: 3
                });
              }, 200);
            }
          } catch (error) {
            timer = setTimeout(() => {
              this.$message.error({
                content: "删除失败！" + error,
                key,
                duration: 3
              });
            }, 200);
          }
        }
      });
    },
    // 获取码表列表
    async fetchCodeTableList() {
      let timer;
      clearTimeout(timer);
      this.loading = true;
      const fetchData = this.fetchData;
      try {
        const res = await this.$api.SystemManagement.getCodeTableList(
          fetchData
        );
        if (res.code === "200" && res.result) {
          timer = setTimeout(() => {
            this.loading = false;
          }, 100);
          this.data = res.data;
          this.pagination.total = res.total * 1;
        } else {
          timer = setTimeout(() => {
            this.$message.error("请求失败！" + res.message);
            this.loading = false;
          }, 200);
        }
      } catch (error) {
        this.loading = false;
        this.$message.error("请求失败！" + error);
      }
    },
    // 删除/批量删除
    async deleteCodeTable(data) {
      return await this.$api.SystemManagement.deleteCodeTable({
        codeTId: data
      });
    }
  }
};
</script>

<style lang="less">
.code-table {
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
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
</style>
