<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-page-header @back="$router.push('/welcome')" content="网关匹配"></el-page-header>
      </el-col>
    </el-row>
    <el-card>
      <el-row type="flex" align="middle" style="height:60px;">
        <el-col :span="6" style="font-weight:bold;">
          传感器： {{sensorInfo.sensorName}}（{{sensorInfo.sensorType}}）
        </el-col>
        <el-col :span="4" style="text-align:left;font-weight:bold;">
           {{sensorInfo.companyName}}
        </el-col>
      </el-row>
      <!--表格显示-->
      <el-table :data='tableData' style='width: 100%' height='458' stripe>
        <el-table-column sortable
          fixed
          prop='gatewayName'
          label='型号'
          width='150'
        ></el-table-column>
        <el-table-column prop='sensorType' label='类型' width='120' sortable>网关</el-table-column>
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
            <el-button type="primary" @click="getDevice(scope.row.gatewayId)" icon="el-icon-search" size="small"></el-button>
            <el-button type="warning" icon="el-icon-star-off" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        layout="total, prev, pager, next"
        :total="queryInfo.total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 查询信息
      queryInfo: {
        sensorId: this.$route.params.id,
        total: 0, // 条目总数
        pageNum: 1, // 当前页
        pageSize: 7 // 每页条目数
      },
      // 数据
      sensorInfo: {},
      tableData: [],
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
    this.getList()
    this.$emit('flushMenu', '/solution')
  },
  methods: {
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
    async getList () {
      const { data: res } = await this.$http.get('sensorAllMatch', {
        params: this.queryInfo
      })
      if (res.code === 404) {
        return this.$message.error('未找到要求的网关，请切换查询条件。')
      } else if (res.code !== 200) {
        return this.$message.error('获取网关数据失败，请重试。')
      }
      this.queryInfo.total = res.total
      this.tableData = res.data
    },
    // 换页
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getList()
    },
    // 查询具体传感器信息
    getDevice (id) {
      this.$router.push({
        name: 'gateway',
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
