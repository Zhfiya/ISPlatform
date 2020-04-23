<template>
    <div id="hasTeam">
        <label class="name"><i class="el-icon-wind-power"></i>{{ this.teamName }}</label>
        <div class="row">
            <span class="head id"><i class="el-icon-s-custom"></i>用户ID</span>
            <span class="head">用户名</span>
            <span class="head">性别</span>
            <span class="head" name="email">邮箱</span>
        </div>
        <div class="row">
            <span class="id"><i class="el-icon-medal"></i>111111</span>
            <span>fine</span>
            <span>保密</span>
            <span>Paranoid_ZH@163.com</span>
        </div>
        <div class="row">
            <span><i class="el-icon-medal"></i>222222</span>
            <span>swhxdkxxxxxxxxxxjcldkl</span>
            <span>女</span>
        </div>
        <div class="submit">
            <button><i class="el-icon-error"></i>退队</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'hasTeam',

  data () {
    return {
      teamName: '嘻嘿哈'
    };
  },

  created () {
    this.GetTeamInfo();
  },

  methods: {
    // 获取队伍信息
    async GetTeamInfo () {
      try {
        const res = await this.$axios.post(`${this.HOST}/getTeamInfo`, {
          u_id: this.uId
        });
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '创建成功'
          });
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
};
</script>

<style lang="less" scoped>
#hasTeam {

    .name {
        font-weight: bold;
        font-size: 140%;
        color: #1D3F62;
    }
    i {
        margin-right: 10px;
    }
    .row {
        margin-top: 3%;
        display: flex;
        flex-direction: row;

        span {
            width: 150px;
            padding: 10px 30px;
            text-align: center;
        }
        .id {

        }
        .head {
            font-weight: bold;
        }
    }
    .submit {
        margin-top: 100px;
    }
    button {
      text-decoration: none;
      padding: 5px 10px;
      border: 0;
      background-color: #CB7070;
      color: #F8F9F9;
      border-radius: 2px;
      cursor: pointer;
      outline: none;
    }
    button:hover {
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    }
}
</style>
