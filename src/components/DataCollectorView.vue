<template>
  <div class="cView">
    <el-row>
      <el-col :span="20">
        <el-page-header @back="$router.push('/welcome')" content="数据采集器"></el-page-header>
      </el-col>
    </el-row>
    <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 1 : 0">
      <el-card class="mycard">
        <img src="https://assets.balluff.com/product_detail_1280x1280/54527_01_P_09_isofront_00_00.png" class="image2">
        <h3>智慧OCR文字识别相机 BVS0029</h3>
        <div class="text">
        <p>智慧OCR文字识别相机 BVS0029，操作简易的智慧型摄影机具备执行视觉可追溯性任务的所有功能。其可透过一维、二维、堆叠式或直接标示条码以及OCR 文字确实识别到零组件或产品。检测结果可透过专业网路或以太网IP 传送至上级系统。透过以太网TCP/IP 能储存图片。</p>
        </div>
        <el-link href="https://www.balluff.com/local/hk/productfinder/#/ca/A0005/cg/G0502/product/F05202/variant/PV174905">查看详情<i class="el-icon-view el-icon--right"></i> </el-link>
      </el-card>
    </el-col>
    <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 1 : 0">
      <el-card class="mycard">
        <img src="https://assets.balluff.com/product_detail_1280x1280/53541_01_P_00_00_00_HDW.png" class="image3">
        <h3>手持式条码读取器 BVS001Z</h3>
        <div class="text">
        <p>巴鲁夫BVS HS-P 系列的手持式条码扫描器能快速且可靠地读取一般二维、一维及堆叠条码。读取器经久耐用的，并同时具备高读取功效与用户友善性。本公司的读取器适用于严峻的工业使用条件以及仓库和内部物流的应用,其在有特殊要求的应用中的工作范围及使用几乎不受限制。</p>
        </div>
        <el-link href="https://www.balluff.com/local/hk/productfinder/#/ca/A0005/cg/G0502/product/F05203/variant/PV150441">查看详情<i class="el-icon-view el-icon--right"></i> </el-link>
      </el-card>
    </el-col>
    <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 1 : 0">
      <el-card class="mycard">
        <img src="https://mall.industry.siemens.com/collaterals/files/86/JPG/P_FS10_XX_01306j.JPG" class="image1">
        <h3>光学读码器 SIMATIC MV540</h3>
        <div class="text">
        <p>光学读码器 SIMATIC MV500 设备提供了具有较高图像分辨率的一系列不同设备。新的功能特性包括提供了第二个以太网接口（见照片）以及新的字符集识别能力和处理器技术。可读取代码清单包括所有常见的矩阵码和条码，不管所用的印刷技术和载体介质如何，都能够可靠识别。</p>
        </div>
        <el-link href="https://mall.industry.siemens.com/mall/zh/cn/Catalog/Products/10346309?activeTab=product#%E6%8A%80%E6%9C%AF%E8%A7%84%E8%8C%83">查看详情<i class="el-icon-view el-icon--right"></i> </el-link>
      </el-card>
    </el-col>
    <el-col>
      <el-card class="mycard">
        <h3>光学读码器 SIMATIC MV540</h3>
        <div class="text">
        <p>光学读码器 SIMATIC MV500 设备提供了具有较高图像分辨率的一系列不同设备。新的功能特性包括提供了第二个以太网接口（见照片）以及新的字符集识别能力和处理器技术。可读取的代码清单包括所有常见的矩阵码和条码，不管所用的印刷技术和载体介质如何，都能够可靠识别。由于可自由选择的新型透镜和照明灯具有扩展功能范围，其在有特殊要求的应用中的工作范围及使用几乎不受限制。它们具有坚固的外壳和高 IP67 防护等级，甚至可在极为恶劣的工业环境条件下使用。</p>
        </div>
        <el-link href="https://mall.industry.siemens.com/collaterals/files/86/JPG/P_FS10_XX_01306j.JPG">查看图片<i class="el-icon-view el-icon--right"></i> </el-link>
      </el-card>
      <el-card class="mycard">
        <h3>智慧OCR文字识别相机 BVS0029</h3>
        <div class="text">
        <p>智慧OCR文字识别相机 BVS0029，操作简易的智慧型摄影机具备执行视觉可追溯性任务的所有功能。其可透过一维、二维、堆叠式或直接标示条码以及OCR 文字确实识别到零组件或产品。检测结果可透过专业网路或乙太网IP 传送至上级系统。透过乙太网TCP/IP 能储存图片。</p>
        </div>
        <el-link href="https://assets.balluff.com/product_detail_1280x1280/54527_01_P_09_isofront_00_00.png">查看图片<i class="el-icon-view el-icon--right"></i> </el-link>
      </el-card>
      <el-card class="mycard">
        <h3>手持式条码读取器 BVS001Z</h3>
        <div class="text">
        <p>巴鲁夫BVS HS-P 系列的手持式条码扫描器能快速且可靠地读取一般二维、一维及堆叠条码。读取器经久耐用的，并同时具备高读取功效与用户友善性。本公司的读取器适用于严峻的工业使用条件以及仓库和内部物流的应用。</p>
        </div>
        <el-link href="https://assets.balluff.com/product_detail_1280x1280/53541_01_P_00_00_00_HDW.png">查看图片<i class="el-icon-view el-icon--right"></i> </el-link>
      </el-card>
      </el-col>
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
.cView{
  margin-bottom: 50px;
}

.el-card {
  margin-bottom: 25px;
  background-color: #ffffff;
}

.text{
  text-indent:40px;
  margin-bottom: 25px;
  background-color: #ffffff;
  text-align: left;
}

.image1 {
  width: 66%;
  display: block;
}
.image2 {
  width: 80%;
  display: block;
}
.image3 {
  width: 80%;
  display: block;
}

</style>
