let time = 0;
let timerate = 0.05;
let wave = [];/*设定一个数组用于储存Y值*/
let WaveNums = 2;
let radiusBasic = 75;
let State = true;

function setup(){
    createCanvas(600,400);
}
function getNum(){
    WaveNums = document.getElementById("num").value;
}
function getTime(){
    if(timerate > 0){
    timerate = (float)(document.getElementById("time").value);
    }
}
function getRadius(){
    radiusBasic = (int)(document.getElementById("radius").value);
}
function changeState(){
    if(State == true){
        State = false;
    }else{
        if(State == false){
            State = true;
        }
    }
}

function draw(){
    background(0);
    translate(150,200);/*向上向下两百像素*/

    /*试图写出一个按照半径运动的点，试图把极坐标系用笛卡尔表示*/ 
    let x =0;
    let y =0;
    for(let i = 0; i < WaveNums; i++){//此处i小于几的值决定了有几个圆
        let prevx = x;//让X取上一个值
        let prevy = y;//让Y取上一个值
        let n = i * 2 + 1;
        let radius = radiusBasic * (4/ (n * PI));//75是半径的基数，后面的是公式
        x += radius * cos(n*time);/*由于4*sinθ/pi是一个正常的圆，得出结论*/
        y += radius * sin(n*time);/*点的X,Y坐标*/

        stroke(255,125);/*画笔颜色*///100是伽马值，此处将圆的亮度降低了
        noFill();/*不填充椭圆*/
        ellipse(prevx,prevy,radius*2);/*由于是椭圆函数，直径=radius*2。prevx,prevy的出现是由于新出现的小圆的圆心需要更改并追踪新的圆点*/

        // fill(255);/*一个被填充的点*/隐藏点
        stroke(255);//让圆心之间的连线变成更亮的白色
        line(prevx,prevy,x,y);/*从0，0到X,Y画一条线*/
        // ellipse(x,y,8)  隐藏了圆上的点

    }
    /*关于三角函数波的代码*/
    translate(200,0);/*移动X轴*/
    line(x-200,y,0,wave[0]);/*将点和波浪连接*/
    wave.unshift(y);/*存储Y到数组开头*/

    beginShape();
    // fill(255);测试
    noFill();
    for(let i = 0; i < wave.length; i++){/*尽可能多的获取Y值*/
        if(State == true){
        vertex(i,wave[i]);
        }else{
            if(State == false){
                point(i,wave[i]);//point 可以用于测试输出一个个点
            }
        }
    }
    endShape();

    time = time + timerate;

    if(wave.length>250){/*判断点是否过多，删掉点节省内存*/
        wave.pop();/*删除最后的点*/
    }
}
