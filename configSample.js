let Promise = require('bluebird')

let config = {
  simulationOutPutFileName: {
    overallSimParSheet: '1PARSheet',
    baseSimParSheet: '0PARSheet',
    bonusSimParSheet: null,
    overallSpin: '1SpinData',
    baseSpin: '0SpinData',
    bonusSpin: null,
    survivalRate: '1Survival',
    othersInfo: [
      {
        infoName: 'overall',
        fileName: '1Extrainfo.bin'
      }
    ]
  },
  pages: [
    {
      title: 'Other Info 1'
    }
  ],
  OtherInfo1: {
    data: [
      { 
        name: 'overall',
        format: [
          {
            name: 'netWinSet',
            type: 'int',
            length: 4000000,
            content: [
              {
                name: 'object',
                type: 'object',
                content: [
                  {
                    name: 'netWin',
                    type: 'int'
                  },
                  {
                    name: 'triger',
                    type: 'int'
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    settingItem: [
      {
        name: 'size',
        type: 'slider',
        config: {
          max: 4000000,
          min: 1,
          default: 4000000
        }
      },
      { 
        name: 'step',
        type: 'slider',
        config: {
          max: 400,
          min: 1,
          default: 400
        }
      },
      { 
        name: 'range',
        type: 'slider',
        config: {
          max: 100,
          min: 1,
          default: 20
        }
      }
    ],
    renderData: [
      {
        type: 'chart',
        config: {
          chart: {
            type: 'column'
          },
          title: {
            text: 'RTP'
          },
          xAxis: {
            title: {
              text: 'RTP'
            }
          },
          yAxis: {
            title: {
              text: 'times'
            },
            type: 'logarithmic'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: false
              }
            }
          },
          series: [{
            name: 'Times'
          }]
        }
      }, 
      {
        type: 'table',
        config: {
          header: [
            {
              text: 'Data',
              align: 'left',
              sortable: false,
              value: 'Data'
            },
            {
              text: 'Value',
              sortable: false,
              value: 'Value'
            }
          ]
        }
      }
    ],
    getData: function (data, setting) {
      return new Promise((resolve, reject) => {
        let arr     = []
        let betCost = 25
        let size    = setting.size
        let step    = setting.step
        let range   = setting.range
        let chart   = {}
  
        for (let i = 0; i < size; i += step) {
          let rtp = 0;
          for (let j = i; j < i + step; j++) {
            rtp += data.overall.netWinSet[j].netWin / betCost + 1;
          }
          arr.push(rtp / step);
        }
        arr.sort((x, y) => {
          if (x > y) return 1
          else if (x < y) return -1
          else return 0
        })
        let sum   = 0
        let count = 0
  
        let Q1     = Math.ceil(size / step / 4)
        let Median = Math.ceil(size / step / 2)
        let Q3     = Math.ceil(size / step * 3 / 4)
  
        let Q1Flag     = true
        let MedianFlag = true
        let Q3Flag     = true
  
        let table = {
          Min: Math.floor(arr[0] * 100 / range) * range / 100,
          Max: Math.floor(arr[arr.length - 1] * 100 / range) * range / 100
        }
  
        let chartSize = 0
        for (let rtp of arr) {
          let tmp = Math.floor(rtp * 100 / range)
  
          count += 1
          sum   += tmp * range / 100
          
          if (Q1Flag && count > Q1) {
            table.Q1 = tmp * range / 100
            Q1Flag = false
          }
          if (MedianFlag && count > Median) {
            table.Median = tmp * range / 100
            MedianFlag = false
          }
          if (Q3Flag && count > Q3) {
            table.Q3 = tmp * range / 100
            Q3Flag = false
          }
  
          while (tmp >= chartSize) {
            chart[chartSize * range / 100] = 0
            chartSize++
          }
          chart[tmp * range / 100] += 1
        }

        table.Avg = Math.floor(sum * step * 100 / size) / 100
  
        resolve({chart: chart, table: table})
      })
    },
    process: function (input, bindData) {
      return new Promise((resolve, reject) => {
        let data = []
        let categories = []
        for (let index in input.chart) {
          data.push([index, input.chart[index]])
          categories.push(parseFloat(index))
        }
        categories.sort((x, y) => {
          if (x > y) return 1
          else if (x < y) return -1
          else return 0
        })
        data.sort((x, y) => {
          if (parseFloat(x[0]) > parseFloat(y[0])) return 1
          else if (parseFloat(x[0]) < parseFloat(y[0])) return -1
          else return 0
        })

        let name = ['Avg', 'Q1', 'Median', 'Q3', 'Max', 'Min']
        let table = []
        for (let i of name) {
          table.push({
            Data: i,
            Value: input.table[i]
          })
        }

        bindData[0].config.xAxis.categories = categories
        bindData[0].config.series[0].data = data
        bindData[1].config.data = table

        resolve(bindData)
      })
    }
  }
}

module.exports = {
  config: config
}