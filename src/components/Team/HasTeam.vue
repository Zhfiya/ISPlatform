<template>
    <div id="hasTeam">
        <label class="name"><i class="el-icon-wind-power"></i>{{ this.teamName }}</label>
        <div class="row">
            <label class="head"><i class="el-icon-s-custom"></i>用户ID</label>
            <label class="head">用户名</label>
            <label class="head">性别</label>
            <label class="head" name="email">邮箱</label>
        </div>
        <div class="row">
            <label><i class="el-icon-medal"></i>111111</label>
            <label>fine</label>
            <label>保密</label>
            <label>Paranoid_ZH@163.com</label>
        </div>
        <div class="row">
            <label><i class="el-icon-medal"></i>222222</label>
            <label>swhxdkxxxxxxxxxxjcldkl</label>
            <label>女</label>
        </div>
    </div>
</template>

<script>
export default {
  name: 'hasTeam',

  data () {
    return {
      teamName: '嘻嘿哈'
    };
  }
};
</script>

<style lang="less" scoped>
#hasTeam {

    .name {
        margin-left: 35%;
        font-size: 140%;
        color: #1D3F62;
    }
    i {
        margin-right: 10px;
    }
    .row {
        margin-top: 3%;
        margin-left: 12%;
        text-align: left;

        label {
            display: inline-block;
            width: 100px;
            margin-right: 10%;
        }
        label[name="email"] {
            margin-right: 0;
        }
        .head {
            font-weight: bold;
        }
    }
}
</style>
