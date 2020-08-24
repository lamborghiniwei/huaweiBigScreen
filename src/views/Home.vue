<template>
  <div class="home">
    <!-- 右侧的时间和home按钮 -->
    <div class="time">{{time}}</div>
    <div class="go-home"></div>

    <!-- 主体内容部分 -->
    <div class="main-box">
      <div class="video-speed-box">
        <div class="video-box">
        </div>
        <div class="speed-box">
          <div class="top-title top-title4">速率测试</div>
          <div class="speed-echar-box">
            <div class="lei-da">
              <v-lei-da ref='leida' @changeShowNumber='changeShowNumber' />
            </div>
            <div class="go-speed" @click='handleSpeed'></div>
          </div>
          <div class="speed-message">
              <!-- <div class="speed1">
                <div>测试速率信息</div>
                <div class="speed1-number-box">
                   <span class="number-style">{{showNumber}}</span>
                   <span class="number-unit">M/S</span>
                </div>
              </div> -->
              <div class="speed2">
                <div class="speed2-title">5G射频实时连接速率</div>
                <div class="number-style-box" v-if="showNumber!==9.02">
                  <span class="number-style color-orange">{{showNumber}}</span>
                  <span class="number-unit">Gbps</span>
                </div>
                <div class="speed2-end" v-else>
                    <div class="speed2-shishi">
                        整机实时速率 <span class="color-orange">10.02</span> Gbps
                    </div>
                    <div class="speed2-shishi2">
                        1 Gbps@2.4GHz + <span class="color-orange">9.02</span> Gbps@5GHz
                    </div>
                </div>
              </div>
              <!-- <div class="speed1">
                <div>测试速率信息</div>
                <div class="speed1-number-box">
                   <span class="number-style">{{showNumber}}</span>
                   <span class="number-unit">M/S</span>
                </div>
              </div> -->
          </div>
        </div>
      </div>
      <div class="echarts-box">
        <div class="echart-zj">
          <div class="top-title top-title1">Wi-Fi 6 整机速率(Gbps)</div>
          <v-bar />
        </div>
        <div class="echart-db">
          <div class="top-title top-title2">Wi-Fi 6 实验抖动丢包参数</div>
          <div class="line-container">
            <div class="line">
                <v-line1 />
            </div>
            <div class="line">
               <v-line2 />
            </div>
          </div>
        </div>
        <div class="echart-tx">
          <div class="top-title top-title3">160MHz频宽下空间数/AP内置天线</div>
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
              <p class="rank-title">业界：8个</p>
            </div>
            <div class="rank-com">
              <div class="rank-img rank-img4"></div>
              <p class="rank-title rank-title2">华为：12个</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Bar from "../components/Bar";
import LeiDa from "../components/LeiDa2";
import Line1 from "../components/Line1";
import Line2 from "../components/Line2";
export default {
  name: "Home",
  components: {
    "v-bar": Bar,
    "v-lei-da": LeiDa,
    "v-line1": Line1,
    "v-line2": Line2
  },
  data() {
    return {
      time: new Date().format("yyyy/MM/dd hh:mm"),
      cameraIndex: 1,
      showNumber: 0
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
    handleSpeed () {
      this.$refs.leida.changeData()
    },
    changeShowNumber (num) {
      this.showNumber = num
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
    color: #76ebf2;
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
        // background: url("../assets/img/video_bg.webp") no-repeat;
        background: url("http://qf304exbm.hn-bkt.clouddn.com/video_bg.png") no-repeat;
        background-size: 100% 100%;
      }
      .speed-box {
        display: block;
        flex: 1;
        height: 100%;
        background: url("../assets/img/speed_bg.png") no-repeat;
        background-size: 100% 100%;
        .speed-echar-box {
          // width: 3.9rem;
          // height: 2.73rem;
          width: 4.5rem;
          margin: .08rem auto 0;
          .lei-da {
            // height: 2.73rem;
            height: 3.5rem;
          }
          .go-speed {
            position: relative;
            z-index: 3000;
            width: 1.5rem;
            height: .455rem;
            margin: -.45rem auto 0;
            // background: url("../assets/img/go_speed.webp") no-repeat;
            background: url("http://qf304exbm.hn-bkt.clouddn.com/go_speed.png") no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
          }
        }
        .speed-message {
          // display: flex;
          // margin-top: .1rem;
          // height: 2rem;
          // padding: 0 .4rem 0 .13rem;
          // box-sizing: border-box;
          display: flex;
          margin: .1rem auto 0;
          height: 1.8rem;
          // padding: 0 .4rem 0 .13rem;
          box-sizing: border-box;
          .speed2 {
            // flex: 1;
            // height: 1.6rem;
            // padding-top: .26rem;
            // text-align: center;
            // font-size:0.18rem;
            // font-weight:400;
            // color:rgba(255,255,255,1);
            // border: 1px dashed pink;
            // box-sizing: border-box;
            flex: 1;
            height: 1.6rem;
            padding-top: .16rem;
            text-align: center;
            font-size:0.18rem;
            font-weight:400;
            color:rgba(255,255,255,1);
            // border: 1px dashed pink;
            box-sizing: border-box;
            .speed2-title {
              color: #d8c26f;
              font-weight:500;
              font-size:0.22rem;
            }
            .number-style-box {
              margin-top: .25rem;
              text-align: center;
              .number-style {
                font-size: .5rem;
                margin-right: .05rem;
              }
            }
            .speed2-end {
              margin-top: .25rem;
            }
            .speed2-shishi, .speed2-shishi2 {
              font-weight:500;
              text-align: center;
            }
            .speed2-shishi {
              margin-bottom: .1rem;
            }
            .color-orange {
              color: #d8c26f;
            }

          }
          .speed1 {
            padding: .1rem;
            width: 1.7rem;
            height: 1.6rem;
            border: 1px dashed #ccc;
            box-sizing: border-box;
            font-size:0.13rem;
            font-weight:400;
            color:rgba(255,255,255,1);
            .speed1-number-box {
              margin-top: .2rem;
              .number-style {
                color: #3c94fa;
                font-size: .2rem;
                margin-right: .05rem;
              }
            }
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
        padding-left: 0.1rem;
        height: 0.49rem;
        font-size: 0.22rem;
        font-weight: 500;
        color: rgba(127, 249, 255, 1);
        line-height: 0.49rem;
        box-sizing: border-box;
      }
      .top-title1 {
        width: 4rem;
        background: url("../assets/img/top_title1.png") no-repeat;
        background-size: 100% 100%;
      }
      .top-title2 {
        width: 6.8rem;
        background: url("../assets/img/top_title1.png") no-repeat;
        background-size: 100% 100%;
      }
      .top-title3 {
        width: 6.6rem;
        background: url("../assets/img/top_title1.png") no-repeat;
        background-size: 100% 100%;
      }
      .top-title4 {
        width: 6.6rem;
        line-height: 0.44rem;
        background: url("../assets/img/top_title4.png") no-repeat;
        background-size: 100% 100%;
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
          padding-right: .1rem;
          .line {
            flex: 1;
            padding: 0 .1rem;
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
              height: .73rem;
              background: url("../assets/img/4.png") no-repeat;
              background-size: 100% 100%;
            }
            .rank-img4 {
              width: 1.69rem;
              height: .73rem;
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
            margin-right: .2rem;
          }
        }
      }
    }
  }
}
</style>
