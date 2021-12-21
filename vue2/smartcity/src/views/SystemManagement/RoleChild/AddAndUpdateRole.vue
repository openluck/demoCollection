<template>
  <div class="create-update-web-user">
    <a-modal
      class="add-and-update-role"
      width="860px"
      :title="info.title"
      :visible="visible"
      :destroyOnClose="true"
      @cancel="handleCancel"
      :footer="null"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="roleName" label="角色名称" prop="roleName">
          <a-input placeholder="请输入角色名称" v-model="form.roleName" />
        </a-form-model-item>
        <a-form-model-item label="菜单分配" prop="menuList">
          <a-tree
            :tree-data="treeData"
            show-icon
            default-expand-all
            :default-selected-keys="['0-0-0']"
            class="role-tree"
          >
            <template slot="custom" slot-scope="item">
              <svg-icon :icon-class="item.icons" class="node-icon"></svg-icon>

              <span class="node-title">{{ item.title }}</span>
              <span class="node-path" :class="{'page-path':!item.children}">{{ item.path }}</span>
              <div class="role-tree-action">
                <span
                  class="icon-wrap icon-wrap-add"
                  v-if="item.children"
                  title="添加子页面"
                  @click="showDrawer(item)"
                >
                  <a-icon type="plus" />
                </span>
                <span class="icon-wrap icon-wrap-edit" @click="showMenuModal(item,1)">
                  <a-icon type="edit" />
                </span>
                <a-popconfirm
                  title="确定删除该菜单吗?"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="deleteItem(item)"
                >
                  <span class="icon-wrap icon-wrap-delete">
                    <a-icon type="delete" />
                  </span>
                </a-popconfirm>
              </div>
            </template>
          </a-tree>
          <div class="add-menu-btn" @click="showMenuModal(null,0)">
            <a-icon type="folder-add" class="add-menu-btn-icon"></a-icon>添加一级菜单
          </div>
        </a-form-model-item>
        <a-form-model-item ref="ownPermission" label="权限分配：" prop="ownPermission">
          <a-spin :spinning="spinning">
            <ClassifyPermission style="height:400px;overflow-y:auto" ref="classifyPermission"></ClassifyPermission>
          </a-spin>
        </a-form-model-item>
        <a-form-model-item label="内容描述" prop="remark">
          <a-input v-model="form.remark" type="textarea" style="height:90px;" placeholder="请输入内容" />
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            <a-icon type="loading" v-show="confirmLoading" />
            {{info.addBtn}}
          </a-button>
          <a-button style="margin-left: 20px;" @click="handleCancel">{{info.cancleBtn}}</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal v-model="roleVisible" title="一级菜单配置" @ok="onSubmitMenu" @cancel="visible=true">
      <a-form-model :model="addMenuForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item ref="menuName" label="菜单名称" prop="menuName">
          <a-input placeholder="请输入菜单名称" v-model="addMenuForm.menuName" style="width:360px" />
        </a-form-model-item>
        <a-form-model-item ref="menuPath" label="path" prop="menuPath">
          <a-input placeholder="请输入菜单路径" v-model="addMenuForm.menuPath" style="width:360px" />
        </a-form-model-item>
        <a-form-model-item ref="menuIcon" label="菜单图标" prop="menuIcon">
          <a-radio-group v-model="addMenuForm.menuIcon" @change="selectIcon" style="width:360px">
            <a-radio-button
              :value="item"
              v-for="(item,index) in iconList"
              :key="index"
              class="icon-list-item"
            >
              <svg-icon :icon-class="item" class="icon-add"></svg-icon>
            </a-radio-button>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import ClassifyPermission from "./classifyPermission";
