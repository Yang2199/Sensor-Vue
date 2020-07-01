<template>
  <div>
  <el-row>
    <el-page-header @back="$router.go(-1)" content="传感器数据分析"></el-page-header>
  </el-row>
  <!--为echarts准备一个具备大小的容器dom：-->
  <el-card>
  <el-row>
      <el-col :span="16">
        <div id="type" style="width: 100%;height: 400px;"></div>
      </el-col>
      <el-col :span="8">
        耐高温
        <el-progress :text-inside="true" :stroke-width="20" :percentage="65" :format="format"></el-progress>
        耐低温
        <el-progress :text-inside="true" :stroke-width="20" :percentage="39" :format="format"></el-progress>
        耐油
        <el-progress :text-inside="true" :stroke-width="20" :percentage="31" :format="format" status="warning"></el-progress>
        高防水等级
        <el-progress :text-inside="true" :stroke-width="20" :percentage="70" :format="format" status="success"></el-progress>
        广测量范围
        <el-progress :text-inside="true" :stroke-width="20" :percentage="50" :format="format"></el-progress>
        低噪声
        <el-progress :text-inside="true" :stroke-width="20" :percentage="32" :format="format" status="warning"></el-progress>
        高精度
        <el-progress :text-inside="true" :stroke-width="20" :percentage="68" :format="format"></el-progress>
        低功耗
        <el-progress :text-inside="true" :stroke-width="20" :percentage="88" :format="format" status="success"></el-progress>
        微型
        <el-progress :text-inside="true" :stroke-width="20" :percentage="21" :format="format" status="warning"></el-progress>
        抗冲击
        <el-progress :text-inside="true" :stroke-width="20" :percentage="5" :format="format" status="warning"></el-progress>
        长寿命
        <el-progress :text-inside="true" :stroke-width="20" :percentage="31" :format="format" status="warning"></el-progress>

      </el-col>
    </el-row>
  </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: '',
  data () {
    return {
      charts: '',
      opinion: ['力传感器', '热传感器', '光传感器', '位置传感器', '气密传感器', '电磁传感器', '其它传感器', '扭矩传感器'],
      opinionData: [
        { value: 65, name: '力传感器' },
        { value: 59, name: '热传感器' },
        { value: 82, name: '光传感器' },
        { value: 46, name: '位置传感器' },
        { value: 2, name: '气密传感器' },
        { value: 13, name: '电磁传感器' },
        { value: 97, name: '其它传感器' },
        { value: 16, name: '扭矩传感器' }
      ]
    }
  },
  methods: {
    format (percentage) {
      return percentage > 66 ? '较多' : percentage > 35 ? '中等' : '较少'
    },
    drawPie (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          fontSize: '100',
          data: this.opinion
        },
        series: [
          {
            name: '传感器类型',
            type: 'pie',
            radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            label: {
              // normal: {
              //   show: false,
              //   position: 'center'
              // },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '80',
                  fontWeight: 'blod'
                }
              }
            },
            // labelLine: {
            //   normal: {
            //     show: false
            //   }
            // },
            data: this.opinionData
          }
        ]
      })
    }
  },
  // 调用
  mounted () {
    this.$nextTick(function () {
      this.drawPie('type')
    })
  }
}
</script>
<style scoped>
  #type{
      margin-top: 15px;
      margin-bottom: 20px;
      margin-left: 20px;
      padding: 0;
      list-style: none;
      font-size: '80';
  }

  .el-progress{
    padding-top: 10px;
    padding-bottom: 15px;
  }
</style>
