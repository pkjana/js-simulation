var CanvasScene = {
    container: null,
    canvas2d: null,
    CONTAINER_WIDTH: null,
    CONTAINER_HEIGHT: null,
    init: function () {

        this.container = document.getElementById("canvas-2d-view");

        this.CONTAINER_WIDTH = this.container.offsetWidth;
        this.CONTAINER_HEIGHT = this.container.offsetHeight;
        this.canvas2d = document.createElement('canvas');
        this.canvas2d.id = "canvas2D";
        this.canvas2d.width = this.CONTAINER_WIDTH;
        this.canvas2d.height = this.CONTAINER_HEIGHT;
        this.container.appendChild(this.canvas2d);

        draw();
    }
};
function draw() {
    // get values directly from form
    var Vp = document.getElementById("vp").value;
    var fo = document.getElementById("fo").value;
    var phase = document.getElementById("phase").value;
    var Vmax = document.getElementById("vmax").value;
    var Tmax = document.getElementById("tmax").value;
    var N = document.getElementById("n").value;
    Vp = Number(Vp);
    fo = Number(fo);
    phase = Number(phase);
    Vmax = Number(Vmax);
    Tmax = Number(Tmax);
    N = Number(N);

    // define canvas
    var canvas = document.getElementById("canvas2D");
    if (null === canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");

    // fill canvas
    ctx.fillStyle = "#dddddd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // define origin at plot center
    var axes = {};
    axes.x0 = 0.5 + 0.5 * canvas.width;  // x0, y0 place plot origin in middle of canvas
    axes.y0 = 0.5 + 0.5 * canvas.height;

    // draw axes
    showAxes(ctx, axes);

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables

    // define plot paramaters
    tstart = -Tmax;
    tstop = Tmax;
    dt = (tstop - tstart) / (N - 1);				// time increment over N points
    axes.xscale = (canvas.width) / (2 * Tmax); 	// x pix per s
    axes.yscale = (canvas.height) / (2 * Vmax);    // y pix per V
    axes.N = N;


    // create function 
    for (i = 0; i < N; i++) {
        x[i] = tstart + i * dt;
        y[i] = Vp * Math.sin(2 * 3.1415 * fo * x[i] + phase * 3.1415 / 180);
    }

    // display variables for debug, remove /* and */
    /*
     alert(   "N=" + N + "\n"
     + "dt=" + dt + "\n"
     + "tstart=" + tstart + "\n"
     + "tstop=" + tstop + "\n"    
     + "fo=" + fo + "\n"  
     + "x[50]=" + x[50] + "\n"        );
     */

    // plot function
    GraphArray(ctx, axes, x, y, "rgb(0,0,256)", 1);

}

///////////////////////////////////////////////////////
function GraphArray(ctx, axes, x, y, color, thick) {

    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;
    y0 = axes.y0;
    xscale = axes.xscale;
    yscale = axes.yscale;

    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    for (i = 0; i < axes.N; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale;

        // draw ine to next point
        if (i === 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }

    ctx.stroke();
}
//////////////////////////////////////////////////////
function showAxes(ctx, axes) {
    var x0 = axes.x0, w = ctx.canvas.width;
    var y0 = axes.y0, h = ctx.canvas.height;

    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(0, y0);
    ctx.lineTo(w, y0);  // X axis
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0, h);  // Y axis
    ctx.stroke();

}
function sliderChange() {
    var sliderVal = document.getElementById("pick-voltage-slider").value;
    document.getElementById("vp").value = sliderVal;
    document.getElementById("pick-voltage-value").value = sliderVal;
    draw();
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