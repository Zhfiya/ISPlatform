<template>
    <div id="blogArea">
        <div class="tags">
            <label name="tag" @click="SelectType('all')" :class="{active:type==='all'}">
                <i class="el-icon-magic-stick"></i>推荐
            </label>
            <label name="tag" @click="SelectType('loophole')" :class="{active:type==='loophole'}">
                <i class="el-icon-monitor"></i>漏洞专区
            </label>
            <label name="tag" @click="SelectType('ctf')" :class="{active:type==='ctf'}">
                <i class="el-icon-edit-outline"></i>CTF记录
            </label>
            <label name="tag" @click="SelectType('awd')" :class="{active:type==='awd'}">
                <i class="el-icon-notebook-1"></i>AWD总结
            </label>
            <label name="tag" @click="SelectType('basic')" :class="{active:type==='basic'}">
                <i class="el-icon-coordinate"></i>基础知识
            </label>
            <label name="tag" @click="SelectType('audit')" :class="{active:type==='audit'}">
                <i class="el-icon-search"></i>代码审计
            </label>
            <label name="tag" @click="SelectType('nothing')" :class="{active:type==='nothing'}">
                <i class="el-icon-mobile-phone"></i>水帖
            </label>
        </div>
        <div class="blog">
            <div class="block">
                <el-carousel height="150px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3>{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <BlogList :tag="type" v-if="update"/>
        </div>
    </div>
</template>

<script>
import BlogList from '../components/Blog/BlogList';

export default {
  name: 'blogArea',
  components: {
    BlogList
  },

  data () {
    return {
      type: 'all',
      update: true
    };
  },

  created () {
    console.log('a');
  },

  methods: {
    // 选择查看博客类型
    SelectType (type) {
      this.type = type;
      this.update = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true;
      });
    }
  }
};
</script>

<style lang="less" scoped>
#blogArea {
    margin-top: 80px;
    display: flex;
    flex-direction: row;

    .tags {
        width: 120px;
        margin-left: 200px;
        display: flex;
        flex-direction: column;
        label {
            border-radius: 2px;
            padding: 10px;
            padding-left: 15px;
            cursor: pointer;
        }
        i {
            margin-right: 5px;
        }
    }
    .blog {
        margin-left: 20px;
        width: 60%;

        .block {
            margin-bottom: 20px;
        }
        .el-carousel__item h3 {
            color: white;
            text-align: center;
            font-size: 14px;
            opacity: 0.75;
            line-height: 150px;
            margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }
    }
    .active {
        background-color: #BC3520;
        color: white;
    }
}
</style>
