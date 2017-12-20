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

