<template>
    <div id="personalBlog">
        <div class="center">
            <div class="order">
                <label name="order">排序：</label>
                <label name="time" :class="{active:order === 'time'}" @click="OrderSelect('time')">
                    时间
                    <i class="el-icon-caret-bottom" v-if="this.timeOrder === 'new'"></i>
                    <i class="el-icon-caret-top" v-else></i>
                </label>
                <label name="like" :class="{active:order === 'like'}" @click="OrderSelect('like')">
                    获赞量
                </label>
                <label class="all" @click="SelectType('all')" v-if="type !== 'all'">
                    显示全部博客
                </label>
            </div>
            <BlogList :type="type" :order="order" :typeOfTime="timeOrder" v-if="isBlog" @count="CountList"/>
        </div>
        <div class="right">
            <div class="row">
                <label name="blog"><i class="el-icon-notebook-2"></i>博客：{{ this.blogNum }}</label>
                <label><i class="el-icon-star-on"></i>获赞：{{ this.likeNum}}</label>
            </div>
            <div class="row">
                <label><i class="el-icon-collection-tag"></i>分类：</label>
            </div>
            <div class="row tag_row">
                <label name="tag" @click="SelectType('漏洞专区')" :class="{active:type==='漏洞专区'}">
                    <i class="el-icon-paperclip"></i>漏洞专区
                </label>
                <label name="tag" @click="SelectType('CTF记录')" :class="{active:type==='CTF记录'}">
                    <i class="el-icon-paperclip"></i>CTF记录
                </label>
                <label name="tag" @click="SelectType('AWD总结')" :class="{active:type==='AWD总结'}">
                    <i class="el-icon-paperclip"></i>AWD总结
                </label>
                <label name="tag" @click="SelectType('基础知识')" :class="{active:type==='基础知识'}">
                    <i class="el-icon-paperclip"></i>基础知识
                </label>
                <label name="tag" @click="SelectType('代码审计')" :class="{active:type==='代码审计'}">
                    <i class="el-icon-paperclip"></i>代码审计
                </label>
                <label name="tag" @click="SelectType('水帖')" :class="{active:type==='水帖'}">
                    <i class="el-icon-paperclip"></i>水帖
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import BlogList from '../Blog/BlogList';

export default {
  name: 'personalBlog',
  components: {
    BlogList // 博客列表
  },

  data () {
    return {
      blogNum: '300',
      likeNum: '1000w+',
      type: 'all',
      order: 'time',

      isBlog: true,
      timeOrder: 'new'
    };
  },

  methods: {
    // 选择博客排序依据
    OrderSelect (option) {
      this.order = option;
      if (option === 'time') {
        if (this.timeOrder === 'new') {
          this.timeOrder = 'old';
        } else {
          this.timeOrder = 'new';
        }
      }
      this.isBlog = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.isBlog = true;
      });
    },

    // 选择查看博客类型
    SelectType (type) {
      this.type = type;
      this.isBlog = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.isBlog = true;
      });
    },

    // 显示博客和点赞量
    CountList (data) {
      console.log(data);
      this.blogNum = data.blogNum;
      this.likeNum = data.likeNum;
    }
  }
};
</script>

<style lang="less" scoped>
#personalBlog {
    margin-top: 5%;
    margin-left: 20%;
    display: flex;
    flex-direction: row;

    .center {
        display: flex;
        flex-direction: column;
        width: 70%;

        .order {
            height: 40px;
            background-color: #E9E9EA;
            line-height: 40px;

            label {
                margin-left: 2%;
                font-size: 90%;
                margin-right: 3%;
                cursor: pointer;
            }
            label[name="order"] {
                margin-right: 4%;
                cursor: default;
            }
            label[name="time"]:hover,
            label[name="like"]:hover {
                color: #BC3520;
            }
            .all {
                float: right;
            }
        }
    }
    .right {
        width: 300px;
        margin-left: 55%;
        position: fixed;
        padding: 10px 20px;
        background-color: #F7F7F7;
        box-shadow: 3px 3px 3px #D9D9D9;

        .row {
            margin: 20px 0;
        }
        label {
            margin: 5px;
        }
        label[name="blog"] {
            margin-right: 30px;
        }
        label[name="tag"] {
            width: 100px;
            margin-left: 20px;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 2px;
        }
        label[name="tag"]:hover {
            color: #BC3520;
        }
        .tag_row {
            display: flex;
            flex-direction: column;
            i {
                margin-right: 5px;
            }
        }
    }
    .active {
        color: #BC3520;
    }
}
</style>
