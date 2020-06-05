<template>
    <div id="recentMatch">
      <label class="title">系统正在进行比赛：</label>
      <div class="match ing" v-if="matchIng">
        <label>{{ this.matchIng.match_name }}</label>
        <div class="info">
          <label>{{ this.matchIng.end_time }}</label>
          <label v-if="!this.matchIng._full">邀请码：{{ this.matchIng.visit_code }}</label>
        </div>
      </div>
      <div v-else>
        <label class="no"><i class="el-icon-warning-outline"></i>无正在进行的比赛</label>
      </div>
      <el-divider class="divider"></el-divider>
      <label class="title">往期赛事：</label>
      <div v-if="matchDone.length > 0">
        <div
        v-for="item in matchDone"
        :key="item.match_name"
        class="match done">
          <label>{{ item.match_name }}</label>
          <div class="info">
            <label>得分：{{ item.score }}</label>
            <label>解题数：{{ item.solve_num }}</label>
          </div>
        </div>
      </div>
      <div v-else>
        <label class="no"><i class="el-icon-warning-outline"></i>无往期比赛</label>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'recentMatch',
  computed: {
    ...mapState(['uId'])
  },

  data () {
    return {
      matchIng: '',
      matchDone: [],
      isShow: false
    };
  },

  created () {
    this.GetMatchIng();
    this.GetMatchDone();
  },

  methods: {
    // 获取正在进行的比赛
    async GetMatchIng () {
      try {
        const res = await this.$axios.post('/getRecentMatch', {});
        const info = res.data;
        if (info.code === 200) {
          this.matchIng = info.data;
          this.isShow = true;
        } else if (info.code === 409) {
          this.sessionJudge();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取往期比赛
    async GetMatchDone () {
      try {
        const res = await this.$axios.post('/getUserMatchInfo', {
          u_id: this.uId
        });
        const info = res.data;
        if (info.code === 200) {
          this.matchDone = info.data;
          this.isShow = true;
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
#recentMatch {
  margin-top: 7%;
  margin-left: 22%;
  display: flex;
  flex-direction: column;
  .title{
  font-weight: bold;
  font-size: 23px;
  }
  .no {
    font-weight: bold;
    font-size: 25px;
    margin-left: 50px;
    margin-top: 10px;
    color: #C60707;
  }
  .match{
    width: 50%;
    border-radius: 10px;
    margin-left: 25px;
    margin-top: 25px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    .info{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .ing {
    background-color: rgb(249, 191, 69);
  }
  .divider {
    width: 90%;
    margin: 50px 0;
  }
  .done{
    background-color: #B8CBCF;
  }
}
</style>
