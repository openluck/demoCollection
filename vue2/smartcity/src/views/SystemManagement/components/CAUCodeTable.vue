 <template>
  <div class="add-codeTable">
    <a-modal
      class="add-codeTable-modal"
      width="700px"
      :title="info.title"
      :visible="visible"
      @cancel="handleCancel()"
      :footer="null"
      :destroyOnClose="true"
      :maskClosable="false"
      :keyboard="false"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="codeTableType" label="码值类型：" prop="codeTableType">
          <a-input
            placeholder="请输入码值类型"
            style="width:79%;"
            v-model.trim="form.codeTableType"
            :maxLength="26"
            :allowClear="true"
            :disabled="codeTableTypeDisabled"
            @blur="() => {$refs.codeTableType.onFieldBlur();}"
          />
          <a-button
            title="将你输入的内容转为以下划线分割的大写字母格式"
            style="margin-left:10px;"
            :disabled="codeTableTypeDisabled"
            @click="stringFormat(form,'codeTableType','ruleForm',{symbol:'_',type:'U'})"
          >
            格式化
            <a-icon type="question-circle" style="font-size:12px;" />
          </a-button>
        </a-form-model-item>

        <a-form-model-item ref="codeTableDesc" label="类型描述：" prop="codeTableDesc">
          <a-input
            placeholder="请输入码值类型描述"
            v-model.trim="form.codeTableDesc"
            :maxLength="26"
            :allowClear="true"
            @blur="() => {$refs.codeTableDesc.onFieldBlur();}"
          />
        </a-form-model-item>

        <a-form-model-item ref="codeTableKey" label="码键：" prop="codeTableKey">
          <a-input
            placeholder="请输入码键"
            v-model.trim="form.codeTableKey"
            :maxLength="26"
            :allowClear="true"
            @blur="() => {$refs.codeTableKey.onFieldBlur();}"
          />
        </a-form-model-item>

        <a-form-model-item ref="codeTableValue" label="码值：" prop="codeTableValue">
          <a-input
            placeholder="请输入码值"
            v-model.trim="form.codeTableValue"
            :maxLength="26"
            :allowClear="true"
            @blur="() => {$refs.codeTableValue.onFieldBlur();}"
          />
        </a-form-model-item>

        <a-form-model-item ref="codeTableSort" label="排序：" prop="codeTableSort">
          <a-input
            placeholder="请输入排序编号"
            v-model.trim="form.codeTableSort"
            :maxLength="3"
            :allowClear="true"
            type="number"
            @blur="() => {$refs.codeTableSort.onFieldBlur();}"
          />
        </a-form-model-item>
        <!-- 批量添加 -->
        <!-- 一开始是批量添加 -->
        <!-- 后续产品更改为单条添加 -->
        <!-- 提交按钮功能区 -->
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button
            type="primary"
            :disabled="confirmLoading"
            @click="onSubmit()"
            style="margin-right:10px;"
          >
            <a-icon v-if="confirmLoading" type="loading" />
            {{info.addBtn}}
          </a-button>
          <a-button style="margin-left: 10px;" @click="handleCancel()">{{info.cancleBtn}}</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
/*
 * @Page: 添加和编辑码表组件
 * @Author: mikey.WuQiao
 * @Date: 2020-08-04 10:37:27
 * @Last Modified by: mikey.WuQiao
 * @Last Modified time: 2020-10-16 09:59:52
 */
