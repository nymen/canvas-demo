var option = {speed: 0};
var ctx;
var bg;
var dashboard;
var int1;
var int2;
//启动
function setup() {
    var ele = document.getElementById("myCanvas");
    ctx = ele.getContext("2d");
    dashboard = new Dashboard(200, 200, 180);
    option.speed = Math.floor(Math.random() * 100 + 1);
    bg = new Background(400, 300);
    for (var i = 0; i < option.speed; i = i + 0.1) {
        (function (speed) {
            setTimeout(function () {
                dashboard.draw(ctx, bg, speed);
            }, 50);
        })(i);
    }
}

//按方向键上下可以让指针动起来
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e.keyCode === 38) {
        clearInterval(int2);
        int1 = setTimeout(function () {
            if(option.speed <= 240){
                dashboard.draw(ctx, bg, option.speed);
                if(option.speed + 2 <= 240){
                    option.speed = option.speed + 2;
                }
            }
        }, 50);
    } else if (e.keyCode === 40) {
        clearInterval(int1);
        int2 = setTimeout(function () {
            if(option.speed>= 0){
                dashboard.draw(ctx, bg, option.speed);
                if(option.speed - 2 >= 0){
                    option.speed = option.speed - 2;
                }
            }
        }, 50);
    }
};