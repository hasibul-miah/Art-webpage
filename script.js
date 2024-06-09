let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let drawLine = (x1, y1, x2, y2, thickness, color)=>{
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
}

let setCanvasSize=()=>{
    canvas.width = window.visualViewport.width;
    canvas.height = window.visualViewport.height;
    startX = canvas.width / 2;
    height = 
    ((canvas.height > canvas.width ? canvas.width : canvas.height)*10) / 36;
    startY = 
    canvas.height / 2 +
    (canvas.width > canvas.height ? canvas.height : canvas.width)/4;

};

window.onresize = setCanvasSize;

let angleInc = (30 * Math.PI) / 180;
let angleIncChange = -(0.5 * Math.PI) / 180;
let startX = canvas.width / 2;
let startY = canvas.height - 100
let height = (canvas.height * 10) / 36;
let thickness = 2;
let maxDepth = 6;
let count = 0;
let branchPro = 8;
let color = 'white';


document.getElementById("color").addEventListener("input",()=>{
color = document.getElementById('color').value;
});

let drawBranch = (x,y,height, thickness, angle, depth)=>{
    if(depth > maxDepth) return;
    let endX = x - height * Math.sin(+angle);
    let endY = y - height * Math.cos(+angle);
    drawLine(x, y,endX, endY, thickness, color);
    let newHeight = (height * 8) / 12;
    let newThickness = (thickness * 6) / 12;
    let angleStart;
    if(branchPro % 2 == 0){
        angleStart = 
        angle -
        angleInc / 2 -
        (Math.trunc(branchPro / 2) - 1) * angleInc;
    }else{
        angleStart = angle - Math.trunc(branchPro / 2) * angleInc;
    }

    for(let i = 0; i<branchPro;i++){
        drawBranch(
            endX,
            endY,
            newHeight,
            newThickness,
            angleStart + i * angleInc,
            depth + 1
        );
    };


};

let drawAnimation=()=>{
    angleInc += angleIncChange;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBranch(startX, startY, height, thickness, 0,Math.PI/2);
    requestAnimationFrame(drawAnimation);
}

setCanvasSize();
drawAnimation();

let changepro=(e)=>{
    angleIncChange *= branchPro / e;
    branchPro = e;
}

let changeAngleIncrement=(e)=>{
angleIncChange = (e * (-0.01 * Math.PI)) / 180;

};

let changeColor=(e)=>{
color = e;
}
let changeThichnessAngel=()=>{
    thickness = e;
}