<template>
  <div class="logup_container">
    <div class="logup_box">
      <h1>注册用户</h1>
      <el-form ref="logupFormRef"  class="logup_form" :model="logupForm" :rules="rules" label-position="left" label-width="80px">
        <el-radio-group v-model="logupForm.role">
          <el-radio-button :label="false">普通用户</el-radio-button>
          <el-radio-button :label="true">企业用户</el-radio-button>
        </el-radio-group>
        <div class="logup_input">
          <el-form-item label="账  号"  prop="username" >
            <el-input class="logup_input_box" prefix-icon="el-icon-user" v-model="logupForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密  码" prop="password">
            <el-input class="logup_input_box" type="password" prefix-icon="el-icon-lock" v-model="logupForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
             <el-input  class="logup_input_box" type="password" prefix-icon="el-icon-lock" v-model="logupForm.checkPass"></el-input>
          </el-form-item>
          <el-form-item label="手机号"  prop="mobilePhone" >
            <el-input class="logup_input_box" prefix-icon="el-icon-user" v-model="logupForm.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱"  prop="email" >
            <el-input class="logup_input_box" prefix-icon="el-icon-user" v-model="logupForm.email"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="companyName" v-if="logupForm.role">
             <el-input  class="logup_input_box" v-model="logupForm.companyName"></el-input>
          </el-form-item>
          <el-form-item label="公司描述" v-if="logupForm.role">
             <el-input type="textarea" v-model="logupForm.description"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" class="login_button" @click="logup">立即注册</el-button>
          <el-button class="logup_button" @click="quit">返回</el-button>
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
      } else if (value !== this.logupForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      logupForm: {
        role: false,
        username: '',
        password: '',
        checkPass: '',
        mobilePhone: '', ///
        email: '', ///
        companyName: '',
        description: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符，且首字符只能为字母', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符，且首字符只能为字母', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        mobilePhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 8, max: 11, message: '真实号码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 8, max: 25, message: '邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    logup () {
      this.$refs.logupFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('logup', this.logupForm)
        console.log(res)
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
        window.sessionStorage.setItem('username', res.username)
        window.sessionStorage.setItem('usertype', res.usertype)
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
.logup_container{
  background-color: #ffffff;
  height:100%;
  background-image: url('https://www.itdaan.com/go/aHR0cHM6Ly9pbWFnZXMyMDE1LmNuYmxvZ3MuY29tL2Jsb2cvNDg0OS8yMDE2MTEvNDg0OS0yMDE2MTEyMDEzNTMzNTcxNy01NTU3MzUyMTQuanBn');
  background-size: cover;
  background-position: center;
}

.logup_box{
  width:40%;
  height:100%;
  padding:0 10% 0 10%;
  background-color:rgba(255, 255, 255, 0.4);
  position:absolute;
  left:50%;
  transform: translate(-50%, 0);
}

.logup_input{
    text-align:left;
    margin-top: 50px;
    margin-bottom: 50px;
    font-size:30px;
    font-weight:900;
}

.logup_input_box{
    width: 300px;
}
</style>
