<template>
  <div class="batch-add-sensiteive-word">
    <a-modal
      class="batch-add-modal"
      width="620px"
      title="批量导入敏感词库"
      :visible="visible"
      :destroyOnClose="true"
      @cancel="handleCancel"
      :footer="null"
    >
      <div class="batch-add-modal-content">
        <p>通过Excel表批量导入敏感词，每次导入数据需小于5000条，导入数据需按照标准严格检查数据的格式，以免造成数据错误，影响系统功能。</p>
        <a href>Excel模板下载</a>
        <div class="upload">
          <a-upload list-type="text" :beforeUpload="beforeUpload" :preview-file="previewFile">
            <a-button type="primary">添加敏感词Excel文件</a-button>
            <span class="upload-tip">只能上传xls文件，且数据条数不超过5000行</span>
          </a-upload>
        </div>
        <div class="action-btn">
          <a-button type="primary" @click="onSubmit">
            <a-icon type="loading" v-show="confirmLoading" />立即导入
          </a-button>
          <a-button style="margin-left: 20px;" @click="handleCancel">取消</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "createAndUpdateWebUser",
  data() {
    return {
      visible: false,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: ""
      //信息
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    previewFile(file) {
      console.log("Your upload file:", file);
      // Your process logic. Here we just mock to the same file
      // return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
      //   method: "POST",
      //   body: file
      // })
      //   .then(res => res.json())
      //   .then(({ thumbnail }) => thumbnail);
    },
    beforeUpload(file) {
      console.log(file)
      const isJPG = file.type === "application/vnd.ms-excel";
      if (!isJPG) {
        this.$message.error("You can only upload xls file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 模态框取消
    handleCancel(e) {
      console.log(e);
      console.log("Clicked cancel button");
      this.visible = false;
      this.resetForm();
    },
    // 模态框提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.confirmLoading = true;
          setTimeout(() => {
            this.visible = false;
            this.confirmLoading = false;
            this.$message.success("创建成功！");
          }, 2000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      // this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="less">
.batch-add-modal {
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
  .batch-add-modal-content {
    padding: 0 6px;
    p {
      margin-top: 0;
      font-size: 15px;
    }
    .upload {
      margin: 20px 0;
      .upload-tip {
        color: rgba(255, 0, 0, 0.6);
        margin-left: 10px;
      }
    }
    .action-btn {
      margin-top: 50px;
      text-align: center;
    }
  }
}
</style>