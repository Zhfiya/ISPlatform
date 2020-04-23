<template>
    <div id="teamInformation">
        <NoTeam v-if="!isTeam"/>
        <HasTeam v-else/>
    </div>
</template>

<script>
import NoTeam from '../Team/NoTeam';
import HasTeam from '../Team/HasTeam';

export default {
  name: 'teamInformation',
  components: {
    NoTeam, // 没有战队
    HasTeam // 有战队
  },

  data () {
    return {
      isTeam: false
    };
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
