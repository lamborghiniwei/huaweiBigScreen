<template>
  <div :ref="'echarts'+uid" class="echarts-container"></div>
</template>

<script>
// import echartMixins from "./resize_mixins";
import echarts from "echarts";
const options = {
  angleAxis: {
    max: 100,
    clockwise: false,
    startAngle: -45,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  radiusAxis: {
    type: "category",
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  polar: {
    center: ["50%", "50%"],
    radius: "180%" //图形大小
  },
  series: [
    {
      type: "bar",
      data: [
        {
          value: 75,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: "#02ECB6"
                },
                {
                  offset: 1,
                  color: "#428CF7"
                }
              ])
            }
          }
        }
      ],
      coordinateSystem: "polar",
      roundCap: true,
      barWidth: 15
    },
    {
      type: "gauge",
      radius: "72%",
      min: 0,
      max: 20,
      splitNumber: 5,
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false,
        color: "#999999",
        fontSize: 13
      },
      itemStyle: {
        color: "#428CF7"
      },
      pointer: {
        length: "100%",
        width: 9
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      detail: {
        show: false,
        color: "#7FF9FF",
        fontSize: 26
      },
      data: [0]
    }
  ]
};
export default {
  // mixins: [echartMixins],
  data() {
    return {
      uid: "",
      chart: null,
      count: 0,
      endNumber: 0,
      timer: null,
      showNumber: 0
    };
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    max: {
      type: Number,
      default: 0
    }
  },
  created() {
    window.addEventListener("resize", this.resizeChartMethod);
    this.$once("hook:beforeDestroy", this.resizeChartMethod);
  },
  mounted() {
    this.init();
  },
  components: {},
  computed: {},
  methods: {
    init() {
      // if (this.list) {
      //   options.series[0].data = this.list;
      //   if (this.max) {
      //     options.yAxis[0].max = this.max;
      //   }
      // }
      let chartDom = this.$refs[`echarts${this.uid}`];
      this.chart = echarts.init(chartDom);
      this.chart.setOption(options);
    },
    resizeChartMethod() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    changeData() {
      if (this.timer) return
      this.endNumber = this.randomNumber(7, 20);
      this.timer = setInterval(() => {
        this.showNumber = options.series[1].data[0] = this.endNumber-this.randomNumber(0,5);
        this.chart.setOption(options, true);
        this.count++;
        this.$emit('changeShowNumber', this.showNumber)
        if (this.count === 5) {
          clearInterval(this.timer)
          this.timer = null
          options.series[1].data[0] = this.endNumber;
          this.chart.setOption(options, true);
          this.count = 0
          this.$emit('changeShowNumber', this.endNumber)
        }
      }, 1000);
    },
    randomNumber(n, m) {
      return parseInt(Math.random() * (m - n) + n);
    }
  },
  watch: {
    list: {
      handler() {
        // this.init();
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="less">
.echarts-container {
  width: 100%;
  height: 100%;
}
</style>

