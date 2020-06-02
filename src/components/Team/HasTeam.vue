<template>
    <div id="hasTeam">
        <label class="name"><i class="el-icon-wind-power"></i>{{ this.teamName }}</label>
        <div class="row">
            <span class="head id"><i class="el-icon-s-custom"></i>用户ID</span>
            <span class="head">用户名</span>
            <span class="head">性别</span>
            <span class="head" name="email">邮箱</span>
        </div>
        <div
        v-for="item in teamMember"
        :key="item.u_id"
        class="row">
            <span class="id"><i class="el-icon-medal"></i>{{ item.u_id }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.sex }}</span>
            <span>{{ item.email }}</span>
        </div>
        <div class="submit">
            <button @click="QuitTeam"><i class="el-icon-error"></i>退队</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'hasTeam',

  data () {
    return {
      teamName: '嘻嘿哈',
      teamId: '',
      teamMember: []
    };
  },

  computed: {
    ...mapState(['uId'])
  },

  created () {
    this.GetTeamInfo();
  },

  methods: {
    // 获取队伍信息
    async GetTeamInfo () {
      try {
        const res = await this.$axios.post('/getTeamInfo', {
          u_id: this.uId
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          this.teamName = info.data.team_name;
          this.teamId = info.data.team_id;
          this.teamMember = info.data.member;
        } else if (info.code === 409) {
          this.sessionJudge();
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 退出队伍
    async QuitTeam () {
      try {
        const res = await this.$axios.post('/quitTeam', {
          u_id: this.uId,
          team_id: this.teamId
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '退队成功！'
          });
          this.$store.dispatch('set_teamId', null);
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
#hasTeam {
  .name {
    font-weight: bold;
    font-size: 140%;
    color: #1D3F62;
    background-color: rgb(221, 165, 45);
    padding: 5px 10px;
    border-radius: 5px;
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
