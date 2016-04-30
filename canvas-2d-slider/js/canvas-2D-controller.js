var CanvasScene = {
    container: null,
    canvas2d: null,
    ctx: null,
    renderer: null,
    CONTAINER_WIDTH: null,
    CONTAINER_HEIGHT: null,
    axes: null,
    init: function () {

        this.container = document.getElementById("canvas-2d-view");

        this.CONTAINER_WIDTH = this.container.offsetWidth;
        this.CONTAINER_HEIGHT = this.container.offsetHeight;
        this.canvas2d = document.createElement('canvas');
        this.canvas2d.id = "canvas2D";
        this.canvas2d.width = this.CONTAINER_WIDTH;
        this.canvas2d.height = this.CONTAINER_HEIGHT;
        this.container.appendChild(this.canvas2d);

//        this.ctx = this.canvas2d.getContext("2d");
//
//        this.axes = {};
//        this.axes.x0 = .5 + .5 * this.canvas2d.width;  // x0 pixels from left to x=0
//        this.axes.y0 = .5 + .5 * this.canvas2d.height; // y0 pixels from top to y=0
//        this.axes.scale = 40;                 // 40 pixels from x=0 to x=1
//        this.axes.doNegativeX = true;
//
//        showAxes(this.ctx, this.axes);
//
//        funGraph(this.ctx, this.axes, fun1, "rgb(11,153,11)", 1);
//        funGraph(this.ctx, this.axes, fun2, "rgb(66,44,255)", 2);
        draw();
    }
};
function draw() {
    
    CanvasScene.ctx = CanvasScene.canvas2d.getContext("2d");

    CanvasScene.axes = {};
    CanvasScene.axes.x0 = .5 + .5 * CanvasScene.canvas2d.width;  // x0 pixels from left to x=0
    CanvasScene.axes.y0 = .5 + .5 * CanvasScene.canvas2d.height; // y0 pixels from top to y=0
    CanvasScene.axes.scale = sliderVal;                 // 40 pixels from x=0 to x=1
    CanvasScene.axes.doNegativeX = true;

    showAxes(CanvasScene.ctx, CanvasScene.axes);

    funGraph(CanvasScene.ctx, CanvasScene.axes, fun1, "rgb(11,153,11)", 1);
    funGraph(CanvasScene.ctx, CanvasScene.axes, fun2, "rgb(66,44,255)", 2);
}
function fun1(x) {
    return Math.sin(x);
}
function fun2(x) {
    return Math.cos(3 * x);
}

function funGraph(ctx, axes, func, color, thick) {
    var xx, yy, dx = 4, x0 = axes.x0, y0 = axes.y0, scale = axes.scale;
    var iMax = Math.round((ctx.canvas.width - x0) / dx);
    var iMin = axes.doNegativeX ? Math.round(-x0 / dx) : 0;
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    for (var i = iMin; i <= iMax; i++) {
        xx = dx * i;
        yy = scale * func(xx / scale);
        if (i === iMin)
            ctx.moveTo(x0 + xx, y0 - yy);
        else
            ctx.lineTo(x0 + xx, y0 - yy);
    }
    ctx.stroke();
}
function showAxes(ctx, axes) {
    var x0 = axes.x0, w = ctx.canvas.width;
    var y0 = axes.y0, h = ctx.canvas.height;
    var xmin = axes.doNegativeX ? 0 : x0;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(xmin, y0);
    ctx.lineTo(w, y0);  // X axis
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0, h);  // Y axis
    ctx.stroke();
}
var sliderVal = 40;
function sliderChange() {
    sliderVal = document.getElementById("slider1").value;
    document.getElementById("rangeValue1").value = sliderVal;
    //CanvasScene.axes.scale = sliderVal;
    draw();
    // render
//    funGraph(CanvasScene.ctx, CanvasScene.axes, fun1, "rgb(11,153,11)", 1);
//    funGraph(CanvasScene.ctx, CanvasScene.axes, fun2, "rgb(11,153,11)", 1);
}

// Initialize KDMScene on page load
function initializeCanvasScene() {
    CanvasScene.init();
}

if (window.addEventListener) {
    window.addEventListener('load', initializeCanvasScene, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', initializeCanvasScene);
} else {
    window.onload = initializeCanvasScene;
}