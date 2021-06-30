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
            <el-menu-item index="0">
              <span slot="title">新闻动态</span>
            </el-menu-item>
            <el-menu-item v-for="(item, index) in typeList" :key="index" :index="index">
              <span slot="title">{{ item }}</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="divBorder" style="text-align: left; margin-top: 20px;">
          <div>
            <a href="#">
              <span style="font-size: 16px; line-height:30px">网址：</span>
              <span style="font-size: 16px; line-height:30px;word-break: break-all;">www.zhongzhenrc.com</span>
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
        <div v-show="newInfo">
          <div v-if="pageNewList.length > 0">
            <ul style="list-style: none">
              <li v-for="(item, index) in pageNewList" :key="index">
                <div class="newDiv">
                  <div>
                    <el-image
                      v-if="item.picList && item.picList.length > 0"
                      style="width: 120px; height: 88px; float: left; margin-right: 10px"
                      :src="item.picList[0].path"
                      fit="cover"
                    >
                      <div slot="error" class="image-slot">
                        <span>暂无图片</span>
                      </div>
                    </el-image>
                    <el-image
                      v-else
                      style="width: 120px; height: 88px; float: left; margin-right: 10px"
                      src="#"
                      fit="cover"
                    >
                      <div slot="error" class="imageError">
                        <span>暂无图片</span>
                      </div>
                    </el-image>
                    <el-link :underline="false" @click="handleNewInfo(item.id)">
                      <div class="newsTitle">{{ item.title }}</div>
                      <div class="newsDate">{{ item.createTime }}</div>
                    </el-link>
                    <div class="view-num">
                      <span class="el-icon-view" />
                      <span style="padding-left: 5px">{{ item.viewNum }}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="newsList.length"
              :hide-on-single-page="true"
              @current-change="pageChange"
            />
          </div>
          <div v-else>
            <span>暂无数据</span>
          </div>
        </div>
        <div v-show="!newInfo">
          <new-info :news="news" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NewInfo from './newInfo/index'

export default {
  name: 'ShowNews',
  components: { NewInfo },
  data() {
    return {
      pageSize: 6,
      newInfo: true,
      typeList: [],
      typeIndex: '0',
      newsList: [],
      pageNewList: [],
      news: {}
    }
  },
  mounted() {
    const id = this.$route.query.id
    if (id) {
      this.handleNewInfo(id)
    }
    this.$http({
      method: 'post',
      url: '/news/getAllNewsType',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      this.typeList = res.data.object
    })
    this.$http({
      method: 'post',
      url: '/news/getAllNews',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      console.log(res)
      this.page = res.data.object
      this.newsList = res.data.object.list
      this.pageChange(1)
    })
  },
  methods: {
    pageChange(page) {
      this.pageNewList = this.newsList.slice(page * this.pageSize - this.pageSize, page * this.pageSize)
    },
    handleNewInfo(id) {
      this.newInfo = false
      this.$http({
        method: 'post',
        url: '/news/getNewsById',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: { id: id }
      }).then(res => {
        if (res.data.success) {
          console.log(res)
          this.news = res.data.object
        }
      })
    },
    handleSelect(index) {
      this.newInfo = true
      this.newsList = []
      this.pageNewList = []
      if (index === '0') {
        this.$http({
          method: 'post',
          url: '/news/getAllNews',
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          this.page = res.data.object
          this.newsList = res.data.object.list
          this.pageChange(1)
        })
      } else {
        this.$http({
          method: 'post',
          url: '/news/getNewsByType',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: { type: index }
        }).then(res => {
          this.newsList = res.data.object
          this.pageChange(1)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.newDiv{
  position: relative;
  text-align:left;
  margin-top: 30px;
  .view-num{
    position: relative;
    float: right;
    top: 20px;
    font-size: 12px;
    color: #BBB;
  }
}
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
.textStyle{
  font-size: 14px;
}
.newsTitle {
  text-align: left;
  margin-left: 10px;
  line-height: 24px;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  color: #404040;
  text-decoration: none;
 }
.newsDate {
  text-align: right;
  padding: 0;
  padding-top: 20px;
  margin-left: 10px;
  display: inline-block;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  color: #BBB;
  text-decoration: none;
 }
 .imageError {
   text-align: center;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100%;
   background: #f5f7fa;
   color: #909399;
   font-size: 14px;
 }
</style>
