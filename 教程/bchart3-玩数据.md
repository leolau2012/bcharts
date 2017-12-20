我们提前做些准备工作，比如画图前先把坐标边距做出来，还有各种字体大小算出来。

这里需要一点面向对象的知识，

```
'use strict';
//模仿 http://echarts.baidu.com/demo.html#bar-gradient
window.onload = function(){
    var data = [
      {"label":"一月","value":getRandomInt(0,400)},
      {"label":"一月","value":getRandomInt(1,400)},
      {"label":"一月","value":getRandomInt(1,400)}
    ];

    var targetId = 'bchart';
    var cw = 800;
    var ch = 600;

    function Bcharts(targetId,cw,ch,data){
      //基础信息
        var c = this;//为啥这么做？我懒，c = chart = this;
        c.targetId = targetId;
        c.cw = cw;
        c.ch = ch;
        c.data = data;
      //坐标准备,为啥要准备？因为坐标和字体都应该是动态算出来的不能是写死的否则实用性不够
        c.axeRadio = 10;//定义一个比例,为啥是10，看图大体是这个随便定的，别忒离谱就好
        c.horGap = (cw*axeRadio)/100;
        c.verGap = (ch*axeRadio)/100;
      //标识准备
        c.fontRadio = 3;//原因同上
        c.horFontSize = (cw*fontRadio)/100;
        c.verFontSize = (ch*fontRadio)/100;
    }

    var charts = new Bcharts(targetId,cw,ch,data);
};
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// 偷个懒，基础函数不写了
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

```

说一点，你如果不懂就先按照我写的弄出来，别自己发明创造，写多了你也就知道为什么我这么写了。当然上面这个写法挺恶心的，让我想起了，没有整理过的女生宿舍，

![脏乱](C:\Users\Administrator\Desktop\脏乱.jpg)一坨坨代码，所以我们我们整理下结构。

```
'use strict';
//模仿 http://echarts.baidu.com/demo.html#bar-gradient
window.onload = function(){
    var data = [
      {"label":"一月","value":getRandomInt(0,400)},
      {"label":"一月","value":getRandomInt(1,400)},
      {"label":"一月","value":getRandomInt(1,400)}
    ];

    var targetId = 'bchart';
    var cw = 800;
    var ch = 600;

    function Bcharts(targetId,cw,ch,data){
      //基础信息
        var c = this;//为啥这么做？我懒，c = chart = this;
        c.configureChart(targetId,cw,ch,data);

    }
    Bcharts.prototype.configureChart = function(targetId,cw,ch,data){
      var c = this;
      c.setCanvasParameters(targetId,cw,ch,data);
      c.setChartParameters(targetId,cw,ch,data);
    };
    Bcharts.prototype.setCanvasParameters = function(targetId,cw,ch,data){
      var c = this;
      c.targetId = targetId;
      c.cw = cw;
      c.ch = ch;
      c.data = data;
    };
    Bcharts.prototype.setChartParameters = function(targetId,cw,ch,data){
      var c = this;
      c.axeRadio = 10;//定义一个比例,为啥是10，看图大体是这个随便定的，别忒离谱就好
      c.horGap = (c.cw*c.axeRadio)/100;
      c.verGap = (c.ch*c.axeRadio)/100;
    //标识准备
      c.fontRadio = 3;//原因同上
      c.horFontSize = (c.cw*c.fontRadio)/100;
      c.verFontSize = (c.ch*c.fontRadio)/100;

    };

    var charts = new Bcharts(targetId,cw,ch,data);
};
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// 偷个懒，基础函数不写了
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

```

忽然感觉就像整理过的女生宿舍有么有，太整齐了！

![整洁](C:\Users\Administrator\Desktop\整洁.jpg)好，整理好了代码，先怼一个canvas画布进去，这里注意我也用的面向对象方式，定义了一个init函数，注意我把targetId改了一下，之前写错了。

最终代码如下，

