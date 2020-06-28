<template>
  <!-- <el-row>
    <el-page-header @back="$router.go(-1)" content="网关数据分析"></el-page-header>
  </el-row> -->
  <!--为echarts准备一个具备大小的容器dom：-->
  <div id="main" style="width: 960px;height: 600px;"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: '',
  data () {
    return {
      charts: '',
      opinion: ['耐低温', '高精度', '低功耗', '广测量范围', '抗冲击', '长寿命', '其他特性'],
      opinionData: [
        { value: 22, name: '耐低温' },
        { value: 27, name: '高精度' },
        { value: 9, name: '低功耗' },
        { value: 53, name: '广测量范围' },
        { value: 4, name: '抗冲击' },
        { value: 2, name: '长寿命' },
        { value: 12, name: '其他特性' }
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
            name: '网关特性',
            type: 'pie',
            radius: ['65%', '93%'],
            avoidLabelOverlap: false,
            label: {
              // normal: {
              //   show: false,
              //   fontSize: '80',
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
            //     fontSize: '80',
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
  * {
      margin-top: 50px;
      margin-bottom: 50px;
      margin-left: 135px;
      padding: 0;
      list-style: none;
      font-size: '80';
  }
</style>
