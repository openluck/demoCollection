<template>
  <div class="">
    <a-modal
      class="add-sensitive-word"
      width="620px"
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
        <a-form-model-item ref="sensitiveLevel" label="敏感词等级" prop="sensitiveLevel">
          <a-select v-model="form.sensitiveLevel" placeholder="请选择">
            <a-select-option v-for="item in sensitiveLevelList" :key="item.value">{{item.value}}</a-select-option>
            <!-- <a-select-option value="beijing">Zone two</a-select-option> -->
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="belongToLexicon" label="所属词库" prop="belongToLexicon">
          <a-select v-model="form.belongToLexicon" placeholder="请选择">
            <a-select-option v-for="item in belongToLexiconList" :key="item.codeTableKey">{{item.codeTableKey}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="sensitiveWord" label="敏感词" prop="sensitiveWord">
          <a-input style="width:200px;" v-model="form.sensitiveWord" />
        </a-form-model-item>
        <a-form-model-item ref="status" label="词状态" prop="status">
          <a-select v-model="form.status" placeholder="请选择">
            <a-select-option v-for="item in statusList" :value="item.id" :key="item.value">{{item.value}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="内容描述" prop="remark">
          <a-input v-model="form.remark" type="textarea" style="height:120px;" placeholder="请输入内容" />
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
  </div>
</template>

<script>
export default {
  name: "createAndUpdateWebUser",
  props: {
    belongToLexiconList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        sensitiveLevel: "",
        belongToLexicon: "",
        sensitiveWord: "",
        status: "",
        remark: "" //内容描述
      },
      //信息
      info: {
        title: "",
        addBtn: "",
        cancleBtn: ""
      },
      // 敏感词等级
      sensitiveLevelList: [
        { id: 1, value: '红线词(严重)' },
        { id: 2, value: '警告词(中等)' },
        { id: 3, value: '敏感词(一般)' }
      ],
      // // 所属词库
      // belongToLexiconList:[
      //   // {id:1,value:'低俗色情'},
      //   // {id:2,value:'政治非法'},
      //   // {id:3,value:'网络媒体'},
      // ],
      // 词状态
      statusList: [
        { id: '0', value: '生效' },
        { id: '1', value: '失效' }
      ],
      rules: {
        sensitiveLevel: [
          {
            required: true,
            message: "请选择敏感词等级",
            trigger: "blur"
          }
        ],
        belongToLexicon: [
          {
            required: true,
            message: "请选择所属词库",
            trigger: "blur"
          }
        ],

        sensitiveWord: [
          {
            required: true,
            message: "请输入敏感词",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择词状态",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: false,
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    console.log(this.form, '123')
  },
  updated() {
    console.log(this.form, '1234555')
  },
  methods: {
    showModal(type, record) {
      if (type === "add") {
        this.info = {
          title: "添加权限",
          addBtn: "立即创建",
          cancleBtn: "取消"
        };
      } else if (type === "edit") {
        // record.status = Number(record.status)
        this.info = {
          title: "编辑编辑",
          addBtn: "保存",
          cancleBtn: "取消"
        };
        this.form = { ...record }
      }
      this.visible = true;
    },
    // 模态框取消
    handleCancel() {
      this.visible = false;
      this.form = {
        sensitiveLevel: "",
        belongToLexicon: "",
        sensitiveWord: "",
        status: "",
        remark: "" 
      };
    },
    // 添加、修改敏感词接口
    async addAndUpdata(data) {
      try {
        const res = await this.$api.SystemManagement.addAndUpdateSensitiveWord(data)
        if (res.result) {
            this.visible = false;
            this.confirmLoading = false;
            this.$message.success("创建成功！");
            this.resetForm()
            this.$parent.getRoleList()
        }
      } catch (error) {
        this.$message.error("请求错误");
      }
    },
    // 模态框提交
    onSubmit() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.confirmLoading = true;
            this.addAndUpdata(this.form)
          } else {
            console.log("error submit!!");
            return false;
          }
        });
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="less">
.add-sensitive-word {
  .ant-modal-header {
    background-color: #f4f4f4;
    text-align: center;
  }
  .ant-modal-body {
    padding: 24px 40px;
    .ant-form-item-label {
      text-align: right;
      width: 20%;
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
}
</style>