
buttonColours = ["red", "blue", "green", "yellow"];
gamePattern =[];
userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(function(){

if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}});

//Check Which Button is Pressed

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



//Check the User's Answer Against the Game Sequence

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log ("success");
    
        if (gamePattern.length === userClickedPattern.length){
    
            setTimeout (function(){
            nextSequence()
            }, 1000);
        }
    
     } else {
            playSound("wrong");
    
            $("body").addClass("game-over");
           setTimeout (function(){
                $("body").removeClass("game-over");
               }, 200);
            
            $("#level-title").text("Game Over, Press Any Key to Restart");

            startOver();
        }
        
    }
    
    


//main sequence function
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

//Show the Sequence to the User with Animations and Sounds
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

};
//Add Sounds to Button Clicks

function playSound (name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//Add Animations to User Clicks

function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

//Restart the Game

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

