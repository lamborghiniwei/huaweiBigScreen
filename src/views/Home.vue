<template>
  <div class="home">
    <!-- 右侧的时间和home按钮 -->
    <div class="time">{{ time }}</div>
    <div class="time-bg"></div>
    <div class="go-home"></div>

    <!-- 主体内容部分 -->
    <div class="main-box">
      <div class="video-speed-box">
        <div class="video-box"></div>
        <div class="speed-box">
          <div class="top-title top-title4">5G射频实时联接速率</div>
          <div class="speed-echar-box">
            <div class="lei-da">
              <!-- <v-lei-da ref='leida' @changeShowNumber='changeShowNumber' /> -->
              <div
                class="point"
                :class="{
                  'move-animation-902': NumberFlag === 9.02,
                  'move-animation-860': NumberFlag === 8.6
                }"
              ></div>
            </div>
            <div class="go-speed" :class="{ 'go-speed2': NumberFlag }">
              <span class="speed-number" v-if="NumberFlag">{{
                showNumber
              }}</span>
              <span class="speed-unit" v-if="NumberFlag">Gbps</span>
              <!-- 左右两个按钮 -->
              <div
                class="go-speed-btn go-speed-btn-l"
                @click="handleSpeed(9.02)"
              ></div>
              <div
                class="go-speed-btn go-speed-btn-r"
                @click="handleSpeed(8.6)"
              ></div>
            </div>
          </div>
          <div class="speed-message">
            <div class="speed2">
              <div class="speed2-end">
                <div class="speed2-shishi">
                  整机实时速率 <span class="color-orange">10.02</span> Gbps
                </div>
                <div class="speed2-shishi2">
                  1 Gbps@2.4GHz +
                  <span class="color-orange">9.02</span> Gbps@5GHz
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="echarts-box">
        <div class="echart-zj">
          <div class="top-title">整机速率（Gbps）</div>
          <v-bar />
        </div>
        <div class="echart-db">
          <div class="top-title">时延抖动丢包率</div>
          <div class="line-container">
            <div class="line">
              <v-line1 :list="listData" :timeList="timeList" />
            </div>
            <div class="line">
              <v-line2 :list="listData" :timeList="timeList" />
            </div>
          </div>
        </div>
        <div class="echart-tx">
          <div class="top-title">AP内置天线数及空间流数</div>
          <div class="huawei-rank-box">
            <div class="rank-com">
              <div class="rank-img rank-img1"></div>
              <p class="rank-title">业界：4条</p>
            </div>
            <div class="rank-com rank-com-mar1">
              <div class="rank-img rank-img2"></div>
              <p class="rank-title rank-title2">华为：8条</p>
            </div>
            <div class="rank-com rank-com-mar2">
              <div class="rank-img rank-img3"></div>
              <p class="rank-title">业界：12个</p>
            </div>
            <div class="rank-com">
              <div class="rank-img rank-img4"></div>
              <p class="rank-title rank-title2">华为：16个</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const _data902 = {
  list1: [16, 18, 16, 17, 17, 18, 16],
  list2: [15, 18, 15, 16, 16, 18, 15]
};
const _data860 = {
  list1: [16, 18, 28, 42, 42, 38, 36],
  list2: [16, 15, 17, 16, 18, 16, 15]
};
const _data902Number = [9.02, 8.80, 9.20, 9.05, 9.02];
const _data860Number = [8.60, 8.40, 8.80, 8.70, 8.60];
// @ is an alias to /src
import Bar from "../components/Bar";
import Line1 from "../components/Line1";
import Line2 from "../components/Line2";
export default {
  name: "Home",
  components: {
    "v-bar": Bar,
    "v-line1": Line1,
    "v-line2": Line2
  },
  data() {
    return {
      time: new Date().format("yyyy/MM/dd hh:mm"),
      cameraIndex: 1,
      showAnimation: false,
      NumberFlag: 0,
      listData: {
        list1: [],
        list2: []
      },
      showNumber: 0,
      indexFlag: 0,
      timer: null,
      timeList: []
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.time = new Date().format("yyyy/MM/dd hh:mm");
    }, 10000);
  },
  methods: {
    handdleTime() {},
    changeIndex(index) {
      this.cameraIndex = index;
    },
    initCount() {
      this.showNumber =
        this.NumberFlag === 9.02
          ? _data902Number[this.indexFlag]
          : _data860Number[this.indexFlag];
      this.indexFlag++;
    },

    initDataChange() {
      const temp = [];
      const startTime = new Date().format("yyyy/MM/dd hh:mm:ss");
      for(let i = 0; i<7; i++) {
          // console.log(i, startTime.format("yyyy/MM/dd hh:mm:ss"), startTime.add("s", i).format("yyyy/MM/dd hh:mm:ss"))
          temp.push(new Date(startTime).add("s", i).format("yyyy/MM/dd hh:mm:ss"));
      }
      console.log(temp);
      setTimeout(() => {
        this.initCount();
        this.timer = setInterval(() => {
          this.initCount();
          if (this.indexFlag === 5) {
            clearInterval(this.timer);
            this.timer = null;
            this.listData =  this.NumberFlag === 9.02
              ? _data902
              : _data860;
            this.timeList = [...temp];
          }
        }, 500);
      }, 2000);
    },

    handleSpeed(num) {
      this.indexFlag = 0;
      this.NumberFlag = num;
      this.showNumber = 0;
      this.initDataChange();
    },
    changeShowNumber(num) {
      this.showNumber = num;
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  .time {
    position: absolute;
    top: 0.96rem;
    right: 1.66rem;
    font-size: 0.24rem;
    font-weight: 400;
    // color: #76ebf2;
    color: #fff;
  }
  .time-bg {
    position: absolute;
    top: 0.73rem;
    right: 1.42rem;
    width: 4.45rem;
    height: 0.68rem;
    background: url("../assets/img/time_bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .go-home {
    position: absolute;
    top: 0.79rem;
    right: 0.21rem;
    width: 0.6rem;
    height: 0.6rem;
    background: url("../assets/img/go_home.png") no-repeat;
    background-size: 100% 100%;
  }
  .main-box {
    margin: 1.67rem 0 0 0.43rem;
    .video-speed-box {
      display: flex;
      height: 5.7rem;
      margin-bottom: 0.1rem;
      .video-box {
        position: relative;
        width: 11.66rem;
        height: 100%;
        margin-right: 0.1rem;
        // background: url("../assets/img/video_bg.png") no-repeat;
        background: url("https://lzw-041102.oss-cn-hangzhou.aliyuncs.com/video_bg.png") no-repeat;
        background-size: 100% 100%;
      }
      .speed-box {
        display: block;
        flex: 1;
        height: 100%;
        background: url("../assets/img/speed_bg.png") no-repeat;
        background-size: 100% 100%;
        .speed-echar-box {
          width: 4rem;
          margin: 0.1rem auto 0;
          .lei-da {
            position: relative;
            width: 4rem;
            height: 4rem;
            // background: url("../assets/img/ybp.png") no-repeat;
            background: url("https://lzw-041102.oss-cn-hangzhou.aliyuncs.com/ybp.png") no-repeat;
            // background: url("../assets/img/ybp.webp") no-repeat;
            background-size: 100% 100%;
            .point {
              position: absolute;
              left: 0.61rem;
              top: 1.68rem;
              width: 1.72rem;
              height: 0.91rem;
              background: url("../assets/img/point.png") no-repeat;
              background-size: 100% 100%;
            }
          }
          .go-speed {
            position: relative;
            z-index: 3000;
            width: 2.14rem;
            height: 0.65rem;
            margin: -1.3rem auto 0;
            background: url("../assets/img/go_speed2.png") no-repeat;
            background-size: 100% 100%;
            color: #fff;
            cursor: pointer;
            text-align: center;
            box-sizing: border-box;
            padding-top: 0.035rem;
            .go-speed-btn {
              position: absolute;
              top: 0;
              width: 50%;
              height: 100%;
            }
            .go-speed-btn-l {
              left: 0;
            }
            .go-speed-btn-r {
              left: 50%;
            }
            .speed-number {
              padding-left: 0.05rem;
              margin-right: 0.05rem;
              font-size: 0.44rem;
              font-family: Source Han Sans CN;
              font-weight: bold;
              color: #ffffff;
              line-height: 0.59rem;
              text-shadow: 0rem 0rem 0rem #021824;
            }
            .speed-unit {
              font-size: 0.16rem;
              font-family: Source Han Sans CN;
              font-weight: 500;
              color: #ffffff;
              line-height: 0.22rem;
              text-shadow: 0rem 0rem 0rem #021824;
            }
          }
          .go-speed2 {
            background: url("../assets/img/go_speed.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .speed-message {
          width: 3.66rem;
          display: flex;
          margin: 0.5rem auto 0;
          height: 0.67rem;
          box-sizing: border-box;
          background: url("../assets/img/title_bg.png") no-repeat;
          background-size: 100% 100%;
          .speed2 {
            flex: 1;
            text-align: center;
            font-size: 0.18rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            box-sizing: border-box;
            .speed2-title {
              color: #d8c26f;
              font-weight: 500;
              font-size: 0.22rem;
            }
            .speed2-end {
              margin-top: 0.11rem;
            }
            .speed2-shishi,
            .speed2-shishi2 {
              font-weight: 500;
              text-align: center;
            }
            .speed2-shishi {
              margin-bottom: 0.1rem;
            }
            // .color-orange {
            //   color: #d8c26f;
            // }
          }
        }
      }
    }
    .echarts-box,
    .speed-box {
      display: flex;
      height: 2.77rem;
      padding-left: 0.05rem;
      .top-title {
        padding-left: 0.14rem;
        height: 0.49rem;
        font-size: 0.22rem;
        font-weight: 500;
        // color: rgba(127, 249, 255, 1);
        color: #fff;
        line-height: 0.54rem;
        box-sizing: border-box;
      }
      .echart-zj {
        width: 4.35rem;
        height: 100%;
        background: url("../assets/img/zj_bg.png") no-repeat;
        background-size: 100% 100%;
      }
      .echart-db {
        width: 7.15rem;
        height: 100%;
        margin: 0 0.1rem;
        background: url("../assets/img/db_bg.png") no-repeat;
        background-size: 100% 100%;
        .line-container {
          display: flex;
          height: 2.23rem;
          padding-right: 0.1rem;
          .line {
            flex: 1;
            padding: 0 0.1rem;
            height: 100%;
            box-sizing: border-box;
          }
        }
      }
      .echart-tx {
        position: relative;
        // width: 6.95rem;
        flex: 1;
        height: 100%;
        background: url("../assets/img/tx_bg.png") no-repeat;
        background-size: 100% 100%;
        .huawei-rank-box {
          display: flex;
          position: absolute;
          left: 0.29rem;
          bottom: 0.13rem;
          .rank-com {
            height: 1.56rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            .rank-img {
              margin: 0 auto 0.1rem;
            }
            .rank-img1 {
              width: 0.96rem;
              height: 0.66rem;
              background: url("../assets/img/2.png") no-repeat;
              background-size: 100% 100%;
            }
            .rank-img2 {
              width: 0.96rem;
              height: 1.22rem;
              background: url("../assets/img/3.png") no-repeat;
              background-size: 100% 100%;
            }
            .rank-img3 {
              width: 1.69rem;
              height: 0.73rem;
              background: url("../assets/img/4.png") no-repeat;
              background-size: 100% 100%;
            }
            .rank-img4 {
              width: 1.69rem;
              height: 0.73rem;
              background: url("../assets/img/5.png") no-repeat;
              background-size: 100% 100%;
            }
            .rank-title {
              margin: 0 auto;
              // width: 0.96rem;
              height: 0.24rem;
              line-height: 0.24rem;
              font-size: 0.12rem;
              text-align: center;
              font-weight: 400;
              color: #fff;
              background: url("../assets/img/rank_title.png");
              // background-size: 100% 100%;
            }
            .rank-title2 {
              color: #3c94fa;
            }
          }
          .rank-com-mar1 {
            margin: 0 0.5rem 0 0.3rem;
          }
          .rank-com-mar2 {
            margin-right: 0.2rem;
          }
        }
      }
    }
  }
}

.move-animation-902 {
  animation: move-902 4s;
  transform-origin: 1.4rem 0.335rem;
  animation-fill-mode: forwards;
}

.move-animation-860 {
  animation: move-860 4s;
  transform-origin: 1.4rem 0.335rem;
  animation-fill-mode: forwards;
}

@keyframes move-902 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(170deg);
  }
  60% {
    transform: rotate(167deg);
  }
  80% {
    transform: rotate(173deg);
  }
  90% {
    transform: rotate(171deg);
  }
  100% {
    transform: rotate(170deg);
  }
}

@keyframes move-860 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(163deg);
  }
  60% {
    transform: rotate(160deg);
  }
  80% {
    transform: rotate(166deg);
  }
  90% {
    transform: rotate(164deg);
  }
  100% {
    transform: rotate(163deg);
  }
}
</style>
