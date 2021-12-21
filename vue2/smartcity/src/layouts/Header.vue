<template>
  <div class="header">
    <div class="heaader-content">
      <span>
        <a-dropdown>
          <span class="ant-dropdown-link" @click="e => e.preventDefault()">
            <svg-icon icon-class="profilePhoto" :scale="2" style="margin-right:14px;" />
            {{userName}}
            <a-icon type="caret-down" class="caret-down" style="verticel-align:middle" />
          </span>
          <a-menu slot="overlay">
            <a-menu-item @click="toPersonCenter">
              <a href="javascript:;">账户设置</a>
            </a-menu-item>
            <a-menu-item @click="resetPassword">
              <a href="javascript:;">修改密码</a>
            </a-menu-item>
            <a-menu-item @click="logout">
              <a href="javascript:;">安全退出</a>
            </a-menu-item>
            <a-modal
              :destroyOnClose="true"
              v-model="visible"
              title="修改密码"
              @ok="onSubmitPassword"
              @cancel="visible=true"
            >
              <a-form-model
                :model="changePassword"
                ref="passwordForm"
                :rules="rules"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
                <a-form-model-item ref="oldPassword" has-feedback label="当前密码" prop="oldPassword">
                  <a-input-password
                    placeholder="请输入当前密码"
                    v-model="changePassword.oldPassword"
                    style="width:360px"
                  />
                </a-form-model-item>
                <a-form-model-item ref="newPassword" has-feedback label="新密码" prop="newPassword">
                  <a-input-password
                    placeholder="请输入新密码"
                    v-model.trim="changePassword.newPassword"
                    style="width:360px"
                  />
                </a-form-model-item>
                <a-form-model-item
                  ref="confirmPassword"
                  has-feedback
                  label="确认密码"
                  prop="confirmPassword"
                >
                  <a-input-password
                    placeholder="请确认密码"
                    v-model.trim="changePassword.confirmPassword"
                    style="width:360px"
                  />
                </a-form-model-item>
              </a-form-model>
            </a-modal>
          </a-menu>
        </a-dropdown>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    /* 当前密码验证 */
    const validateOldPassword = (rule, value, callback) => {
      checkPending = setTimeout(() => {
        if (!value) {
          callback(new Error("请输入当前密码"));
        } else if (
          value !== JSON.parse(sessionStorage.getItem("userInfo")).PASSWORD
        ) {
          callback(new Error("当前密码错误!"));
        } else {
          callback();
        }
      }, 300);
    };
    /* 密码正则匹配 */
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        checkPending = setTimeout(() => {
          /*
           * 强：字母+数字+特殊字符
           * /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
           * 中：字母+数字，字母+特殊字符，数字+特殊字符
           * /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
           * 弱：纯数字，纯字母，纯特殊字符
           * /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/
           */
          const pwdRegex = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*._]+$)[a-zA-Z\d!@#$%^&*._]+$/;
          if (!pwdRegex.test(value)) {
            callback(new Error("格式有误，字母、数字、常用符号组合"));
          }
          callback();
        }, 300);
      }
    };
    /* 密码二次验证 */
    const validateconfirmPassword = (rule, value, callback) => {
      checkPending = setTimeout(() => {
        if (!value) {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.changePassword.newPassword) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      }, 300);
    };
    return {
      userName: "",
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      changePassword: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        oldPassword: [
          {
            validator: validateOldPassword,
            required: true,
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            validator: validatePassword,
            required: true,
            trigger: "blur"
          }
          // {
          //   pattern: /^[^\s]*$/,
          //   message: "密码不能包含空格"
          // }
        ],
        confirmPassword: [
          {
            validator: validateconfirmPassword,
            required: true,
            trigger: "blur"
          }
          // {
          //   pattern: /^[^\s]*$/,
          //   message: "密码不能包含空格"
          // }
        ]
      }
    };
  },
  components: {},

  mounted() {
    setTimeout(() => {
      this.userName = JSON.parse(sessionStorage.getItem("userInfo")).account;
    }, 1000);
  },
  methods: {
    logout() {
      this.$api.user.logout({}).then(res => {
        if (res.result === true) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("routerInfo");
          sessionStorage.removeItem("userInfo");
          this.$router.push("/login");
        }
      });
    },
    resetPassword() {
      this.visible = true;
      this.changePassword.oldPassword = "";
      this.changePassword.newPassword = "";
      this.changePassword.confirmPassword = "";
    },
    onSubmitPassword() {
      this.$refs.passwordForm.validate(async valid => {
        if (valid) {
          const filter = {
            account: JSON.parse(sessionStorage.getItem("userInfo")).account,
            password: this.changePassword.confirmPassword,
            userId: JSON.parse(sessionStorage.getItem("userInfo")).userId,
            roleName: "",
            nickName: "",
            gender: "",
            realName: "",
            phoneNumber: "",
            email: "",
            remark: ""
          };
          const oldPassword = JSON.parse(sessionStorage.getItem("userInfo"))
            .PASSWORD;
          if (this.changePassword.oldPassword === oldPassword) {
            if (
              this.changePassword.newPassword ===
              this.changePassword.confirmPassword
            ) {
              try {
                const res = await this.$api.SystemManagement.setPersonalInfo(
                  filter
                );
                if (res.result === true && res.code === "200") {
                  this.visible = false;
                  this.$message.success("密码修改成功！");
                  setTimeout(() => {
                    this.logout();
                  }, 1000);
                }
              } catch (error) {
                console.log("error", error);
              }
            } else {
              this.$message.error("两次输入密码不一致");
            }
          } else {
            this.$message.error("当前密码错误");
          }
        }
      });
    },
    toPersonCenter() {
      this.$router.push("/SystemManagement/PersonalCenter");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  float: right;
  .heaader-content {
    padding-right: 16px;
    > span:nth-child(1) {
      display: inline-block;
      vertical-align: middle;
      margin: 0 10px;
      font-weight: bolder;
      font-size: 16px;
      .caret-down {
        vertical-align: middle;
        margin: 0 10px;
      }
    }
    > span:last-of-type .icon {
      font-size: 16px;
      margin: 0 10px;
      vertical-align: middle;
      font-weight: 400;
    }
    > span:last-of-type .logout-text {
      font-size: 15px;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      vertical-align: middle;
      font-weight: bolder;
    }
  }
}
</style>>

