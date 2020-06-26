<template>
    <div>
      <el-row>
      <el-page-header @back="$router.go(-1)" content="编辑传感器"></el-page-header>
      </el-row>
      <el-card>
      <el-form ref="updateFormRef"  class="logup_form" :model="updateForm" :rules="rules" label-position="left" label-width="80px">
        <div class="logup_input">
          <el-form-item label="设备名称" >
            <el-input class="logup_input_box" v-model="updateForm.sensorName"></el-input>
          </el-form-item>
          <el-form-item label="出品公司" >
          <el-autocomplete
            class="inline-input"
            v-model="updateForm.companyName"
            :fetch-suggestions="querySearch"
          ></el-autocomplete>
           </el-form-item>
          <el-form-item label="设备类型">
             <el-select v-model="updateForm.sensorType" placeholder="请选择传感器类型">
               <el-option value="力传感器"></el-option>
               <el-option value="光传感器"></el-option>
               <el-option value="热传感器"></el-option>
               <el-option value="气密传感器"></el-option>
               <el-option value="位置传感器"></el-option>
               <el-option value="电磁传感器"></el-option>
               <el-option value="扭矩传感器"></el-option>
               <el-option value="其它传感器"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体类型" >
            <el-input class="logup_input_box" v-model="updateForm.sensorTypeDetail"></el-input>
          </el-form-item>
          <el-form-item label="输出类型">
             <el-select v-model="updateForm.outputType" placeholder="请选择输出类型">
               <el-option label="模拟信号" :value="0"></el-option>
               <el-option label="数字信号" :value="1"></el-option>
               <el-option label="全部支持" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="输出范围" :inline="true">
               <el-input  class="small_input_box" v-model="updateForm.outputMin"></el-input>
               -
               <el-input  class="small_input_box" v-model="updateForm.outputMax"></el-input>
               V
          </el-form-item>
          <el-form-item label="输入描述">
             <el-input type="textarea" v-model="updateForm.sensorInput"></el-input>
          </el-form-item>
          <el-form-item label="输出描述">
             <el-input type="textarea" v-model="updateForm.sensorOutput"></el-input>
          </el-form-item>
          <el-form-item label="工作温度" :inline="true">
               <el-input  class="small_input_box" v-model="updateForm.tempMin"></el-input>
               -
               <el-input  class="small_input_box" v-model="updateForm.tempMax"></el-input>
               ℃
          </el-form-item>
          <el-form-item label="测量范围">
             <el-input type="textarea" v-model="updateForm.sensorRange"></el-input>
          </el-form-item>
          <el-form-item label="工作环境">
             <el-input type="textarea" v-model="updateForm.sensorEnvironment"></el-input>
          </el-form-item>
          <el-form-item label="防水等级">
             <el-input type="textarea" v-model="updateForm.sensorLevel"></el-input>
          </el-form-item>
          <el-form-item label="产品描述">
             <el-input type="textarea" v-model="updateForm.sensorDescription"></el-input>
          </el-form-item>
          <el-form-item label="应用场景">
             <el-input type="textarea" v-model="updateForm.sensorApplication"></el-input>
          </el-form-item>
          <el-form-item label="产品优势">
             <el-input type="textarea" v-model="updateForm.sensorStrength"></el-input>
             <el-checkbox-group v-model="featureOption">
             <el-checkbox label="耐高温"></el-checkbox>
             <el-checkbox label="耐低温"></el-checkbox>
             <el-checkbox label="耐油"></el-checkbox>
             <el-checkbox label="高防水等级"></el-checkbox>
             <el-checkbox label="广测量范围"></el-checkbox>
             <el-checkbox label="低噪声"></el-checkbox>
             <el-checkbox label="高精度"></el-checkbox>
             <el-checkbox label="低功耗"></el-checkbox>
             <el-checkbox label="微型"></el-checkbox>
             <el-checkbox label="抗冲击"></el-checkbox>
             <el-checkbox label="长寿命"></el-checkbox>
          </el-checkbox-group>
          </el-form-item>
          <el-form-item label="其它">
             <el-input type="textarea" v-model="updateForm.sensorOther"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" class="login_button" @click="updateSensor">提交</el-button>
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
      updateForm: {
        sensorId: this.$route.params.id,
        sensorName: '',
        sensorType: '其它传感器',
        companyName: '',
        sensorFeature: '',
        outputType: 2,
        outputMin: '',
        outputMax: '',
        tempMin: '',
        tempMax: '',
        username: window.sessionStorage.getItem('username'),
        sensorTypeDetail: '',
        sensorInput: '',
        sensorOutput: '',
        sensorEnvironment: '',
        sensorRange: '',
        sensorLevel: '',
        sensorApplication: '',
        sensorDescription: '',
        sensorStrength: '',
        sensorOther: ''
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
    // 查询传感器信息：
    var deviceId = this.$route.params.id
    const { data: res2 } = await this.$http.get('SensorQuery', {
      params: {
        sensorId: deviceId
      }
    })
    if (res2.code !== 200) {
      this.$message.error('获取传感器信息失败。')
      return this.$router.go(-1)
    }
    // 更新数据
    this.updateForm.sensorName = res2.sensorView.sensorName
    this.updateForm.sensorType = res2.sensorView.sensorType
    this.updateForm.companyName = res2.sensorView.companyName
    this.featureOption = res2.sensorView.sensorFeature.split(',')
    this.updateForm.outputType = res2.sensorView.outputType
    this.updateForm.outputMin = res2.sensorView.outputMin
    this.updateForm.outputMax = res2.sensorView.outputMax
    this.updateForm.tempMin = res2.sensorView.tempMin
    this.updateForm.tempMax = res2.sensorView.tempMax
    this.updateForm.sensorTypeDetail = res2.sensorDetail.sensorTypeDetail
    this.updateForm.sensorInput = res2.sensorDetail.sensorInput
    this.updateForm.sensorOutput = res2.sensorDetail.sensorOutput
    this.updateForm.sensorEnvironment = res2.sensorDetail.sensorEnvironment
    this.updateForm.sensorRange = res2.sensorDetail.sensorRange
    this.updateForm.sensorLevel = res2.sensorDetail.sensorLevel
    this.updateForm.sensorApplication = res2.sensorDetail.sensorApplication
    this.updateForm.sensorDescription = res2.sensorDetail.sensorDescription
    this.updateForm.sensorStrength = res2.sensorDetail.sensorStrength
    this.updateForm.sensorOther = res2.sensorDetail.sensorOther
  },
  methods: {
    updateSensor () {
      // 更新特征
      this.updateForm.sensorFeature = this.featureOption.join(',')
      // 上传
      this.$refs.updateFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('SensorUpdate', this.updateForm)
        console.log(res)
        if (res.code !== 200) return this.$message.error('修改失败')
        this.$message.success('修改成功')
        this.$router.push({
          name: 'sensor',
          params: {
            id: res.sensorId
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
