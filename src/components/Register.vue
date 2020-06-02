<template>
  <div id="register">
    <div class="loading" v-show="showLoading">
      <loading />
    </div>
    <div v-show="!showLoading" class="register">
      <img :src="imgUrl" alt="">
      <div class="top">
        <label>注册·一起学习</label>
      </div>
      <div class="center">
        <div class="center_row">
          <input type="text" v-model="name" placeholder="用户名...">
          <span v-if="this.nameTip" :class="{green:this.nameOk}"><i class="el-icon-warning"></i>{{ nameTip }}</span>
        </div>
        <div class="center_row">
          <input type="password" v-model="pwd" placeholder="密码...">
          <span v-if="this.pwdTip"><i class="el-icon-warning"></i>{{ pwdTip }}</span>
        </div>
        <div class="center_row">
          <input type="password" v-model="pwdTwo" placeholder="再次输入密码...">
          <span v-if="this.pwdTwoTip"><i class="el-icon-warning"></i>{{ pwdTwoTip }}</span>
        </div>
        <div class="center_row">
          <input type="text" v-model="email" placeholder="邮箱...">
          <span v-if="this.emailTip"><i class="el-icon-warning"></i>{{ emailTip }}</span>
        </div>
        <div class="center_row">
          <input type="text" v-model="code" placeholder="邮箱验证码...">
          <button @click="GetCode" v-if="isOk">获取验证码</button>
          <button v-else>{{ second }}s</button>
        </div>
        <div class="center_row">
          <button class="submit" @click="Submit">注册</button>
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

      isOk: true,
      registerOk: false,
      nameOk: false,
      nameTip: '',
      pwdTip: '',
      pwdTwoTip: '',
      emailTip: '',
      second: 60,
      showLoading: true
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
    // 检验name是否重复
    async CheckName (name) {
      if (name) {
        try {
          const res = await this.$axios.post('/checkName', {
            name: name
          });
          const info = res.data;
          if (info.code !== 200) {
            this.nameTip = '该用户名已存在！';
            this.registerOk = false;
            this.nameOk = false;
          } else {
            this.nameTip = '该用户名可以使用';
            this.nameOk = true;
            this.registerOk = true;
          }
          console.log(res);
        } catch (err) {
          console.log(err);
        }
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
    },

    // 注册
    async Submit () {
      if (this.Validate && this.code !== null) {
        try {
          const res = await this.$axios.post('/register', {
            name: this.name,
            password: this.pwd,
            email: this.email,
            verifyCode: this.code
          });
          const info = res.data;
          if (info.code === 200) {
            this.$message({
              type: 'success',
              $message: '注册成功'
            });
            window.location.href = '/login';
          }
        } catch (err) {
          console.log(err);
        }
      }
    },

    // 表单验证
    Validate () {
      let registerOk = false;
      if (!this.name) {
        this.nameTip = '用户名不能为空';
        this.nameOk = false;
        registerOk = false;
      }
      if (this.pwd.length < 7) {
        this.pwdTip = '密码长度不得少于8位';
        registerOk = false;
      } else {
        this.pwdTip = '';
      }
      if (this.pwd !== this.pwdTwo) {
        this.pwdTwoTip = '两次密码输入不一致';
        registerOk = false;
      } else {
        this.pwdTwoTip = '';
      }
      if (this.email.indexOf('@') === -1) {
        this.emailTip = '邮箱格式不正确！';
        registerOk = false;
      } else {
        this.emailTip = '';
      }
      registerOk = true;
      return registerOk;
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
      color: #BC3520;

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
    .green {
      color: green;
    }
  }
}
</style>
