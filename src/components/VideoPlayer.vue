<template>
  <div style="width: 100%; height: 100%">
    <vue-aliplayer-v2
      :source="source"
      ref="VueAliplayerV2"
      :options="options"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: {
        isLive: true, //切换为直播流的时候必填
        // format: 'm3u8'  //切换为直播流的时候必填
        width: "100%",
        height: "100%",
        videoWidth: "85%",
        videoHeight: "85%",
        cover: "https://lzw-041102.oss-cn-hangzhou.aliyuncs.com/sxt2.svg"
      },
      source: "//player.alicdn.com/video/aliyunmedia.mp4",
      // source: '//ivi.bupt.edu.cn/hls/cctv1.m3u8',
      show: true,
      isShowMultiple: false
    };
  },

  methods: {
    play() {
      this.$refs.VueAliplayerV2.play();
    },

    pause() {
      this.$refs.VueAliplayerV2.pause();
    },

    replay() {
      this.$refs.VueAliplayerV2.replay();
    },

    getCurrentTime() {
      // this.$refs.VueAliplayerV2.getCurrentTime();
      this.source = "http://ivi.bupt.edu.cn/hls/cctv1.m3u8";
    },

    getStatus() {
      const status = this.$refs.VueAliplayerV2.getStatus();
      console.log(`getStatus:`, status);
      alert(`getStatus:${status}`);
    },

    showMultiple() {
      this.isShowMultiple = !this.isShowMultiple;
    }
  }
};
</script>
<style lang="less">
</style>