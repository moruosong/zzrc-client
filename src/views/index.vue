<template>
  <el-container class="all">
    <el-aside v-if="isCollapse" class="hidden-md-and-up" style="padding: 0 0 0 0">
      <el-menu :default-active="activeName" :router="true" style="width: 100%; height: 100%;" @select="gotoPage">
        <el-menu-item index="/home" route="/home">首页</el-menu-item>
        <el-menu-item index="/aboutus" route="/aboutus">关于我们</el-menu-item>
        <el-menu-item index="/survey" route="/survey">集团概况</el-menu-item>
        <el-menu-item index="/business" route="/business">业务中心</el-menu-item>
        <el-menu-item index="/culture" route="/culture">企业文化</el-menu-item>
        <el-menu-item index="/shownews" route="/shownews">新闻动态</el-menu-item>
        <el-menu-item index="/ability" route="/ability">人才理念</el-menu-item>
        <el-menu-item index="/contact" route="/contact">联系我们</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="hidden-sm-and-down">
        <el-row>
          <el-col :span="12">
            <el-menu :default-active="activeName" mode="horizontal" :router="true" @select="gotoPage">
              <el-menu-item index="/home" route="/home">首页</el-menu-item>
              <el-menu-item index="/aboutus" route="/aboutus">关于我们</el-menu-item>
              <el-menu-item index="/survey" route="/survey">集团概况</el-menu-item>
              <el-menu-item index="/business" route="/business">业务中心</el-menu-item>
              <el-menu-item index="/culture" route="/culture">企业文化</el-menu-item>
              <el-menu-item index="/shownews" route="/shownews">新闻动态</el-menu-item>
              <el-menu-item index="/ability" route="/ability">人才理念</el-menu-item>
              <el-menu-item index="/contact" route="/contact">联系我们</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="12">
            <el-image :src="logourl" style="width: 100%; height: 70px" fit="contain" />
          </el-col>
        </el-row>
      </el-header>
      <el-header class="hidden-md-and-up">
        <el-row style="width: 100%; height: 100%">
          <el-col :span="4">
            <el-button v-if="isCollapse" icon="el-icon-s-fold" @click="() => isCollapse = !isCollapse" />
            <el-button v-else icon="el-icon-s-unfold" @click="() => isCollapse = !isCollapse" />
          </el-col>
          <el-col :span="20">
            <el-image :src="logourl" style="width: 100%; height: 40px" fit="contain" />
          </el-col>
        </el-row>
      </el-header>
      <el-main style="width: 100%; height: 100%">
        <el-carousel v-show="isTrue" height="500px">
          <el-carousel-item v-for="(item, index) in rotation" :key="index" style="background-color: #d3dce6;">
            <el-image :src="item.path" style="width: 100%; height: 100%" fit="cover" />
          </el-carousel-item>
        </el-carousel>
        <el-divider v-if="isTrue" />
        <el-image
          v-if="!isTrue"
          style="width: 100%; height: 500px"
          :src="pic"
          fit="fill"
        />
        <router-view style="width: 80%; margin: 0 auto" />
        <div class="foot">
          <span style="font-family: Tahoma;color: #f3f3f3;font-size: 14px;line-height: 47px;">版权所有: 中稹融创 电话: 028-85237573 邮箱: zzrc_group@163.com 地址: 四川省成都市高新区楚峰国际中心 2903</span>
        </div>
        <div class="foot2">
          <el-link type="info" :underline="false" href="https://beian.miit.gov.cn/#/Integrated/index">蜀ICP备2020028211号-1</el-link>
        </div>
      </el-main>
      <!--<el-footer>
      </el-footer>-->
    </el-container>
  </el-container>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'

export default {
  name: 'Index',
  data() {
    return {
      activeName: '/home',
      isCollapse: false,
      logourl: require('../assets/img/newlogo.jpg'),
      rotation: [],
      isTrue: true,
      pic: require('@/assets/img/招聘.jpg')
    }
  },
  watch: {
    '$route': function(to, from) {
      console.log(to, from)
      this.activeName = to.path
    }
  },
  mounted() {
    this.$http({
      method: 'post',
      url: '/banner/getAllBanner',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      console.log(res)
      this.rotation = res.data.object
    })
    if (this.$router.history.current.path === '/ability' || this.$router.history.current.path === '/joinus') {
      this.isTrue = false
    } else {
      this.isTrue = true
    }
  },
  methods: {
    gotoPage(index, indexPath) {
      console.log(index, indexPath)
      if (index === '/ability') {
        this.isTrue = false
      } else {
        this.isTrue = true
      }
    }
  }
}
</script>
<style lang="less">
  .foot2 {
    margin-top: 20px;
    color: rgb(152, 152, 152);
    font-size: 12px;
    font-weight: 400;
  }
  .foot{
    text-align: center;
    font: 12px/1 "Microsoft YaHei","微软雅黑","arial","tahoma","MicrosoftJhengHei";
    background-color: rgb(228, 57, 60);
    background-image: none;
    background-position: 50% 50%;
    background-repeat: repeat;
    background-size: auto;
    z-index: -1;
  }
  .menuDiv {
    margin: 0, 100px;
    height: 100px
  }
  .all {
    width: 100%;
    height: 100%
  }
  el-menu-item {
    height: 100%;
    padding-top: 30px
  }
</style>
