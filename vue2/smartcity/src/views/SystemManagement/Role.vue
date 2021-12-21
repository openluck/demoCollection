<template>
  <div class="role-management">
    <!-- 搜索功能区 -->
    <div class="head">
      <div class="head-left">
        <a-button type="primary" class="add" v-auth="['role_add']" @click="showAddModal('add')">
          <!-- <svg-icon icon-class="add" class="icon-add"></svg-icon> -->
          <svg-icon icon-class="add" :scale="0.8" style="margin-right:5px;"></svg-icon>添加角色
        </a-button>
        <a-button
          type="primary"
          class="primary refresh"
          v-auth="['role_refresh']"
          @click="handleRefresh"
        >
          <a-icon type="sync" />刷新数据
        </a-button>
      </div>
      <div class="head-right" v-auth="['role_list']">
        <div class="components-input-demo-presuffix">
          <a-input
            style="width:180px;margin-right:14px;"
            ref="userNameInput"
            v-model="roleKeyword"
            placeholder="请输入搜索内容"
          >
            <!-- <a-icon slot="prefix" type="search" /> -->
            <svg-icon icon-class="sousuo" slot="prefix" class="icon-search"></svg-icon>
          </a-input>
        </div>
        <a-button type="primary" class="primary" @click="getRoleList(roleKeyword)">搜索</a-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <a-table
        v-if="basePermit('role_list')"
        bordered
        :loading="loading"
        :pagination="pagination"
        :columns="columns"
        :data-source="roleList"
        :rowKey="row=>row.roleId"
      >
        <span slot="action" slot-scope="text, record">
          <a class="a-btn" v-auth="['role_changeStatus']" @click="changeStatus(record)">
            <svg-icon
              :icon-class="record.status=='1'?'zanting':'kaishi'"
              slot="prefix"
              style="cursor: pointer; vertical-align: middle; margin-top: -4px;transform: scale(0.8);  "
            ></svg-icon>
            <span
              slot="status"
              style="cursor: pointer;margin:0 10px"
            >{{ record.status==="1"?"暂停":"开始" }}</span>
          </a>

          <a
            class="a-btn"
            @click="showAddModal('edit',record)"
            v-auth="['role_edit']"
            style="margin-right:6px"
          >
            <svg-icon icon-class="bianji" style="margin-right:4px;transform: scale(0.8);"></svg-icon>编辑
          </a>
          <a class="a-btn" @click="showDeleteConfirm(record.roleId)" v-auth="['role_delete']">
            <svg-icon icon-class="shanchu" style="margin-right:4px;transform: scale(0.8);"></svg-icon>删除
          </a>
        </span>
      </a-table>
      <a-table
        class="no-promission"
        v-else
        bordered
        :columns="columns"
        :data-source="[]"
        :locale="{emptyText: '无权限，请联系管理员'}"
      />
      <AddAndUpdateRole ref="AddAndUpdateRole" />
    </div>
    <a-drawer
      wrapClassName="drawer"
      width="460px"
      placement="right"
      :closable="false"
      :visible="drawerVisible"
      @close="drawerVisible=false"
    >
      <span slot="title" style="color:#ffffff;opacity:.6">添加页面</span>
      <div class="drawer-content" v-for="(item,index) in pageList" :key="index">
        <h3>{{item.parentNode}}</h3>
        <div
          class="drawer-item"
          v-for="(n,i) in item.page"
          :key="i"
          :title="n.label"
          :accessKey="n.path"
          @click="selectPage(n.label,n.path)"
        >
          <a style="color:rgba(64, 158, 255,1);margin-right:10px;">
            <template>{{n.label}}</template>
          </a>
          <span>{{n.path}}</span>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { permit } from "../../directives/authIf.js";
