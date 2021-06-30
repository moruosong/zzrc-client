<template>
  <div style="margin-left: 50px">
    <el-row>
      <el-col :span="4">
        <div>
          <el-menu
            :default-active="typeIndex"
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <el-menu-item v-for="(item, index) in typeList" :key="index" :index="item">
              <span slot="title">{{ item }}</span>
            </el-menu-item>
          </el-menu>
        </div>
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
      <el-col :span="18">
        <div>
          <span style="font-size:30px">{{ typeSelect }}</span>
          <div style="margin: 0px 20px">
            <el-divider />
          </div>
          <div v-if="!isInvest">
            <div v-if="imageList[typeSelect]">
              <el-image
                :src="imageList[typeSelect]"
                style="width:90%; height: 90%"
                fit="cover"
              />
            </div>
            <div v-else>
              <span>正在上传...</span>
            </div>
          </div>
          <div v-else>
            <invest />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import invest from './components/invest'

export default {
  name: 'Business',
  components: { invest },
  data() {
    return {
      isInvest: false,
      typeIndex: '文旅康养',
      typeList: [
        '文旅康养', '影视文化', '地产开发', '项目并购', '大农业', '体育产业', '科技创新', '教育产业', '项目投资'
      ],
      typeSelect: '文旅康养',
      imageList: {
        '文旅康养': require('@/assets/business/88.jpg'),
        '影视文化': require('@/assets/business/77.jpg'),
        '地产开发': require('@/assets/business/55.jpg'),
        '项目并购': require('@/assets/business/66.jpg'),
        '科技创新': require('@/assets/business/22.jpg'),
        '大农业': require('@/assets/business/11.jpg'),
        '教育产业': require('@/assets/business/33.jpg'),
        '体育产业': require('@/assets/business/44.jpg'),
        '项目投资': require('@/assets/business/99.jpg')
      }
    }
  },
  methods: {
    handleSelect(index, indexPath) {
      console.log(index, indexPath)
      this.typeSelect = index
      if (index === '项目投资') {
        this.isInvest = true
      } else {
        this.isInvest = false
      }
    }
  }
}
</script>
