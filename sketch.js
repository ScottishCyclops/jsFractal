const RADIUS = 4;
const ATTRACTION = 1/2;

let shape1;
let shape2;
let brush;
let gamePhase;
let drawCalls;

let phaseEnum = 
{
    SHAPE1 : 0,
    SHAPE2 : 1,
    DRAW   : 2,
};


function setup()
{
    createCanvas(800, 600);
    frameRate(240);
    noStroke();
    background(240);

    shape1 = new Array();
    shape2 = new Array();
    brush = createVector(random(width),random(height));
    gamePhase = phaseEnum.SHAPE1;
    drawCalls = 0;
}

function draw()
{
    //draw brush
    if(gamePhase === phaseEnum.DRAW)
    {
        fill(255,0,0,100),
        ellipse(brush.x,brush.y,RADIUS);
        drawCalls++;

        moveBrush();
    }
}

function moveBrush()
{
    let shape = shape1;
    if(shape2.length > 0)
    {
        random(1) < .5 ? shape = shape1 : shape = shape2;
    }

    let goal = shape[floor(random(shape.length))].copy();
    brush = goal.sub(brush).mult(ATTRACTION).add(brush);
}

function keyPressed()
{
    if(keyCode === 13)
    {
        //phase switching
        gamePhase === phaseEnum.SHAPE1 ? gamePhase = phaseEnum.SHAPE2 : gamePhase = phaseEnum.DRAW;
    }
}

function mouseClicked()
{
    if(gamePhase !== phaseEnum.DRAW)
    {
        let mouseVector = createVector(mouseX,mouseY);

        if(gamePhase === phaseEnum.SHAPE1)
        {
            fill(0,100,0);
            shape1.push(mouseVector);
        }
        else
        {
            fill(0,0,100);
            shape2.push(mouseVector);
        }

        ellipse(mouseVector.x,mouseVector.y,RADIUS);
    }
}
