/**
  此处可以写一些装13的东西
  尽可能用英文，不会可以自己百度，

  例如：
  Author：leo lau
  desc:ni shishibushiwozuitengaideren ,ni weisha bushuo hua
**/
'use strict';
//模仿 http://echarts.baidu.com/demo.html#bar-gradient
window.onload = function(){
    var data = [
      {"label":"一月","value":getRandomInt(0,400)},
      {"label":"二月","value":getRandomInt(1,400)},
      {"label":"三月","value":getRandomInt(1,400)},
      {"label":"四月","value":getRandomInt(0,400)},
      {"label":"五月","value":getRandomInt(1,400)}
    ];

    var targetId = 'div1';
    var cw = 600;
    var ch = 450;
    //为啥用面向对象方式，因为显得拽呗
    //
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

        //开画
        c.draw();


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
        //确定横竖格宽度
        c.verBound = Math.ceil(c.MaxValue/10)*10;
        c.verFeq = c.verBound/c.itemNum;
        c.horFeq = c.horAxiWidth/c.itemNum;
    };
    Bcharts.prototype.draw = function(){
        var c = this;
        c.drawX();//x轴
        c.drawY();//y轴
        c.drawYLabel();//y坐标字儿
        c.drawXLabel();//y坐标字儿
        c.HorGuideLines();
        c.verGuideLines();
        c.drawBars();
    };
    Bcharts.prototype.drawX = function(){
      var c = this;
      var gd = c.context;
        gd.beginPath();
        gd.moveTo(c.horGap,c.ch -c.verGap);
        gd.lineTo(c.cw -c.horGap,c.ch -c.verGap);
        gd.lineWidth = 2;
        gd.stroke();
    };
    Bcharts.prototype.drawY = function(){
      var c = this;
      var gd = c.context;
        gd.beginPath();
        gd.moveTo(c.horGap,c.ch -c.verGap);
        gd.lineTo(c.horGap,c.verGap);
        gd.lineWidth = 2;
        gd.stroke();
    };
    Bcharts.prototype.drawYLabel = function(){
      var c = this;
      var gd = c.context;
      for(var i = 0;i<=c.itemNum;i++){
        var labelYText = c.verBound - i*c.verFeq;
        var labelPosX = c.horGap - c.horGap/c.axeRadio;
        var scaleReq = (c.verAxiWidth/c.verBound)*c.verFeq;
        var labelPosY = c.verGap+i*scaleReq;
        gd.textAlign = 'right';
        gd.fillText(labelYText,labelPosX,labelPosY);
      }
      Bcharts.prototype.drawXLabel = function(){
        var c = this;
        var gd = c.context;
        for(var i = 0;i<c.itemNum;i++){
          var labelXText = c.label[i];
          var labelPosX = c.horGap + i*c.horFeq +c.horFeq/2;
          var labelPosY = c.ch - c.verGap+c.verGap/c.axeRadio;
          gd.textAlign = 'center';
          gd.textBaseline = 'top';
          gd.fillText(labelXText,labelPosX,labelPosY);
        }
      };


    };
    Bcharts.prototype.drawY = function(){
      var c = this;
      var gd = c.context;
        gd.moveTo(c.horGap,c.ch -c.verGap);
        gd.lineTo(c.horGap,c.verGap);
        gd.lineWidth = 2;
        gd.stroke();
    };
    Bcharts.prototype.HorGuideLines = function(){
      var c = this;
      var gd = c.context;

      gd.strokeStyle = '#eeeeee';
      gd.lineWidth = 1;
      for(var i = 0;i<c.itemNum;i++){
        gd.beginPath();
        var scaleReq = (c.verAxiWidth/c.verBound)*c.verFeq;
        var horStartX = c.horGap;
        var horStartY = c.verGap+i*scaleReq;
        var horEndX = c.cw -c.horGap;
        var horEndY = c.verGap+i*scaleReq;
        gd.moveTo(horStartX,horStartY);
        gd.lineTo(horEndX,horEndY);
        gd.stroke();

      }
    };
    Bcharts.prototype.verGuideLines = function(){
      var c = this;
      var gd = c.context;

      gd.strokeStyle = '#eeeeee';
      gd.lineWidth = 1;
      for(var i = 0;i<=c.itemNum;i++){
        gd.beginPath();
        var verStartX = c.horGap+i*c.horFeq;
        var verStartY = c.ch - c.verGap;
        var verEndX = c.horGap+i*c.horFeq;
        var verEndY = c.verGap;
        gd.moveTo(verStartX,verStartY);
        gd.lineTo(verEndX,verEndY);
        gd.stroke();

      }
    };
    Bcharts.prototype.drawBars = function () {
      // alert(1);
      var c = this;

      for(var i = 0; i < c.itemNum; i++){
        // alert(1);
        var color = c.rndColor();
        var fillOpacity = '0.3';
        var fillColor = 'rgba('+ color.r + ', ' + color.g  + ', ' + color.b + ', ' + fillOpacity +')';
        var borderColor = 'rgba('+ color.r + ', ' + color.g  + ', ' + color.b + ')';

        c.context.beginPath();

        var barX = c.horGap + i * c.horFeq+c.horFeq/c.axeRadio;
        var barY = c.ch - c.verGap;
        var barWidth = c.horFeq - 2*c.horFeq/c.axeRadio;
        var barHeight = -c.verAxiWidth * c.values[i] / c.MaxValue;
        console.log(c.MaxValue);

        c.context.fillStyle = fillColor;
        c.context.strokeStyle = borderColor;
        c.context.rect(barX, barY, barWidth, barHeight);
        // console.log(barX,barY,barWidth,barHeight);
        c.context.stroke();
        c.context.fill();
      }
    };

    Bcharts.prototype.rndColor = function () {
      var r = getRandomInt(0, 257);
      var g = getRandomInt(0, 257);
      var b = getRandomInt(0, 257);
      return {r: r, g: g, b: b};
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
