<template>
  <div>
  <el-row>
    <el-page-header @back="$router.go(-1)" content="网关数据分析"></el-page-header>
  </el-row>
  <!--为echarts准备一个具备大小的容器dom：-->
  <el-card>
    <el-row>
      <el-col :span="16">
        <div id="type" style="width: 600px;height: 400px;"></div>
      </el-col>
      <el-col :span="8"></el-col>
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
            radius: ['45%', '75%'],
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
      this.drawPie('type')
    })
  }
}
</script>
<style scoped>
  #type{
      margin-top: 15px;
      margin-bottom: 50px;
      margin-left: 120px;
      padding: 0;
      list-style: none;
      font-size: '80';
  }
</style>
