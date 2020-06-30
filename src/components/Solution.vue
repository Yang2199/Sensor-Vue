<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-page-header @back="$router.push('/welcome')" :content="sensorInfo.sensorName + ' (' + sensorInfo.sensorType + ')'">
        </el-page-header>
      </el-col>
    </el-row>
    <el-card>
      <el-row type="flex" align="middle" style="height:60px;">
        <el-col :span="24" style="font-weight:bold;">
          可用方案
        </el-col>
      </el-row>
      <!--表格显示-->
      <el-table :data='solution' style='width: 100%' stripe>
        <el-table-column sortable
          fixed
          prop='gatewayName'
          label='网关型号'
          width='225'
        ></el-table-column>
        <el-table-column sortable prop='username' label='创建者' width='175'></el-table-column>
        <el-table-column sortable prop='summary' label='概述' width='575'></el-table-column>
        <!--<el-table-column sortable prop='updateTime' label='更新时间' width='200'></el-table-column> -->
        <el-table-column fixed='right' prop='button' label='操作' width='160'>
          <template slot-scope="scope">
            <el-button type="primary" @click="getSolution(scope.row.solutionId)" icon="el-icon-search" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分割 -->
    <el-card>
      <el-row type="flex" align="middle" style="height:60px;">
        <el-col :span="24" style="font-weight:bold;">
          最佳匹配网关
        </el-col>
      </el-row>
      <!--表格显示-->
      <el-table :data='bestMatch' style='width: 100%' stripe>
        <el-table-column sortable
          fixed
          prop='gatewayName'
          label='型号'
          width='225'
        ></el-table-column>
        <el-table-column sortable prop='companyName' label='出品公司' width='225'></el-table-column>
        <el-table-column sortable prop='tempMin,tempMax' label='工作温度' width='175'>
          <template slot-scope="scope">
            {{scope.row.tempMin}} - {{scope.row.tempMax}} ℃
          </template>
        </el-table-column>
        <el-table-column sortable prop='inputType' label='输入类型' width='225'>
          <template  slot-scope="scope">
            <div v-if="scope.row.inputType === 2">模拟信号，数字信号</div>
            <div v-else-if="scope.row.inputType === 1">数字信号</div>
            <div v-else-if="scope.row.inputType === 0">模拟信号</div>
          </template>
        </el-table-column>
        <el-table-column sortable prop='inputMin,inputMax' label='输入范围' width='150'>
          <template slot-scope="scope">
            {{scope.row.inputMin}} - {{scope.row.inputMax}} V
          </template>
        </el-table-column>
        <el-table-column sortable prop='updateTime' label='更新时间' width='200'></el-table-column>
        <el-table-column fixed='right' prop='button' label='操作' width='160'>
          <template slot-scope="scope">
            <el-button type="primary" @click="getDevice(scope.row.gatewayId)" icon="el-icon-search" size="small"></el-button>
            <el-button type="warning" @click="showAddSolution(scope.row.gatewayId, scope.row.gatewayName)" icon="el-icon-plus" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 按钮 -->
      <el-button type="success" @click="matchAll" round style="margin:50px;">不满意？查询全部</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      solutionQuery: {
        summary: '',
        gatewayId: '',
        gatewayName: ''
      },
      // 查询信息
      queryInfo: {
        type: '', // 传感器类型
        condition: '', // 传感器条件
        total: 0, // 条目总数
        pageNum: 1, // 当前页
        pageSize: 7 // 每页条目数
      },
      // 数据
      sensorInfo: {},
      bestMatch: [],
      solution: [],
      // 选项
      typeOption: [{
        value: '',
        label: '全部'
      }],
      featureOption: []
    }
  },
  // 监听数据变化，查询数据
  watch: {
    featureOption: {
      handler (val, oldVal) {
        this.queryInfo.pageNum = 1
        this.queryInfo.condition = this.featureOption.join(',')
        this.getList()
      }
    }
  },
  created () {
    this.getSensor()
    this.getBestMatch()
    this.$emit('flushMenu', '/list/solution')
  },
  methods: {
    // 向后端查询数据
    async getSensor () {
      const { data: res } = await this.$http.get('SensorDetail', {
        params: {
          sensorId: this.$route.params.id
        }
      })
      if (res.code !== 200) {
        this.$message.error('获取传感器信息失败。')
        return this.$router.go(-1)
      }
      this.sensorInfo = res.data
    },
    // 向后端查询数据
    async getBestMatch () {
      const { data: res } = await this.$http.get('sensorBestMatch', {
        params: {
          sensorId: this.$route.params.id
        }
      })
      if (res.code === 404) {
        return this.$message.error('未找到要求的网关，请切换查询条件。')
      } else if (res.code !== 200) {
        return this.$message.error('获取网关数据失败，请重试。')
      }
      this.bestMatch = res.list
      this.solution = res.solutions
    },
    // 向后端查询具体方案
    getSolution (id) {
      this.$router.push({
        name: 'SolutionDetail',
        params: {
          id: id
        }
      })
    },
    // 跳转全部匹配
    matchAll () {
      this.$router.push({
        name: 'solutionAll',
        params: {
          id: this.$route.params.id
        }
      })
    },
    // 换页
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      // this.getList()
    },
    // 查询具体传感器信息
    getDevice (id) {
      this.$router.push({
        name: 'gateway',
        params: {
          id: id
        }
      })
    },
    showAddSolution (gatewayId, gatewayName) {
      this.solutionQuery.gatewayId = gatewayId
      this.solutionQuery.gatewayName = gatewayName
      this.$prompt('请输入方案概述', '添加方案', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.addSolution(value)
      })
    },
    // s
    async addSolution (summary) {
      const { data: res } = await this.$http.post('addSolution', {
        username: window.sessionStorage.getItem('username'),
        summary: summary,
        gatewayId: this.solutionQuery.gatewayId,
        gatewayName: this.solutionQuery.gatewayName,
        sensorId: this.sensorInfo.sensorId,
        sensorName: this.sensorInfo.sensorName,
        note: ''
      })
      if (res.code !== 200) return this.$message.error('添加失败，请重试。')
      this.$message.success('方案添加成功。')
      this.$router.push({
        name: 'SolutionDetail',
        params: {
          id: res.solutionId
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
