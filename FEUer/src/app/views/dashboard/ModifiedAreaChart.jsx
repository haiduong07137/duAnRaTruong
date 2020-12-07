import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { merge } from 'lodash'

const defaultOption = {
  // visualMap: {
  //   top: 0,
  //   right: 10,
  //   outOfRange: {
  //     color: '#999',
  //   },
  // },
  grid: {
    top: 16,
    left: 24,
    right: 0,
    bottom: 24,
  },
  legend: {},
  tooltip: {},
  xAxis: {
    show: true,
    type: 'time',
    splitLine: {
      show: false,
    },
    // time: {
    //   unit: 'month',
    // },
    showGrid: false,
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 200,
    splitLine: {
      show: true,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: 'rgba(0,0,0,0.54)',
      fontSize: 11,
      fontFamily: 'roboto',
    },
  },
}

const ModifiedAreaChart = ({ height, option }) => {
  return (
    <ReactEcharts
      style={{ height: height }}
      option={merge({}, defaultOption, option)}
    />
  )
}

export default ModifiedAreaChart
