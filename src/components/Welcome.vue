<template>
<div class="welcome">
<el-card class="mycard">
  <h3>新型压力传感器现已面世</h3>
  <p>昨日新型压力传感器 PTC304S 已宣告面世，这段时间口罩已经成为十分紧缺的防护设备，疫区的医生们供给尚不足，我们普通人手中可用的口罩更是十分有限，据估算现在口罩的紧缺短期内可能难以解决，甚至影响到企业的复工时间。所以在保证安全有效的前提下，口罩的重复使用就十分关键，操作得当就可大幅的延长我们的安全使用时间，用的更安全更节约要比盲目的搜刮囤积更有意义。适用于具有强大的性能。</p>
  <el-link href="/#/sensor/8">查看详情<i class="el-icon-view el-icon--right"></i> </el-link>
</el-card>
<el-card class="mycard">
  <h3>园区场景专用网关</h3>
  <p>WA5320X-L室外全融合物联网关，面向园区场景推出的室外型LoRa网关。产品内置LoRa网关芯片，支持国际标准LoRaWAN协议。可根据实际部署环境实现1km-10km的低功耗广域无线网络覆盖，满足园区基础设施管理（智慧井盖、智慧垃圾桶）和园区消防（消防用水监测和用电监测）等场景的窄带物联网业务承载。产品创新性的集成了一个RFID网关芯片，提供2.4GHz RFID短距离无线覆盖，可灵活与各类RFID标签配合使用，实现园区门禁及资产定位等业务应用</p>
  <el-link href="/#/gateway/141">查看详情<i class="el-icon-view el-icon--right"></i> </el-link>
</el-card>
<el-card class="mycard">
  <h3>汽车领域高精度接近传感器</h3>
  <p>871P-B20C40-N3感应式接近传感器，可以用于对输送带上的铝质工件托架进行检测。读/写头读取的数据通过带RFID模块的网关传入数据库RFID读/写头和Uprox+接近开关被安装在装配线的每个工作站上载码体被直接安装在铝制工件托架上。可以满足客户对喷油嘴装配精度和重复精度的严苛要求。</p>
  <el-link href="/#/sensor/310">查看详情<i class="el-icon-view el-icon--right"></i> </el-link>
</el-card>
<el-card class="mycard">
  <h3>高速物联网网关</h3>
  <p>NISE 50物联网系列，用于从现场的PLC或设备中获取数据，并将其上传或推送到数据库或云端。NISE 50物联网网关也可以在没有其他计算机的情况下进行简单的逻辑控制。这些数据可以帮助用户改善工艺参数或预测机器的维护计划，从而减少机器的停机时间。内置的应用程序:IoT-Studio，这将加快开发和部署时间。</p>
  <el-link href="/#/gateway/8">查看详情<i class="el-icon-view el-icon--right"></i> </el-link>
</el-card>
</div>
</template>

<script>
export default {
  created () {
    this.$emit('flushMenu', '/welcome')
  }
}
</script>

<style>
.welcome{
  margin-bottom: 50px;
}

.el-card {
  margin-bottom: 25px;
  background-color: #ffd900;
  /*
  background-color: #ffd900;
  height:100%;
  background-image: url('https://imgsa.baidu.com/forum/w%3D580/sign=6028757e37f33a879e6d0012f65d1018/41655982b2b7d0a2b9e5f2d3c6ef76094b369a26.jpg');
  background-size: cover;
  background-position: center;
  */
  /* background-attachment:fixed; */
}

</style>
