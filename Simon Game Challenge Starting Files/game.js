$(".info").click(function(){
    $(".instructions").toggleClass("active");
});

$(".x").click(function(){
    $(".instructions").toggleClass("active");
})

buttonColours = ["red", "blue", "green", "yellow"];
gamePattern =[];
userClickedPattern = [];
let level = 0;
let started = false;

$(".small").click(function(){

if(!started){
    $("#title").text("Let's play!");
    $("#level-title").text("LEVEL " + level)
    nextSequence();
    started = true;
}});

$(".r").click(function(){
    startOver();
    $("#title").text("Press SIMON to start");
    $("#level-title").text("SIMON");

 
});

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
            }, 600);
        }
    
     } else {
            playSound("wrong");
    
            $("body").addClass("game-over");
           setTimeout (function(){
                $("body").removeClass("game-over");
               }, 200);
            
            $("#title").text("Game Over, Press SIMON to Restart");
            $("#level-title").text("SIMON");

            startOver();
        }
        
    }

//Add Sounds to Button Clicks
function playSound (name){
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }


//main sequence function
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playPattern(); // play updated gamePattern to user
};



/*
  Plays complete game pattern for user each level
*/
function playPattern() {
  var i = 0;
  const intervalId = setInterval(function() {
    $("#"+gamePattern[i]).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
    i += 1;
    if (i === gamePattern.length) {
        clearInterval(intervalId);
      }
    }, 600);
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