import pageList from "@/Utils/menuList.js";
import AddAndUpdateRole from "./RoleChild/AddAndUpdateRole";
const columns = [
  {
    title: "角色名称",
    dataIndex: "roleName",
    align: "center",
    width: "10%"
  },
  {
    title: "角色ID",
    dataIndex: "roleId",
    align: "center",
    width: "5%"
  },
  {
    title: "内容描述",
    dataIndex: "remark",
    align: "center",
    width: "65%"
  },

  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    width: "20%",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  components: { AddAndUpdateRole },
  data() {
    return {
      loading: false,
      drawerVisible: false,
      roleKeyword: "",
      roleList: [],
      title: "页面一",
      path: "page1-path",
      columns,
      deleteArr: [],
      pageList: pageList,
      filterList: {
        pageIndex: 1,
        pageSize: 10,
        keyword: ""
      },
      filterDelete: { actionType: 0, newStatus: "", id: "" },
      pagination: {
        current: 1,
        showQuickJumper: true, // 是否可以快速跳转至某页
        showTotal: (total, range) =>
          `当前显示${range[0]}至${range[1]}条，共${total}条`, // 显示总数
        onChange: this.onPageChange.bind(this), // 点击页码事件
        total: 0, // 总条数
        size: "middle",
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ["10", "25", "50"], // 每页数量选项
        buildOptionText: pageSizeOptions => `${pageSizeOptions.value}条/页`,
        onShowSizeChange: this.onShowSizeChangeMethod.bind(this) // 改变每页数量时更新显示
      }
    };
  },  
  created() {
    this.getRoleList();
  },
  mounted() {},
  computed: {},
  methods: {
    /**
     * 表格数据列表
     * @param {*} option 搜索时传入的关键字
     */
    async getRoleList(option) {
      let timer;
      clearTimeout(timer);
      this.loading = true;
      this.filterList.keyword = option;
      try {
        const res = await this.$api.SystemManagement.getRolelist(
          this.filterList
        );
        if (res.result === true && res.code === "200") {
          timer = setTimeout(() => {
            this.loading = false;
            this.roleList = res.data;
            this.pagination.total = res.total;
          }, 100);
        } else {
          console.log(res.message);
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * 打开新增/编辑模态框
     * @param {*} type 新增/编辑
     */
    showAddModal(type, record) {
      this.$refs.AddAndUpdateRole.showModal(type, record);
    },
    /**
     * 刷新数据
     * @param {*}
     */
    handleRefresh() {
      this.getRoleList();
      this.$message.success("数据刷新成功");
    },
    /**
     * 角色启用/停止
     * @param {*} option 选中的某项
     */
    changeStatus(option) {
      const _this = this;
      let timer;
      clearTimeout(timer);
      const key = "roleChangeStatus";
      this.filterDelete.id = option.roleId;
      this.filterDelete.actionType = 1;
      this.filterDelete.newStatus = Number(option.status) === 0 ? 1 : 0;
      this.$confirm({
        title: "你确定要修改角色状态吗？",
        okText: "确定",
        cancelText: "取消",
        async onOk() {
          try {
            const res = await _this.$api.SystemManagement.deleteAndToggleRole(
              _this.filterDelete
            );
            if (res.result === true && res.code === "200") {
              timer = setTimeout(() => {
                _this.$message.success({
                  content: "修改成功！",
                  key,
                  duration: 1
                });
              }, 500);
              _this.getRoleList();
            } else {
              timer = setTimeout(() => {
                _this.$message.error({
                  content: "操作失败！",
                  key,
                  duration: 1
                });
              }, 500);
              _this.getRoleList();
            }
          } catch (err) {
            console.log(err);
          }
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    },
    /**
     * 删除角色
     * @param {*} id 选中的删除项
     */
    showDeleteConfirm(id) {
      const _this = this;
      let timer;
      clearTimeout(timer);
      const key = "roleDelete";
      this.filterDelete.id = id;
      this.filterDelete.actionType = 0;
      this.$confirm({
        title: "你确定要删除这条数据吗？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        async onOk() {
          try {
            const res = await _this.$api.SystemManagement.deleteAndToggleRole(
              _this.filterDelete
            );
            if (res.result === true && res.code === "200") {
              timer = setTimeout(() => {
                _this.$message.success({
                  content: "删除成功！",
                  key,
                  duration: 1
                });
              }, 500);

              const newTotal = _this.pagination.total - 1;
              const remainPage = Math.ceil(
                newTotal / _this.filterList.pageSize
              );
              if (remainPage < _this.pagination.current) {
                _this.pagination.current = remainPage;
                _this.filterList.pageIndex = remainPage;
              }
              _this.getRoleList();
            } else {
              timer = setTimeout(() => {
                _this.$message.error("删除失败！");
              }, 500);
              _this.getRoleList();
            }
          } catch (err) {
            console.log(err);
          }
        }
      });
    },
    /**
     * 表格翻页事件
     * @param {*}
     */
    onPageChange(page) {
      this.pagination.current = page;
      this.filterList.pageIndex = page;
      this.getRoleList();
    },
    /**
     * 改变每页数量时更新显示
     * @param {*}
     */
    onShowSizeChangeMethod(i, pageSize) {
      this.filterList.pageSize = pageSize;
      this.pagination.current = 1;
      this.filterList.pageIndex = 1;
      this.getRoleList();
    },
    /**
     * drawer中选择子页面
     * @param {*}
     */
    selectPage(title, path) {
      this.$refs.AddAndUpdateRole.createPage(title, path);
      this.drawerVisible = false;
    },
    /**
     * 调用权限判断方法（v-if方式）
     * @param {*}
     */
    basePermit(e) {
      return permit(e);
    }
  }
};
</script>

<style lang="less">
.role-management {
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
      .add {
        /* .icon-add {
          font-size: 14px;
          vertical-align: middle;
          margin-right: 10px;
          margin-bottom: 3px;
        } */
      }
      .refresh {
        margin-left: 14px;
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
.drawer {
  .drawer-content {
    .drawer-item {
      background: rgba(248, 248, 248, 1);
      margin: 4px 0;
      padding: 2px 10px;
      cursor: pointer;
    }
    .drawer-item:hover {
      background: rgba(231, 229, 229, 0.6);
    }
  }
  .ant-drawer-header {
    position: relative;
    padding: 10px 24px;
    color: snow;
    background: rgba(23, 36, 64, 1);
    border-bottom: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
  }
  .ant-drawer-body {
    padding: 16px 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
  }
}
</style>
