// 1- Get Dom Elements
var question = $("#question");
var inputChoices = $("#choices-input");
var correctAnswear = $("#answear");
var timer = $("#timer");
var seconds = 10;
var score = 0;
var rightAnswear = 0;
var wrongAnswear = 0;
var i = 0;
var num = 0;
var isRight;
var count = 0;
var formChoices = $("#form-choices");
var message = $("#message");

// Creating question inside of object quiz
var triviaQuiz = {
    quiz: [{
            questions: "Question 1",
            choices: ["a", "b", "c", "d"],
            correctAnswear: "c",
        }, {
            questions: "Question 2",
            choices: ["d", "e", "f"],
            correctAnswear: "d",
        },
        {
            questions: "Question 3",
            choices: ["1", "2", "3", "4", "5", "6", "7"],
            correctAnswear: "1"
        }
    ],

    //Create a function to start the quiz
    startQuiz: function(i) {

        //Get the total number of questions
        var holdQuiz = triviaQuiz.quiz;
        console.log("Total of questions:" + holdQuiz.length);

        //need to get first questions
        question.html("<p>" + holdQuiz[i].questions + "</p>"); //get first question
        console.log("Get questions: " + holdQuiz[i].questions);

        //Get number of choices
        var choicesLength = holdQuiz[i].choices.length;
        console.log("Number of choices:" + choicesLength);

        //Get Choices
        console.log("Choices:" + holdQuiz[i].choices);

        debugger;

        //Create a radio button        
        for (var countChoices = 0; countChoices < choicesLength; countChoices++) {
            var choicesRadio = holdQuiz[i].choices[countChoices];
            formChoices.append(choicesRadio + '<input type="radio" name="quizChoices" value="' + choicesRadio + '">');
        }

        //Display correct answear
        var quizAnswear = holdQuiz[i].correctAnswear;
        correctAnswear.text(holdQuiz[i].correctAnswear);
        console.log("Correct Answear:" + holdQuiz[i].correctAnswear);
        triviaQuiz.getAnswear(quizAnswear, formChoices);
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
                triviaQuiz.updateScore(isRight, i, formChoices);
            } else {
                isRight = false;
                console.log("Nope");
                triviaQuiz.updateScore(isRight, i);
            }
        });
    },

    updateScore: function(isRight, i, formChoices) {
        if (isRight === true) {
            rightAnswear = rightAnswear + 1;
            message.text("Great job!");
            console.log("Score Right Answear:" + rightAnswear);
            //move to next question
            setTimeout(function myFunction() {
                triviaQuiz.nextQuestion(i, formChoices);
            }, 2000);


        } else if (isRight === false) {
            wrongAnswear = wrongAnswear + 1;
            message.text("Wrong Answear!");
            console.log("Score Wrong Answear:" + wrongAnswear);
            triviaQuiz.nextQuestion(i, formChoices);
        }
    },

    nextQuestion: function() {
        message.text("");
        i = +i + 1;
        console.log("I: " + i);
        formChoices.empty();
        triviaQuiz.startQuiz(i);
    },
};

triviaQuiz.startQuiz(i);
var time = setTimeout(triviaQuiz.setTime, 5000);
//triviaQuiz.setTime();
var myVar = setInterval(triviaQuiz.setTime, 1000);

//Todo list
// Validate if time has exceded
// Slow next question 
// Verify end of question
// Show ansears and score at the end of the game