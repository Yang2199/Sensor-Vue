<template>
<div>
    <el-row>
      <el-col :span="20">
        <el-page-header @back="$router.go(-1)" content="公司"></el-page-header>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="small" icon="el-icon-edit" round :disabled="true" @click="editDevice()">编辑</el-button>
      </el-col>
    </el-row>
    <el-card >
      <h1 style="padding-bottom:30px;font-size:30px;">{{companyName}}</h1>
      <div>
        <el-row>
           <el-col :span="24" >{{companyInfo}}</el-col> <!--style="text-align:left"-->
        </el-row>
      </div>
      <div>
        <h3>相关产品</h3>
        <!--表格显示-->
        <el-table :data='sensorList' style='width: 100%' height='458' stripe>
        <el-table-column sortable
          fixed
          prop='sensorName'
          label='型号'
          width='130'
        ></el-table-column>
        <el-table-column prop='sensorType' label='类型' width='200' sortable></el-table-column>
        <el-table-column sortable prop='companyName' label='出品公司' width='200'></el-table-column>
        <el-table-column sortable prop='tempMin,tempMax' label='工作温度' width='240'>
          <template slot-scope="scope">
            {{scope.row.tempMin}}-{{scope.row.tempMax}}℃
          </template>
        </el-table-column>
        <el-table-column sortable prop='outputMin,outputMax' label='输出范围' width='240'>
          <template slot-scope="scope">
            {{scope.row.outputMin}}-{{scope.row.outputMax}}V
          </template>
        </el-table-column>
        <el-table-column fixed='right' prop='button' label='操作' width='140'>
          <template slot-scope="scope">
            <el-button type="primary" @click="getDevice(scope.row.sensorId)" icon="el-icon-search" size="small"></el-button>
            <el-button type="warning" @click="bestMatch(scope.row.sensorId)" icon="el-icon-s-operation" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      companyName: '',
      companyInfo: '',
      sensorList: []
    }
  },
  async created () {
    // 远端查询数据
    var companyName = this.$route.params.companyName
    this.companyName = companyName
    const { data: res } = await this.$http.get('CompanyDetail', {
      params: {
        companyName: companyName
      }
    })
    if (res.code !== 200) {
      this.$message.error('获取公司信息失败。')
      return this.$router.go(-1)
    }
    this.companyInfo = res.companyInfo
    this.sensorList = res.sensorList
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
    getDevice (id) {
      this.$router.push({
        name: 'sensor',
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
.el-row {
    height: 45px;
}
</style>
