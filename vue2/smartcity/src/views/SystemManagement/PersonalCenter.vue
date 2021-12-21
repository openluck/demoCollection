<template>
  <div class="personal">
    <a-card title="个人中心设置" class="card">
      <a-form-model
        class="formmodel"
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <!-- 表单区 -->
        <a-form-model-item ref="roleName" label="当前角色" class="redstarl">
          <a-input v-model="form.roleName" disabled />
          <div class="des">当前角色不可更改</div>
        </a-form-model-item>

        <a-form-model-item ref="account" label="账号" class="flx-item redstarl">
          <a-input v-model="form.account" disabled />
          <div class="des">账号不可修改，用于登陆使用</div>
        </a-form-model-item>
        <a-form-model-item
          ref="nickName"
          label="账户昵称"
          has-feedback
          prop="nickName"
        >
          <a-input
            :disabled="!permit('PersonalCenter_edit')"
            placeholder="请输入账户昵称，不超过20个字符"
            v-model="form.nickName"
            :maxLength="20"
          />
        </a-form-model-item>

        <a-form-model-item label="性别" prop="gender">
          <a-radio-group
            v-model="form.gender"
            :disabled="!permit('PersonalCenter_edit')"
          >
            <a-radio value="0">男</a-radio>
            <a-radio value="1">女</a-radio>
            <a-radio value="2">保密</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item
          ref="realName"
          label="联系人"
          has-feedback
          prop="realName"
        >
          <a-input
            :disabled="!permit('PersonalCenter_edit')"
            placeholder="请输入联系人，不超过20个字符"
            v-model="form.realName"
            :maxLength="20"
          />
        </a-form-model-item>
        <a-form-model-item
          ref="phoneNumber"
          label="手机号码"
          has-feedback
          prop="phoneNumber"
        >
          <a-input
            :disabled="!permit('PersonalCenter_edit')"
            placeholder="请输入手机号码"
            v-model="form.phoneNumber"
            :maxLength="11"
          />
        </a-form-model-item>
        <a-form-model-item ref="email" label="邮箱" has-feedback prop="email">
          <a-input
            :disabled="!permit('PersonalCenter_edit')"
            placeholder="请输入邮箱地址"
            v-model="form.email"
          />
        </a-form-model-item>

        <a-form-model-item label="备注" prop="remark">
          <a-input
            v-model="form.remark"
            :disabled="!permit('PersonalCenter_edit')"
            type="textarea"
            style="height:120px;"
          />
        </a-form-model-item>
        <!-- 功能按钮区 -->
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button
            type="primary"
            :disabled="!permit('PersonalCenter_edit')"
            @click="onSubmit()"
            >立即修改</a-button
          >
          <a-button
            style="margin-left: 10px;"
            :disabled="!permit('PersonalCenter_edit')"
            @click="resetForm()"
            >暂不修改</a-button
          >
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
/*
 * @Page: 个人中心页面
 * @Author: mikey.WuQiao
 * @Date: 2020-07-31 14:34:55
 * @Last Modified by: mikey.WuQiao
 * @Last Modified time: 2020-10-27 11:03:29
 */
import { permit } from "../../directives/authIf";

