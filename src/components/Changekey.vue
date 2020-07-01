<template>
  <div class="changekey_container">
    <div class="changekey_box">
      <h1>修改密码</h1>
      <el-form ref="changekeyFormRef"  class="changekey_form" :model="changekeyForm" :rules="rules" label-position="left" label-width="80px">
        <div class="changekey_input">
          <el-form-item label="账  号"  prop="username" >
            <el-input class="changekey_input_box" prefix-icon="el-icon-user" v-model="changekeyForm.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号"  prop="mobilePhone" >
            <el-input class="changekey_input_box" prefix-icon="el-icon-user" v-model="changekeyForm.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="邮 箱"  prop="email" >
            <el-input class="changekey_input_box" prefix-icon="el-icon-user" v-model="changekeyForm.email"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input class="changekey_input_box" type="password" prefix-icon="el-icon-lock" v-model="changekeyForm.password"></el-input>
          </el-form-item>
          <el-form-item label="再次输入" prop="checkPass">
             <el-input  class="changekey_input_box" type="password" prefix-icon="el-icon-lock" v-model="changekeyForm.checkPass"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" class="login_button" @click="changekey">修改密码</el-button>
          <el-button class="changekey_button" @click="quit">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changekeyForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      changekeyForm: {
        username: '',
        mobilePhone: '', ///
        email: '', ///
        password: '', ///
        checkPass: '' ///
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符，并且首字母只能为字母', trigger: 'blur' }
        ],
        mobilePhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 8, max: 11, message: '真实号码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 8, max: 25, message: '邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符，且首字符只能为字母', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changekey () {
      this.$refs.changekeyFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('passwordChange', this.changekeyForm)
        console.log(res)
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
        window.sessionStorage.setItem('username', res.username)
        this.$router.push('/home')
      })
    },
    quit () {
      this.$router.push('/login')
    }
  }
}
</script>

<style  scoped>
.changekey_container{
  background-color: #ffffff;
  height:100%;
  background-image: url("/img/background.jpg");
  /* background-image: url("http://youimg1.c-ctrip.com/target/fd/tg/g3/M07/27/3A/CggYG1YdXy2AITGyABB_-p7zf-Y917.jpg"); */
  background-size: cover;
  background-position: center;
}

.changekey_box{
  width:40%;
  height:100%;
  padding:0 10% 0 10%;
  background-color:rgba(255, 255, 255, 0.8);
  position:absolute;
  left:50%;
  transform: translate(-50%, 0);
}

.changekey_input{
    text-align:left;
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 85px;
    font-size:30px;
    font-weight:900;
}

.changekey_input_box{
    width: 300px;
}
</style>
