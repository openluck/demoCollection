
<template>
  <div class="editable-cell">
    <div v-if="editable"  class="editable-cell-input-wrapper">
      <a-input-number v-model="value" :min="0" :max="max"  @change="handleChange" @keyup.enter.native="check" />
      <a-icon  type="check"  class="editable-cell-icon-check"  @click="check" />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      <a >{{ value}}</a>
      <!-- v-if="record.appState==1" -->
      <!-- <div v-else>{{ value}}</div> -->
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>
<script>
export default {
  name: "EditableCell",
  props: {
    text: Number,
    isname: String,
    record: Object,
    max: Number
  },
  data() {
    return {
      value: this.text,
      editable: false
    };
  },
  created() {
    // console.log(this.record);
  },
  methods: {
    handleChange(value) {
      this.value = value;
    },
    check() {
      if (this.isname === "listRank") {
        //列表排序
        // console.log("列表");
        const data = {
          appId: this.record.appId,
          listRank: this.value
        };
        this.changeSort(data);
      }
      if (this.isname === "homeRank") {
        //首页排序
        // console.log("首页");
        const data = {
          appId: this.record.appId,
          homeRank: this.value
        };
        this.changeSort(data);
      }
    },
    edit() {
      this.editable = true;
    },
    //请求
    changeSort(data) {
      this.$api.ApplicationManagement.appSort(data).then(res => {
        // console.log(res);
        if (res.result) {
          this.editable = false;
          this.$message.success({
            content: "操作成功~"
          });
        } else {
          this.$message.error({
            content: "操作失败~"
          });
        }
      });
    }
  }
};
</script>
<style>
.editable-cell {
  position: relative;
  display: flex;
  align-items: center;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* text-decoration:underline; */
}

.editable-cell-text-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  /* line-height: 18px; */
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>