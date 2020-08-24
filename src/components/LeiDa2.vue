<template>
  <div ref="echarts888" class="echarts-container"></div>
</template>

<script>
// import echartMixins from "./resize_mixins";
import echarts from "echarts";
// var dataArr = [
//   {
//     value: 9.02,
//     name: "噪音检测"
//   }
// ];
const tempArr = [85, 82, 93, 95, 98, 96, 82, 83, 87, 90];
var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  {
    offset: 0,
    color: "#5CF9FE" // 0% 处的颜色
  },
  {
    offset: 0.17,
    color: "#468EFD" // 100% 处的颜色
  },
  {
    offset: 0.9,
    color: "#468EFD" // 100% 处的颜色
  },
  {
    offset: 1,
    color: "#5CF9FE" // 100% 处的颜色
  }
]);
var colorSet = [
  [1, color]
  // [0.91, color],
  // [1, '#FFF']
];
var rich = {
  white: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "500",
    padding: [-150, 0, 0, 0]
  },
  bule: {
    fontSize: 40,
    fontFamily: "DINBold",
    color: "#fff",
    fontWeight: "700",
    padding: [-120, 0, 0, 0]
  },
  radius: {
    width: 350,
    height: 80,
    // lineHeight:80,
    borderWidth: 1,
    borderColor: "#0092F2",
    fontSize: 50,
    color: "#fff",
    backgroundColor: "#1B215B",
    borderRadius: 20,
    textAlign: "center"
  },
  size: {
    height: 400,
    padding: [100, 0, 0, 0]
  }
};
const options = {
  backgroundColor: "transparent",
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%"
  },

  series: [
    {
      type: "gauge",
      name: "外层辅助",
      radius: "74%",
      startAngle: "225",
      endAngle: "-45",
      splitNumber: "10",
      pointer: {
        show: false
      },
      detail: {
        show: false
      },
      data: [
        {
          value: 1
        }
      ],
      // data: [{value: 1, name: 90}],
      title: {
        show: true,
        offsetCenter: [0, 30],
        textStyle: {
          color: "#fff",
          fontStyle: "normal",
          fontWeight: "normal",
          fontFamily: "微软雅黑",
          fontSize: 20
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: [[1, "#00FFFF"]],
          width: 2,
          opacity: 1
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        length: 20,
        lineStyle: {
          color: "#051932",
          width: 0,
          type: "solid"
        }
      },
      axisLabel: {
        show: false
      }
    },
    {
      type: "gauge",
      radius: "100%",
      startAngle: "225",
      endAngle: "-45",
      pointer: {
        show: true
      },
      detail: {
        formatter: function(value) {
          // var num = Math.round(value);
          // return "{bule|}"+value+"{white|}" + "{size|" + "}";
          let result = (value/10).toFixed(2)
          if (result === '0.00') {
            return 0
          }
          return result;
        },
        color: "#d8c26f",
        fontFamily: "DINBold",
        fontWeight: "700",
        rich: rich,
        offsetCenter: ["0%", "55%"]
      },
      data: [{value: 0}],
      title: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: colorSet,
          width: 25,
          // shadowBlur: 15,
          // shadowColor: '#B0C4DE',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          opacity: 1
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
        length: 25,
        lineStyle: {
          color: "#00377a",
          width: 2,
          type: "solid"
        }
      },
      axisLabel: {
        show: false
      },
      animationDuration: 4000
    },
    {
      name: "灰色内圈", //刻度背景
      type: "gauge",
      z: 2,
      radius: "60%",
      startAngle: "225",
      endAngle: "-45",
      //center: ["50%", "75%"], //整体的位置设置
      axisLine: {
        // 坐标轴线
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: [[1, "#018DFF"]],
          fontSize: 20,
          width: 2,
          opacity: 1 //刻度背景宽度
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      pointer: {
        show: false
      },
      axisTick: {
        show: false
      },
      detail: {
        show: 0
      }
    },
    {
      name: "白色圈刻度",
      type: "gauge",
      radius: "60%",
      startAngle: 225, //刻度起始
      endAngle: -45, //刻度结束
      min: 0,
      max: 10,
      splitNumber: 5,
      z: 4,
      axisTick: {
        show: false
      },
      splitLine: {
        length: 16, //刻度节点线长度
        lineStyle: {
          width: 2,
          color: "#018DFF"
        } //刻度节点线
      },
      axisLabel: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 18
      }, //刻度节点文字颜色
      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          opacity: 0
        }
      },
      detail: {
        show: false
      },
      data: [
        {
          value: 0,
          name: ""
        }
      ]
    },
    {
      //内圆
      type: "pie",
      radius: "15%",
      center: ["50%", "50%"],
      z: 1,
      itemStyle: {
        normal: {
          color: new echarts.graphic.RadialGradient(
            0.5,
            0.5,
            0.8,
            [
              {
                offset: 0,
                color: "#4978EC"
              },
              {
                offset: 0.5,
                color: "#1E2B57"
              },
              {
                offset: 1,
                color: "#141F3D"
              }
            ],
            false
          ),
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      hoverAnimation: false,
      label: {
        show: false
      },
      tooltip: {
        show: false
      },
      data: [100],
      animationType: "scale"
    },
    {
      //外圆
      type: "pie",
      radius: "85%",
      center: ["50%", "50%"],
      z: 0,
      itemStyle: {
        color: "#141C33"
      },
      hoverAnimation: false,
      label: {
        show: false
      },
      tooltip: {
        show: false
      },
      data: [9.02],
      animationType: "scale"
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
      let chartDom = this.$refs[`echarts888`];
      this.chart = echarts.init(chartDom);
      this.chart.setOption(options);
    },
    resizeChartMethod() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    changeData() {
      if (this.timer) return;
      this.timer = setInterval(() => {
        this.showNumber = options.series[1].data[0].value = tempArr[this.randomNumber(0, 9)];
        this.chart.setOption(options, true);
        this.count++;
        this.$emit("changeShowNumber", (this.showNumber/100).toFixed(2));
        if (this.count === 7) {
          clearInterval(this.timer);
          this.timer = null;
          options.series[1].data[0].value = 90.2;
          this.chart.setOption(options, true);
          this.count = 0;
          this.$emit("changeShowNumber", 9.02);
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

