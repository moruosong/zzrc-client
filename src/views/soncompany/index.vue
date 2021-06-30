<template>
  <div style="margin-left: 50px">
    <el-row>
      <el-col :span="6">
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
      <el-col :span="16">
        <div>
          <!--<span style="font-size:30px">{{ typeSelect }}</span>
          <div style="margin: 0 auto">
            <el-divider />
          </div>-->
          <el-image
            :src="imageMap[typeSelect]"
            style="width: 80%;height: 100%; margin-left: 20px"
            fit="fill"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SonCompany',
  data() {
    return {
      typeIndex: '集团概况',
      typeList: [
        '四川中稹星耀科技集团有限公司',
        '四川中稹普优实业有限公司',
        '四川中融融创实业有限公司',
        '四川中稹滨海置业有限公司',
        '四川中稹施华洛建筑工程有限公司',
        '四川中稹怀星房地产营销策划有限公司'
      ],
      imageMap: {
        '四川中稹星耀科技集团有限公司': require('@/assets/company/xingyaokeji.jpg'),
        '四川中稹普优实业有限公司': require('@/assets/company/puyou.jpg'),
        '四川中融融创实业有限公司': require('@/assets/company/zhongrong.jpg'),
        '四川中稹滨海置业有限公司': require('@/assets/company/binhaizhiye.jpg'),
        '四川中稹施华洛建筑工程有限公司': require('@/assets/company/shihualuo.jpg'),
        '四川中稹怀星房地产营销策划有限公司': require('@/assets/company/huaixing.jpg')
      },
      typeSelect: '集团概况'
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        const name = this.$route.query.name
        this.typeIndex = name
        this.typeSelect = name
      }, 500)
    })
  },
  methods: {
    handleSelect(index, indexPath) {
      this.typeSelect = index
      // console.log(this.imageMap[this.typeSelect])
    }
  }
}
</script>
