/* 
* @Author: lzw  
* @Date: 2020-08-04 21:46:23  
 * @Last Modified by: lzww
 * @Last Modified time: 2020-08-23 11:42:455
* 混入代码 resize_mixins.js
*/
import { debounce } from 'lodash'
const resizeChartMethod = '$__resizeChartMethod'
export default {
  data() {
    // 在组件内部将图表init的引用映射到chart属性上
    return {
      chart: null
    }
  },
  created() {
    window.addEventListener('resize', this[resizeChartMethod])
    this.$once("hook:beforeDestroy", this[resizeChartMethod]);
  },
  methods: {
    // 通过lodash的防抖函数来控制resize的频率
    [resizeChartMethod]: debounce(function() {
      console.log(this.chart)
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
  }
}