const treeData = [];
export default {
  name: "createAndUpdateWebUser",
  components: {
    ClassifyPermission
  },
  data() {
    return {
      visible: false,
      roleVisible: false,
      confirmLoading: false,
      spinning: true,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        roleId: "",
        roleName: "",
        ownPermission: "",
        remark: "",
        menuList: ""
      },
      selectId: "",
      addMenuForm: {
        menuName: "",
        menuPath: "",
        menuicon: ""
      },
      iconList: [
        "platformStats",
        "jigou",
        "InfoManage",
        "UserManagement",
        "ApiManagement",
        "gengxin",
        "xitong"
      ],
      //信息
      info: {
        title: "",
        addBtn: "",
        cancleBtn: ""
      },
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          }
        ]
      },
      treeData
    };
  },
  methods: {
    /**
     * 显示权限配置弹框
     * @param {*} type 操作类型 新增/编辑
     * @param {*} record 当前角色对象
     */
    showModal(type, record) {
      this.spinning = true;
      if (type === "add") {
        this.info = {
          title: "添加权限",
          addBtn: "立即创建",
          cancleBtn: "取消"
        };
        this.form.roleId = "";
        this.form.roleName = "";
        this.form.ownPermission = "";
        this.form.remark = "";
        this.form.menuList = "";
        this.treeData = [];
        this.$nextTick(() => {
          this.$refs.classifyPermission.defaultNoChecked();
        });
      } else if (type === "edit") {
        this.info = {
          title: "编辑权限",
          addBtn: "保存",
          cancleBtn: "取消"
        };
        this.form.roleId = record.roleId;
        this.form.roleName = record.roleName;
        this.form.ownPermission = "";
        this.form.remark = record.remark;
        this.form.menuList = "";
        this.$nextTick(() => {
          this.$refs.classifyPermission.setCheckList(
            JSON.parse(record.ownPermission)
          );
        });
        this.treeData = JSON.parse(record.menu);
      }
      this.visible = true;
      setTimeout(() => {
        this.spinning = false;
      }, 500);
    },
    /**
     * 模态框取消
     * @param {*}
     */
    handleCancel(e) {
      this.visible = false;
      this.$refs.ruleForm.resetFields();
    },
    /**
     * 模态框提交
     * @param {*}
     */
    onSubmit() {
      this.form.menuList = JSON.stringify(this.treeData);
      this.form.ownPermission = JSON.stringify(
        this.$refs.classifyPermission.getAllChecked()
      );
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const res = await this.$api.SystemManagement.addAndUpdateRole(
            this.form
          );
          if (res.result === true && res.code === "200") {
            this.confirmLoading = true;
            setTimeout(() => {
              this.visible = false;
              this.confirmLoading = false;
              this.$message.success("创建成功！");
            }, 200);
            this.$parent.getRoleList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 打开抽屉，菜单配置时选择子页面
     * @param {*} item 树节点的当前项对象
     */
    showDrawer(item) {
      this.selectId = item.id;
      this.$parent.drawerVisible = true;
    },
    /**
     * 打开二级模态框 添加/编辑一级菜单
     * @param {*} item 当前菜单项
     * @param {*} type 操作类型 1：编辑 0：新增
     */
    showMenuModal(item, type) {
      this.roleVisible = true;
      this.visible = false;
      if (type === 1) {
        this.addMenuForm.menuName = item.title;
        this.addMenuForm.menuPath = item.path;
        this.addMenuForm.menuIcon = item.icons;
        this.selectId = item.id;
      } else {
        this.addMenuForm.menuName = "";
        this.addMenuForm.menuPath = "";
        this.addMenuForm.menuIcon = "";
        this.selectId = "";
      }
    },
    /**
     * 选择图标
     * @param {*}
     */
    selectIcon(e) {
      this.addMenuForm.menuIcon = e.target.value;
    },
    /**
     * 选择子页面
     * @param {*} title 子页面标签
     * @param {*} path 子页面路径
     */
    createPage(title, path) {
      const newItem = {
        id: Math.ceil(Math.random() * 10000), // 避免和已有的id冲突
        title: title,
        path: path,
        scopedSlots: { title: "custom" }
      };
      this.filterPage(this.treeData, this.selectId, newItem);
    },
    /**
     * 将选择的子页面加到菜单树中
     * @param {*} arr 菜单树数据
     * @param {*} id  选择的的一级菜单节点
     * @param {*} newItem 从drawer选择的子页面数据项
     *
     */
    filterPage(arr, id, newItem) {
      arr.forEach((item, index) => {
        if (item.id === id) {
          arr[index].children.push(newItem);
        }
      });
    },
    /**
     * 创建一级菜单
     */
    onSubmitMenu() {
      const newItem = {
        id: Math.ceil(Math.random() * 10000), // 避免和已有的id冲突
        icons: this.addMenuForm.menuIcon,
        title: this.addMenuForm.menuName,
        path: this.addMenuForm.menuPath,
        scopedSlots: { title: "custom" },
        children: []
      };

      if (this.selectId === "") {
        //新增一级菜单
        this.treeData.push(newItem);
      } else {
        //编辑一级菜单
        const title = this.addMenuForm.menuName;
        const path = this.addMenuForm.menuPath;
        const icons = this.addMenuForm.menuIcon;
        this.filterItem(this.treeData, this.selectId, title, path, icons);
      }
      this.visible = true;
      this.roleVisible = false;
    },
    /**
     * 修改菜单树中的一级菜单（编辑）
     * @param {*} arr 菜单树
     * @param {*} id 选择的一级菜单
     * @param {*} title 修改后的菜单title
     * @param {*} path 修改后的菜单path
     * @param {*} icons 修改后的菜单icons
     */
    filterItem(arr, id, title, path, icons) {
      arr.forEach((item, index) => {
        if (item.id === id) {
          arr[index].title = title;
          arr[index].path = path;
          arr[index].icons = icons;
        }
        if (item.children) {
          this.filterItem(item.children, id, title, path, icons);
        }
      });
    },
    /**
     * 删除菜单树节点
     * @param {*} item 选择删除的菜单项
     */
    deleteItem(item) {
      this.filterItemDelete(this.treeData, item.id);
    },
    /**
     * 删除菜单树节点
     * @param {*} arr 菜单树
     * @param {*} id  选择删除的菜单项
     */
    filterItemDelete(arr, id) {
      arr.forEach((item, index) => {
        if (item.id === id) {
          arr.splice(index, 1);
        }
        if (item.children) {
          this.filterItemDelete(item.children, id);
        }
      });
    }
  }
};
</script>

<style lang="less">
.add-and-update-role {
  .ant-modal-header {
    background-color: #f4f4f4;
    text-align: center;
  }
  .ant-modal-body {
    padding: 24px 0px;
    .ant-form-item-label {
      text-align: right;
      width: 14%;
    }
    .ant-form-item-control-wrapper {
      width: 80%;
    }
    .ant-select {
      width: 200px; //选择框的长度
    }
    .ant-form-item-control-wrapper {
      width: 400px; //输入框的长度
    }
  }
  .ant-col-offset-4 {
    margin-left: 40%;
  }
  .ant-tree li .ant-tree-node-content-wrapper {
    display: inline-block;
    height: 24px;
    margin: 0;
    padding: 0 5px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 24px;
    text-decoration: none;
    vertical-align: top;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.3s;
    width: 100%;
  }
  .ant-modal-body .ant-form-item-control-wrapper {
    width: 640px;
  }
  .role-tree {
    .node-title {
      margin: 0 10px;
    }
    .node-path {
      margin: 0 10px;
      padding: 2px 6px;
      color: rgba(230, 162, 60, 1);
      background: rgba(253, 246, 236, 1);
    }
    .page-path {
      margin: 0 10px;
      padding: 2px 6px;
      color: rgba(106, 195, 58, 1);
      background: rgba(241, 249, 235, 1);
    }
    .role-tree-action {
      display: inline-block;
      float: right;
      margin-right: 10px;
      .icon-wrap {
        margin: 0 2px;
      }
      .icon-wrap-add {
        color: rgba(106, 195, 58, 0.6);
      }
      .icon-wrap-edit {
        color: rgba(64, 159, 255, 0.8);
      }
      .icon-wrap-delete {
        color: rgba(248, 136, 173, 0.8);
      }
    }
  }
  .add-menu-btn {
    padding-left: 10px;
    color: rgba(230, 162, 60, 1);
    cursor: pointer;
    .add-menu-btn-icon {
      margin-right: 6px;
    }
  }
}
.icon-list-item {
  width: 32px;
  margin: 0 4px;
  padding: 0px 7px;
  background: #f1f1f1;
}
.ant-radio-button-wrapper:hover {
  position: relative;

  span:visited {
    color: green;
  }
}
</style>