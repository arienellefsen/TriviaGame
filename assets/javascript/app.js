// 1- Get Dom Elements
var question = $("#question");
var inputChoices = $("#choices-input");
var correctAnswear = $("#answear");
var timer = $("#timer");
var seconds = 10;
var score = 0;
var rightAnswear = 0;
var wrongAnswear = 0;
var noAnwear = 0;
var i = 0;
var num = 0;
var isRight;
var count = 0;
var formChoices = $("#form-choices");
var message = $("#message");
var start = $("#start");
var instructions = $("#instructions");
var card = $("#card");

//1- Start game after click on button
$("#start").on( "click", function() {
    instructions.fadeOut( "slow" ,function() {
    card.css("display","block").fadeIn("slow");
    triviaQuiz.init(i);
  });
});


//2- Creating question inside of object quiz
var triviaQuiz = {
    quiz: [{
            questions: "When Central Park was first opened to the public?",
            choices: ["1859", "1849", "1880", "1839"],
            correctAnswear: "1859",
        }, {
            questions: "What is the measurement of the Statue of Liberty?",
            choices: ["205 feet 1/2 inches from the ground to the tip of the flame", "305 feet 1 inch from the ground to the tip of the flame", "310 feet 2 inches from the ground to the tip of the flame"],
            correctAnswear: "305 feet 1 inch from the ground to the tip of the flame",
        },
        {
            questions: "What NYC museum started in Gracie Mansion and later moved to 5th Ave. between 103rd St. and 104th St.?",
            choices: ["New York Hall of Science", "Metropolitan Museum of Art", "New York Transit Museum", "Museum of The City of New York"],
            correctAnswear: "Museum of The City of New York"
        },

       {
            questions: "The New York Aquarium is located in which New York City borough?",
            choices: ["Brooklyn", "Queens", "Bronx", "Manhattan"],
            correctAnswear: "Brooklyn"
        }
    ],

    //3 - Create a function to start the quiz
    startQuiz: function(i) {
    var myVar = setInterval(function(){ triviaQuiz.gameRun() }, 1000)

        //Get the total number of questions
        var holdQuiz = triviaQuiz.quiz;
        //if is equal undefinied it means is the last question
        if(holdQuiz.length === i){
            triviaQuiz.gameOver();

         } else if (holdQuiz.length !== i){

        question.html("<p>" + holdQuiz[i].questions + "</p>"); //get first question
        //Get number of choices
        var choicesLength = holdQuiz[i].choices.length;

        //Get Choices
        for (var countChoices = 0; countChoices < choicesLength; countChoices++) {
            var choicesRadio = holdQuiz[i].choices[countChoices];
            formChoices.append('<input type="radio" name="quizChoices" id="quizChoices" value="' + choicesRadio + '">' + choicesRadio+ "<br>" );
        }
        //Display correct answear
        var quizAnswear = holdQuiz[i].correctAnswear;
        triviaQuiz.getAnswear(quizAnswear, formChoices, quizAnswear, myVar);
        }        
    },

    //4 - Get Anwear form user's input
    getAnswear: function(quizAnswear, formChoices,myVar) {
        $('#form-choices input[type=radio]').change(function() {
            var userAnswear = this.value;
            //Check if answears is correct       
            if (userAnswear === quizAnswear) {
                isRight = true;
                //Call function to update score 
                triviaQuiz.updateScore(isRight, i, formChoices, quizAnswear);
            } 

            else if(userAnswear === ""){

                isRight = null;
                //call function to update score 
                triviaQuiz.updateScore(isRight, i, formChoices, quizAnswear);
            }
            else {
                isRight = false;
                triviaQuiz.updateScore(isRight, i,formChoices, quizAnswear);
            }
        });
    },
    //5 - Update Score
    updateScore: function(isRight, i, formChoices, quizAnswear) {
        var holdQuiz = triviaQuiz.quiz;
        if (isRight === true) {
            triviaQuiz.getScore(isRight);
            message.html("Great job!" + " <i class='fa fa-thumbs-up icon' aria-hidden='true'></i>");
            //create a function to stop time when the answear is correct and time less than 20 seconds
            correctAnswear.text("The correct answear is: " +quizAnswear);
            //move to next question           
            setTimeout(function myFunction() {
                triviaQuiz.nextQuestion(i, formChoices);
            }, 5000);

        } else if (isRight === false) {
            triviaQuiz.getScore(isRight);
            message.html("Hummmm! That is not the correct answear! " + " <i class='fa fa-thumbs-down icon' aria-hidden='true'></i>");
            correctAnswear.html("The correct answear is: " +quizAnswear);
            setTimeout(function delayNext() {
                triviaQuiz.nextQuestion(i, formChoices);
            }, 5000);
        }

        else if(isRight === null){
         triviaQuiz.getScore(isRight);
         message.html("Hummmm! You did not choose an answear! " + " <i class='fa fa-thumbs-down icon' aria-hidden='true'></i>");
            correctAnswear.html("The correct answear is: " + holdQuiz[i].correctAnswear);
                setTimeout(function delayNext() {
                triviaQuiz.nextQuestion(i, formChoices);
            }, 5000);
        }
    },
// 6 - Go to next question
    nextQuestion: function() {
        seconds = 10;
        message.text("");
        i = +i + 1;
        formChoices.empty();
        correctAnswear.text("");
        triviaQuiz.startQuiz(i);
    },

// 7 - Update Score

    getScore: function(isRight){
        if (isRight === true) {
            rightAnswear = rightAnswear + 1;
        }else if (isRight === false)  {
            wrongAnswear = wrongAnswear + 1;
        }else  if (isRight === null)  {
            noAnwear = noAnwear + 1;
        }
    },
// 8 - Reset game

    gameOver: function(){
        timer.text(" ");
        message.text("Game over");
        timer.css("display", "none");
        question.css("display", "none");
        formChoices.empty();
        correctAnswear.text("");
        triviaQuiz.getScore(rightAnswear,wrongAnswear );
        $("#score").css("display", "block").html("Correct Answears: " + rightAnswear + "<br> Incorrect Answears: " 
        + wrongAnswear + "<br>" + "No Answear:" 
        + noAnwear)
    },

// 9 - Start game
    init: function(quizTime){
        triviaQuiz.startQuiz(i);
    },
// 10 - update game time
    gameRun: function(){
        //Update seconds
        seconds = seconds -1;

        if (seconds >= 0){
        timer.text("Remaining: " + seconds);
        } 

        else{
            timer.text("Time Out!");
            isRight = null;
        }
    },
};





