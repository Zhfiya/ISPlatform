<template>
    <div id="noTeam">
        <label class="tip">
            您目前未加入任何战队,快来
            <span @click="Show('create')">创建</span>
            /<span @click="Show('join')">加入</span>吧
            <i class="el-icon-aim"></i>
        </label>
        <div class="center" v-if="option === 'create'">
            <label class="title">创建战队<i class="el-icon-s-flag"></i></label>
            <div class="info_box">
                <div class="row">
                    <label for="name">战队名字：</label>
                    <input type="text" id="name" v-model="name">
                </div>
                <div class="row">
                    <label for="name">战队人数：</label>
                    <el-select v-model="number" size="small" style="width:300px">
                        <el-option value="1">1</el-option>
                        <el-option value="2">2</el-option>
                        <el-option value="3">3</el-option>
                        <el-option value="4">4</el-option>
                    </el-select>
                </div>
            </div>
            <button @click="CreateTeam">立即创建</button>
        </div>
        <div class="center" v-if="option === 'join'">
            <label class="title">加入战队<i class="el-icon-s-flag"></i></label>
            <div class="info_box">
                <div class="row">
                    <label for="id">Team ID：</label>
                    <input type="text" id="id" v-model="id">
                </div>
            </div>
            <button @click="JoinTeam">立即加入</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'noTeam',

  data () {
    return {
      option: '',
      name: '',
      number: '',
      id: ''
    };
  },

  computed: {
    ...mapState(['uId'])
  },

  methods: {
    // 展示
    Show (option) {
      this.option = option;
    },

    // 创建
    async CreateTeam () {
      try {
        const res = await this.$axios.post(`${this.HOST}/createTeam`, {
          u_id: this.uId,
          team_name: this.name,
          member_num: this.number
        });
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '创建成功'
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
    },

    // 加入
    async JoinTeam () {
      try {
        const res = await this.$axios.post(`${this.HOST}/joinTeam`, {
          u_id: this.uId,
          team_id: this.id
        });
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '加入成功'
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
#noTeam {
    .tip {
        font-size: 130%;
        color: #BC3520;
        span {
            cursor: pointer;
            font-weight: bold;
        }
    }
    .center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 2%;
        width: 80%;

        .title {
            font-size: 120%;
            font-weight: bold;
            text-align: center;
        }
        .info_box {
            display: flex;
            flex-direction: column;

            .row {
                margin-top: 5.5%;
                text-align: center;

                label {
                    font-size: 110%;
                    display: inline-block;
                    width: 150px;
                }
                span {
                    color: #BE4944;
                }
            }
        }
    }
    input {
        outline: none;
        text-decoration: none;
        text-indent: 5px;
        font-size: 100%;
        border: 0;
        border-bottom: 1px solid #CACCBD;
        background-color: rgba(255,255,255,0);
        transition: 0.3s ease;
        width: 300px;
    }
    input:hover {
        font-size: 120%;
        width: 400px;
    }
    button {
        margin-top: 5%;
        margin-left: 45%;
        width: 100px;
        outline: none;
        text-decoration: none;
        cursor: pointer;
        border: 0;
        padding: 5px 10px;
        border-radius: 3px;
        background-color: #CB7070;
        color: white;
        font-size: 90%;
    }
    button:hover {
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    }
}
</style>
