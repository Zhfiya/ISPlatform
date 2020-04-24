<template>
    <div id="teamInformation" v-if="update">
        <NoTeam v-if="!isTeam"/>
        <HasTeam v-else/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import NoTeam from '../Team/NoTeam';
import HasTeam from '../Team/HasTeam';

export default {
  name: 'teamInformation',
  components: {
    NoTeam, // 没有战队
    HasTeam // 有战队
  },

  computed: {
    ...mapState(['teamId'])
  },

  watch: {
    teamId (val) {
      this.update = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        if (val) {
          this.isTeam = true;
        } else {
          this.isTeam = false;
        }
        this.update = true;
      });
    }
  },

  data () {
    return {
      isTeam: false,
      update: true
    };
  },

  created () {
    if (this.teamId) {
      this.isTeam = true;
    }
  }
};
</script>

<style lang="less" scoped>
#teamInformation {
    margin-top: 5.5%;
    margin-left: 22%;
    display: flex;
    flex-direction: column;

}
</style>
