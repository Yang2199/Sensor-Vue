<template>
    <div>
      <el-row>
      <el-page-header @back="$router.go(-1)" content="添加网关"></el-page-header>
      </el-row>
      <el-card>
      <el-form ref="addFormRef"  class="logup_form" :model="addForm" :rules="rules" label-position="left" label-width="80px">
        <div class="logup_input">
          <el-form-item label="设备名称" >
            <el-input class="logup_input_box" v-model="addForm.gatewayName"></el-input>
          </el-form-item>
          <el-form-item label="出品公司" >
          <el-autocomplete
            class="inline-input"
            v-model="addForm.companyName"
            :fetch-suggestions="querySearch"
          ></el-autocomplete>
           </el-form-item>
          <el-form-item label="网关特性" >
            <el-input class="logup_input_box" v-model="addForm.gatewayFeature"></el-input>
          </el-form-item>
          <el-form-item label="输入类型">
             <el-select v-model="addForm.inputType" placeholder="请选择输出类型">
               <el-option label="模拟信号" :value="0"></el-option>
               <el-option label="数字信号" :value="1"></el-option>
               <el-option label="全部支持" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="输入范围" :inline="true">
               <el-input  class="small_input_box" v-model="addForm.inputMin"></el-input>
               -
               <el-input  class="small_input_box" v-model="addForm.inputMax"></el-input>
               V
          </el-form-item>
          <el-form-item label="工作温度" :inline="true">
               <el-input  class="small_input_box" v-model="addForm.tempMin"></el-input>
               -
               <el-input  class="small_input_box" v-model="addForm.tempMax"></el-input>
               ℃
          </el-form-item>
          <el-form-item label="工作环境">
             <el-input type="textarea" v-model="addForm.gatewayEnvironment"></el-input>
          </el-form-item>
          <el-form-item label="产品描述">
             <el-input type="textarea" v-model="addForm.gatewayDescription"></el-input>
          </el-form-item>
          <el-form-item label="应用级别">
             <el-input type="textarea" v-model="addForm.gatewayLevel"></el-input>
          </el-form-item>
          <el-form-item label="能否充电">
             <el-input type="textarea" v-model="addForm.gatewayCharge"></el-input>
            <!-- <el-select v-model="addForm.gatewayCharge" placeholder="请选择">
               <el-option label="能" :value="能"></el-option>
               <el-option label="否" :value="否"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="输入描述">
             <el-input type="textarea" v-model="addForm.gatewayInput"></el-input>
          </el-form-item>
          <el-form-item label="物联网设备间协议">
             <el-input type="textarea" v-model="addForm.betweenProxy"></el-input>
          </el-form-item>
          <el-form-item label="物联网上传协议">
             <el-input type="textarea" v-model="addForm.uploadProxy"></el-input>
          </el-form-item>
          <el-form-item label="其它">
             <el-input type="textarea" v-model="addForm.gatewayOther"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" class="login_button" @click="addGateway">提交</el-button>
          <el-button class="logup_button" @click="quit">取消</el-button>
        </el-form-item>
      </el-form>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      addForm: {
        gatewayName: '',
        companyName: '',
        gatewayFeature: '',
        inputType: 2,
        inputMin: '',
        inputMax: '',
        tempMin: '',
        tempMax: '',
        username: window.sessionStorage.getItem('username'),
        gatewayLevel: '',
        gatewayCharge: '',
        gatewayInput: '',
        gatewayEnvironment: '',
        gatewayDescription: '',
        gatewayOther: '',
        betweenProxy: '',
        uploadProxy: ''
      },
      featureOption: [],
      rules: {
      },
      companies: []
    }
  },
  async created () {
    // 远端查询数据
    const { data: res } = await this.$http.get('AllCompanies')
    if (res.code !== 200) {
      this.$message.error('获取公司信息失败，请检查网络。')
      return this.$router.go(-1)
    }
    this.companies = res.companyNameList
  },
  methods: {
    addGateway () {
      // 更新特征
      this.addForm.gatewayFeature = this.featureOption.join(',')
      // 上传
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('GatewayAdd', this.addForm)
        console.log(res)
        if (res.code !== 200) return this.$message.error('上传失败')
        this.$message.success('上传成功')
        this.$router.push({
          name: 'gateway',
          params: {
            id: res.gatewayId
          }
        })
      })
    },
    quit () {
      this.$router.go(-1)
    },
    // 查询公司和过滤
    querySearch (queryString, cb) {
      var companies = this.companies
      var results = queryString ? companies.filter(this.createFilter(queryString)) : companies
      cb(results) // 调用 callback 返回建议列表的数据
    },
    createFilter (queryString) {
      return (companies) => {
        return (companies.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>

<style  scoped>
.logup_input{
    text-align:left;
    margin: 50px;
}

.logup_input_box{
    width: 300px;
}

.small_input_box{
    width: 100px;
}
</style>
