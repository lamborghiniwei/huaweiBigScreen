<template>
  <div id="app">
    <div class="loading-bg" v-if="showLoading">
      <!-- <v-loading>loading...</v-loading> -->
      <div class="loading">
        <!-- <svg width="50px" height="50px">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="transparent"
            stroke-width="3"
            stroke-dasharray="31.415 31.415"
            stroke="#02bcfe"
            stroke-linecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0, 25 25;360, 25 25"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke"
              values="#02bcfe;#3be6cb;#02bcfe"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="25"
            cy="25"
            r="10"
            fill="transparent"
            stroke-width="3"
            stroke-dasharray="15.7 15.7"
            stroke="#3be6cb"
            stroke-linecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="360, 25 25;0, 25 25"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke"
              values="#3be6cb;#02bcfe;#3be6cb"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </svg> -->
        <div class="loading-gif">

        </div>
        <div class="loading-tip">loading...</div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      showLoading: true
    };
  },
  created() {
    window.onload = () => {
      setTimeout(() => {
        this.showLoading = false;
      }, 100);
    };
  },
};
</script>


<style lang="less">
html,
body {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  font-size: 0.24rem;
  background: #031d2a;
}

#app {
  position: absolute;
  width: 100%;
  height: 10.8rem;
  left: 0;
  top: 0;
  background: url("./assets/img/bg.jpg") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  // user-select:none;
}
.loading-bg {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 1080px;
  left: 0;
  top: 0;
  background: #031d2a;
}
.loading {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  .loading-gif {
    width: 1.3rem;
    height: .58rem;
    background: url("./assets/img/777.gif") no-repeat;
    background-size: 100% 100%;

  }
  .loading-tip {
    margin-top: 0.1rem;
    color: #fff;
    font-size: 0.15rem;
    text-align: center;
  }
}
</style>
