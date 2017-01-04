//index.js
//获取应用实例
var app = getApp()
var inputContent = {}
var hashForResult = {}

Page({
  data: {
    text: "",
  },
  //事件处理函数
  bindPrimaryTap: function() {
    //console.log(inputContent);
    var canRepeat = inputContent["canRepeat"] ? inputContent["canRepeat"] : false;
    var minInt = parseInt(inputContent["minValue"]);
    var maxInt = parseInt(inputContent["maxValue"]);

    var result = 0;
    var getOneResult = false;
    var resultStr = "";

    while (!getOneResult)
    {
      result = minInt + Math.floor(Math.random() * (maxInt - minInt + 1));
      console.log("result=" + result);
      
      if (isNaN(result)) {
         resultStr = "参数出错！";
         break;
      }

      resultStr = result.toString();
      
      if (!canRepeat) {
        // not exist
        if (!hashForResult[result]) {
          hashForResult[result] = 1;
          getOneResult = true;
        } else if (Object.keys(hashForResult).length >= maxInt - minInt + 1) {
          resultStr = "随机池子已经满了！";
          break;
        }
      }
      else {
        hashForResult[result] = 1;
        getOneResult = true;
      }
    }
    
    //console.log(hashForResult);

    this.setData({
      text : this.data.text + '\n' + resultStr,
    });
   
  },
  bindClearTap: function() {
    this.setData({
      text : ""
    });

    hashForResult = {};
   
  },

  bindChange: function(e) {
    inputContent[e.currentTarget.id] = e.detail.value;
  },

  onLoad: function () {
    console.log('onLoad')
  }
})
