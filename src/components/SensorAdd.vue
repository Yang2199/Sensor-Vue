<template>
    <div>
      <el-row>
      <el-page-header @back="$router.go(-1)" content="添加传感器"></el-page-header>
      </el-row>
      <el-card>
      <el-form ref="addFormRef"  class="logup_form" :model="addForm" :rules="rules" label-position="left" label-width="80px">
        <div class="logup_input">
          <el-form-item label="设备名称" >
            <el-input class="logup_input_box" v-model="addForm.sensorName"></el-input>
          </el-form-item>
          <el-form-item label="出品公司" >
          <el-autocomplete
            class="inline-input"
            v-model="addForm.companyName"
            :fetch-suggestions="querySearch"
          ></el-autocomplete>
           </el-form-item>
          <el-form-item label="设备类型">
             <el-select v-model="addForm.sensorType" placeholder="请选择传感器类型">
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
            <el-input class="logup_input_box" v-model="addForm.sensorTypeDetail"></el-input>
          </el-form-item>
          <el-form-item label="输出类型">
             <el-select v-model="addForm.outputType" placeholder="请选择输出类型">
               <el-option label="模拟信号" :value="0"></el-option>
               <el-option label="数字信号" :value="1"></el-option>
               <el-option label="全部支持" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="输出范围" :inline="true">
               <el-input  class="small_input_box" v-model="addForm.outputMin" v-enter-number type="number"></el-input>
               -
               <el-input  class="small_input_box" v-model="addForm.outputMax" v-enter-number type="number"></el-input>
               V
          </el-form-item>
          <el-form-item label="输入描述">
             <el-input type="textarea" v-model="addForm.sensorInput"></el-input>
          </el-form-item>
          <el-form-item label="输出描述">
             <el-input type="textarea" v-model="addForm.sensorOutput"></el-input>
          </el-form-item>
          <el-form-item label="工作温度" :inline="true">
               <el-input  class="small_input_box" v-model="addForm.tempMin" v-enter-number type="number"></el-input>
               -
               <el-input  class="small_input_box" v-model="addForm.tempMax" v-enter-number type="number"></el-input>
               ℃
          </el-form-item>
          <el-form-item label="测量范围">
             <el-input type="textarea" v-model="addForm.sensorRange"></el-input>
          </el-form-item>
          <el-form-item label="工作环境">
             <el-input type="textarea" v-model="addForm.sensorEnvironment"></el-input>
          </el-form-item>
          <el-form-item label="防水等级">
             <el-input type="textarea" v-model="addForm.sensorLevel"></el-input>
          </el-form-item>
          <el-form-item label="产品描述">
             <el-input type="textarea" v-model="addForm.sensorDescription"></el-input>
          </el-form-item>
          <el-form-item label="应用场景">
             <el-input type="textarea" v-model="addForm.sensorApplication"></el-input>
          </el-form-item>
          <el-form-item label="产品优势">
             <el-input type="textarea" v-model="addForm.sensorStrength"></el-input>
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
             <el-input type="textarea" v-model="addForm.sensorOther"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" class="login_button" @click="addSensor">提交</el-button>
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
  },
  methods: {
    addSensor () {
      // 更新特征
      this.addForm.sensorFeature = this.featureOption.join(',')
      // 上传
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('SensorAdd', this.addForm)
        console.log(res)
        if (res.code !== 200) return this.$message.error('上传失败')
        this.$message.success('上传成功')
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
