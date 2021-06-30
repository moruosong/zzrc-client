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
          <div>
            <el-image
              :src="imageList[typeSelect]"
              style="width: 90%;height: 90%;"
              fit="cover"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Survey',
  data() {
    return {
      typeIndex: '集团概况',
      typeList: [
        '集团概况', '产业生态圈', '产业发展', '产业思想', '投行体系'
      ],
      imageList: {
        '集团概况': require('@/assets/group/集团概况1100X623.jpg'),
        '产业生态圈': require('@/assets/group/产业生态圈1100x623.jpg'),
        '产业发展': require('@/assets/group/development.jpg'),
        '产业思想': require('@/assets/group/产业思想1100x623.jpg'),
        '投行体系': require('@/assets/group/投行体系图1100x623.jpg')
      },
      typeSelect: '集团概况'
    }
  },
  methods: {
    handleSelect(index, indexPath) {
      console.log(index, indexPath)
      this.typeSelect = index
    }
  }
}
</script>
