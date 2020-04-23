<template>
    <div id="buildBlog">
        <div class="write">
            <label for="title">撰写新文章</label>
            <input type="text" id="title" v-model="title" placeholder="标题...">
            <div class="edit">
                <mavon-editor
                v-model="content"
                ref="md"
                @change="change"
                style="min-height: 600px"
                />
            </div>
            <button @click="SubmitBlog" class="submit"><i class="el-icon-finished"></i>提交</button>
        </div>
        <div class="tag_list">
            <div class="row">
                <label><i class="el-icon-collection-tag"></i>分类：</label>
                <label>{{ this.tag }}</label>
            </div>
            <span @click="SelectTag('漏洞专区')">
                <i class="el-icon-d-arrow-right"></i>
                漏洞专区
            </span>
            <span @click="SelectTag('CTF记录')">
                <i class="el-icon-d-arrow-right"></i>
                CTF记录
            </span>
            <span @click="SelectTag('AWD总结')">
                <i class="el-icon-d-arrow-right"></i>
                AWD总结
            </span>
            <span @click="SelectTag('基础知识')">
                <i class="el-icon-d-arrow-right"></i>
                基础知识
            </span>
            <span @click="SelectTag('代码审计')">
                <i class="el-icon-d-arrow-right"></i>
                代码审计
            </span>
            <span @click="SelectTag('水帖')">
                <i class="el-icon-d-arrow-right"></i>
                水帖
            </span>
            <label class="tip"><i class="el-icon-warning-outline"></i>分类必选</label>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
export default {
  name: 'buildBlog',
  components: {
    mavonEditor
  },

  computed: {
    ...mapState(['uId'])
  },

  data () {
    return {
      tag: '',
      title: '',
      content: '',
      html: '',
      blogId: 0
    };
  },

  methods: {
    // 选择tag
    SelectTag (tag) {
      this.tag = tag;
    },

    change (value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },

    // 表单验证
    VailDate () {
      let res = true;
      if (this.title === '') {
        this.$message({
          type: 'warning',
          message: '未填写标题！'
        });
        res = false;
      } else if (this.tag === '') {
        this.$message({
          type: 'warning',
          message: '未选择分类！'
        });
        res = false;
      } else if (this.content === '') {
        this.$message({
          type: 'warning',
          message: '未撰写博客！'
        });
        res = false;
      }
      return res;
    },

    // 提交博客
    SubmitBlog () {
      try {
        if (this.blogId === 0) {
          this.NewBlog();
        } else {
          this.UpdateBlog();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 提交博客
    async NewBlog () {
      if (this.VailDate()) {
        try {
          const res = await this.$axios.post(`${this.HOST}/addBlog`, {
            u_id: this.uId,
            name: this.title,
            text: this.html,
            tag: this.tag
          });
          const info = res.data;
          console.log(info);
          if (info.code === 200) {
            this.blogId = info.data;
            this.$message({
              type: 'success',
              message: '提交成功'
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
    },
    // 修改博客
    async UpdateBlog () {
      try {
        const res = await this.$axios.post(`${this.HOST}/updateBlog`, {
          blog_id: this.blogId,
          name: this.title,
          text: this.html,
          tag: this.tag
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
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
#buildBlog {
  margin-top: 5%;
  margin-left: 22%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .write {
    width: 100%;
    margin-right: 20px;
    display: flex;
    flex-direction: column;

    label {
      cursor: pointer;
      font-size: 120%;
      font-weight: bold;
      margin-bottom: 20px;
    }
    input {
      width: 100%;
      outline: none;
      text-indent: 8px;
      height: 25px;
      font-size: 110%;
      text-decoration: none;
    }
    .edit {
      margin: 30px 0;
      z-index: 300;
    }
    .submit {
      width: 80px;
      cursor: pointer;
      border: 0;
      outline: none;
      text-decoration: none;
      margin-bottom: 30px;
      padding: 5px 10px;
      border-radius: 3px;
      background-color: #CB7070;
      color: white;
    }
  }
  .tag_list {
    width: 250px;
    height: 300px;
    margin-right: 50px;
    padding: 20px;
    background-color: #F7F7F7;
    box-shadow: 3px 3px 3px #D9D9D9;
    display: flex;
    flex-direction: column;

    .row {
      margin-bottom: 5%;
    }
    label {
      color: #BC3520;
    }
    span {
      font-size: 90%;
      margin: 5% 10%;
      cursor: pointer;
    }
    .tip {
      color: #CB6262;
      margin-top: 10px;
      margin-left: 70px;
      font-size: 80%;
    }
    span:hover {
      color: #BC3520;
    }
  }
}
</style>
