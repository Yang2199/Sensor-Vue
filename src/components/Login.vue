<template>
  <div class="login_container">
    <div class="login_box">
      <h1>传感器分析引擎</h1>
      <el-form ref="loginFormRef"  class="login_form" :model="loginForm" :rules="rules">
        <el-form-item label="账  号" label-width="60px" prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密  码" label-width="60px" prop="password">
          <el-input type="password" prefix-icon="el-icon-lock" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="logup_button" round size="medium" @click="$router.push('/logup')">没有账号</el-button>
          <el-button type="primary" round size="medium" class="login_button" @click="login">立即登录</el-button>
          <el-button class="changekey_button" round size="medium" @click="$router.push('/changekey')">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'Username',
        password: 'Password'
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符，且首字符只能为字母', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符，且首字符只能为字母', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log(res)
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
        window.sessionStorage.setItem('username', res.username)
        window.sessionStorage.setItem('usertype', res.usertype)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style  scoped>
.login_container{
  background-color: #27b144;
  height:100%;
  background-image: url("/img/background.jpg");
  background-size: cover;
  background-position: center;
}

.login_box{
  width:450px;
  height:300px;
  background-color:rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}

.login_form{
  position:absolute;
  bottom:7px;
  width:100%;
  padding:0 45px;
  box-sizing: border-box;
}

</style>
