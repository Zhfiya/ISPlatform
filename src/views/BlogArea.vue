<template>
    <div id="blogArea">
        <div class="left">
            <div class="tags">
                <label name="tag" @click="SelectType('all')" :class="{active:type==='all'}">
                    <i class="el-icon-magic-stick"></i>推荐
                </label>
                <label name="tag" @click="SelectType('漏洞专区')" :class="{active:type==='漏洞专区'}">
                    <i class="el-icon-monitor"></i>漏洞专区
                </label>
                <label name="tag" @click="SelectType('CTF记录')" :class="{active:type==='CTF记录'}">
                    <i class="el-icon-edit-outline"></i>CTF记录
                </label>
                <label name="tag" @click="SelectType('AWD总结')" :class="{active:type==='AWD总结'}">
                    <i class="el-icon-notebook-1"></i>AWD总结
                </label>
                <label name="tag" @click="SelectType('基础知识')" :class="{active:type==='基础知识'}">
                    <i class="el-icon-coordinate"></i>基础知识
                </label>
                <label name="tag" @click="SelectType('代码审计')" :class="{active:type==='代码审计'}">
                    <i class="el-icon-search"></i>代码审计
                </label>
                <label name="tag" @click="SelectType('水帖')" :class="{active:type==='水帖'}">
                    <i class="el-icon-mobile-phone"></i>水帖
                </label>
            </div>
            <div class="info">
                <span>若您对此平台有疑问，或想对此平台提出建议改进，发送邮件至Paranoid_ZH@163.com</span>
            </div>
        </div>
        <div class="blog">
            <div class="block">
                <el-carousel height="285px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3>更多热点，敬请期待</h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="select_row">
                <i class="el-icon-search"></i>
                <div class="input_box">
                    <el-input
                    placeholder="请输入内容"
                    v-model="select"
                    clearable
                    size="small">
                    </el-input>
                </div>
                <button class="search" @click="SelectBlog">搜索</button>
            </div>
            <BlogList :tag="type" :blogs="blogList" v-if="update"/>
        </div>
        <div class="links">
            <span class="lin">链接</span>
            <div class="link_box">
                <a href="http://148.70.34.179/build/" target="_blank">ring_ring's blog</a>
                <a href="https://www.freebuf.com/" target="_blank">freebuf</a>
                <a href="https://xz.aliyun.com/" target="_blank">先知社区</a>
                <a href="http://ctf.john30n.com/ " target="_blank">John30n的ctf平台</a>
                <a href="http://39.108.78.246/" target="_blank">John30n的博客</a>
                <a href="http://blog.knownsec.com/Knownsec_RD_Checklist/ " target="_blank">知道创宇研发技能表</a>
                <a href="http://www.ichunqiu.com/" target="_blank">i春秋平台</a>
                <a href="https://wooyun.laolisafe.com/ " target="_blank">乌云镜像</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BlogList from '../components/Blog/BlogList';

export default {
  name: 'blogArea',
  components: {
    BlogList
  },

  computed: {
    ...mapState(['uId'])
  },

  data () {
    return {
      type: 'all',
      update: true,
      select: '',
      blogList: []
    };
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
    },

    // 搜索博客
    async SelectBlog () {
      try {
        const res = await this.$axios.post('/findBlogName', {
          u_id: this.uId,
          name: this.select
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          this.blogList = info.data;
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
#blogArea {
    margin-top: 80px;
    display: flex;
    flex-direction: row;

    .left {
        position: fixed;
        margin-left: 150px;
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    .info {
        width: 170px;
        padding: 5px;
        background-color: #F1F1F1;
        margin-top: 70px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        span {
            letter-spacing: 5px;
            word-break: break-word;
            text-align: left;
            padding: 10px;
        }
    }
    .tags {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 180px;
        background-color: #F1F1F1;
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
        margin-left: 340px;
        width: 870px;

        .block {
            margin-bottom: 10px;
        }
        .el-carousel__item h3 {
            color:black;
            text-align: center;
            font-size: 20px;
            opacity: 0.75;
            line-height: 150px;
            margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
            background:url('../assets/special.jpg');
        }

        .el-carousel__item:nth-child(2n+1) {
            background:url('../assets/alchemy.gif');
        }
        .select_row {
            width: 100%;
            margin-bottom: 30px;
            font-size: 22px;
            line-height: 24px;
            text-align: right;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            color: #CB7070;
            i {
                margin-right: 5px;
                margin: 3px;
            }
        }
        button {
            text-decoration: none;
            padding: 5px 20px;
            border: 0;
            background-color: #CB7070;
            color: #F8F9F9;
            border-radius: 2px;
            cursor: pointer;
            outline: none;
            margin-left: 10px;
        }
        button:hover {
            box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
        }
    }
    .links {
        margin-top: 5px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        .link_box {
            padding: 10px;
            width: 200px;
            height: 220px;
            margin-top: 10px;
            background-color: #F1F1F1;
            display: flex;
            flex-direction: column;
            line-height: 25px;
        }
        span.lin {
            background-color:coral;
            width: 35px;
            padding: 5px;
            border-radius: 2px;
        }
        a {
            font-size: 14px;
            letter-spacing: 5px;
        }
    }
    .active {
        background-color: #BC3520;
        color: white;
    }
}
</style>
