<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-page-header @back="$router.push('/welcome')" content="解决方案"></el-page-header>
      </el-col>
    </el-row>
    <el-card>
      <!--表格显示-->
      <el-table :data='tableData' style='width: 100%' stripe>
        <el-table-column sortable
          fixed
          prop='sensorName'
          label='传感器型号'
          width='225'
        ></el-table-column>
        <el-table-column sortable
          fixed
          prop='gatewayName'
          label='网关型号'
          width='225'
        ></el-table-column>
        <el-table-column sortable prop='username' label='创建者' width='175'></el-table-column>
        <el-table-column sortable prop='summary' label='概述' width='575'></el-table-column>
        <!--<el-table-column sortable prop='updateTime' label='更新时间' width='200'></el-table-column> -->
        <el-table-column fixed='right' prop='button' label='操作' width='100'>
          <template slot-scope="scope">
            <el-button type="primary" @click="getSolution(scope.row.solutionId)" icon="el-icon-search" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        :total="queryInfo.total"
        layout="total, prev, pager, next">
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
      tableData: []
    }
  },
  created () {
    this.getList()
    this.$emit('flushMenu', '/list/solution')
  },
  methods: {
    // 向后端查询数据
    async getList () {
      const { data: res } = await this.$http.get('allSolution', {
        params: this.queryInfo
      })
      if (res.code === 404) {
        return this.$message.error('未找到要求的方案，请切换查询条件。')
      } else if (res.code !== 200) {
        return this.$message.error('获取方案数据失败，请重试。')
      }
      this.total = res.total
      this.tableData = res.solutions
    },
    // 换页
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getList()
    },
    // 查询具体传感器信息
    getSolution (id) {
      this.$router.push({
        name: 'SolutionDetail',
        params: {
          id: id
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
    }
  }
}
</script>

<style>
.el-breadcrumb {
    margin: 15px;
}

</style>
