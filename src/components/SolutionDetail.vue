<template>
<div>
    <el-row>
      <el-col :span="18">
        <el-page-header @back="$router.go(-1)" content="方案"></el-page-header>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" icon="el-icon-edit" round :disabled="true" @click="editDevice()">编辑</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" round :disabled="true"  @click="deleteConfirm()">删除</el-button>
      </el-col>
    </el-row>
    <el-card>
       <el-row>
           <el-col :span="12">
               <el-image src="/img/1.jpg" fit="fill" style="width:300px; height: 300px;" />
      <h1 style="padding-bottom:20px;font-size:35px;">{{device1.sensorName}}</h1>
      <p>{{device1.sensorType}} | {{device1.sensorTypeDetail}}</p>
      <el-button type="text" @click="showCompany()" style="padding-bottom:55px;">{{device1.companyName}}</el-button>
      <el-collapse v-model="activeNames1">
        <el-collapse-item title="输入类型 INPUT" name="1">
          <div>{{device1.sensorInput}}</div>
        </el-collapse-item>
        <el-collapse-item title="输出类型 OUTPUT" name="2">
          <div>{{device1.sensorOutput}}</div>
        </el-collapse-item>
        <el-collapse-item title="工作环境 ENVIRONMENT" name="3">
          <div>{{device1.sensorEnvironment}}</div>
        </el-collapse-item>
        <el-collapse-item title="测量范围 RANGE" name="4">
          <div>{{device1.sensorRange}}</div>
        </el-collapse-item>
        <el-collapse-item title="防水等级 LEVEL" name="5">
          <div>{{device1.sensorLevel}}</div>
        </el-collapse-item>
        <el-collapse-item title="应用场景 APPLICATION" name="6">
          <div>{{device1.sensorApplication}}</div>
        </el-collapse-item>
        <el-collapse-item title="详细描述 DESCRIPTION" name="7">
          <div>{{device1.sensorDescription}}</div>
        </el-collapse-item>
        <el-collapse-item title="产品优势 STRENGTH" name="8">
          <div>{{device1.sensorStrength}}</div>
        </el-collapse-item>
        <el-collapse-item title="其它 OTHER" name="9">
          <div>{{device1.sensorOther}}</div>
        </el-collapse-item>
      </el-collapse>
           </el-col>
           <el-col :span="12">
               <el-image src="/img/2.jpg" fit="fill" style="width:300px; height: 300px;" />
      <h1 style="padding-bottom:20px;font-size:35px;">{{device2.gatewayName}}</h1>
      <p>网关</p>
      <el-button type="text" @click="showCompany()" style="padding-bottom:55px;">{{device2.companyName}}</el-button>
      <el-collapse v-model="activeNames2">
        <el-collapse-item title="输入类型 INPUT" name="1">
          <div>{{device2.gatewayInput}}</div>
        </el-collapse-item>
        <el-collapse-item title="是否可充电 CHARGE" name="2">
          <div>{{device2.gatewaycharge}}</div>
        </el-collapse-item>
        <el-collapse-item title="工作环境 ENVIRONMENT" name="3">
          <div>{{device2.gatewayEnvironment}}</div>
        </el-collapse-item>
        <el-collapse-item title="防水等级 LEVEL" name="5">
          <div>{{device2.gatewayLevel}}</div>
        </el-collapse-item>
        <el-collapse-item title="详细描述 DESCRIPTION" name="6">
          <div>{{device2.gatewayDescription}}</div>
        </el-collapse-item>
        <el-collapse-item title="物联网设备间协议 BETWEEN PROXY" name="7">
          <div>{{device2.betweenProxy}}</div>
        </el-collapse-item>
        <el-collapse-item title="物联网上传协议 UPLOAD PROXY" name="8">
          <div>{{device2.uploadProxy}}</div>
        </el-collapse-item>
        <el-collapse-item title="其它 OTHER" name="9">
          <div>{{device2.gatewayOther}}</div>
        </el-collapse-item>
      </el-collapse>
           </el-col>
       </el-row>
    </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      mine: false,
      mysolution: {},
      device1: [],
      device2: [],
      deleteInfo: {
        username: '',
        password: ''
      },
      activeNames1: [],
      activeNames2: []
    }
  },
  async created () {
    this.$emit('flushMenu', '/list/solution')
    // 远端查询数据
    var solutionId = this.$route.params.id
    const { data: res } = await this.$http.get('getSolution', {
      params: {
        solutionId: solutionId
      }
    })
    if (res.code !== 200) {
      this.$message.error('获取方案信息失败。')
      return this.$router.go(-1)
    }
    this.mysolution = res.solutions
    // 远端查询数据
    var sensorId = this.mysolution.sensorId
    const { data: res1 } = await this.$http.get('SensorDetail', {
      params: {
        sensorId: sensorId
      }
    })
    if (res1.code !== 200) {
      this.$message.error('获取传感器信息失败。')
      return this.$router.go(-1)
    }
    this.device1 = res1.data
    // 远端查询数据
    var gatewayId = this.mysolution.gatewayId
    const { data: res2 } = await this.$http.get('queryGatewayDetail', {
      params: {
        gatewayId: gatewayId
      }
    })
    if (res2.code !== 200) {
      this.$message.error('获取网关信息失败。')
      return this.$router.go(-1)
    }
    this.device2 = res2.data
  },
  methods: {
    showCompany1 () {
      this.$router.push({
        name: 'company',
        params: {
          companyName: this.device1.companyName
        }
      })
    },
    showCompany2 () {
      this.$router.push({
        name: 'company',
        params: {
          companyName: this.device2.companyName
        }
      })
    }
  }
}
</script>

<style>
.el-row {
    height: 45px;
}
</style>
