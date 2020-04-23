<template>
    <div id="teamInformation">
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

  data () {
    return {
      isTeam: true
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
