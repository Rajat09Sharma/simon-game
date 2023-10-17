
var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=false;
var level=0;

$(".btn").click(function (){

    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);

    playSounds(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
});

$(document).keypress(function (){
    //if (!start) means that false===true the is "not" but this condition trun not to true so it run  
    if(!start){
        $("#level-title").text("level "+level);
        nextSequence();
        start=true;
    }
});



function nextSequence(){
    userClickedPattern=[];

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSounds(randomChosenColour);

    level++;
    $("#level-title").text("level "+level);
}

function playSounds(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else{
        // console.log("wrong");
        playSounds("wrong");
        $("body").addClass("game-over");
        setTimeout(function()  {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level =0;
    gamePattern=[];
    start=false;
}
