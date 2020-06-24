<template>
<div>
    <el-row>
      <el-col :span="18">
        <el-page-header @back="$router.go(-1)" content="网关"></el-page-header>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" icon="el-icon-edit" round :disabled="!mine" @click="editDevice()">编辑</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" round :disabled="!mine"  @click="deleteConfirm()">删除</el-button>
      </el-col>
    </el-row>
    <el-card >
      <h1 style="padding-bottom:20px;font-size:35px;">{{device.gatewayName}}</h1>
      <p>网关</p>
      <el-button type="text" @click="showCompany()" style="padding-bottom:55px;">{{device.companyName}}</el-button>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="输入类型 INPUT" name="1">
          <div>{{device.gatewayInput}}</div>
        </el-collapse-item>
        <el-collapse-item title="是否可充电 CHARGE" name="2">
          <div>{{device.gatewaycharge}}</div>
        </el-collapse-item>
        <el-collapse-item title="工作环境 ENVIRONMENT" name="3">
          <div>{{device.gatewayEnvironment}}</div>
        </el-collapse-item>
        <el-collapse-item title="防水等级 LEVEL" name="5">
          <div>{{device.gatewayLevel}}</div>
        </el-collapse-item>
        <el-collapse-item title="详细描述 DESCRIPTION" name="6">
          <div>{{device.gatewayDescription}}</div>
        </el-collapse-item>
        <el-collapse-item title="物联网设备间协议 BETWEEN PROXY" name="7">
          <div>{{device.betweenProxy}}</div>
        </el-collapse-item>
        <el-collapse-item title="物联网上传协议 UPLOAD PROXY" name="8">
          <div>{{device.uploadProxy}}</div>
        </el-collapse-item>
        <el-collapse-item title="其它 OTHER" name="9">
          <div>{{device.gatewayOther}}</div>
        </el-collapse-item>
      </el-collapse>
      <el-button type="success" @click="matchSensor" round style="margin:50px;" disabled>匹配路由器</el-button>
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
    const { data: res } = await this.$http.get('queryGatewayDetail', {
      params: {
        gatewayId: deviceId
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
      const { data: res } = await this.$http.post('GatewayRemove', {
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
    matchSensor () {
      this.$router.push('/solution')
    }
  }
}
</script>

<style>
.el-row {
    height: 45px;
}
</style>
