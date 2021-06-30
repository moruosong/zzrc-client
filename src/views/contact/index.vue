<template>
  <div style="margin: 10px">
    <el-row>
      <el-col :span="6" :xs="24">
        <div class="divBorder" style="text-align: left; margin-top: 20px;">
          <div>
            <a href="#">
              <span style="font-size: 16px; line-height:30px">网址：</span>
              <span style="font-size: 16px; line-height:30px; word-break: break-all;">www.zhongzhenrc.com</span>
            </a>
          </div>
          <div><span style="color:#cc0000;font-size: 16px; line-height:30px">中稹融创实业集团有限公司</span></div>
          <div><span style="font-size: 16px; line-height:30px">电话：028-85237573</span></div>
          <div><span style="font-size: 16px; line-height:30px">地址：四川省成都市高新区楚峰国际中心 2903</span></div>
          <br>
          <div><span style="color:#cc0000; font-size: 16px; line-height:30px">四川中稹滨海置业有限公司</span></div>
          <div><span style="font-size: 16px; line-height:30px">地址：四川省成都市高新区楚峰国际中心 2903</span></div>
        </div>
      </el-col>
      <el-col :span="10">
        <div style="text-align: right">
          <baidu-map
            id="allmap"
            :scroll-wheel-zoom="true"
            :zoom="zoom"
            @ready="mapReady"
          >
            <bm-marker :zoom="zoom" :position="point" animation="BMAP_ANIMATION_BOUNCE" />
          </baidu-map>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <el-image
            style="width: 60%; height: 100%;"
            :src="erweima"
            fit="cover"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      erweima: require('@/assets/img/erweima.jpg'),
      point: '',
      zoom: 20
    }
  },
  methods: {
    mapReady({ BMap, map }) {
      // 选择一个经纬度作为中心点
      this.point = new BMap.Point(104.070091, 30.584569)
      map.centerAndZoom(this.point, this.zoom)
    }
  }
}
</script>
<style lang="less" scoped>
/* 设定地图的大小 */
#allmap{
  height: 300px;
  width: auto;
  margin: 0 auto;
}
</style>>
