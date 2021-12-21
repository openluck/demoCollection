<!-- 应用通知公告 -->
<template>
  <div id="applyMessage1">
      <div class="top">
        <div class="topLift">
          <a-button v-auth="['ApplicationAnnouncements_batchDelete']" type="danger" class="danger" @click="showDeleteConfirmBatch()">
            <svg-icon icon-class="shanchu" :scale="0.8" style="margin-right:5px;"></svg-icon>
            批量删除
          </a-button>
        </div>
        <div class="topRight" v-auth="['ApplicationAnnouncements_search']">
          <!-- 选择日期 -->
          <!-- 开始日期 -->
          <a-date-picker
            style="width:140px"
            dropdownClassName="authData"
            v-model="search.startTime"
            :disabled-date="disabledStartDate"
            :showToday="false"
            format="YYYY-MM-DD"
            placeholder="开始日期"
          >
            <svgIcon slot="suffixIcon" icon-class="riqi" :scale="(0.8)" style="margin-right:-1px"/>
          </a-date-picker>
          <span style="margin:0 14px;">至</span>
          <!-- 结束日期 -->
          <a-date-picker
            style="width:140px"
            dropdownClassName="authData"
            v-model="search.endTime"
            :disabled-date="disabledEndDate"
            :showToday="false"
            format="YYYY-MM-DD"
            placeholder="结束日期"
          >
            <svgIcon slot="suffixIcon" icon-class="riqi" :scale="(0.8)" style="margin-right:-1px"/><a-icon slot="suffixIcon" type="calendar" />
          </a-date-picker>
          <!-- 搜索 -->
          <a-input v-model="search.keyWord" placeholder="请输入搜索内容" style="width:180px;margin-left:14px;margin-right:14px;">
            <svg-icon  slot="prefix" icon-class="sousuo" :scale="0.8"></svg-icon>
          </a-input>

          <a-button type="primary" @click="searchList">搜索</a-button>
        </div>
      </div>

      <div class="list">
        <a-table 
         v-if="permit('ApplicationAnnouncements_list')"
        :row-selection="rowSelection" 
        :columns="columns" 
        :data-source="dataList" 
        :rowKey="row=>row.noticeId"
        bordered
        :pagination="pagination"
        :loading="loading"
        @change="sortChange"
        >
          <span slot="operation" slot-scope="text,record" class="handle-button">
             <a-button type="link" v-auth="['ApplicationAnnouncements_edit']"  @click="showmodel(record)"> <svg-icon icon-class="bianji" :scale="0.8" style="margin-right:5px"></svg-icon>编辑</a-button>
            <a-button type="link" v-auth="['ApplicationAnnouncements_Delete']"  @click="showDeleteConfirm(record)"><svg-icon icon-class="shanchu" :scale="0.8" style="margin-right:5px"></svg-icon>删除</a-button>
          </span>
        </a-table>

          <!-- <a-spin tip="无权限"> -->
      <a-table
        class="no-promission"
        v-else
        bordered
        :columns="columns"
        :data-source="[]"
        :locale="{emptyText: '无权限，请联系管理员'}"
      />
      <!-- </a-spin> -->
      </div>

      <!-- 添加/编辑modal -->
    <a-modal
      class="newsModal"
      v-model="visible"
      
      title="编辑"
      wrapClassName="add-appuser-add-modal111"
      :maskClosable="false"
      :footer="null"
      width="700px"
    >
      <a-form-model layout="inline" :model="form"  :rules="rules" ref="form">
        <!-- 来源应用 -->
        <a-form-model-item ref="appName" label="来源应用" prop="appName">
          <a-input disabled  v-model="form.appName" style="width:500px" />
        </a-form-model-item>
        <!-- 创建时间 -->
        <a-form-model-item ref="createdTime" label="创建时间" prop="createdTime">
          <a-input  disabled v-model="form.createdTime" style="width:500px" />
        </a-form-model-item>
        <!-- 标题 -->
        <a-form-model-item ref="title" label="标题" prop="title">
          <a-input v-model="form.title" style="width:500px" />
        </a-form-model-item>
        <!-- URL地址 -->
        <a-form-model-item ref="url" label="URL地址" prop="url">
          <a-input v-model="form.url" style="width:500px" />
        </a-form-model-item>
        <!-- 请求参数 -->
        <a-form-model-item  label="请求参数" >
          <a-textarea
            v-model="form.getInfo"
            style="width:500px"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-model-item>
  
        <div class="modal-button-box">
          <a-form-model-item ref="authState" prop="authState">
            <a-button type="primary" @click="changeMsg()" style="margin-right:30px">立即修改</a-button>
            <a-button @click="resetForm()" style="margin-top:10px">取消</a-button>
          </a-form-model-item>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
