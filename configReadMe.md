# config document

## 步驟
1. 加入需要的套件
```javascript
let Promise = require('bluebird')
```
2. 宣告一個 config object，裡面有一個屬性是 simulationOutPutFileName
    - simulationOutPutFileName 是用來設定模擬完後的檔案名稱
```javascript
let Promise = require('bluebird')

let config = {
  simulationOutPutFileName: {
  },
}
```
3. simulationOutPutFileName 中需有以下屬性
    - overallSimParSheet: overall 模擬結果的 PAR sheet
    - baseSimParSheet: base game 模擬結果的 PAR sheet
    - bonusSimParSheet: bonus game 模擬結果的 PAR sheet
    - overallSpin: overall 的 Spin Data
    - baseSpin: base game 的 Spin Data
    - bonusSpin: bonus game 的 Spin Data
    - survivalRate: 存活率分析的檔案
    - othersInfo: 附加資訊的檔案
  + 除了 othersInfo，其餘屬性的值皆為該檔案的檔名，若不需要此檔案則輸入 null
  + othersInfo 是一個存放 object 的 array
  + othersInfo 中每個 object 有2個屬性 
    - infoName: 這個資料的名稱
    - fileName: 這個資料的檔名
```javascript
let Promise = require('bluebird')

let config = {
  simulationOutPutFileName: {
    overallSimParSheet: 'overall',
    baseSimParSheet: 'base',
    bonusSimParSheet: 'bonus',
    overallSpin: 'overallSpin',
    baseSpin: 'baseSpin',
    bonusSpin: 'bonusSpin',
    survivalRate: 'survivalRate',
    othersInfo: [
      {
        infoName: 'overall',
        fileName: 'overallSpinRaw'
      }
    ]
  },
}
```
4. 在 config 中加入 pages 屬性
    - pages 是一個存放 object 的 array
    - pages 中每個 object 只有一個 title 的屬性 
```javascript
let Promise = require('bluebird')

let config = {
  simulationOutPutFileName: {},
  pages: [
    {
      title: 'Other Info 1'
    }
  ]
}
```
3. 在 pages 下面加入每個頁面自己的設定
    - 這些設定的數量需與 pages 中 object 的數量相同
    - 每個設定都是一個 object
    - 每個設定的名稱要分別跟上面 pages 設定的 title 一樣，只差在要把空格去掉
```javascript
let Promise = require('bluebird')

let config = {
  simulationOutPutFileName: {},
  pages: [
    {
      title: 'Other Info 1'
    }
  ],
  OtherInfo1: {

  }
}
```
4. 在每個頁中加入 data 屬性
    - data 是一個存放 object 的 array
    - data 是用來設定需要的 binary file 的 data format
    - 每個 data 的 object 有 2 個屬性
        - name: binary file 的名稱
        - format: binary file 的格式
```javascript
let Promise = require('bluebird')

let config = {
  simulationOutPutFileName: {},
  pages: [...],
  OtherInfo1: {
    data: [
      { 
        name: 'overall',
        format: [
          
        ]
      }
    ]
  }
}
```
5. 設定 format
    - format 是一個存放 object 的 array
    - 每個 object 代表一個變數
    - 每個變數有 2 個屬性
        - name: 變數的名稱
        - type: 變數的類型
    - 變數目前有 5 個類型
        - int: 4bytes
        - double: 8bytes 
        - string: 1byte * string length
            - string 要多設定一個 length 屬性
            - length: string 的長度
        - object: 需要多設定一個 content 屬性
            - content: object 的內容，一個變數陣列
        - array: 需要多設定 2 個屬性, length 跟 content
            - length: array 的長度
            - content: array 的內容，一個變數陣列
```javascript
let Promise = require('bluebird')

let config = {
  ...
  OtherInfo1: {
    data: [
      { 
        name: 'overall',
        format: [
          {
            name: 'netWinSet',
            type: 'array',
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
    ]
  }
}
```
6. 在每個頁中加入 settingItem 屬性 (可選)
    - settingItem 是一個存放 object 的 array
    - settingItem 用來設定網頁上的控制選項
    - 每個 settingItem 中的 object 有 3 個屬性
        - name: settingItem 的名稱
        - type: settingItem 的類型
        - config: 每個 object 的個別設定
    - settingItem 目前只有 2 個類型可使用
        - slider: 參考 [slider](https://vuetifyjs.com/components/sliders)
        - text: 文字輸入框
    - config 內容根據 object 的類型會有所不同
        - max (for slider): 設定 silde 可設定的最大值
        - min (for slider): 設定 silde 可設定的最小值
        - default (all): 設定預設值
```javascript
let Promise = require('bluebird')

let config = {
  ...
  OtherInfo1: {
    data: [...],
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
    ]
  }
}
```
7. 在每個頁中加入 renderData 屬性
    - renderData 是一個存放 object 的 array
    - renderData 是用來設定在網頁上要顯示的資料
    - 每個 renderData 中的 object 有 2 個屬性
        - type: 顯示的類型
        - config: 每個 object 的個別設定
    - renderData 目前只有 2 個類型可使用
        - chart: 參考 [HightChart](https://www.highcharts.com)
        - table: 參考 [table](https://vuetifyjs.com/components/data-tables)
    - config 內容根據 object 的類型會有所不同
        - 如果類型是 chart，可以在 [HightChart](https://www.highcharts.com) 上找到一些設定範例
        - 如果類型是 table, 只需要像下面的範例設定 header
            - text、value: 需要顯示的字
            - align: left 靠左，right 靠右
            - sortable: 可否用這個欄位排序
```javascript
let Promise = require('bluebird')

let config = {
  ...
  OtherInfo1: {
    data: [...],
    settingItem: [...],
    renderData: [
      {
        type: 'chart',
        config: {...}
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
              align: 'left',
              sortable: false,
              value: 'Value'
            }
          ]
        }
      }
    ]
  }
}
```
8. 加入 getData function
    - getData 必須使用 Promise
    - getData 是用來把 **原始的資料** 轉換成 **需要在網頁上顯示的資料**
    - 傳入參數: data 跟 setting
        - data: 原始的資料
        - setting: 網頁透過上面的 settingItem 設定完的資料
    - 執行完後，在 resolve() 中放入 **需要在網頁上顯示的資料**
    - 如果原始資料 = 需要在網頁上顯示的資料，function 內就只要寫 resolve(<資料>)
```javascript
let Promise = require('bluebird')

let config = {
  ...
  OtherInfo1: {
    data: [...],
    settingItem: [...],
    renderData: [...],
    getData: function (data, setting) {
      return new Promise((resolve, reject) => {
        ...
        resolve()
      })
    },
  }
}
```
9. 加入 process function
    - process 必須使用 Promise
    - process 是用來把 **需要在網頁上顯示的資料** 處理後，放入 **renderData 的指定位置**
    - 傳入參數: data 跟 bindData
        - data: 需要在網頁上顯示的資料
        - bindData: 上面設定的 renderData
    - 執行完後，在 resolve() 中放入 bindData
```javascript
let Promise = require('bluebird')

let config = {
  ...
  OtherInfo1: {
    data: [...],
    settingItem: [...],
    renderData: [...],
    getData: function (data, setting) {...},
    process: function (input, bindData) {
      return new Promise((resolve, reject) => {
        ...
        resolve()
      })
    }
  }
}
```
10. 照下面範例打 module.exports
```javascript
let Promise = require('bluebird')

let config = {
  ...
}

module.exports = {
  config: config
}
```