```
'use strict';
//模仿 http://echarts.baidu.com/demo.html#bar-gradient
window.onload = function(){
    var data = [
      {"label":"一月","value":getRandomInt(0,400)},
      {"label":"一月","value":getRandomInt(1,400)},
      {"label":"一月","value":getRandomInt(1,400)}
    ];

    var targetId = 'div1';
    var cw = 800;
    var ch = 600;

    function Bcharts(targetId,cw,ch,data){
      //基础信息
        var c = this;//为啥这么做？我懒，c = chart = this;
        c.configureChart(targetId,cw,ch,data);
        c.init();

    }
    Bcharts.prototype.configureChart = function(targetId,cw,ch,data){
      var c = this;
      c.setCanvasParameters(targetId,cw,ch,data);
      c.setChartParameters(targetId,cw,ch,data);
    };
    Bcharts.prototype.setCanvasParameters = function(targetId,cw,ch,data){
      var c = this;
      c.id = targetId;
      c.cw = cw;
      c.ch = ch;
      c.data = data;
    };
    Bcharts.prototype.setChartParameters = function(targetId,cw,ch,data){
      var c = this;
      c.axeRadio = 10;//定义一个比例,为啥是10，看图大体是这个随便定的，别忒离谱就好
      c.horGap = (c.cw*c.axeRadio)/100;
      c.verGap = (c.ch*c.axeRadio)/100;
    //标识准备
      c.fontRadio = 3;//原因同上
      c.horFontSize = (c.cw*c.fontRadio)/100;
      c.verFontSize = (c.ch*c.fontRadio)/100;

    };
    //初始化
    Bcharts.prototype.init = function(){
        var c = this;
        c.createCanvas();


    };
    Bcharts.prototype.createCanvas = function(){
        var c = this;
        var canvas = document.createElement('canvas');
        canvas.id = c.id + '-' + Math.random();
        canvas.width = c.cw;
        canvas.height = c.ch;
        document.getElementById(c.id).innerHTML = '';
        document.getElementById(c.id).appendChild(canvas);

        c.canvas = canvas;
        c.context = c.canvas.getContext('2d');
    };
    var charts = new Bcharts(targetId,cw,ch,data);
};
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// 偷个懒，基础函数不写了
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
```

这里注意，准备canvas完毕我们就准备两个函数一个是后台数据过来处理函数，一个是处理完的数据针对图表重新计算的函数。

```
'use strict';
//模仿 http://echarts.baidu.com/demo.html#bar-gradient
window.onload = function(){
    var data = [
      {"label":"一月","value":getRandomInt(0,400)},
      {"label":"二月","value":getRandomInt(1,400)},
      {"label":"三月","value":getRandomInt(1,400)}
    ];

    var targetId = 'div1';
    var cw = 800;
    var ch = 600;

    function Bcharts(targetId,cw,ch,data){
      //基础信息
        var c = this;//为啥这么做？我懒，c = chart = this;
        c.configureChart(targetId,cw,ch,data);
        c.init();

    }
    Bcharts.prototype.configureChart = function(targetId,cw,ch,data){
      var c = this;
      c.setCanvasParameters(targetId,cw,ch,data);
      c.setChartParameters(targetId,cw,ch,data);
    };
    Bcharts.prototype.setCanvasParameters = function(targetId,cw,ch,data){
      var c = this;
      c.id = targetId;
      c.cw = cw;
      c.ch = ch;
      c.data = data;
    };
    Bcharts.prototype.setChartParameters = function(targetId,cw,ch,data){
      var c = this;
      c.axeRadio = 10;//定义一个比例,为啥是10，看图大体是这个随便定的，别忒离谱就好
      c.horGap = (c.cw*c.axeRadio)/100;
      c.verGap = (c.ch*c.axeRadio)/100;
    //标识准备
      c.fontRadio = 3;//原因同上
      c.horFontSize = (c.cw*c.fontRadio)/100;
      c.verFontSize = (c.ch*c.fontRadio)/100;

    };
    //初始化
    Bcharts.prototype.init = function(){
        var c = this;
        c.createCanvas();
        //这里只是把后台给你的数据整理好了，并不是图表直接能画的数据
        //比如最大值是234，其实我们要花240，不可能是不整齐的
        c.handleData();
        //所以需要处理数据
        c.prepareData();
        console.log(c);


    };
    Bcharts.prototype.createCanvas = function(){
        var c = this;
        var canvas = document.createElement('canvas');
        canvas.id = c.id + '-' + Math.random();
        canvas.width = c.cw;
        canvas.height = c.ch;
        document.getElementById(c.id).innerHTML = '';
        document.getElementById(c.id).appendChild(canvas);
        c.canvas = canvas;
        c.context = c.canvas.getContext('2d');
    };
    Bcharts.prototype.handleData = function(){
        //因为后台肯定给你标准的数组格式一堆，但是你没法直接用，得自己666一把
        var c = this;
        c.label = [];//这个数组放循环内容的名字，比如[一月，二月]
        c.values = [];//放值[200,45……]
        c.data.forEach(function(item){
          c.label.push(item.label);
          c.values.push(item.value);
        });
    };
    Bcharts.prototype.prepareData = function(){
        var c = this;
        c.itemNum = c.data.length;
        c.MaxValue = Math.max.apply(null,c.values);
        c.MinValue = Math.min.apply(null,c.values);
        //算坐标宽高
        c.horAxiWidth = c.cw - 2*c.horGap;
        c.verAxiWidth = c.ch - 2*c.verGap;

        //计算最大上边界，比如最大数是234，坐标得到240，而不是234
        //确定横竖格子数
        c.verBound = Math.ceil(c.MaxValue/10)*10;
        c.horFeq = c.verBound/c.itemNum;
        c.verFeq = c.horAxiWidth/c.itemNum;
    };
    var charts = new Bcharts(targetId,cw,ch,data);
};
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// 偷个懒，基础函数不写了
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

```

其实图表的绘画最难的不是绘画，而是数据的整理，到这一步，基本上最难的就结束了，后面我们开始画，就轻松多了。