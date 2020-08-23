<template>
  <div :ref="'echarts'+uid" class="echarts-container"></div>
</template>

<script>
// import echartMixins from "./resize_mixins";
import echarts from 'echarts'
let clientWidth = document.body.clientWidth;
const options = {
  color: ["#408EF5", "#04EBB8"],
  title: {
    left: '0',
    top:'4%',
    subtext: "空口下行队\n列平均时延（ms）",
    subtextStyle: {
      color: "#24D2F2",
      fontSize: clientWidth/1920*11
    }
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    right: "5%",
    top: '5%',
    data: ["射频0", "射频1"],
    textStyle: {
      color: "#24D2F2",
      fontSize: clientWidth/1920*12
    }
  },
  grid: {
    left: "3%",
    right: "8%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["2020-03-30 17:38:36", "2020-03-30 17:38:36", "2020-03-30 17:38:36", "2020-03-30 17:38:36", "2020-03-30 17:38:36", "2020-03-30 17:38:36", "2020-03-30 17:38:36"],
    axisLabel: {
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
            if (!(i % 10)) str += "\n"; //按需要求余
          }
          return str;
        }
    },
    axisLine: {
      //坐标轴轴线相关设置。数学上的x轴
      show: true,
      lineStyle: {
        color: "#1CD1F7",
        fontSize: clientWidth/1920*12
      }
    }
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "rgba(4,235,184,.1)"
      }
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: "#1CD2F7",
        fontSize: clientWidth/1920*12
      }
    },
    axisTick: {
      show: false
    },
     axisLabel: {
      textStyle: {
        color: "#20C2DF",
        fontSize: clientWidth/1920*12
      }
    },
  },
  series: [
    {
      name: "射频0",
      type: "line",
      stack: "总量",
      data: [12, 11, 9, 14, 9, 8, 6]
    },
    {
      name: "射频1",
      type: "line",
      stack: "总量",
      data: [12, 15, 30, 32, 44, 32, 10]
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
  height: 100%;
}
</style>

