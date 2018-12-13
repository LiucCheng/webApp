<template>
  <div class="goods_page">
    <mt-loadmore :top-method="loadTop" :bottom-all-loaded="true" :autoFill="false" ref="loadmore">
      <div class="box_collection">
        <collection v-for="(item, index) in titleList" :key="index" :text="item.title" :id="item.id"></collection>
      </div>
      <div class="no_data_line" v-if="isLoading">已加载完</div>
    </mt-loadmore>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        titleList: [],
        isLoading: false
      }
    },
    methods: {
      loadTop() {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded()
        },2000)
      },
      loadBottom() {
        // 加载更多数据
        if (this.count >= 10) {
          this.allLoaded = true
        }
        setTimeout(() => {
          this.count++
          this.$refs.loadmore.onBottomLoaded()
        }, 2000)
      },
      getData() {
        this.$mint.Indicator.open('加载中')
        this.$ajax.get('/api/getList').then(res => {
          this.$mint.Indicator.close()
          let msg = res.data
          if (!msg.errcode) {
            this.titleList = msg.data
            this.isLoading = true
          } else {
            this.$mint.Toast(msg.msg, 1000)
          }
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>
<style scoped>
  .goods_page{
    margin-top: 50px;
    margin-bottom: 60px;
  }
  .goods_page .box_collection{
    overflow: hidden;
    padding: 0 10px;
  }
  .no_data_line{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    color: #666;
  }
</style>
