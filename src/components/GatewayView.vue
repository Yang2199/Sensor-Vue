<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-page-header @back="$router.push('/welcome')" content="网关"></el-page-header>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="small" icon="el-icon-circle-plus" round  @click="$router.push('/addgateway')">添加</el-button>
        <el-button type="primary" size="small" icon="el-icon-s-data" round  @click="$router.push('/analysisgateway')">分析</el-button>
      </el-col>
    </el-row>
    <el-card>
      <el-row type="flex" align="middle">
        <el-col :span="3">
          <el-select v-model="queryInfo.type" placeholder="请选择网关类型">
          <el-option
            v-for="item in typeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-col>
        <el-col :span="15">
           <el-checkbox-group v-model="featureOption">
             <el-checkbox label="耐低温"></el-checkbox>
             <el-checkbox label="广测量范围"></el-checkbox>
             <el-checkbox label="高精度"></el-checkbox>
             <el-checkbox label="低功耗"></el-checkbox>
             <el-checkbox label="抗冲击"></el-checkbox>
             <el-checkbox label="长寿命"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <!--表格显示-->
      <el-table :data='tableData' style='width: 100%' height='458' stripe>
        <el-table-column sortable
          fixed
          prop='gatewayName'
          label='型号'
          width='200'
        ></el-table-column>
        <el-table-column sortable prop='companyName' label='出品公司' width='200'></el-table-column>
        <el-table-column sortable prop='tempMin,tempMax' label='工作温度' width='150'>
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
        <el-table-column sortable prop='inputMin,inputMax' label='输入范围' width='130'>
          <template slot-scope="scope">
            {{scope.row.inputMin}} - {{scope.row.inputMax}} V
          </template>
        </el-table-column>
        <el-table-column sortable prop='updateTime' label='更新时间' width='160'></el-table-column>
        <el-table-column fixed='right' prop='button' label='操作' width='160'>
          <template slot-scope="scope">
            <el-button type="primary" @click="getDevice(scope.row.gatewayId)" icon="el-icon-search" size="small"></el-button>
            <el-button type="warning" @click="bestMatch(scope.row.gatewayId)" icon="el-icon-s-operation" size="small"></el-button>
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
        label: '全部'
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
    this.$emit('flushMenu', '/list/gateway')
  },
  methods: {
    // 向后端查询数据
    async getList () {
      const { data: res } = await this.$http.get('GatewayView', {
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
    },
    bestMatch (id) {
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
