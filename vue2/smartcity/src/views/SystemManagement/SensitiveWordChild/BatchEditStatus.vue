<template>
  <div class="batch-edit-status">
    <a-modal
      class="edit-status-modal"
      width="620px"
      title="批量修改状态"
      :visible="visible"
      :destroyOnClose="true"
      @cancel="handleCancel"
      :footer="null"
    >
      <a-table :columns="columns" :data-source="dataBatch" :pagination="false" bordered :scroll="{ y: 550}">
        <span
          slot-scope="text"
          slot="sensitiveWordLevel"
          :style="filterColor(text)"
        >{{text}}</span>
        <span slot-scope="text,record" slot="switch">
          <a-switch :key="text" :defaultChecked="text == '1' ? true :false" @change="onChange(text,record)" />
        </span>
      </a-table>
      <span class="tips">敏感词库数据状态谨慎操作，以免造成不可预估后果</span>
      <div class="action-btn">
        <a-button type="primary" @click="onSubmit" :disabled="isDisabled">确认方案</a-button>
        <a-button style="margin-left: 20px;" @click="handleCancel">取消</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mergeCellKey } from '@/Utils/util'
export default {
  name: "createAndUpdateWebUser",
  data() {
    const columns = [
      {
        title: "词库类别",
        dataIndex: "lexiconType",
        key: "lexiconType",
        width: "30%",
        align: "center",
        scopedSlots: { customRender: "lexiconType" },
        customRender: (value, row) => {
          const obj = {
            children: value,
            attrs: {}
          };
          obj.attrs.rowSpan = mergeCellKey(row.lexiconType, this.dataBatch, 'lexiconType')

          return obj;
        }
      },
      {
        title: "等级",
        dataIndex: "sensitiveWordLevel",
        key: "sensitiveWordLevel",
        width: "40%",
        align: "center",
        scopedSlots: { customRender: "sensitiveWordLevel" }
      },
      {
        title: "状态开关",
        dataIndex: "switch",
        key: "switch",
        width: "30%",
        align: "center",
        scopedSlots: { customRender: "switch" }
      }
    ];
    return {
      visible: false,
      isDisabled: false,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      columns,
      lexicon: ["1", "2", "3"],
      dataBatch: []
    };
  },
  created() {
    this.getBatchStstus1();
  },
  mounted() {
    
  },
  computed: {},
  methods: {

    // getBatchStstus() {
    //   axios.post("/sensitiveWord/getbatchStatus").then(res => {
    //     if (res.data.result) {
    //       this.data = res.data.data.list;
    //     }
    //   });
    
    // },
  
    // 批量状态列表获取
    async getBatchStstus1() {
      try {
        const data = {}
        const res = await this.$api.SystemManagement.getbatchStatusSensitiveWord(data)
        if (res.result) {
          res.data.map(item => { item.switch ? item.switch = true : item.switch = false })
            this.dataBatch = res.data;
        }
      } catch (error) {
        this.$message.error("请求错误");
      }
    },
    onChange(text, current) {
      const index = Number(current.lexiconTypeId);
      this.dataBatch[index].switch = !this.dataBatch[index].switch
    },
    filterLevel(text) {
      let level = "";
      switch (text) {
        case "1":
          level = "红线词（严重）";
          break;
        case "2":
          level = "警告词（中等）";
          break;
        case "3":
          level = "敏感词（一般）";
          break;
      }
      return level;
    },
    filterColor(text) {
      let style = "";
      switch (text) {
        case "红线词(严重)":
          style = "color:#FE2E2E;";
          break;
        case "警告词(中等)":
          style = "color:	Coral;";
          break;
        case "敏感词(一般)":
          style = "color:	NavajoWhite";
          break;
      }
      return style;
    },
    setData() {
      // this.lexicon;
    },
    // 批量
    showModal() {
      this.visible = true;
    },
    // 模态框取消
    handleCancel() {
      this.visible = false;
    },
    // 添加、修改敏感词接口
    async statusUpdate(data) {
      try {
        const res = await this.$api.SystemManagement.statusUpdateSensitiveWord(data)
        if (res.result) {
            this.visible = false;
            this.confirmLoading = false;
            this.$message.success("修改成功！");
            this.$parent.getRoleList()
        }
      } catch (error) {
        this.$message.error("请求错误");
      }
    },
    enable() {
      setTimeout(() => {
        this.isDisabled = false
      }, 1000)
    },
    // 模态框提交
    onSubmit() {
      this.isDisabled = true
      this.enable()
      const submitData = JSON.parse(JSON.stringify([...this.dataBatch]))
      submitData.map(item => {
        item.switch ? item.switch = 0 : item.switch = 1
      })
      this.statusUpdate(submitData)
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="less">
.edit-status-modal {
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
  .tips {
    color: rgba(255, 0, 0, 0.6);
    font-size: 14px;
    margin: 10px 0;
    display: inline-block;
  }
  .action-btn {
    text-align: center;
  }
}
</style>