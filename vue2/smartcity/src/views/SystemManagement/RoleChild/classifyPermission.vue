<template>
  <div>
    <div class="classify-per" v-for="(item,index) in pageList" :key="index">
      <h3>{{item.parentNode}}</h3>
      <div
        class="classify-per-item"
        v-for="(n,i) in item.page"
        :key="i"
        :title="n.label"
        :accessKey="n.path"
      >
        <a class="classify-per-item-label">
          <template>{{n.label}}</template>
        </a>
        <a-checkbox-group
          class="classify-per-item-group"
          style="flex:5"
          v-model="n.checkedList"
          :options="n.childCom"
          @change="(v)=>{onChange(v,n)}"
        />
      </div>
    </div>
  </div>
</template> 
<script>
import pageList from "@/Utils/menuList.js";
export default {
  data() {
    return {
      pageList,
      curCheckedList: [],
      AllCom: []
    };
  },
  methods: {
    /**
     * 权限复选框选择回调事件
     * @param {*} value 回调事件默认参数 n
     * @param {*} item  复选框组对象
     */
    onChange(value, item) {
      item.checkedList = value;
    },
    /**
     * 默认去掉所有权限的勾选
     * @param {*}
     */
    defaultNoChecked() {
      this.pageList.forEach(item => {
        item.page.forEach(n => {
          n.checkedList = [];
        });
      });
    },
    /**
     * 编辑状态下显示当前角色所有选中的权限复选框
     * @param {*} list 当前角色的权限数组
     */
    setCheckList(list) {
      list.forEach((item, index) => {
        item.forEach((n, i) => {
          this.pageList[index].page[i].checkedList = n;
        });
      });
    },
    /**
     * 获取所有选中权限
     * @param {*}
     */
    getAllChecked() {
      this.curCheckedList = [];
      this.pageList.forEach(item => {
        const pageArr = [];
        item.page.forEach(n => {
          let arr = [];
          arr = n.checkedList;
          if (arr) {
            pageArr.push(arr);
          }
        });
        this.curCheckedList.push(pageArr);
      });
      return this.curCheckedList;
    }
  }
};
</script>

<style lang="less" >
.classify-per {
  .classify-per-item {
    display: flex;
    background: rgba(248, 248, 248, 1);
    margin: 4px 0;
    padding: 6px 10px;
    cursor: pointer;
    .classify-per-item-label {
      margin-top: -8px;
      color: #409eff;
      margin-right: 10px;
      flex: 1;
      vertical-align: top;
    }
    .classify-per-item-group {
      flex: 5;
    }
  }
  .ant-checkbox-wrapper .ant-checkbox-group-item {
    padding: 4px 0;
  }
  .ant-checkbox-group {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 2;
    list-style: none;
    font-feature-settings: "tnum";
    display: inline-block;
  }
}
</style>>
