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
          <div style="margin: 0 auto; text-align: center">
            <el-divider />
          </div>
          <div v-if="typeSelect === '赋能体系'">
            <el-image
              :src="imageList[typeSelect]"
              style="width: 50%;height: 100%;"
              fit="fill"
            />
          </div>
          <div v-else>
            <el-image
              :src="imageList[typeSelect]"
              style="width: 90%; height: 450px"
              fit="fill"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      typeIndex: '集团布局',
      typeList: [
        '集团布局', '集团架构', '集团理念', '办公环境', '集团业务模式'
      ],
      imageList: {
        '集团布局': require('@/assets/aboutus/layout.jpg'),
        '集团架构': require('@/assets/aboutus/组织架构1100x500.jpg'),
        '集团理念': require('@/assets/aboutus/集团理念1100x500.jpg'),
        '集团业务模式': require('@/assets/aboutus/业务1100x500.jpg'),
        '办公环境': require('@/assets/aboutus/办公环境1100x500.jpg')
      },
      typeSelect: '集团布局'
    }
  },
  methods: {
    handleSelect(index, indexPath) {
      console.log(this.imageList['集团布局'])
      this.typeSelect = index
    }
  }
}
</script>

<style lang="less">
.divBorder {
    border-radius: 0px;
    border-right: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    border-left: 1px solid #eeeeee;
    border-radius: 0px;
    background-color: transparent;
    background-image: none;
    background-repeat: repeat;
    background-position: 0 0;
    background: -moz-linear-gradient(top, none, none);
    background: -o-linear-gradient(top, none, none);
    background: -ms-linear-gradient(top, none,none);
    background: linear-gradient(top, none, none);
    background: -webkit-gradient(linear, left top, left bottom, from(none), to(none));
    background-size: auto;
}
.textcontent {
  text-align: left;
  font-size:17px;
  font-family:方正毡笔黑简体;
  color:#4B4B4B;
}
</style>
