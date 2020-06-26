<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-page-header @back="$router.push('/welcome')" content="传感器"></el-page-header>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="small" icon="el-icon-circle-plus" round  @click="$router.push('/addsensor')">添加</el-button>
      </el-col>
    </el-row>
    <el-card>
      <el-row type="flex" align="middle">
        <el-col :span="3">
          <el-select v-model="queryInfo.type" placeholder="请选择传感器类型">
          <el-option
            v-for="item in typeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-col>
        <el-col :span="21">
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
        </el-col>
      </el-row>
      <!--表格显示-->
      <el-table :data='tableData' style='width: 100%' height='458' stripe>
        <el-table-column sortable
          fixed
          prop='sensorName'
          label='型号'
          width='180'
        ></el-table-column>
        <el-table-column prop='sensorType' label='类型' width='160' sortable></el-table-column>
        <el-table-column sortable prop='companyName' label='出品公司' width='160'></el-table-column>
        <el-table-column sortable prop='tempMin,tempMax' label='工作温度' width='160'>
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
        <el-table-column fixed='right' prop='button' label='操作' width='150'>
          <template slot-scope="scope">
            <el-button type="primary" @click="getDevice(scope.row.sensorId)" icon="el-icon-search" size="small"></el-button>
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
        type: '', // 传感器类型
        condition: '', // 传感器条件
        total: 0, // 条目总数
        pageNum: 1, // 当前页
        pageSize: 7 // 每页条目数
      },
      // 数据
      tableData: [],
      // 选项
      typeOption: [{
        value: '',
        label: '全部种类'
      }, {
        value: '力传感器',
        label: '力传感器'
      }, {
        value: '热传感器',
        label: '热传感器'
      }, {
        value: '光传感器',
        label: '光传感器'
      }, {
        value: '位置传感器',
        label: '位置传感器'
      }, {
        value: '气密传感器',
        label: '气密传感器'
      }, {
        value: '电磁传感器',
        label: '电磁传感器'
      }, {
        value: '扭矩传感器',
        label: '扭矩传感器'
      }, {
        value: '其它传感器',
        label: '其它传感器'
      }],
      featureOption: []
    }
  },
  // 监听数据变化，查询数据
  watch: {
    'queryInfo.type': {
      handler (val, oldVal) {
        this.queryInfo.pageNum = 1
        this.getList()
      }
    },
    featureOption: {
      handler (val, oldVal) {
        this.queryInfo.pageNum = 1
        this.queryInfo.condition = this.featureOption.join(',')
        this.getList()
      }
    }
  },
  created () {
    this.getList()
    this.$emit('flushMenu', '/list/sensor')
  },
  methods: {
    // 向后端查询数据
    async getList () {
      const { data: res } = await this.$http.get('SensorView', {
        params: this.queryInfo
      })
      if (res.code === 404) {
        return this.$message.error('未找到要求的传感器，请切换查询条件。')
      } else if (res.code !== 200) {
        return this.$message.error('获取传感器数据失败，请重试。')
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
        name: 'sensor',
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
