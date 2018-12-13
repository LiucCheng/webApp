<template>
  <div class="collection" @click="skinPage">
    <slot name="icon" class="collection_icon"></slot>
    <span class="text">{{text}}</span>
  </div>
</template>
<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      id: {
        type: [String, Number],
        default: ''
      }
    },
    data () {
      return {}
    },
    methods: {
      skinPage() {
        if (this.id) {
          this.$router.push({
            path: '/contentList?id=' + this.id
          })
        }
      }
    }
  }
</script>
<style scoped>
  .collection{
    height: 88px;
    width: 30%;
    background: #474b54;
    display: flex;
    align-items: center;
    align-content: center;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    float: left;
    overflow: hidden;
  }
  .collection + .collection{
    margin-left: 5%;
  }
  .collection:nth-of-type(n + 4){
    margin-top: 10px;
    /*margin-left: 0;*/
  }
  .collection:nth-of-type(3n + 1) {
    margin-left: 0;
  }
  .collection .text{
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
  }
</style>
