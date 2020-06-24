<template>
<div>
    <el-row>
      <el-col :span="18">
        <el-page-header @back="$router.go(-1)" content="传感器"></el-page-header>
      </el-col>
      <el-col :span="6">
        <!--  <el-button type="primary" size="small" icon="el-icon-edit" round :disabled="!mine" @click="editDevice()">编辑</el-button>  -->
        <el-button type="primary" size="small" icon="el-icon-edit" round :disabled="!mine" @click="$router.push('/updatesensor')">编辑</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" round :disabled="!mine"  @click="deleteConfirm()">删除</el-button>
      </el-col>
    </el-row>
    <el-card >
      <h1 style="padding-bottom:20px;font-size:35px;">{{device.sensorName}}</h1>
      <p>{{device.sensorType}} | {{device.sensorTypeDetail}}</p>
      <el-button type="text" @click="showCompany()" style="padding-bottom:55px;">{{device.companyName}}</el-button>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="输入类型 INPUT" name="1">
          <div>{{device.sensorInput}}</div>
        </el-collapse-item>
        <el-collapse-item title="输出类型 OUTPUT" name="2">
          <div>{{device.sensorOutput}}</div>
        </el-collapse-item>
        <el-collapse-item title="工作环境 ENVIRONMENT" name="3">
          <div>{{device.sensorEnvironment}}</div>
        </el-collapse-item>
        <el-collapse-item title="测量范围 RANGE" name="4">
          <div>{{device.sensorRange}}</div>
        </el-collapse-item>
        <el-collapse-item title="防水等级 LEVEL" name="5">
          <div>{{device.sensorLevel}}</div>
        </el-collapse-item>
        <el-collapse-item title="应用场景 APPLICATION" name="6">
          <div>{{device.sensorApplication}}</div>
        </el-collapse-item>
        <el-collapse-item title="详细描述 DESCRIPTION" name="7">
          <div>{{device.sensorDescription}}</div>
        </el-collapse-item>
        <el-collapse-item title="产品优势 STRENGTH" name="8">
          <div>{{device.sensorStrength}}</div>
        </el-collapse-item>
        <el-collapse-item title="其它 OTHER" name="9">
          <div>{{device.sensorOther}}</div>
        </el-collapse-item>
      </el-collapse>
      <el-button type="success" @click="matchGateway" round style="margin:50px;">匹配网关</el-button>
    </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      mine: false,
      device: [],
      deleteInfo: {
        username: '',
        password: ''
      },
      activeNames: []
    }
  },
  async created () {
    this.$emit('flushMenu', '/list/sensor')
    // 远端查询数据
    var deviceId = this.$route.params.id
    const { data: res } = await this.$http.get('SensorDetail', {
      params: {
        sensorId: deviceId
      }
    })
    if (res.code !== 200) {
      this.$message.error('获取传感器信息失败。')
      return this.$router.go(-1)
    }
    this.device = res.data
    // 判断当前用户是否为创建者
    var myusername = window.sessionStorage.getItem('username')
    if (this.device.username === myusername) {
      this.mine = true
    } else {
      this.mine = false
    }
  },
  methods: {
    editDevice () {
      var id = this.$route.params.id
      this.$router.push({
        name: 'editDevice',
        params: {
          id: id
        }
      })
    },
    // 弹出框确认删除设备
    deleteConfirm () {
      this.$prompt('请再次输入密码确认', '删除设备', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'password'
      }).then(({ value }) => {
        this.deleteDevice(value)
      })
    },
    // 删除设备
    async deleteDevice (passConfirm) {
      const { data: res } = await this.$http.post('SensorRemove', {
        username: window.sessionStorage.getItem('username'),
        password: passConfirm,
        sensorId: this.$route.params.id
      })
      if (res.code !== 200) return this.$message.error('删除失败，请重试。')
      this.$message.success('设备删除成功')
      this.$router.push('/welcome')
    },
    showCompany () {
      this.$router.push({
        name: 'company',
        params: {
          companyName: this.device.companyName
        }
      })
    },
    matchGateway () {
      this.$router.push({
        name: 'solution',
        params: {
          sensorId: this.$route.params.id
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
