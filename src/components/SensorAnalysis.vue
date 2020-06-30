<template>
  <div>
  <el-row>
    <el-page-header @back="$router.go(-1)" content="传感器数据分析"></el-page-header>
  </el-row>
  <!--为echarts准备一个具备大小的容器dom：-->
  <el-card>
  <div id="main" style="width: 1000px;height: 400px;"></div>
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
            radius: ['45%', '75%'],
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
      this.drawPie('main')
    })
  }
}
</script>
<style scoped>
  #main{
      margin-top: 15px;
      margin-bottom: 50px;
      margin-left: 120px;
      padding: 0;
      list-style: none;
      font-size: '80';
  }
</style>