export default {
  name: "CreateAndUpdateCodeTable",
  data() {
    return {
      data: [],
      editingKey: "",
      visible: false,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      codeTableTypeDisabled: false, // 编辑弹框下，码表类型不可修改。
      btnDisabled: false, //节流
      form: {
        codeTableType: "", //码值类型
        codeTableDesc: "", //码值类型描述
        codeTableValue: "", //码值
        codeTableKey: "", //码键
        codeTableSort: "" //排序
      },
      //信息
      info: {
        title: "",
        addBtn: "",
        cancleBtn: ""
      },
      rules: {
        codeTableType: [
          {
            required: true,
            message: "请输入码值类型",
            trigger: "blur"
          }
        ],
        codeTableDesc: [
          {
            required: true,
            message: "请输入码值类型描述",
            trigger: "blur"
          }
        ],
        codeTableValue: [
          {
            required: true,
            message: "请输入码值",
            trigger: "blur"
          }
        ],
        codeTableKey: [
          {
            required: true,
            message: "请输入码键",
            trigger: "blur"
          }
        ],
        codeTableSort: [
          {
            required: true,
            message: "请输入排序编号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    /**
     * 点击 格式化
     * @param {string}  e 被转换的内容
     * @param {string} key
     * @param {string} form
     **/
    stringFormat(e, key, form, option) {
      let str = e[key] || "";
      if (str.length === 0) return;
      // str = String.trim(str)
      str = str.replace(/[?？。.,，_]/g, "-");
      str = str.replace(/\s+/g, "-");
      str = str.replace(/(-)\1+/g, "-");
      if (option && option.type === "U") {
        str = str.toUpperCase();
      } else {
        str = str.toLowerCase();
      }
      if (option && option.symbol) {
        str = str.replace(/-/g, option.symbol);
      }
      this.$set(e, key, str);
      this.$refs[form].validateField(key, errMsg => {});
    },
    showModal(type, record) {
      this.codeTableTypeDisabled = false;
      if (type === "add") {
        this.info = {
          title: "添加码表",
          addBtn: "立即创建",
          cancleBtn: "取消"
        };
        this.form = {};
      } else if (type === "edit") {
        this.info = {
          title: "编辑码表",
          addBtn: "保存",
          cancleBtn: "取消"
        };
        this.form = record;
        this.codeTableTypeDisabled = true; // 如果是编辑按钮 ，码表类型不可修改。
      }

      this.visible = true;
    },
    //关闭模态框的回调
    handleCancel() {
      this.visible = false;
      this.isEdit = false;
      setTimeout(() => {
        this.codeTableTypeDisabled = false; //关闭模态框时使码表类型可以编辑
      }, 100);
      this.resetForm();
    },
    // 提交
    onSubmit() {
      // 根据当前点击的节点来判断是新增还是编辑
      const targetInnerText = event.target.innerText;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.confirmLoading = true;
          setTimeout(async() => {
            try {
              const res = await this.createAndUpdateCodeTable();
              if (res.code === "200" && res.result) {
                this.visible = false;
                this.confirmLoading = false;
                if (targetInnerText) {
                  if (targetInnerText === "立即创建") {
                    this.$message.success("创建成功！")
                  } else if (targetInnerText === "保存") {
                    this.$message.success("保存成功！")
                  }
                } else {
                  this.$message.success("操作成功！");
                }
                this.$parent.fetchCodeTableList();
              } else {
                this.$message.error("创建失败！" + res.msg);
                this.confirmLoading = false;
              }
            } catch (error) {
              this.$message.error("创建失败！" + error);
              this.confirmLoading = false;
            }
          }, 500);
        } else {
          return false;
        }
      });
    },
    //重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },

    //表格删除弹框
    showDeleteConfirm() {
      const key = "updatable01"; //当前提示的唯一标志
      const _this = this;
      this.$confirm({
        title: "你确定要删除这条数据吗？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          _this.$message.loading({ content: "正在删除...", key });
          setTimeout(() => {
            _this.$message.success({
              content: "删除成功！",
              key,
              duration: 1
            });
          }, 500);
        }
      });
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    // 添加一行
    handleAdd() {
      const { count, data } = this;
      const newData = {
        key: count,
        codeTableKey: "",
        codeTablevalue: "",
        codeTableSort: "",
        codeTableDesc: ""
      };
      this.data = [...data, newData];
      this.edit(this.count);
      this.isDelete = true;
      this.count = count + 1;
    },
    //表格编辑
    edit(key) {
      this.isEdit = true;
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    //表格删除
    deleteCol(key) {
      this.data = this.data.filter(item => item.key !== key);
    },
    //表格保存
    save(key) {
      this.cacheData = this.data.map(item => ({ ...item }));
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.key)[0];
      const targetCache = newCacheData.filter(item => key === item.key)[0];
      if (
        !target.codeTableKey ||
        !target.codeTableSort ||
        !target.codeTablevalue ||
        !target.codeTableDesc
      ) {
        this.$message.warn("请填写，谢谢");
        return;
      }
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
      this.isEdit = false;
      this.isDelete = false;
    },
    //取消保存
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = "";
      if (this.isDelete) {
        this.deleteCol(key);
        this.isEdit = false;
        return;
      }
      if (
        !target.codeTableKey &&
        !target.codeTableSort &&
        !target.codeTablevalue &&
        !target.codeTableDesc
      ) {
        this.deleteCol(key);
      } else {
        if (target) {
          Object.assign(
            target,
            this.cacheData.filter(item => key === item.key)[0]
          );
          delete target.editable;
          this.data = newData;
        }
      }
      this.isEdit = false;
    },
    // 创建或编辑码表
    async createAndUpdateCodeTable() {
      const fetchData = this.form;
      return await this.$api.SystemManagement.createAndUpdateCodeTable(
        fetchData
      );
    }
  }
};
</script>

<style lang="less">
.add-codeTable {
  width: 800px;
}

.redstarl .ant-form-item-label label::before {
  display: inline-block;
  margin-right: 4px;
  color: #f5222d;
  font-size: 14px;
  font-family: SimSun, sans-serif;
  line-height: 1;
  content: "*";
}
.add-codeTable-modal {
  .ant-form-item:last-child {
    margin: 0;
  }
  .ant-modal-header {
    background-color: #f4f4f4;
    text-align: center;
  }
  .ant-modal-body {
    padding: 24px 40px;
    .ant-form-item-label {
      text-align: right;
      // width: 15%;
    }
    .ant-select {
      width: 250px; //选择框的长度
    }
    .ant-form-item-control-wrapper {
      width: 500px; //输入框的长度
    }
  }
  .ant-col-offset-4 {
    margin-left: 35%;
  }
  .ant-table-placeholder {
    // display: none;
    height: 56px;
    padding: 0;
    .ant-empty-normal {
      height: 56px;
      padding: 0;
      margin: 15px;
      .ant-empty-image {
        display: none;
      }
    }
  }
}
</style>
