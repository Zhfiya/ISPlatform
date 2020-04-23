<template>
    <div id="basicInformation">
        <div class="row">
            <label class="op">用户ID：</label>
            <label>{{ this.id }}</label>
        </div>
        <div class="row">
            <label for="name" class="op">用户名：</label>
            <label v-if="!isEdit">{{ this.name }}</label>
            <input type="text" v-model="newName" id="name" class="edit" v-else>
            <span class="tip" v-if="this.nameTip"><i class="el-icon-warning"></i>{{ this.nameTip }}</span>
        </div>
        <div class="row">
            <label for="sex" class="op">性别：</label>
            <label v-if="!isEdit">{{ this.sex }}</label>
            <div class="edit" v-else>
                <el-select v-model="newSex" size="small">
                    <el-option value="female">female</el-option>
                    <el-option value="male">male</el-option>
                    <el-option value="secret">secret</el-option>
                </el-select>
            </div>
        </div>
        <div class="row">
            <label class="op">邮箱：</label>
            <label>{{ this.email }}</label>
        </div>
        <div class="row">
            <label for="introduction" class="op">个性签名：</label>
            <div class="column">
              <span class="info" v-if="!isEdit">{{ this.introduction }}</span>
              <input name="introduction" type="textarea" v-model="NewInfo" id="introduction" v-else>
              <span class="numTip" v-if="isEdit">{{ this.infoNum }}/50字</span>
            </div>
        </div>
        <div class="button_row">
            <button @click="change()" v-if="!isEdit"><i class="el-icon-edit"></i>修改资料</button>
            <button @click="UpdateInfo()" v-if="isEdit"><i class="el-icon-edit"></i>提交</button>
            <div class="back" v-if="isEdit"><i @click="Back()" class="el-icon-back"></i></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'basicInformation',

  data () {
    return {
      id: 0,
      name: 'fine',
      newName: '',
      sex: 'female',
      newSex: '',
      email: 'Paranoid_ZH@163.com',
      introduction: '一二三哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      NewInfo: '',

      nameTip: '',
      infoNum: 0,
      isEdit: false,
      updateOk: true
    };
  },

  computed: {
    ...mapState(['uId'])
  },

  created () {
    // 获取信息
    this.GetUserInfo();
  },

  watch: {
    newName (val) {
      if (val !== this.name) {
        this.CheckName(val);
      }
    },
    NewInfo (val) {
      this.infoNum = this.NewInfo.length;
    }
  },

  methods: {
    // 修改资料
    change () {
      this.isEdit = true;
      this.newName = this.name;
      this.newSex = this.sex;
      this.NewInfo = this.introduction;
    },
    // 取消修改
    Back () {
      this.isEdit = false;
      this.GetUserInfo();
    },

    // 获取信息
    async GetUserInfo () {
      try {
        const res = await this.$axios.post(`${this.HOST}/getUserInfo`, {
          u_id: this.uId
        });
        const info = res.data.data;
        // console.log(info);
        this.id = info.u_id;
        this.sex = info.sex;
        this.name = info.name;
        this.email = info.email;
        this.introduction = info.information;
      } catch (err) {
        console.log(err);
      }
    },

    // 检验名字重复
    async CheckName (name) {
      this.nameTip = '';
      if (name) {
        try {
          const res = await this.$axios.post(`${this.HOST}/checkName`, {
            name: name
          });
          const info = res.data;
          if (info.code !== 200) {
            this.nameTip = '该用户名已存在！';
            this.updateOk = false;
          } else {
            this.nameTip = '该用户名可以使用';
            this.updateOk = true;
          }
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    },

    // 修改资料
    async UpdateInfo () {
      if (this.NewInfo.length > 50) {
        this.$message({
          tyepe: 'error',
          message: '个性签名长度不能超过50字！'
        });
        this.updateOk = false;
      } else {
        this.updateOk = true;
      }
      console.log(this.updateOk);
      if (this.updateOk) {
        try {
          const res = await this.$axios.post(`${this.HOST}/updateUserInfo`, {
            u_id: this.uId,
            name: this.newName,
            sex: this.newSex,
            information: this.NewInfo
          });
          const info = res.data;
          if (info.code === 200) {
            this.isEdit = false;
            this.GetUserInfo();
          } else {
            this.$message({
              tyepe: 'error',
              message: '修改失败！'
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
#basicInformation {
  margin-top: 6%;
  margin-left: 22%;
  display: flex;
  flex-direction: column;

  .row {
    width: 100%;
    margin-bottom: 3%;
    display: flex;
    flex-direction: row;

    .op {
      display: inline-block;
      font-weight: bold;
      font-size: 110%;
      width: 100px;
      margin-right: 10px;
    }
    span.tip {
      margin-left: 10px;
      color: #BC3520;
    }
    span.info {
      width: 80%;
      word-wrap: break-word;
    }
    input {
      height: 20px;
      font-size: 15px;
      text-indent: 5px;
      padding: 5px;
      border-width: 0 0 1px 0;
      outline: none;
      transition: all 0.3s ease;
      background-color: rgba(255, 255, 255, 0);
    }
    input[name="introduction"] {
      width: 80%;
    }
    input:hover {
      font-size: 18px;
    }
    .edit {
      width: 15%;
      background-color: rgba(255, 255, 255, 0);
    }
    .column {
      display: flex;
      flex-direction: column;
      width: 90%;
    }
  }
  .numTip {
    color: #BC3520;
    font-size: 90%;
    margin-top: 10px;
  }
  .button_row {
    margin: 9%;
    display: flex;
    flex-direction: row;

    button {
      text-decoration: none;
      padding: 5px 10px;
      border: 0;
      background-color: #CB7070;
      color: #F8F9F9;
      border-radius: 2px;
      cursor: pointer;
      outline: none;
    }
    button:hover {
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    }
    .back {
      cursor: pointer;
      margin-left: 15px;
      border: 1px solid;
      padding: 2px 4px;
      height: 20px;
      width: 15px;
      border-radius: 100px;
      color: white;
      background-color: #D9D8D8;
    }
  }
}
</style>