export default {
  data() {
    let checkPending;
    if (checkPending) {
      clearTimeout(checkPending);
    }
    /* 账户昵称正则匹配 */
    const validateNickName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账户昵称"));
      }
      setTimeout(() => {
        /* 限制20个字符以内的中文、英文、数字、常用符号，不允许特殊符号 */
        const pwdRegex = /^[a-zA-Z0-9_@+-?\u4e00-\u9fa5]+$/;
        if (!pwdRegex.test(value)) {
          callback(
            new Error("格式有误，请输入中文、英文、数字、不允许特殊符号")
          );
        } else {
          callback();
        }
      }, 300);
    };
    /* 联系人正则匹配 */
    const validateRealName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入联系人"));
      }
      setTimeout(() => {
        //汉字正则
        /* 限制20个字符以内的中文、英文、数字、常用符号，不允许特殊符号 */
        const pwdRegex = /^[a-zA-Z0-9_@+-?\u4e00-\u9fa5]+$/;
        if (!pwdRegex.test(value)) {
          callback(
            new Error("格式有误，请输入中文、英文、数字、不允许特殊符号")
          );
        } else {
          callback();
        }
      }, 300);
    };
    /* 电话号码正则匹配 */
    const validatePhone = (rule, value, callback) => {
      clearTimeout(checkPending);
      if (!value) {
        return callback(new Error("请输入电话号码"));
      } else {
        setTimeout(() => {
          //电话号码正则 ，(由于工信部放号段不定时，所以建议使用泛解析 ^([1][3,4,5,6,7,8,9])\d{9}$)  what?
          const pwdRegex = /^1[3|4|5|6|7|8|9]\d{9}$/;
          if (!pwdRegex.test(value)) {
            callback(new Error("电话号码输入格式有误"));
          } else {
            callback();
          }
        }, 300);
      }
    };
    /* 邮箱规则匹配 */
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入电子邮箱"));
      }
      setTimeout(() => {
        // const pwdRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        // const pwdRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const pwdRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!pwdRegex.test(value)) {
          callback(new Error("邮箱输入格式有误"));
        }
        callback();
      }, 300);
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        roleName: "", // 当前角色
        account: "", // 账号
        nickName: "", // 账户昵称
        gender: "", // 性别;
        realName: "", //联系人
        phoneNumber: "", // 手机号码
        email: "", // 邮箱
        remark: "" // 备注
      },
      rules: {
        // 账户昵称
        nickName: [
          {
            required: true,
            validator: validateNickName,
            trigger: ["change", "blur"]
          },
          {
            max: 26,
            min: 2,
            message: "长度2-26位"
          }
        ],
        // 联系人
        realName: [
          {
            required: true,
            validator: validateRealName, //自定义正则验证
            trigger: ["change", "blur"]
          },
          {
            max: 26,
            min: 2,
            message: "长度2-26位"
          }
        ],
        // 手机号码
        phoneNumber: [
          {
            required: true,
            validator: validatePhone,
            trigger: ["change", "blur"]
          }
        ],
        // 邮箱
        email: [
          {
            required: true,
            validator: validateEmail,
            trigger: ["change", "blur"]
          }
        ],
        // 性别
        gender: [
          {
            required: true,
            message: "请选择性别",
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
    // 获取个人中心信息
    this.fetchPersonalInfo();
  },
  methods: {
    permit,
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.setPersonalInfo();
        } else {
          return false;
        }
      });
    },
    // 暂不修改
    resetForm() {
      // 先清空输入的内容
      // 再调用接口刷新页面
      this.$refs.ruleForm.resetFields();
      this.fetchPersonalInfo();
    },
    // 获取个人中心信息
    async fetchPersonalInfo() {
      try {
        const res = await this.$api.SystemManagement.getPersonalInfo({});
        if (res.code === "200" && res.result) {
          // this.form = res.data
          /* 接口返回的字段太多，只是需要一部分，故将其取出去 */
          const {
            roleKey,
            realName,
            userId,
            nickName,
            roleName,
            account,
            gender,
            phoneNumber,
            email,
            remark
          } = res.data;
          this.form = Object.assign(
            {},
            { roleKey },
            { userId },
            { realName },
            { nickName },
            { roleName },
            { account },
            { gender },
            { phoneNumber },
            { email },
            { remark }
          );
        } else {
          this.$message.error("获取失败！" + res.msg);
        }
      } catch (error) {
        this.$message.error("请求失败！" + error);
      }
    },
    // 修改、设置个人中心信息
    async setPersonalInfo() {
      const fetchData = this.form;
      try {
        const res = await this.$api.SystemManagement.setPersonalInfo(fetchData);
        if (res.code === "200" && res.result) {
          this.$message.success("修改成功！");
          this.fetchPersonalInfo();
        } else {
          this.$message.error("修改失败！" + res.msg);
        }
      } catch (error) {
        this.$message.error("请求失败！" + error);
      }
    }
  }
};
</script>
<style lang="less">
.personal {
  .des {
    color: #f55b5b;
  }
  width: 100%;
  background: white;
  .formmodel {
    width: 800px;
    .ant-form-item {
      &:first-child {
        margin-bottom: 0px;
      }
      &:nth-child(2) {
        margin-bottom: 0px;
      }
    }
  }
  .flx-item {
    display: flex;
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
}
</style>
