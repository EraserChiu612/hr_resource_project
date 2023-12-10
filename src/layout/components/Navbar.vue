<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar" class="user-avatar" />
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <span class="name">{{ name }}</span>
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首頁 </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/EraserChiu612?tab=repositories"
          >
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <!-- prevent 事件修飾符, 阻止默認事件 -->
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密碼</el-dropdown-item>
          </a>
          <!-- native 事件修飾符 -->
          <!-- 註冊組件的根元素的原生事件 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 放置彈出層 -->
    <!-- sync 接收子組件傳送過來的值 -->
    <el-dialog
      width="500px"
      title="修改密碼"
      :visible.sync="showDialog"
      @close="btnCancel"
    >
      <!-- 放置表單 -->
      <el-form ref="passForm" label-width="120px" :model="passForm">
        <el-form-item label="舊密碼" prop="oldPassword">
          <el-input
            show-password
            v-model="passForm.oldPassword"
            size="small"
            placeholder="請輸入舊密碼"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密碼" prop="newPassword">
          <el-input
            show-password
            v-model="passForm.newPassword"
            size="small"
            placeholder="請輸入新密碼"
          ></el-input>
        </el-form-item>
        <el-form-item label="確認密碼" prop="confirmPassword">
          <el-input
            show-password
            v-model="passForm.confirmPassword"
            size="small"
            placeholder="請再次輸入新密碼"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="btnOK" type="primary" size="mini"
            >確認修改</el-button
          >
          <el-button @click="btnCancel" size="mini">取消 </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { mapGetters } from 'vuex'
import { updatePassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      showDialog: false, //控制彈出層的顯示和隱藏
      passForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '', //確認密碼(前端需要)
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: '請輸入舊密碼',
            trigger: 'blur',
          },
        ],
        newPassword: [
          {
            required: true,
            message: '請輸入新密碼',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 16,
            message: '密碼長度須為 6 到 16 個字符',
            trigger: 'blur',
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: '請再次輸入新密碼',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.passForm.newPassword) {
                callback(new Error('兩次輸入密碼不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name']),
  },
  methods: {
    updatePassword() {
      //彈出層
      this.showDialog = true
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // 調用退出登陸的action
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    //確定修改密碼
    btnOK() {
      this.$refs.passForm.validate(async (isOK) => {
        if (isOK) {
          //驗證通過,調用接口
          await updatePassword(this.passForm)
          this.$message.success('修改密碼成功')
          // 成功
          this.btnCancel() //關閉彈出層
        }
      })
    },
    //取消修改密碼
    btnCancel() {
      this.$refs.passForm.resetFields() //重置表單
      this.showDialog = false //關閉彈出層
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
        .username {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #04c9be;
          color: #fff;
          margin-right: 4px;
        }

        .name {
          margin: 0 10px 0 5px;
          font-size: 16px;
        }

        .el-icon-setting {
          cursor: pointer;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
