<template>
  <div :ref="'echarts'+uid" class="echarts-container"></div>
</template>

<script>
// import echartMixins from "./resize_mixins";
// let echarts = require("echarts");
import echarts from 'echarts'
let clientWidth = document.body.clientWidth;
const options = {
  grid: {
    top: "10%",
    left: "8%",
    right: "10%",
    bottom: "20%"
    // containLabel: true
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: true
    },
    formatter: function(params) {
      var htmlStr = '<div style="color: #fff">';
      htmlStr += params[0].name + "<br/>";
      htmlStr += params[0].seriesName + ": " + params[0].value + "Gbps<br/>";
      return htmlStr;
    }
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: true,
      axisLine: {
        symbol: ["none", "arrow"],
        //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: "#1CD2F7"
        }
      },
      axisLabel: {
        //坐标轴刻度标签的相关设置
        textStyle: {
          color: "#20C2DF",
          fontSize: clientWidth/1920*12
        },
        formatter: function(val) {
          var strs = val.split(""); //字符串数组
          var str = "";
          for (var i = 0, s; (s = strs[i++]); ) {
            //遍历字符串数组
            str += s;
            if (!(i % 6)) str += "\n"; //按需要求余
          }
          return str;
        }
        // interval:0,
        // rotate:40
      },
      axisTick: {
        show: false
      },
      data: ["Huawei AirEngine 8760-X1-PRO", "友商A", "友商C", "友商R"]
    }
  ],
  yAxis: [
    {
      type: "value",
      min: 0,
      max: 15,
      splitNumber: 7,
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(102,102,102,0.1)"
        }
      },
      axisLine: {
        symbol: ["none", "arrow"],
        show: true,
        lineStyle: {
          color: "#1CD2F7"
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#20C2DF",
          fontSize: clientWidth/1920*12
        }
      },
      textStyle: {
        color: "#20C2DF"
      },
      axisTick: {
        show: false
      }
    }
  ],
  series: [
    {
      name: "整机速率",
      type: "bar",
      // symbol: "circle",
      // symbolSize: 8,
      lineStyle: {
        normal: {
          color: "#21B292" // 线条颜色
        }
      },
      barWidth: clientWidth/1920*15,
      label: {
        show: false
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#3C94FA"
            },
            {
              offset: 1,
              color: "#0064D6"
            }
          ]),
          label: {
            show: true, //开启显示
            position: "top", //在上方显示
            textStyle: {
              //数值样式
              color: "#fff",
              fontSize: clientWidth/1920*12
            }
          }
        }
      },
      axisLine: {
        lineStyle: {
          color: "rgba(234,234,234,.65)"
        }
      },
      data: [10.75, 5.95, 5.37, 5.95]
    }
  ]
};
export default {
  // mixins: [echartMixins],
  data() {
    return {
      uid: "",
      chart: null
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
  mounted() {
    this.init();
  },
  created() {
    window.addEventListener("resize", this.resizeChartMethod);
    this.$once("hook:beforeDestroy", this.resizeChartMethod);
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
        clientWidth = document.body.clientWidth;
        this.chart.resize();
      }
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
  height: 2.2rem;
}
</style>

