<template>
  <div class="collection">
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
      to: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    }
  }
</script>
<style scoped>
  .collection{
    height: 88px;
    width: 30%;
    background: lightcyan;
    display: flex;
    align-items: center;
    align-content: center;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    float: left;
  }
  .collection + .collection{
    margin-left: 5%;
  }
  .collection .text{
    color: #000;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
