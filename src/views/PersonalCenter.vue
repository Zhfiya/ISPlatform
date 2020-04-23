<template>
  <div id="personalCenter">
    <div class="menu">
      <label><i class="el-icon-s-home"></i>个人中心</label>
      <div class="navigation">
          <ul>
            <li
            :class="{active:choose === '基本资料'}"
            @click="ChooseFunc('基本资料')">
              <i class="icon el-icon-user-solid"></i>基本资料
            </li>
            <li
            :class="{active:choose === '安全设置'}"
            @click="ChooseFunc('安全设置')">
              <i class="el-icon-s-tools"></i>安全设置
            </li>
            <li
            :class="{active:choose === '战队信息'}"
            @click="ChooseFunc('战队信息')">
              <i class="el-icon-s-help"></i>战队信息
            </li>
            <li
            :class="{active:choose === '近期比赛'}"
            @click="ChooseFunc('近期比赛')">
              <i class="el-icon-s-flag"></i>近期比赛
            </li>
            <li
            :class="{active:choose === '个人博客'}"
            @click="ChooseFunc('个人博客')">
              <i class="el-icon-s-promotion"></i>个人博客
            </li>
            <li
            :class="{active:choose === '写博客'}"
            @click="ChooseFunc('写博客')">
              <i class="el-icon-edit-outline"></i>写博客
            </li>
          </ul>
        </div>
    </div>
    <div class="moudle">
      <BasicInformation v-if="choose === '基本资料'" />
      <SecuritySetting v-if="choose === '安全设置'" />
      <TeamInformation v-if="choose === '战队信息'" />
      <RecentMatch v-if="choose === '近期比赛'" />
      <PersonalBlog v-if="choose === '个人博客'" />
      <BuildBlog v-if="choose === '写博客'" />
    </div>
  </div>
</template>

<script>
import BasicInformation from '../components/PersonalCenter/BasicInformation';
import SecuritySetting from '../components/PersonalCenter/SecuritySetting';
import TeamInformation from '../components/PersonalCenter/TeamInformation';
import RecentMatch from '../components/PersonalCenter/RecentMatch';
import PersonalBlog from '../components/PersonalCenter/PersonalBlog';
import BuildBlog from '../components/Blog/BuildBlog';

export default {
  name: 'personalCenter',
  components: {
    BasicInformation, // 基本资料
    SecuritySetting, // 安全设置
    TeamInformation, // 战队信息
    RecentMatch, // 近期比赛
    PersonalBlog, // 个人博客
    BuildBlog // 写博客
  },

  data () {
    return {
      choose: '基本资料'
    };
  },

  methods: {
    // 侧边导航栏选择
    ChooseFunc (option) {
      this.choose = option;
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; background:#F9F9F9; overflow-x: hidden;height: 100%;');
  }
};
</script>

<style lang="less">
#personalCenter{
  display: flex;
  flex-direction: row;
  text-align: left;

  .menu {
    left: 0;
    padding-top: 60px;
    position: fixed;
    width: 15%;
    height: 100%;
    background-color: #E8EAED;
    display: flex;
    flex-direction: column;

    label {
      font-size: 150%;
      text-align: center;
      font-weight: bold;
      border: 1px solid white;
      padding: 10%;
      border-width: 0 0 1px 0;
    }
    .navigation {
      width: 100%;

      ul {
        padding: 0;
        margin: 0;
        list-style-type: none;

        li {
          text-align: left;
          text-decoration: none;
          font-size: 110%;
          border: 1px solid white;
          border-width: 0 0 1px 0;
          padding: 7% 15%;
          cursor: pointer;
        }
        .active {
          background-color: white;
        }
        a {
          width: 100%;
        }
      }
    }
  }
  .moudle {
    padding-top: 60px;
    width: 100%;
  }
  i {
    margin-right: 10px;
  }
}
</style>
