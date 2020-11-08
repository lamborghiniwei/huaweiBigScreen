<template>
  <div :ref="'echarts' + uid" class="echarts-container"></div>
</template>

<script>
// import echartMixins from "./resize_mixins";
import echarts from "echarts";
let clientWidth = document.body.clientWidth;
const options = {
  color: ["#408EF5", "#04EBB8"],
  title: {
    left: "0",
    top: "4%",
    subtext: "空口下行队\n列丢包率（%）",
    subtextStyle: {
      color: "#24D2F2",
      fontSize: (clientWidth / 1920) * 11
    }
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    right: "5%",
    top: "5%",
    data: ["射频0", "射频1"],
    textStyle: {
      color: "#24D2F2",
      fontSize: (clientWidth / 1920) * 12
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
    data: [
      "2020-03-30 17:38:36",
      "2020-03-30 17:38:36",
      "2020-03-30 17:38:36",
      "2020-03-30 17:38:36",
      "2020-03-30 17:38:36",
      "2020-03-30 17:38:36",
      "2020-03-30 17:38:36"
    ],
    axisLabel: {
      textStyle: {
        color: "#20C2DF",
        fontSize: (clientWidth / 1920) * 12
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
        fontSize: (clientWidth / 1920) * 12
      }
    }
  },
  yAxis: {
    type: "value",
    max: 45,
    min: 0,
    splitNumber: 3,
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
        fontSize: (clientWidth / 1920) * 12
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: "#20C2DF",
        fontSize: (clientWidth / 1920) * 12
      },
      formatter: function(parmas) {
        return parmas > 40 ? "" : parmas;
      }
    }
  },
  series: [
    {
      name: "射频0",
      type: "line",
      stack: "总量1",
      data: []
    },
    {
      name: "射频1",
      type: "line",
      stack: "总量2",
      data: []
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
      type: Object,
      default() {
        return {};
      }
    },
    timeList: {
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
      // 每次重绘之前，先清除一下
      if (this.chart) {
        this.chart.clear();
        this.chart.setOption({});
      }
      if (this.list && this.list.list1) {
        options.series[0].data = this.list.list2;
        options.series[1].data = this.list.list1;
      }
       if (this.timeList) {
        options.xAxis.data = this.timeList;
      }
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
        this.init();
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

