<template>
  <div class="found_page">
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker :slots="slots" :showToolbar="true" @change="onValuesChange">
        <div class="pic_title">请选择类型 <span class="pic_close" @click="closePop">关闭</span></div>
      </mt-picker>
    </mt-popup>
    <div class="lc_cell" @click="show">
      <span class="name">请选择类型</span>
      <span class="value">{{selectValue}}</span>
    </div>
    <mt-field label="标题名" placeholder="请输入标题名15字以内" :attr="{maxlength: 15}" v-model="articleTitle"></mt-field>
    <mt-field label="文章内容" v-model="textInput" placeholder="文章内容500字以内" :attr="{maxlength: 500}" type="textarea" rows="8"></mt-field>
    <div class="found_btn">
      <mt-button type="primary" size="large" :disabled="isDisable">提交内容</mt-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        popupVisible: false,
        articleTitle: '', // tab2 新增的类型
        selectValue: '',
        selectArticleID: '',
        textInput: '',
        allLoaded: false,
        count: 0,
        titleList: [],
        isDisable: true,
        slots: [
          {
            values: [],
            textAlign: 'center'
          }
        ]
      }
    },
    methods: {
      getData() {
        this.$mint.Indicator.open('加载中')
        this.$ajax.get('/api/getList').then(res => {
          let msg = res.data
          if (!msg.errcode) {
            this.titleList = msg.data
            for (let i = 0; i < msg.data.length; i++) {
              this.slots[0].values.push(msg.data[i].title)
            }
            this.$mint.Indicator.close()
          }
        })
      },
      onValuesChange(picker, values) {
        this.selectValue = values[0]
        for (let i = 0; i < this.titleList.length; i++) {
          if (this.selectValue === this.titleList[i].title) {
            this.selectArticleID = this.titleList[i].id
          }
        }
      },
      closePop() {
        this.popupVisible = false
      },
      show() {
        this.popupVisible = true
      }
    },
    created() {
      this.getData()
    }
  }
</script>
<style scoped>
  .found_page{
    margin-top: 44px;
  }
  .pic_title{
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    text-align: center;
    color: #333;
    position: relative;
  }
  .pic_close{
    position: absolute;
    right: 10px;
    top: 0;
    height: 100%;
    width: auto;
    color: #26a2ff;
    font-size: 14px;
  }
  .mint-popup-bottom{
    width: 100%;
  }
  .found_page .lc_cell{
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    background-color: #fff;
    color: #333;
  }
  .found_page .lc_cell .name{
    float: left;
  }
  .found_page .lc_cell .value{
    float: right;
    color: #999;
  }
  .found_btn{
    margin-top: 60px;
    padding: 0 10px;
  }
</style>
