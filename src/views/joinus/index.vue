<template>
  <div>
    <span style="font-size:24px">热招职位</span><br>
    <span style="line-height:2">
      我们想要与您共同发展！  电话: 028-85237573   邮箱: zzrc_group@163.com 公司地址：四川省成都市高新区楚峰国际中心 2903
    </span>
    <el-table :data="positionList" style="width: 100%; margin: 20px">
      <el-table-column
        prop="title"
        label="职位"
        width="200"
      />
      <el-table-column
        prop="content"
        label="要求"
      />
      <el-table-column
        align="center"
        label="操作"
        width="200"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Joinus',
  data() {
    return {
      positionList: []
    }
  },
  mounted() {
    this.$http({
      method: 'post',
      url: '/recruit/getAllRecruit',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      console.log(res.data.object.list)
      this.positionList = res.data.object.list
    })
  }
}
</script>>
