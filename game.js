
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameStart = true;
var level = 0;

$(document).keydown(function (e) {
    if (gameStart) {
        nextSequence();
        gameStart = false;
       
    }
});


$(".btn").click(function (e) {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    pressed(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
}

)
$(".normal").click(function (e) {
    if (gameStart) {
        nextSequence();
        gameStart = false;
    }
})

/********************************************Functions*******************************************************************/
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    colorSequence(randomChosenColor);
    playSound(randomChosenColor);
    level++;
    $("h1").text("level " + level);
    $('span').text(level);
}

function checkAnswer(currentLevel) {
    //Array comparer
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        //Next Sequence checker
        if (userClickedPattern.length === gamePattern.length) {
            winScreen();
            setTimeout(() => { nextSequence() }, 1000);
            userClickedPattern = [];
        }

    }
    else { loseScreen(); }
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + '.mp3');
    audio.play();
}

function pressed(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function winScreen() {
    $("body").css("background-color", "green");
    setTimeout(() => { $("body").css("background-color", "#011F3F"); }, 300);
}

function loseScreen() {
    $("body").css("background-color", "red");
    setTimeout(() => { $("body").css("background-color", "#011F3F"); }, 300);
    var audio = new Audio('sounds/wrong.mp3');
    $('h1').text("GAME OVER, press any key to start");
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    gameStart = true;
    audio.play();
}

function colorSequence(colorArray) {
    $("#" + colorArray).fadeIn(100).fadeOut(100).fadeIn(100);
}