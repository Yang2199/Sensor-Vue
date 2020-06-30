<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-page-header @back="$router.go(-1)" content="搜索结果"></el-page-header>
      </el-col>
    </el-row>
    <!--传感器显示-->
    <el-card v-if="sensorList!=''">
      <el-row type="flex" align="middle">
        <el-col :span="24" style="font-weight:bold;">
         传感器
        </el-col>
      </el-row>
      <el-table :data='sensorList' style='width: 100%' stripe >
        <el-table-column sortable
          fixed
          prop='sensorName'
          label='型号'
          width='120'
        ></el-table-column>
        <el-table-column prop='sensorType' label='类型' width='150' sortable></el-table-column>
        <el-table-column sortable prop='companyName' label='出品公司' width='200'></el-table-column>
        <el-table-column sortable prop='tempMin,tempMax' label='工作温度' width='200'>
          <template slot-scope="scope">
            {{scope.row.tempMin}} - {{scope.row.tempMax}} ℃
          </template>
        </el-table-column>
        <el-table-column sortable prop='outputType' label='输出类型' width='200'>
          <template  slot-scope="scope">
            <div v-if="scope.row.outputType === 2">模拟信号，数字信号</div>
            <div v-else-if="scope.row.outputType === 1">数字信号</div>
            <div v-else-if="scope.row.outputType === 0">模拟信号</div>
          </template>
        </el-table-column>
        <el-table-column sortable prop='outputMin,outputMax' label='输出范围' width='200'>
          <template slot-scope="scope">
            {{scope.row.outputMin}} - {{scope.row.outputMax}} V
          </template>
        </el-table-column>
        <el-table-column fixed='right' prop='button' label='操作' width='140'>
          <template slot-scope="scope">
            <el-button type="primary" @click="getSensor(scope.row.sensorId)" icon="el-icon-search" size="small"></el-button>
            <el-button type="warning" @click="bestMatch(scope.row.sensorId)" icon="el-icon-s-operation" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--网关显示-->
    <el-card v-if="gatewayList!=''">
      <el-row type="flex" align="middle">
        <el-col :span="24" style="font-weight:bold;">
         网关
        </el-col>
      </el-row>
      <el-table :data='gatewayList' style='width: 100%' stripe>
        <el-table-column sortable
          fixed
          prop='gatewayName'
          label='型号'
          width='160'
        ></el-table-column>
        <el-table-column prop='gayewayType' label='类型' width='120' sortable>网关</el-table-column>
        <el-table-column sortable prop='companyName' label='出品公司' width='200'></el-table-column>
        <el-table-column sortable prop='tempMin,tempMax' label='工作温度' width='200'>
          <template slot-scope="scope">
            {{scope.row.tempMin}} - {{scope.row.tempMax}} ℃
          </template>
        </el-table-column>
        <el-table-column sortable prop='inputType' label='输入类型' width='200'>
          <template  slot-scope="scope">
            <div v-if="scope.row.inputType === 2">模拟信号，数字信号</div>
            <div v-else-if="scope.row.inputType === 1">数字信号</div>
            <div v-else-if="scope.row.inputType === 0">模拟信号</div>
          </template>
        </el-table-column>
        <el-table-column sortable prop='inputMin,inputMax' label='输入范围' width='200'>
          <template slot-scope="scope">
            {{scope.row.inputMin}} - {{scope.row.inputMax}} V
          </template>
        </el-table-column>
        <el-table-column fixed='right' prop='button' label='操作' width='140'>
          <template slot-scope="scope">
            <el-button type="primary" @click="getGateway(scope.row.gatewayId)" icon="el-icon-search" size="small"></el-button>
            <el-button type="warning" @click="bestMatch2(scope.row.gatewayId)" icon="el-icon-s-operation" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--公司显示-->
    <el-card v-if="companyList!=''">
      <el-row type="flex" align="middle">
        <el-col :span="24" style="font-weight:bold;">
         公司
        </el-col>
      </el-row>
      <el-table :data='companyList' style='width: 100%' stripe >
        <el-table-column sortable
          fixed
          prop='companyName'
          label='公司名称'
          width='160'
        ></el-table-column>
        <el-table-column
          fixed
          prop='companyInfo'
          label='公司描述'
          width='900'
        ></el-table-column>
        <el-table-column fixed='right' prop='button' label='操作' width='140'>
          <template slot-scope="scope">
            <el-button type="primary" @click="showCompany(scope.row.companyName)" icon="el-icon-search" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 用户显示-->
    <el-card v-if="userList!=''">
      <el-row type="flex" align="middle">
        <el-col :span="24" style="font-weight:bold;">
         用户
        </el-col>
      </el-row>
      <el-table :data='userList' style='width: 100%' stripe >
        <el-table-column sortable
          fixed
          prop='username'
          label='用户名'
          width='160'
        ></el-table-column>
        <el-table-column sortable
          fixed
          prop='mobilePhone'
          label='电话'
          width='120'
        ></el-table-column>
        <el-table-column sortable
          fixed
          prop='email'
          label='邮箱'
          width='160'
        ></el-table-column>
        <el-table-column
          fixed
          prop='description'
          label='详细描述'
          width='700'
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 数据
      sensorList: [],
      gatewayList: [],
      companyList: [],
      userList: []
    }
  },
  watch: {
    $route (to, from) {
      this.searchResult()
    }
  },
  created () {
    this.searchResult()
    this.$emit('flushMenu', '/welcome')
  },
  methods: {
    // 向后端查询数据
    async searchResult () {
      const { data: res } = await this.$http.get('SearchResult', {
        params: {
          word: this.$route.params.word
        }
      })
      if (res.code === 404) {
        return this.$message.error('未找到要求的传感器，请切换查询条件。')
      } else if (res.code !== 200) {
        return this.$message.error('获取传感器数据失败，请重试。')
      }
      this.sensorList = res.sensorList
      this.gatewayList = res.gatewayList
      this.companyList = res.companyList
      this.userList = res.userList
    },
    // 查询具体传感器信息
    getSensor (id) {
      this.$router.push({
        name: 'sensor',
        params: {
          id: id
        }
      })
    },
    getGateway (id) {
      this.$router.push({
        name: 'gateway',
        params: {
          id: id
        }
      })
    },
    showCompany (name) {
      this.$router.push({
        name: 'company',
        params: {
          companyName: name
        }
      })
    },
    bestMatch (id) {
      this.$router.push({
        name: 'solution',
        params: {
          id: id
        }
      })
    },
    bestMatch2 (id) {
      this.$router.push({
        name: 'Gsolution',
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style>
.el-breadcrumb {
    margin: 15px;
}
</style>
