<template>
    <div id="updateBlog" v-if="blog">
        <BuildBlog :blogInfo="blog"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BuildBlog from '../Blog/BuildBlog';
export default {
  name: 'updateBlog',
  components: {
    BuildBlog
  },

  data () {
    return {
      blogId: '',
      blog: ''
    };
  },

  computed: {
    ...mapState(['uId'])
  },

  created () {
    this.blogId = this.$route.query.blogId;
    this.GetBlog();
  },

  methods: {
    async GetBlog () {
      try {
        const res = await this.$axios.post('/getBlogDetail', {
          u_id: this.uId,
          blog_id: this.blogId
        });
        const info = res.data;
        if (info.code === 200) {
          this.blog = info.data;
        } else {
          this.$message({
            type: 'error',
            message: info.message
          });
        }
        console.log(info);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="less" scoped>
#updateBlog{
    margin-left: -10%;
}
</style>
