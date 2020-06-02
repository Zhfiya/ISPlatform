<template>
  <div id="securitySetting">
    <label class="tip">本页面涉及邮箱、密码的重新设定，修改本页面资料都需要通过邮箱验证❗</label>
    <div class="row">
      <label>邮箱：</label>
      <label>{{ this.email }}</label>
      <button @click="Check" v-if="!isOk && isSend" :disabled="!isSend">发送验证码</button>
      <button v-if="!isOk && !isSend">{{ second }}s</button>
    </div>
    <div class="row" v-if="isCheck">
      <label for="checkCode">验证码：</label>
      <input type="text" id="checkCode" v-model="code">
      <button @click="SubmitCode">验证</button>
    </div>
      <div class="link_row" v-if="isOk">
        <label @click="ShowItem('pwd')" :class="{active:pwdShow}">
          <i class="el-icon-warning"></i>
          修改密码
        </label>
        <div class="update_row" v-if="pwdShow">
          <div>
            <input type="password" id="newPwd" v-model="newPwd" name="newPwd" placeholder="新密码...">
            <span v-if=" newPwd && newPwd.length < 8"><i class="el-icon-warning"></i>密码少于8位！</span>
          </div>
          <div>
            <input type="password" id="newPwdB" v-model="newPwdB" name="newPwd" placeholder="确认密码...">
            <span v-if="newPwdB && newPwdB !== newPwd"><i class="el-icon-warning"></i>两次输入不一致！</span>
          </div>
          <div>
            <button class="submit" @click="SubmitNewPwd()"><i class="el-icon-upload2"></i>提交</button>
            <span class="return" @click="Return('pwd')">
              <i class="el-icon-circle-close"></i>取消
            </span>
          </div>
        </div>
        <label @click="ShowItem('email')" :class="{active:emailShow}">
          <i class="el-icon-warning"></i>
          修改邮箱
        </label>
        <div class="update_row" v-if="emailShow">
          <div>
            <input type="text" id="newPwd" v-model="newEmail" name="newPwd" placeholder="新邮箱...">
            <button @click="CheckCode">发送验证码</button>
          </div>
          <input type="text" id="newPwdB" v-model="newCode" name="newPwd" placeholder="验证码...">
          <div>
            <button class="submit" @click="SubmitNewEmail()"><i class="el-icon-upload2"></i>提交</button>
            <span class="return" @click="Return('email')">
              <i class="el-icon-circle-close"></i>取消
            </span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'securitySetting',
  data () {
    return {
      email: 'Paranoid_ZH@163.com',
      code: '',
      newPwd: '',
      newPwdB: '',
      newEmail: '',
      newCode: '',

      second: 60,
      isCheck: false,
      isOk: false,
      isSend: true,
      pwdShow: false,
      emailShow: false
    };
  },

  computed: {
    ...mapState(['uId'])
  },

  created () {
    this.GetInfo();
  },

  methods: {
    // 发送验证码
    async Check () {
      try {
        const res = await this.$axios.post('/sendMail', {
          email: this.email
        });
        const info = res.data;
        if (info.code === 200) {
          const timer = setInterval(() => {
            this.second = this.second - 1;
            if (this.second === 0) {
              clearInterval(timer);
              this.second = 60;
              this.isSend = true;
            }
          }, 1000);
          this.isCheck = true;
          this.isSend = false;
        } else if (info.code === 409) {
          this.sessionJudge();
        } else {
          this.$message({
            type: 'error',
            message: info.message
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 验证新邮箱
    async CheckCode () {
      try {
        const res = await this.$axios.post('/sendNewMail', {
          email: this.newEmail
        });
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '发送成功！'
          });
        } else if (info.code === 409) {
          this.sessionJudge();
        } else {
          this.$message({
            type: 'error',
            message: info.message
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 提交验证码
    async SubmitCode () {
      try {
        const res = await this.$axios.post('/checkCode', {
          email: this.email,
          verifyCode: this.code
        });
        const info = res.data;
        if (info.code === 200) {
          this.isOk = true;
          this.isCheck = false;
        } else if (info.code === 409) {
          this.sessionJudge();
        } else {
          this.$message({
            type: 'success',
            message: info.message
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 修改密码
    async SubmitNewPwd () {
      try {
        const res = await this.$axios.post('/updatePassword', {
          u_id: this.uId,
          password: this.newPwd
        });
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
          this.pwdShow = false;
        } else if (info.code === 409) {
          this.sessionJudge();
        } else {
          this.$message({
            type: 'error',
            message: info.message
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 修改邮箱
    async SubmitNewEmail () {
      try {
        const res = await this.$axios.post('/updateEmail', {
          u_id: this.uId,
          email: this.newEmail,
          verifyCode: this.newCode
        });
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          });
          this.emailShow = false;
        } else if (info.code === 409) {
          this.sessionJudge();
        } else {
          this.$message({
            type: 'error',
            message: info.message
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 显示修改
    ShowItem (what) {
      if (what === 'pwd') {
        this.pwdShow = true;
      } else {
        this.emailShow = true;
        console.log('email');
      }
    },

    // 取消修改
    Return (option) {
      if (option === 'pwd') {
        this.pwdShow = false;
      } else {
        this.emailShow = false;
      }
    },

    // 获取邮箱
    async GetInfo () {
      try {
        const res = await this.$axios.post('/getUserInfo', {
          u_id: this.uId
        });
        const info = res.data;
        // console.log(info);
        if (info.code === 200) {
          this.email = info.data.email;
        } else if (info.code === 409) {
          this.sessionJudge();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="less" scoped>
#securitySetting {
  margin-top: 5.5%;
  margin-left: 22%;
  display: flex;
  flex-direction: column;

  .tip {
    font-size: 130%;
    color: #BC3520;
  }
  .row {
    margin: 2%;
    font-size: 110%;
  }
  .active {
    font-size: 120%;
    color: #485782;
  }
  button {
    margin-left: 5%;
    outline: none;
    text-decoration: none;
    cursor: pointer;
    border: 0;
    padding: 5px 10px;
    border-radius: 3px;
  }
  button:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  }
  input {
    outline: none;
    text-decoration: none;
    text-indent: 5px;
    font-size: 100%;
    border: 0;
    border-bottom: 1px solid #CACCBD;
    transition: 0.3s;
    background-color: rgba(255, 255, 255, 0);
  }
  input[name="newPwd"] {
    color: #605E5D;
  }
  input:hover {
    font-size: 120%;
  }
  .link_row {
    display: flex;
    flex-direction: column;
    margin: 2%;

    label {
      margin: 1% 0;
      cursor: pointer;
    }
    .update_row {
      display: flex;
      flex-direction: column;
      width: 500px;
      margin-left: 2%;
      padding: 5%;
      border: 1px solid white;;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);

      input {
        margin: 0 0 5% 0;
        width: 50%;
      }
      button {
        background-color: #DDBB99;
        width: 100px;
        font-size: 100%;
        color: white;
      }
      span {
        margin-left: 10px;
        color: #BC3520;
      }
      .return {
        font-size: 90%;
        margin-left: 5%;
        cursor: pointer;
      }
      .submit {
        margin-left: 25%;
      }
    }
  }
  i {
    margin-right: 5px;
  }
}
</style>
