<template>
  <div id="register">
    <div class="loading" v-show="showLoading">
      <loading />
    </div>
    <div v-show="!showLoading" class="register">
      <img :src="imgUrl" alt="">
      <div class="top">
        <label>找回密码</label>
      </div>
      <div class="center">
        <div class="center_row" v-if="ischeck">
          <input type="password" v-model="pwd" placeholder="密码...">
          <span v-if="this.pwdTip"><i class="el-icon-warning"></i>{{ pwdTip }}</span>
        </div>
        <div class="center_row" v-if="ischeck">
          <input type="password" v-model="pwdTwo" placeholder="再次输入密码...">
          <span v-if="this.pwdTwoTip"><i class="el-icon-warning"></i>{{ pwdTwoTip }}</span>
        </div>
        <div class="center_row" v-if="!ischeck">
          <input type="text" v-model="email" placeholder="邮箱...">
          <span v-if="this.emailTip"><i class="el-icon-warning"></i>{{ emailTip }}</span>
        </div>
        <div class="center_row" v-if="!ischeck">
          <input type="text" v-model="code" placeholder="邮箱验证码...">
          <button @click="Check">获取验证码</button>
        </div>
        <div class="center_row" v-if="!ischeck">
          <button class="submit" @click="SubmitCode">提交</button>
        </div>
        <div class="center_row" v-if="ischeck">
          <button class="submit" @click="updatePwd">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loading from '../components/loading';

export default {
  name: 'register',
  components: {
    loading
  },
  data () {
    return {
      name: '',
      pwd: '',
      pwdTwo: '',
      email: '',
      code: '',
      imgUrl: require('../assets/login_backgroud.jpg'),

      ischeck: false
    };
  },

  watch: {
    name (val) {
      this.CheckName(val);
    }
  },

  // 加载图片前展示loading
  mounted () {
    const bgImg = new Image();
    bgImg.src = this.imgUrl; // 获取背景图片的url
    bgImg.onerror = () => {
      console.log('img onerror');
    };
    bgImg.onload = () => { // 等背景图片加载成功后 去除loading
      this.showLoading = false;
    };
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
          this.ischeck = true;
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
    async updatePwd () {
      if (this.pwd === this.pwdTwo) {
        try {
          const res = await this.$axios.post('/updatePassword', {
            u_id: this.email,
            password: this.pwd
          });
          const info = res.data;
          if (info.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            window.location.href = '/';
          } else {
            this.$message({
              type: 'error',
              message: info.message
            });
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$message({
          type: 'error',
          message: '两次输入不一致'
        });
      }
    },

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

    // 获取验证码
    async GetCode () {
      if (this.Validate() && this.registerOk) {
        try {
          const res = await this.$axios.post('/sendNewMail', {
            email: this.email
          });
          const info = res.data;
          if (info.code === 200) {
            this.isOk = false;
            const timer = setInterval(() => {
              this.second = this.second - 1;
              if (this.second === 0) {
                clearInterval(timer);
                this.second = 60;
                this.isOk = true;
              }
            }, 1000);
          } else {
            this.$message({
              type: 'error',
              message: info.message
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
#register{
  .register{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    left: 0;
    top: 0;
    position: fixed;
  }
  .loading{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #aedff8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
  .top {
    text-align: left;
    margin: 150px  0 20px 100px;
    label {
      font-size: 200%;
      font-weight: lighter;
      font-family: STXingkai;
    }
  }
  .center {
    display: flex;
    flex-direction: column;

    .center_row {
      margin-left: 15%;
      margin-top: 20px;

      button {
        height: 30px;
        margin-left: 20px;
        width: 100px;
        padding: 5px 10px;
        border: 0px;
        border-radius: 5px;
        cursor: pointer;
        outline: none;
      }
      button:hover {
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
      }
      span {
        margin-left: 20px;
        color: #BC3520;
      }
    }
    input {
      width: 30%;
      height: 30px;
      margin-bottom: 10px;
      font-size: 15px;
      text-indent: 8px;
      border: 1px solid #758AB0;
      border-radius: 8px;
      outline: none;
    }
    input:focus {
      border: 1px solid #BC3520;
    }
    button.submit {
      width: 70px;
      margin-top: 10px;
      padding: 5px 10px;
      border: 0px;
      border-radius: 5px;
      cursor: pointer;
      outline: none;
    }
    button.submit:hover {
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    }
  }
}
</style>
