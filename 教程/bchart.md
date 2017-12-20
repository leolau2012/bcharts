弄了一堆线方块和函数，感觉挺玄乎，然并卵。我们直接写个项目看看。

canvas一个比较拽的应用就是图表和游戏，我们从浅入深，先玩图表，图表我们今天说一个最简单柱状图。

柱状图很多人用百度的echars,那么我们会用更要会写，为啥？我见过太多的人问我echarts不可能完全符合他们公司的需求，随便改一点东西就不搞了，简单的说我们要做开发者，而不是一个js库的搬运工，我们今天就参考这个效果http://echarts.baidu.com/demo.html#bar-gradient，写一个。

![柱状图](C:\Users\Administrator\Desktop\柱状图.png)

无话可说先搭架子。

index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>尼古拉斯·屌·大彬哥</title>
  <link rel="stylesheet" href="style.css" rel="stylesheet">
  <script src="index.js"></script>
</head>
<body>
  <div id="div1">
    这里留着画图用
  </div>
</body>
</html>

```

index.js

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
        console.log(arguments);
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

style.css

```
#div1{
  width:800px;
  height:600px;
  border: 1px solid #000;
  margin: 0 auto;
}
```

说三件事，

第一件事，搭好架子，后面写代码舒服。这里用的面向对象方式。

第二件事，基础的函数我就不写了，但是你写过100遍以上完全懂可以偷懒，否则老老实实自己研究明白他。

第三件事，数据我用的data模拟，实际项目一般是后台提供。



























