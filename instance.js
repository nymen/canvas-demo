class Background {
    constructor(width, height) {
        this.cWidth = width;
        this.cHeight = height;
    }

    draw(ctx) {
        ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, this.cWidth, this.cHeight);
        ctx.closePath();
        ctx.stroke();
    }
}

class Dashboard {
    constructor(cx, cy, cr) {
        this.cx = cx;
        this.cy = cy;
        this.cr = cr;
    }

    draw(ctx, bg, speed) {
        ctx.clearRect(0, 0, bg.cWidth, bg.cHeight);
        bg.draw(ctx);

        var grd=ctx.createLinearGradient(0, 0, 0, 300);
        grd.addColorStop(0,"#A9200E");
        grd.addColorStop(0.3,"#FB6039");
        grd.addColorStop(0.7,"#BC2316");
        grd.addColorStop(1,"silver");

        //1. 画圆
        //外圆
        ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, this.cr, Math.PI * 5 / 6, Math.PI * 13 / 6);
        ctx.lineWidth = 3;
        ctx.shadowBlur    = 50;
        ctx.shadowColor   = "#666666";
        ctx.strokeStyle = grd;
        ctx.stroke();//画空心圆
        ctx.closePath();
        //填充外圆
        ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, this.cr, Math.PI * 5 / 6, Math.PI * 13 / 6);
        ctx.lineWidth = 2;
        ctx.fillStyle = grd;
        ctx.fill();//画实心圆
        ctx.closePath();

        //内圆
        ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, this.cr - 15, Math.PI * 5 / 6, Math.PI * 13 / 6);
        ctx.lineWidth = 2;
        ctx.shadowBlur    = 0;
        ctx.strokeStyle = grd;
        ctx.stroke();//画空心圆
        ctx.closePath();
        //内圆填充
        ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, this.cr - 15, Math.PI * 5 / 6, Math.PI * 13 / 6);
        ctx.lineWidth = 2;
        ctx.fillStyle = "white";
        ctx.fill();//画实心圆
        ctx.closePath();

        //圆心
        ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, 5, Math.PI * 0, Math.PI * 2);
        ctx.fillStyle = "green";
        ctx.fill();//画实心圆
        ctx.closePath();

        //2. 标刻度
        for(var i = 0; i < 25; i++){
            ctx.beginPath();
            var degree = Math.PI * 4/3 + i * Math.PI/18;
            var sd = Math.abs(Math.sin(degree));
            var cd = Math.abs(Math.cos(degree));
            var startR = 0;
            if(i % 2 === 0){
                startR = this.cr - 15;
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'black';
            }else{
                startR = this.cr - 10;
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'blue';
            }
            var line = this.calculatePoint(degree, startR, this.cr, sd, cd);
            ctx.moveTo(line.startrx, line.startry);
            ctx.lineTo(line.endrx, line.endry);
            ctx.closePath();
            ctx.stroke();

            var fontPosition = this.calculatePoint(degree, this.cr - 30, this.cr, sd, cd);
            ctx.font = "bold 14px Courier New";
            ctx.fillStyle = "#A9200E";
            ctx.textAlign = 'center';
            ctx.fillText(i * 10 + '', fontPosition.startrx, fontPosition.startry);
        }

        //3. 画指针
        ctx.beginPath();
        var pointDegree = Math.PI * 4/3 + speed/10 * Math.PI/18;
        var pointsd = Math.abs(Math.sin(pointDegree));
        var pointcd = Math.abs(Math.cos(pointDegree));
        var pointer = this.calculatePoint(pointDegree, 0, this.cr - 15, pointsd, pointcd);

        ctx.strokeStyle = grd;
        ctx.lineWidth = 3;
        ctx.moveTo(this.cx, this.cy);
        ctx.lineTo(pointer.endrx, pointer.endry);
        ctx.closePath();
        ctx.stroke();

        //4. 绘制文本
        ctx.font = "bold 30px Courier New";
        ctx.fillStyle = "black";
        ctx.textAlign = 'center';
        ctx.fillText("km/h", this.cx, this.cy * 2 / 3);
    }

    calculatePoint(degree, startR, endR, sd, cd){
        var line = {
            startrx : 0,
            startry : 0,
            endrx : 0,
            endry : 0
        };
        if(degree >= Math.PI * 4/3 && degree <= Math.PI * 3/2){
            line.startrx = this.cx + startR * sd;
            line.startry = this.cy + startR * cd;
            line.endrx = this.cx + endR * sd;
            line.endry = this.cy + endR * cd;
        }else if(degree > Math.PI * 3/2 && degree <= Math.PI * 2){
            line.startrx = this.cx + startR * sd;
            line.startry = this.cy - startR * cd;
            line.endrx = this.cx + endR * sd;
            line.endry = this.cy - endR * cd;
        }else if(degree > Math.PI * 2 && degree <= Math.PI * 5/2){
            line.startrx = this.cx - startR * sd;
            line.startry = this.cy - startR * cd;
            line.endrx = this.cx - endR * sd;
            line.endry = this.cy - endR * cd;
        }else if(degree > Math.PI * 5/2 && degree <= Math.PI * 17/6){
            line.startrx = this.cx - startR * sd;
            line.startry = this.cy + startR * cd;
            line.endrx = this.cx - endR * sd;
            line.endry = this.cy + endR * cd;
        }
        return line;
    }
}
