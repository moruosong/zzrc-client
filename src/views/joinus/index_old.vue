<template>
  <div>
    <div style="font-size:24px">热招职位</div><br>
    <div style="line-height:2">
      我们想要与您共同发展！    公司地址：四川省成都市高新区楚峰国际中心 2903易上OCG国际中心C座6层    邮箱: zzrc_group@163.com
    </div><br>
    <el-image
      :src="img"
      style="width: 60%;height: 60%;"
      fit="cover"
    />
  </div>
</template>

<script>
export default {
  name: 'Joinus',
  data() {
    return {
      img: require('@/assets/joinus/joinus.jpg')
    }
  }
}
</script>>
