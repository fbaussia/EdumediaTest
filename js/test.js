var canvas = document.getElementById("canvas");
canvas.width = 1024;
canvas.height = 768;
var ctx = canvas.getContext("2d");


//Red Circle
var x1 = 80; 
var y1 = 150;
//Blue Circle
var x2 = 150; 
var y2 = 500;
//Yellow Circle
var x3 = 800; 
var y3 = 400;
//Text 
var res;
res = finalDist();

window.onload = function(){

function drawCircle(x,y,size ,color){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStylle = "black";
    ctx.stroke();
    
}

function draw(){
    window.addEventListener("mousedown",down,false);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle(x1,y1 ,40,"red");
    drawCircle(x2,y2,40,"blue");
    drawCircle(x3,y3,40,"yellow");
    drawCircle(canvas.width / 2,canvas.height /2 ,10,"black");

    //res Text
    ctx.font = "30px Arial";
    ctx.textAlign = 'center';
    ctx.fillText(res, canvas.width / 2, 50); 
}

function down(event){

    window.addEventListener("mousemove",move);
    window.addEventListener("mouseup", mouseup);

    function mouseup(){
        window.removeEventListener("mousemove",move);
        window.removeEventListener("mouseup",mouseup)
    };

    function move(event){

        let cx = event.clientX;
        let cy = event.clientY;

        //mouse position
        rect = canvas.getBoundingClientRect();
        let newCx = cx-rect.left;
        let newCy = cy-rect.top;

        distanceRedCircle = calculDist(x1,canvas.width / 2,y1,canvas.height /2);
        distanceBlueCircle = calculDist(x2,canvas.width / 2,y2,canvas.height /2);
        distanceYellowCircle = calculDist(x3,canvas.width / 2,y3,canvas.height /2);
        
       
        //red circle detection
        if(x1 >= newCx - 40 && x1 <= newCx + 40 && y1 >= newCy - 40 && y1 <= newCy+40){
            x1 = newCx;
            y1 = newCy;
            drawCircle(x1,y1 ,40,"red");
        }
        //blue circle detection
        if(x2 >= newCx - 40 && x2 <= newCx + 40 && y2 >= newCy - 40 && y2 <= newCy+40){
            x2 = newCx;
            y2 = newCy;
            drawCircle(x2,y2 ,40,"blue");
        }
        //yellow circle detection
        if(x3 >= newCx - 40 && x3 <= newCx + 40 && y3 >= newCy - 40 && y3 <= newCy+40){
            x3 = newCx;
            y3 = newCy;
            drawCircle(x3,y3 ,40,"yellow");
        }

        res = finalDist();  
    }   
    
}
 
setInterval(draw, 5);

}

//Distance Calculation
function calculDist(x1,x2,y1,y2){
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.sqrt( a*a + b*b );

    return c;
}

//calculation of the circle closest to the center
function finalDist(){
    var res;
    var distanceRedCircle = calculDist(x1,canvas.width / 2,y1,canvas.height /2);
    var distanceBlueCircle = calculDist(x2,canvas.width / 2,y2,canvas.height /2);
    var distanceYellowCircle = calculDist(x3,canvas.width / 2,y3,canvas.height /2);

    if(distanceRedCircle < distanceBlueCircle && distanceRedCircle < distanceYellowCircle){
        res = "Red";

    }
     if(distanceYellowCircle < distanceRedCircle && distanceYellowCircle < distanceBlueCircle){
        res = "Yellow";
        
    }
    if(distanceBlueCircle < distanceRedCircle && distanceBlueCircle < distanceYellowCircle){
            res = "Blue";
    }
    
    return res;
}