<template>
  <div id="login">
    <div class="loading" v-show="showLoading">
      <loading />
    </div>
    <div class="login_box" v-show="!showLoading">
      <img :src="imgUrl" alt="">
      <div class="note" :style ="note"></div>
      <div class="login">
        <div class="top">
          <label>欢迎登录·信安学习平台</label>
        </div>
        <div class="center">
          <div class="center_row">
            <input type="text" v-model="name" placeholder="用户名...">
          </div>
          <div class="center_row">
            <input type="password" v-model="pwd" placeholder="密码...">
          </div>
          <div class="center_row">
            <button @click="SubmitLogin">登录</button>
          </div>
          <div class="row">
            <label @click="SetPwd">忘记密码？</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loading from '../components/loading.vue';
import { mapState } from 'vuex';

export default {
  name: 'login',
  components: {
    loading
  },
  data () {
    return {
      name: '',
      pwd: '',
      tipMessage: '',
      imgUrl: require('../assets/login_backgroud.jpg'),
      note: {
        backgroundImage: 'url(' + require('../assets/login_backgroud.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '25px auto',
        marginTop: '5px'
      },

      showLoading: true
    };
  },
  computed: {
    ...mapState(['uId'])
  },

  created () {
    window.addEventListener('keydown', this.handleKeyDown, true);
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
    SetPwd () {
      window.location.href = '/setPwd';
    },
    // 检验字段完整性
    isValidate () {
      if (this.name === '') {
        this.tipMessage = '用户名';
        return false;
      } else if (this.pwd === '') {
        this.tipMessage = '密码';
        return false;
      }
      return true;
    },

    // 提交登录
    async SubmitLogin () {
      if (this.isValidate) {
        try {
          const res = await this.$axios.post('/login', {
            name: this.name,
            password: this.pwd
          });
          const info = res.data;
          console.log(info);
          if (info.code === 200) {
            this.$store.dispatch('set_Login', true); // 登陆成功，store里的isLogin设置位true
            this.$store.dispatch('set_uid', info.data);
            console.log(this.uId);
            window.location.href = '/blogArea';
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
        this.$message();
      }
    },

    // 回车提交
    handleKeyDown (e) {
      let key = null;
      if (window.event === undefined) {
        key = e.keyCode;
      } else {
        key = window.event.keyCode;
      }
      if (key === 13) {
        this.SubmitLogin();
      }
    }
  }
};
</script>

<style lang="less" scoped>
#login{
  .login_box{
    width: 100%;
    height: 100%;
    background-size: cover;
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
  .login {
    margin-top: 15%;
    display: flex;
    flex-direction: column;

    .top {
      text-align: center;
      margin-bottom: 40px;
      label {
        font-size: 300%;
        font-family: STXingkai;
      }
    }
    .center {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin-left: 30%;
      width: 40%;

      .center_row {
        justify-content: center;
      }
      .row {
        margin-top: 10px;
        label {
          font-size: 12px;
          margin-left: 6px;
          cursor: pointer;
        }
      }
      input {
        width: 50%;
        height: 30px;
        margin-bottom: 20px;
        font-size: 15px;
        text-indent: 8px;
        border: 1px solid #758AB0;
        border-radius: 8px 8px 0 0;
        outline: none;
      }
      input:focus {
        border: 1px solid #BC3520;
      }
      button {
        width: 70px;
        margin-top: 10px;
        padding: 5px 10px;
        border: 0px;
        border-radius: 5px;
        cursor: pointer;
        outline: none;
      }
      button:hover {
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
      }
    }
  }
}
</style>
