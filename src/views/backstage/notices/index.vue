<template>
  <el-card style="height: 100%; width: 100%">
    <div slot="header" class="card-hrader">
      <span>公告管理</span>
      <el-button type="primary" size="small" @click="dlg = true">发布公告</el-button>
    </div>
    <el-table :data="noticesList" style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="200"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="content"
        label="内容"
      />
      <el-table-column
        align="center"
        label="操作"
        width="200"
      >
        <template scope="scope">
          <el-button type="primary" size="small" @click="handleUpdate(scope.row.id)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dlgtitle+'公告'"
      :visible.sync="dlg"
      width="60%"
      @closed="handelDlgClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" type="textarea" :rows="10" />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            :limit="5"
            action="http://124.71.173.149:8888/api/notice/uploadPic"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dlg = false">取 消</el-button>
        <el-button type="primary" @click="handelSubmit">提 交</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'Notices',
  data() {
    return {
      dlgtitle: '发布',
      noticesList: [],
      dlg: false,
      form: {
        title: '',
        content: '',
        picList: [],
        isAdd: '0'
      },
      fileList: []
    }
  },
  mounted() {
    this.$http({
      method: 'post',
      url: '/notice/getAllNotice',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      this.noticesList = res.data.object.list
    })
  },
  methods: {
    handleDel(id) {
      this.$http({
        method: 'post',
        url: '/notice/deleteNotice',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: { id: id + '', status: '1' }
      }).then(res => {
        if (res.data.success) {
          this.noticesList.forEach((item, index) => {
            if (item.id === id) {
              this.noticesList.splice(index, 1)
              return
            }
          })
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    handelDlgClose() {
      this.dlgtitle = '发布'
      this.form = {
        title: '',
        content: '',
        picList: [],
        isAdd: '0'
      }
      this.fileList = []
    },
    handleUpdate(id) {
      this.dlgtitle = '修改'
      this.$http({
        method: 'post',
        url: '/notice/getNoticeById',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: { id: id }
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          this.dlg = true
          this.form = res.data.object
          this.form.isAdd = '1'
          res.data.object.picList.forEach(item => {
            const file = { name: item.newName, url: item.path }
            this.fileList.push(file)
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    handelSubmit() {
      console.log(this.form)
      this.$http({
        method: 'post',
        url: '/notice/toDoNotice',
        headers: { 'Content-Type': 'application/json' },
        data: this.form
      }).then(res => {
        console.log(res)
        this.dlg = false
        if (res.data.success) {
          if (this.form.isAdd === '0') {
            this.noticesList.splice(0, 0, res.data.object)
            console.log(this.noticesList)
          }
          if (this.form.isAdd === '1') {
            this.noticesList.forEach((item, index) => {
              if (item.id === res.data.object.id) {
                this.noticesList.splice(index, 1)
                this.noticesList.splice(0, 0, res.data.object)
                return
              }
            })
          }
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    // 删除文件之前的钩子函数
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.form.picList.forEach((item, index) => {
        if (item.newName === file.name) {
          this.form.picList.splice(index, 1)
          return
        }
      })
      this.$message({
        type: 'info',
        message: '已删除原有图片',
        duration: 6000
      })
    },
    // 文件上传成功的钩子函数
    handleSuccess(res, file) {
      console.log(res)
      this.form.picList.push(...res.object)
      this.$message({
        type: 'info',
        message: '图片上传成功',
        duration: 6000
      })
    },
    // 文件上传前的前的钩子函数
    // 参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
    beforeUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M
    }
  }
}
</script>
