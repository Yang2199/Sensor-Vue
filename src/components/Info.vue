<template>
<div>
    <el-row>
      <el-col :span="20">
        <el-page-header @back="$router.push('/welcome')" content="用户"></el-page-header>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="small" icon="el-icon-edit" round  @click="$router.push('/changekey')">修改密码</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" round  @click="deleteConfirm">注销账户</el-button>
      </el-col>
    </el-row>
    <el-card >
      <h1 style="font-size:35px;padding-bottom:30px;">{{myinfo.username}}</h1>
      <p></p>
      <p></p>
      <div>
        <el-row style="height:60px;">
          <el-col :span="8" :offset="8">
            <p v-show="!showEdit.phone">
              <el-button type="primary" size="mini" icon="el-icon-edit" style="visibility:hidden"></el-button>
              电话：{{myinfo.mobilePhone}}
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEdit.phone = !showEdit.phone"></el-button>
            </p>
            <el-input v-model="myinfo.mobilePhone" v-show="showEdit.phone" @blur="showEdit.phone = !showEdit.phone;editUser()"></el-input>
          </el-col>
        </el-row>
        <el-row style="height:60px;">
          <el-col :span="8" :offset="8">
            <p v-show="!showEdit.email">
              <el-button type="primary" size="mini" icon="el-icon-edit" style="visibility:hidden"></el-button>
              邮箱：{{myinfo.email}}
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEdit.email=!showEdit.email"></el-button>
            </p>
            <el-input v-model="myinfo.email" v-show="showEdit.email" @blur="showEdit.email=!showEdit.email;editUser()"></el-input>
          </el-col>
        </el-row>
        <el-row style="height:60px;">
          <el-col :span="16" :offset="4">
            <p v-show="!showEdit.description">
              <el-button type="primary" size="mini" icon="el-icon-edit" style="visibility:hidden"></el-button>
              详情：{{myinfo.description}}
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEdit.description = !showEdit.description"></el-button>
            </p>
            <el-input v-model="myinfo.description" v-show="showEdit.description" @blur="showEdit.description = !showEdit.description;editUser()"></el-input>
          </el-col>
        </el-row>
        <p></p>
      </div>
      </el-card>
      <el-card >
      <el-row type="flex" align="middle" style="height:60px;">
        <el-col :span="24" style="font-weight:bold;">
          我的方案
        </el-col>
      </el-row>
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
        <el-table-column sortable prop='updateTime' label='创建时间' width='240'></el-table-column>
        <el-table-column sortable prop='summary' label='概述' width='360'></el-table-column>
        <!--<el-table-column sortable prop='updateTime' label='更新时间' width='200'></el-table-column> -->
        <el-table-column fixed='right' prop='button' label='操作' width='100'>
          <template slot-scope="scope">
            <el-button type="primary" @click="getSolution(scope.row.solutionId)" icon="el-icon-search" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      myinfo: {},
      showEdit: {
        phone: false,
        email: false,
        description: false
      },
      tableData: []
    }
  },
  async created () {
    // 远端查询数据
    var username = window.sessionStorage.getItem('username')
    const { data: res } = await this.$http.get('getUser/' + username)
    if (res.code !== 200) {
      this.$message.error('获取用户信息失败，请重试。')
      return this.$router.go(-1)
    }
    this.myinfo = res.data
    this.getList()
    this.$emit('flushMenu', '/info')
  },
  methods: {
    // 向后端查询数据
    async getList () {
      const { data: res } = await this.$http.get('mySolution', {
        params: {
          username: window.sessionStorage.getItem('username')
        }
      })
      if (res.code === 404) {
        return this.$message.error('未找到要求的方案，请切换查询条件。')
      } else if (res.code !== 200) {
        return this.$message.error('获取方案数据失败，请重试。')
      }
      this.tableData = res.solutions
    },
    // 弹出框确认删除用户
    deleteConfirm () {
      this.$prompt('请再次输入密码确认', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'password'
      }).then(({ value }) => {
        this.deleteUser(value)
      })
    },
    // 删除用户
    async deleteUser (passConfirm) {
      const { data: res } = await this.$http.post('deleteUser', {
        username: window.sessionStorage.getItem('username'),
        password: passConfirm
      })
      if (res.code !== 200) return this.$message.error('删除失败，请重试。')
      this.$message.success('用户删除成功')
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async editUser () {
      const { data: res } = await this.$http.post('updateUser', {
        username: window.sessionStorage.getItem('username'),
        email: this.myinfo.email,
        mobilePhone: this.myinfo.mobilePhone,
        description: this.myinfo.description
      })
      if (res.code !== 200) return this.$message.error('修改失败，请重试。')
      this.$message.success('用户信息修改成功。')
    },
    getSolution (id) {
      this.$router.push({
        name: 'SolutionDetail',
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
