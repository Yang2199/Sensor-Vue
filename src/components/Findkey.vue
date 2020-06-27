<template>
  <div class="findkey_container">
    <div class="findkey_box">
      <h1>修改密码</h1>
      <el-form ref="findkeyFormRef"  class="findkey_form" :model="findkeyForm" :rules="rules" label-position="left" label-width="80px">
        <div class="findkey_input">
          <el-form-item label="账  号"  prop="username" >
            <el-input class="findkey_input_box" prefix-icon="el-icon-user" v-model="findkeyForm.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号"  prop="mobilePhone" >
            <el-input class="findkey_input_box" prefix-icon="el-icon-user" v-model="findkeyForm.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="邮 箱"  prop="email" >
            <el-input class="findkey_input_box" prefix-icon="el-icon-user" v-model="findkeyForm.email"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input class="findkey_input_box" type="password" prefix-icon="el-icon-lock" v-model="findkeyForm.password"></el-input>
          </el-form-item>
          <el-form-item label="再次输入" prop="checkPass">
             <el-input  class="findkey_input_box" type="password" prefix-icon="el-icon-lock" v-model="findkeyForm.checkPass"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" class="login_button" @click="findkey">修改密码</el-button>
          <el-button class="findkey_button" @click="quit">返回</el-button>
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
      } else if (value !== this.findkeyForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      findkeyForm: {
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
    findkey () {
      this.$refs.findkeyFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('findkey', this.findkeyForm)
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
.findkey_container{
  background-color: #ffffff;
  height:100%;
  background-image: url('http://img1.imgtn.bdimg.com/it/u=840128231,2174898797&fm=214&gp=0.jpg');
  background-size: cover;
  background-position: center;
}

.findkey_box{
  width:40%;
  height:100%;
  padding:0 10% 0 10%;
  background-color:rgba(255, 255, 255, 0.4);
  position:absolute;
  left:50%;
  transform: translate(-50%, 0);
}

.findkey_input{
    text-align:left;
    margin-top: 50px;
    margin-bottom: 50px;
    font-size:30px;
    font-weight:900;
}

.findkey_input_box{
    width: 300px;
}
</style>