// import Vue from "vue";
import moment from "moment";
import { permit } from "../../directives/authIf.js";
const columns = [  
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    align: "center",
    width: '40%'
  },
  {
    title: "应用名称",
    dataIndex: "appName",
    key: "appName",
    align: "center",
    width: '15%'
  },

  {
    title: "接收时间",
    dataIndex: "receptionTime",
    key: "receptionTime",
    align: "center",
    width: '15%'
  },
  {
    title: "创建时间",
    dataIndex: "createdTime",
    key: "createdTime",
    align: "center",
    width: '15%',
    sorter: true,
    sortOrder: 'descend'
      
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    align: "center",
    width: '15%',
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  data() {
    return {
      search: {
        //搜索
        startTime: '', //开始日期
        endTime: '', //结束日期
        keyWord: '', //输入框内容
        pageIndex: 1,
        pageSize: 10,
        sort: 0 //排序
      },
      loading: false,
      id: [], //被删除id数组(单个删除)
      ids: [], //被删除id数组(批量删除)
      columns,
      dataList: [],

      pagination: {
        size: "middle",
        current: 1,
        showQuickJumper: true,
        total: 10,
        showSizeChanger: true,
        defaultPageSize: 10,
        pageSizeOptions: ["10", "25", "50"],
        showTotal: (total, range) =>
          `当前显示${range[0]}至${range[1]}条，共${total}条` // 显示总数
        // onChange: (pageIndex, pageSize) => {
        //   console.log(pageIndex, pageSize);
        //   this.pagination.current = pageIndex;
        //   this.search.pageIndex = pageIndex;
        //   this.getList();
        // },
        // onShowSizeChange: (pageIndex, pageSize) => {
        //   console.log(pageIndex, pageSize);
        //   this.pagination.current = 1;
        //   this.search.pageIndex = 1;
        //   this.search.pageSize = pageSize;
        //   this.getList();
        // }
      },
      visible: false,
            //表单
      form: {
        appName: '',
        title: "", // 标题
        url: "", // url地址
        getInfo: "", // 名称
        noticeId: "", // 名称
        createdTime: ''
    
      },
      rules: {
        appName: [{
            required: true,
            message: "无来源应用",
            trigger: "blur"
        }],
        title: [{
            required: true,
            message: "请填写标题！",
            trigger: "blur"
        }],
        url: [{
            required: true,
            message: "请填写URL地址！",
            trigger: "blur"
        }],
        createdTime: [{
            required: true,
            message: "无创建时间",
            trigger: "blur"
        }]

      }
    };
  },
  created() {
    this.search.startTime = moment().subtract("weeks", 1);
    this.search.endTime = moment();
    this.getList();
  },

  methods: {
    permit,
    moment,
    //选择日期
    //禁选开始日期
    disabledStartDate(startValue) {
      const endValue = this.search.endTime;
      if (!startValue || !endValue) {
        return startValue >= moment();
      }
      return startValue.valueOf() > endValue.valueOf();
    },

    //禁选结束日期
    disabledEndDate(endValue) {
      const startValue = this.search.startTime;
      if (!endValue || !startValue) {
        return endValue >= moment();
      }
      return (
        startValue.valueOf() >= endValue.valueOf() ||
        endValue.valueOf() >= moment()
      );
    },
    sortChange(pagination, filters, sorter) {
      if (pagination.pageSize !== this.search.pageSize) {
        this.pagination.current = 1;
        this.search.pageIndex = 1;
        this.search.pageSize = pagination.pageSize;
         this.getList();
      } else if (pagination.current !== this.search.pageIndex) {
        const { current } = pagination;
        this.pagination.current = current;
        this.search.pageIndex = current;
         this.getList();
      } else if (
        pagination.pageSize === this.search.pageSize &&
        pagination.current === this.search.pageIndex
      ) {
        const { sortOrder } = this.columns[3];
        if (sortOrder === "ascend") {
          this.columns[3].sortOrder = "descend";
          this.search.sort = 1;
           this.getList();
        } else {
          this.columns[3].sortOrder = "ascend";
          this.search.sort = 0;
           this.getList();
        }
      }
    },
    //点击单个删除
    showDeleteConfirm(e) {
      this.id.push(e.noticeId); //添加到被删除数组
      // console.log(this.id);
      // return
      this.$confirm({
        title: "你确定要删除这条数据吗？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk: async() => {
          try {
            let res = await this.$api.ApplicationAnnouncements.delateNOA({ noticeId: this.id });
            this.$message.loading({
              content: "正在删除中...",
              key: "updatable"
            });
            if (res.result) {
              setTimeout(() => {
                this.$message.success({
                  content: "删除成功！",
                  key: "updatable",
                  duration: 2
                });
              }, 1000);
              this.getList();
              this.id = []; //清空id数组
            } else {
              setTimeout(() => {
                this.$message.error({
                  content: "删除失败！",
                  key: "updatable",
                  duration: 2
                });
              }, 1000);
            }
          } catch (error) {
            this.$message.error("请求失败");
          }
        },
        onCancel() {
          this.id = []; //清空id数组
        }
      });
    },

    //点击批量删除
    showDeleteConfirmBatch() {
      // console.log(this.ids);
      // return
      if (!this.ids.length) {
        this.$message.warning("请选择要删除的项！");
      } else {
        this.$confirm({
          title: "你确定要删除选中的数据吗？",
          content: "请谨慎操作！",
          okText: "确定",
          okType: "danger",
          cancelText: "取消",
          onOk: async() => {
            try {
              let res = await this.$api.ApplicationAnnouncements.delateNOA({ noticeId: this.ids });
              this.$message.loading({
                content: "正在删除中...",
                key: "updatable"
              });
              if (res.result) {
                setTimeout(() => {
                  this.$message.success({
                    content: "删除成功！",
                    key: "updatable",
                    duration: 2
                  });
                const { total } = this.pagination; //删除之前的总条数
                const { pageSize, pageIndex } = this.search;  
                let currentTotal = total - this.ids.length;//删除之后的总条数
                let currentTotalPage = Math.ceil(currentTotal / pageSize); //删除之后的总页数
                // console.log("currentTotalPage", currentTotalPage)
                //假如删除之后的总页数 <= 当前页码，就赋值给当前页码
                if (currentTotalPage <= pageIndex) {
                  this.pagination.current = currentTotalPage;
                  this.search.pageIndex = currentTotalPage;
                }
                }, 1000);

                
                this.getList();
              } else {
                setTimeout(() => {
                  this.$message.error({
                    content: "删除失败！",
                    key: "updatable",
                    duration: 2
                  });
                }, 1000);
              }
            } catch (error) {
              this.$message.error("请求失败");
            }
          },
          onCancel() {
            // console.log("Cancel");
          }
        });
      }
    },

    //获取列表
    async getList() {
      this.loading = true
      let { startTime, endTime } = this.search;
      // console.log(this.search);
      if (startTime) startTime = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
      if (endTime) endTime = moment(endTime).format('YYYY-MM-DD HH:mm:ss');
      try {
        const res = await this.$api.ApplicationAnnouncements.getNOAList({
          ...this.search,
          startTime,
          endTime
        });
        // console.log(res);
        this.dataList = res.data
        this.pagination.total = res.total;
        this.loading = false
      } catch (error) {
        // console.log(error);
        this.loading = false
        this.$message.error("请求失败");
      }
    },

    //指定条件搜索搜索
    searchList() {
      // console.log(this.search)
      this.getList();
    },
    //编辑
    showmodel(item) {
      // console.log(item);
      this.form = item
      this.visible = true
    },
    resetForm() {
      this.visible = false
      this.form = {
        appName: '',
        title: "", // 标题
        url: "", // url地址
        getInfo: "", // 名称
        noticeId: "", // 名称
        createdTime: ''
    
      }
    },
    changeMsg() {
      if (this.form.title === '') {
        this.$message.error("请填写标题~");
        return
      }
      if (this.form.url === '') {
        this.$message.error("请填写URL地址~");
        return
      }
      let data = {
        title: this.form.title,
        url: this.form.url,
        getInfo: this.form.getInfo,
        noticeId: this.form.noticeId
      }
      this.$api.ApplicationAnnouncements.changeNOA(data).then(res => {
        // console.log(res);
        if (res.result) {
          this.visible = false
           this.getList();
           this.form = {
              appName: '',
              title: "", // 标题
              url: "", // url地址
              getInfo: "", // 名称
              noticeId: "", // 名称
              createdTime: ''
            }
        } else {
           this.$message.error('操作失败~');
        }
      });
    }
  },
  computed: {
    //选择框
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(
          //   `selectedRowKeys: ${selectedRowKeys}`,
          //   "selectedRows: ",
          //   selectedRows
          // );
          this.ids = selectedRowKeys; //将选择项id添加到ids数组
          // console.log(this.ids);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  }
};
</script>

<style lang="less">
#applyMessage1 {
  background-color: #fff;
  .top {
    padding: 18px 14px;
    display: flex;
    justify-content: space-between;
    .topRight {
      display: flex;
      align-items: center;
    }
  }
  .list {
    padding: 0px 14px 14px 14px;
    .handle-button .ant-btn-link {
      color: #b2b2b2;
    }
    .ant-table-row{
      &:hover {
        .ant-btn-link {
          color: #489ff8;
        }
      }
    }
  }
  
}

//日期弹出框的宽度
.authData{
  .ant-calendar {
    width: 250px;
  }
}
//新增编辑对话框
.add-appuser-add-modal111 {
  .ant-form {
    // padding-left: 20px;
  }
  .ant-form-item {
    // width: 50%;
    padding: 5px;
    .ant-form-item-label {
      width: 100px;
    }
  }
  //红字样式
  .ant-form-item-with-help {
    margin-bottom: 0;
  }
  //上传图片样式
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .modal-button-box {
    text-align: center;
    padding: 20px;
  }
}
</style>