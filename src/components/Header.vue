<template>
  <div class="header">
      <div class="logo"></div>
      <div class="title">Wi-Fi 6 视频回传解决方案 </div>
  </div>
</template>

<script>
export default {
  name: "header"
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  position: absolute;
  left: 50%;
  top: .36rem;
  transform: translateX(-50%);
  .logo {
    width: .46rem;
    height: .43rem;
    background: url('../assets/img/logo.png') no-repeat;
    background-size: 100% 100%;
  }
  .title {
    margin: .05rem 0 0 .14rem;
    font-size:0.34rem;
    font-family:STHeiti;
    font-weight:400;
    letter-spacing: .03rem;
    color:rgba(218,249,255,1);
  }
}

</style>
