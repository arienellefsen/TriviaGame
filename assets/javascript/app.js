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


//Creating start
$("#start").on( "click", function() {
    instructions.fadeOut( "slow" ,function() {
    card.css("display","block").fadeIn("slow");
  });
    triviaQuiz.init(i);
            var intervalId = setInterval(triviaQuiz.gameRun, 1000);

});

// Creating question inside of object quiz
var triviaQuiz = {
    quiz: [{
            questions: "When Central Park was first opened to the public?",
            choices: ["1859", "1849", "1880", "1839"],
            correctAnswear: "1859",
        }, {
            questions: "What is the measurement of the Statue of Liberty?",
            choices: ["205 feet 1/2 inches from the ground to the tip of the flame", "305 feet 1 inch from the ground to the tip of the flame", "310 feet 2 inches from the ground to the tip of the flame"],
            correctAnswear: "305 feet 1 inch from the ground to the tip of the flame",
        }
       
    ],

    //Create a function to start the quiz
    startQuiz: function(i) {

        //Get the total number of questions
        var holdQuiz = triviaQuiz.quiz;
        console.log("Total of questions:" + holdQuiz.length);


        //if is equal undefinied it means is the last question
         //Check if is the last question

        if(holdQuiz.length === i){
            console.log("end questions");
            triviaQuiz.gameOver();

         } else if (holdQuiz.length !== i){

            //getTime

        question.html("<p>" + holdQuiz[i].questions + "</p>"); //get first question
        console.log("Get questions: " + holdQuiz[i].questions);

        //Get number of choices
        var choicesLength = holdQuiz[i].choices.length;
        console.log("Number of choices:" + choicesLength);

        //Get Choices
        console.log("Choices:" + holdQuiz[i].choices);
        for (var countChoices = 0; countChoices < choicesLength; countChoices++) {
            var choicesRadio = holdQuiz[i].choices[countChoices];
            formChoices.append('<input type="radio" name="quizChoices" id="quizChoices" value="' + choicesRadio + '">' + choicesRadio+ "<br>" );
        }
        //Display correct answear
        var quizAnswear = holdQuiz[i].correctAnswear;
        console.log("Correct Answear:" + holdQuiz[i].correctAnswear);
        triviaQuiz.getAnswear(quizAnswear, formChoices, quizAnswear, seconds);


        }        
    },

    //Get Anwear form user's input
    getAnswear: function(quizAnswear, formChoices) {


        $('#form-choices input[type=radio]').change(function() {
            var userAnswear = this.value;
            console.log("User's answear: " + userAnswear);

            //Validate if answears is correct
            

            if (userAnswear === quizAnswear) {
                isRight = true;

                console.log("Correct answear");
                //call function to update score 
                triviaQuiz.updateScore(isRight, i, formChoices, quizAnswear);
            } 

    
            else {
                isRight = false;
                console.log("Nope");
                triviaQuiz.updateScore(isRight, i,formChoices, quizAnswear);
            }
            
        });
    },

    updateScore: function(isRight, i, formChoices, quizAnswear) {
       
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


    
    },

    nextQuestion: function() {
        seconds = 10;
        message.text("");
        i = +i + 1;
        console.log("I: " + i);
        formChoices.empty();
        correctAnswear.text("");
        triviaQuiz.startQuiz(i);
    },

    getScore: function(isRight){

        console.log("is right" + isRight);

        if (isRight === true) {
            rightAnswear = rightAnswear + 1;

        }else if (isRight === false)  {
            wrongAnswear = wrongAnswear + 1;
        }
    },

    gameOver: function(){
        console.log("Game Over");
        timer.text(" ");
        message.text("Game over");
        timer.css("display", "none");

        question.css("display", "none");
        formChoices.empty();
        correctAnswear.text("");
        triviaQuiz.getScore(rightAnswear,wrongAnswear );
        $("#score").css("display", "block").html("Correct Answears: " + rightAnswear + "<br> Incorrect Answears: " 
        + wrongAnswear + "<br>" + "No Answear:" 
        + noAnwear);


    },

    init: function(quizTime){
        triviaQuiz.startQuiz(i);

    },

    gameRun: function(){
        seconds = seconds -1;

        if (seconds >= 0){

            timer.text("Remaining: " + seconds);
        } 
        

    },

    stoptime: function(quizTime){
        
    },
};

//get times





