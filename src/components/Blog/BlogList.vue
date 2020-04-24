<template>
    <div id="blogList" v-if="update">
      <div
      v-for="item in blogList"
      :key="item.blog_id"
      class="blog">
        <div class="blog_row" @click="ToDetail(item)">
          <label class="tag">{{ item.tag }}</label>
          <label class="name">{{ item.name }}</label>
        </div>
        <div class="row">
          <div>
            <span><i class="el-icon-upload"></i>{{ item.upload_time }}</span>
            <span>|</span>
            <span><i class="el-icon-star-on"></i>获赞量：{{ item.like_num }}</span>
          </div>
          <div v-if="typeOfTime">
            <span class="update">修改</span>
            <span>|</span>
            <span class="update" @click="confirm">删除</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'blogList',

  props: {
    type: {
      required: false
    },
    order: {
      required: false
    },
    tag: {
      required: false
    },
    typeOfTime: {
      required: false
    }
  },

  computed: {
    ...mapState(['uId'])
  },

  data () {
    return {
      time: '2020-02-02 02:02:02',
      like: 0,
      blogList: [],
      countList: [],

      update: true
    };
  },

  created () {
    // 个人博客
    if (this.type && this.order) {
      this.OrderBlog();
    }
    // 博客区
    if (this.tag) {
      this.OrderBlogArea();
    }
  },

  methods: {
    // 查看博客
    ToDetail (blog) {
      const blogId = blog.blog_id;
      this.$store.dispatch('set_blog', blog);
      const { href } = this.$router.resolve({
        path: '/blogDetail',
        query: { blogId: blogId }
      });
      window.open(href, '_blank');
    },

    // 删除博客
    confirm () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.DeteleBlog();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async DeteleBlog () {
      try {
        const res = await this.$axios.post(`${this.HOST}/deleteBlog`, {
          blog_id: this.blogId
        });
        const info = res.data;
        console.log(info);
        this.update = false;
        // 在组件移除后，重新渲染组件
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
        this.$nextTick(() => {
          this.update = true;
          this.OrderBlog();
        });
      } catch (err) {
        console.log(err);
      }
    },

    // 个人博客排序
    async OrderBlog () {
      try {
        if (this.order === 'time') {
          const res = await this.$axios.post(`${this.HOST}/sortBlogByTime`, {
            u_id: this.uId,
            tag: this.type,
            typeOfTime: this.typeOfTime
          });
          const info = res.data;
          // console.log(info.data);
          if (info.code === 200) {
            this.blogList = info.data;
            this.Count();
            this.$emit('count', this.countList);
          }
        } else {
          const res = await this.$axios.post(`${this.HOST}/sortBlogByLike`, {
            u_id: this.uId,
            tag: this.type
          });
          const info = res.data;
          if (info.code === 200) {
            this.blogList = info.data;
            this.Count();
            this.$emit('count', this.countList);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 博客区排序
    async OrderBlogArea () {
      try {
        const res = await this.$axios.post(`${this.HOST}/getAllBlog`, {
          u_id: this.uId,
          tag: this.tag
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          this.blogList = info.data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 计算博客数量及或赞数
    Count () {
      if (this.countList) {
        let likeNum = 0;
        this.countList.push({ blogNum: this.blogList.length });
        this.blogList.forEach((item) => {
          likeNum = likeNum + item.like_num;
        });
        this.countList = { likeNum: likeNum, blogNum: this.countList.length };
      } else {
        this.countList = { likeNum: 0, blogNum: 0 };
      }
    }
  }
};
</script>

<style lang="less" scoped>
#blogList {
  border: 1px solid white;
  border-width: 1px 0 0 0;
  display: flex;
  flex-direction: column;

  .blog {
    background-color: #F7F7F7;
    margin-bottom: 10px;
    height: 80px;
    padding: 5px 15px;
    display: flex;
    flex-direction: column;

    .blog_row {
      margin: 15px 0 0 10px;
      cursor: pointer;
      .tag {
        color: #F58813;
        background-color: #FCDF96;
        font-family: STFangsong;
        border-radius: 2px;
        padding: 2px;
        margin-right: 5px;
      }
    }
    label.name {
      font-size: 110%;
      font-weight: bold;
      cursor: pointer;
    }
    span {
      font-size: 90%;
      color: darkgray;
      font-weight: lighter;
      margin-left: 5px;
    }
    .row {
      margin: 10px 0 0 10px;
      display: flex;
      justify-content: space-between;
      .update {
        color: #BC3520;
        padding: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
